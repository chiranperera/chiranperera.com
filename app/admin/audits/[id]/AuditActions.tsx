"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "running"; verb: string }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

export function AuditActions({
  auditId,
  canRun,
  canSend,
}: {
  auditId: number;
  canRun: boolean;
  canSend: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function call(path: string, verb: string, body?: unknown) {
    setStatus({ kind: "running", verb });
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || `${verb} failed (${res.status})`);
      setStatus({ kind: "success", message: `${verb} done.` });
      router.refresh();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Action failed.",
      });
    }
  }

  const busy = status.kind === "running";

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <button
        type="button"
        className="btn btn-primary glow"
        disabled={!canRun || busy}
        onClick={() => call("/api/audit/run", "Run audit", { auditId })}
      >
        {busy && status.verb === "Run audit" ? "Running…" : "Run audit"}
      </button>
      <a
        href={`/api/audit/${auditId}/preview`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-secondary"
      >
        Preview PDF ↗
      </a>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!canSend || busy}
        onClick={() => {
          if (!confirm("Send the audit PDF to the requester now?")) return;
          call(`/api/audit/${auditId}/send`, "Send audit");
        }}
      >
        {busy && status.verb === "Send audit" ? "Sending…" : "Send to requester"}
      </button>
      {status.kind === "error" && (
        <span style={{ color: "#A61828", fontSize: 13 }}>{status.message}</span>
      )}
      {status.kind === "success" && (
        <span style={{ color: "#1F8000", fontSize: 13 }}>{status.message}</span>
      )}
    </div>
  );
}

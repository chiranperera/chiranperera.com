"use client";

import { useState } from "react";

const INDUSTRIES = [
  "Hospitality · Hotels",
  "Wellness · Retreat",
  "Beauty · Skincare",
  "Real Estate",
  "Lifestyle Products",
  "Education",
  "Eldercare",
  "Other",
];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; firstName: string; url: string }
  | { kind: "error"; message: string };

export function AuditForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const url = String(data.get("url") || "").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const industry = String(data.get("industry") || "").trim();

    if (!url || !name || !email || !industry) {
      setStatus({ kind: "error", message: "Please fill every field." });
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      setStatus({
        kind: "error",
        message: "URL must start with http:// or https://",
      });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, name, email, industry, source: "audit" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Audit request failed.");
      }
      setStatus({
        kind: "success",
        firstName: name.split(" ")[0] || name,
        url,
      });
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong — please try again.";
      setStatus({ kind: "error", message });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="audit-form" role="status" aria-live="polite">
        <h3 className="display" style={{ fontSize: 26, letterSpacing: "-0.01em" }}>
          Audit on the way.
        </h3>
        <p style={{ color: "var(--t2)" }}>
          Thanks, {status.firstName}. Your audit for{" "}
          <span className="mono" style={{ color: "#fff" }}>{status.url}</span>{" "}
          is queued. Expect a branded PDF within 48 hours.
        </p>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            background: "rgba(119,0,255,.12)",
            border: ".5px solid rgba(119,0,255,.3)",
            color: "#fff",
            fontSize: 14,
          }}
        >
          No follow-up. No newsletter. Just the audit.
        </div>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorMessage = status.kind === "error" ? status.message : null;

  return (
    <form className="audit-form" onSubmit={onSubmit} noValidate id="audit-form">
      <h3>Request your audit</h3>
      <div className="field">
        <label htmlFor="url">Your website URL</label>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="https://yourbrand.com"
          required
          disabled={submitting}
        />
      </div>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Chiran Perera"
          required
          disabled={submitting}
        />
      </div>
      <div className="field">
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@brand.com"
          required
          disabled={submitting}
        />
      </div>
      <div className="field">
        <label htmlFor="industry">Your industry</label>
        <select id="industry" name="industry" required defaultValue="" disabled={submitting}>
          <option value="" disabled>
            Select one…
          </option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(229,36,59,.12)",
            border: "1px solid rgba(229,36,59,.4)",
            color: "#FFD8DD",
            fontSize: 13,
          }}
        >
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        className="btn btn-primary glow"
        style={{ justifyContent: "center" }}
        disabled={submitting}
      >
        {submitting ? "Sending…" : (
          <>
            Run my audit <span className="arrow">→</span>
          </>
        )}
      </button>
      <p className="small-note">
        Your audit lands in your inbox within 48 hours. No credit card, no sales call.
      </p>
    </form>
  );
}

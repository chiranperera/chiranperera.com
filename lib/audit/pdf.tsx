import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { LlmResults } from "./gemini";
import type { ScanData } from "./scanner";
import { scoreToVerdict, type ScoreBreakdown } from "./scorer";

const styles = StyleSheet.create({
  page: {
    padding: 56,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: { borderBottomWidth: 1, borderBottomColor: "#E5E7EB", paddingBottom: 16, marginBottom: 24 },
  brand: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#7700FF", marginBottom: 4 },
  title: { fontSize: 28, fontFamily: "Helvetica-Bold", marginBottom: 4, letterSpacing: -0.5 },
  subtitle: { fontSize: 11, color: "#475569" },
  scoreCard: {
    backgroundColor: "#7700FF",
    color: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLeft: { flexDirection: "column" },
  scoreLabel: { fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.8)" },
  scoreVerdict: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#FFFFFF", marginTop: 4 },
  scoreNumber: { fontSize: 56, fontFamily: "Helvetica-Bold", color: "#FFFFFF", letterSpacing: -2 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#0F172A",
  },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  pill: { fontSize: 9, padding: "3 8", borderRadius: 100, backgroundColor: "#F0E5FF", color: "#5C00CC" },
  pillNeutral: { fontSize: 9, padding: "3 8", borderRadius: 100, backgroundColor: "#F0F0F5", color: "#475569" },
  row: { flexDirection: "row", paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: "#E5E7EB" },
  rowLabel: { width: "40%", color: "#475569" },
  rowValue: { width: "60%", color: "#0F172A" },
  breakdownGrid: { flexDirection: "row", gap: 12, marginTop: 12 },
  breakdownCell: { flex: 1, padding: 12, backgroundColor: "#F8F8FB", borderRadius: 8 },
  breakdownLabel: { fontSize: 9, letterSpacing: 0.6, textTransform: "uppercase", color: "#475569" },
  breakdownNum: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0F172A", marginTop: 4 },
  citation: { marginTop: 8, padding: 10, backgroundColor: "#F8F8FB", borderRadius: 8 },
  citationQ: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  citationA: { fontSize: 10, color: "#475569" },
  citationCited: { fontSize: 9, color: "#1F8000", fontFamily: "Helvetica-Bold", marginTop: 4 },
  citationMissed: { fontSize: 9, color: "#A61828", fontFamily: "Helvetica-Bold", marginTop: 4 },
  fix: { padding: 10, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#7700FF", backgroundColor: "#FAFAFB" },
  fixTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  fixDesc: { fontSize: 10, color: "#475569" },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 56,
    right: 56,
    fontSize: 9,
    color: "#94A3B8",
    textAlign: "center",
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
  },
});

export type AuditPdfProps = {
  brand: string;
  industry: string;
  url: string;
  generatedAt: string;
  scan: ScanData;
  llm: LlmResults;
  score: ScoreBreakdown;
  topFixes: Array<{ title: string; description: string }>;
};

export function AuditPdf(props: AuditPdfProps) {
  const verdict = scoreToVerdict(props.score.total);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>CHIRAN · Audit</Text>
          <Text style={styles.title}>AI Search Visibility Report</Text>
          <Text style={styles.subtitle}>
            {props.url} · prepared {new Date(props.generatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreLeft}>
            <Text style={styles.scoreLabel}>Citation Readiness</Text>
            <Text style={styles.scoreVerdict}>{verdict.label}</Text>
          </View>
          <Text style={styles.scoreNumber}>
            {props.score.total}
            <Text style={{ fontSize: 24 }}>%</Text>
          </Text>
        </View>

        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownCell}>
            <Text style={styles.breakdownLabel}>Citation</Text>
            <Text style={styles.breakdownNum}>{props.score.citation}</Text>
          </View>
          <View style={styles.breakdownCell}>
            <Text style={styles.breakdownLabel}>Schema</Text>
            <Text style={styles.breakdownNum}>{props.score.schema}</Text>
          </View>
          <View style={styles.breakdownCell}>
            <Text style={styles.breakdownLabel}>Entity</Text>
            <Text style={styles.breakdownNum}>{props.score.entity}</Text>
          </View>
          <View style={styles.breakdownCell}>
            <Text style={styles.breakdownLabel}>Technical</Text>
            <Text style={styles.breakdownNum}>{props.score.technical}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Site profile</Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Brand</Text>
            <Text style={styles.rowValue}>{props.brand}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Industry</Text>
            <Text style={styles.rowValue}>{props.industry}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Title</Text>
            <Text style={styles.rowValue}>{props.scan.title || "(missing)"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Description</Text>
            <Text style={styles.rowValue}>{props.scan.description || "(missing)"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Schema types found</Text>
            <Text style={styles.rowValue}>
              {props.scan.jsonLd.types.length === 0 ? "None" : props.scan.jsonLd.types.join(", ")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>robots.txt / sitemap.xml / llms.txt</Text>
            <Text style={styles.rowValue}>
              {props.scan.hasRobotsTxt ? "✓" : "✗"} robots · {props.scan.hasSitemap ? "✓" : "✗"} sitemap · {props.scan.hasLlmsTxt ? "✓" : "✗"} llms.txt
            </Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Citation test · {props.llm.engine}</Text>
        {props.llm.results.map((r, i) => (
          <View key={i} style={styles.citation}>
            <Text style={styles.citationQ}>Q{i + 1}. {r.query}</Text>
            <Text style={styles.citationA}>{r.rawAnswer}</Text>
            {r.brandMentioned ? (
              <Text style={styles.citationCited}>✓ {props.brand} cited</Text>
            ) : (
              <Text style={styles.citationMissed}>
                ✗ {props.brand} not cited · {r.competitorsMentioned.length > 0 ? `competitors: ${r.competitorsMentioned.join(", ")}` : "no competitors named"}
              </Text>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Top fixes</Text>
        {props.topFixes.map((fix, i) => (
          <View key={i} style={styles.fix}>
            <Text style={styles.fixTitle}>
              {i + 1}. {fix.title}
            </Text>
            <Text style={styles.fixDesc}>{fix.description}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Prepared by Chiran Perera · chiranperera.com · hello@chiranperera.com
        </Text>
      </Page>
    </Document>
  );
}

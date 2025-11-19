import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Report({ data }) {
  const downloadPDF = async () => {
    const element = document.getElementById("report-card");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, "PNG", 10, 10, width - 20, 0);
    pdf.save("Resume-Analysis-Report.pdf");
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <div
        id="report-card"
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#1e3a8a",
          }}
        >
          Analysis Report
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              background: "#dbeafe",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", color: "#1e40af" }}>Word Count</p>
            <p
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              {data.word_count}
            </p>
          </div>
          <div
            style={{
              background: "#dcfce7",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", color: "#166534f" }}>Readability</p>
            <p
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              {data.readability_score}
            </p>
          </div>
          <div
            style={{
              background: "#f3e8ff",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", color: "#9333ea" }}>Keyword Match</p>
            <p
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              {data.keyword_match}%
            </p>
          </div>
          <div
            style={{
              background: "#fee2e2",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "1rem", color: "#dc2626" }}>ATS Score</p>
            <p
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "0.5rem 0",
              }}
            >
              {data.ats_score}/100
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "0.8rem", color: "#1e40af" }}>
            AI Summary
          </h3>
          <p style={{ lineHeight: "1.7", color: "#374151" }}>{data.summary}</p>
        </div>

        <div>
          <h3 style={{ marginBottom: "0.8rem", color: "#1e40af" }}>
            Improvement Suggestions
          </h3>
          <ul style={{ paddingLeft: "1.8rem", lineHeight: "1.8" }}>
            {data.suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "1rem 2.5rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}

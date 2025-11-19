import { useState } from "react";
import UploadForm from "./components/UploadForm";
import Report from "./components/Report";
import "./App.css";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "2rem", color: "#1e40af" }}
      >
        Rezumei
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          color: "#08268aff",
          marginBottom: "2rem",
        }}
      >
        AI-Powered Resume Analysis & ATS Optimization
      </p>
      <UploadForm setReport={setReport} setLoading={setLoading} />
      {loading && (
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>Analyzing...</p>
      )}
      {report && <Report data={report} />}
    </div>
  );
}

export default App;

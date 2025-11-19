import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function UploadForm({ setReport, setLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [jobDesc, setJobDesc] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_desc", jobDesc);
      submitForm(formData);
    }
  };

  const submitForm = async (formData) => {
    setLoading(true);
    setReport(null);
    try {
      const res = await axios.post(`${API_URL}/analyze`, formData);
      setReport(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        submitForm(formData);
      }}
      onDragEnter={handleDrag}
      style={{ marginTop: "2rem" }}
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: dragActive ? "3px dashed #2563eb" : "3px dashed #94a3b8",
          borderRadius: "16px",
          padding: "3rem",
          textAlign: "center",
          backgroundColor: dragActive ? "#eff6ff" : "#f8fafc",
          transition: "0.3s",
        }}
      >
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Drag & drop your resume here, or click to browse
        </p>
        <input
          type="file"
          name="resume"
          accept=".pdf"
          required
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          style={{ display: "block", margin: "0 auto 1.5rem auto" }}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.8rem",
            fontWeight: "600",
          }}
        >
          Job Description (optional but recommended)
        </label>
        <textarea
          name="job_desc"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows="6"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
          }}
          placeholder="Paste the full job description for accurate keyword matching..."
        />
      </div>

      <button
        type="submit"
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "1.2rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        Analyze My Resume
      </button>
    </form>
  );
}

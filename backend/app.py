from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf, clean_text
from analyzer import analyze_resume
import io

app = FastAPI(title="Resume Reviewer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_desc: str = Form("")
):
    content = await resume.read()
    text = clean_text(extract_text_from_pdf(io.BytesIO(content)))
    result = analyze_resume(text, job_desc)
    return result
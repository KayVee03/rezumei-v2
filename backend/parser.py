import pdfplumber
import re

def extract_text_from_pdf(file_bytes: bytes) -> str:
    with pdfplumber.open(file_bytes) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

def clean_text(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()
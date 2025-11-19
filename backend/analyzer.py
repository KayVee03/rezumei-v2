import spacy
import re
from transformers import pipeline

nlp = spacy.load("en_core_web_sm")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def ats_compatibility_score(text: str) -> int:
    score = 100
    if re.search(r'\|.*\|', text):           # Tables
        score -= 40
    if re.search(r'http[s]?://', text):      # Hyperlinks
        score -= 20
    if len(re.findall(r'\n{3,}', text)) > 8: # Excessive spacing
        score -= 15
    if "image" in text.lower() or "object" in text.lower():
        score -= 30
    if len(text.split()) > 900:              # Too long
        score -= 20
    return max(0, score)

def analyze_resume(text: str, job_desc: str = "") -> dict:
    text = re.sub(r'\s+', ' ', text).strip()
    doc = nlp(text)

    # Word & sentence count
    words = text.split()
    word_count = len(words)
    sentences = list(doc.sents)
    sentence_count = len(sentences) if sentences else 1

    # Approximate syllables
    syllables = sum(len(re.findall(r'[aeiouy]+', word.lower())) for word in words)
    asl = word_count / sentence_count
    asw = syllables / word_count if word_count else 0

    # Flesch Reading Ease
    readability = 206.835 - 1.015 * asl - 84.6 * asw
    readability = max(0, min(round(readability, 1), 100))

    # Keyword Match
    match_score = 0.0
    if job_desc and len(job_desc.strip()) > 30:
        job_tokens = {t.lemma_.lower() for t in nlp(job_desc) if t.pos_ in {"NOUN","PROPN","ADJ","VERB"} and not t.is_stop}
        resume_tokens = {t.lemma_.lower() for t in doc if t.pos_ in {"NOUN","PROPN","ADJ","VERB"} and not t.is_stop}
        if job_tokens:
            match_score = round(len(job_tokens & resume_tokens) / len(job_tokens) * 100, 1)

    # Summary
    summary = summarizer(text[:1500], max_length=140, min_length=50, do_sample=False)[0]["summary_text"]
    summary = summary.capitalize()

    # Professional suggestions
    suggestions = [
        "Replace duties with quantifiable achievements (e.g., “Increased revenue by 35%” instead of “Responsible for sales”).",
        "Start every bullet with a strong action verb: Led, Developed, Optimized, Designed, Reduced, etc.",
        "Keep resume length to 1 page (2 pages max for 10+ years experience). Remove irrelevant early roles.",
        "Mirror exact keywords from the job description (tools, frameworks, methodologies).",
        "Avoid tables, text boxes, columns, and images — they break most ATS systems.",
        "Use standard section headings: Experience, Education, Skills, Projects."
    ]

    ats_score = ats_compatibility_score(text)

    return {
        "word_count": word_count,
        "readability_score": readability,
        "keyword_match": match_score,
        "ats_score": ats_score,
        "summary": summary,
        "suggestions": suggestions
    }
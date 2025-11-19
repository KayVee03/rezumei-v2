# ✦ Rezumei

**Live Demo** → (will be added after deployment)  
AI-Powered Resume Reviewer & ATS Optimizer

Instantly analyzes PDF resumes using NLP and Hugging Face models.

### Features
- Accurate Flesch readability scoring
- Keyword matching against job descriptions
- Realistic ATS compatibility score with issue detection
- AI-generated summary
- Professional improvement suggestions
- Drag & drop upload
- One-click PDF report download

### Tech Stack
- Frontend: React + Vite
- Backend: FastAPI, spaCy, Hugging Face Transformers
- Deployment: Render + Vercel (100 % free)

### Local Run
```bash
# Backend
cd backend
.\venv\Scripts\activate
uvicorn app:app --reload --port 8000

# Frontend
cd frontend
npm run dev

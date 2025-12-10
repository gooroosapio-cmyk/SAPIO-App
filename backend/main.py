from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models.schemas import FinancialInput, AnalysisOutput
from backend.core.engine import run_analysis

app = FastAPI(title="SAPIO-App Engine", version="1.0")

# --- CONFIGURATION DE SÉCURITÉ (CORS) ---
# Cela permet à ton Front-end de discuter avec le Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # "*" signifie "Tout le monde est accepté" (pour le dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------

@app.get("/")
def home():
    return {"message": "Moteur SAPIO opérationnel. Utilisez /analyze pour envoyer des données."}

@app.post("/analyze", response_model=AnalysisOutput)
def analyze_data(input_data: FinancialInput):
    # 1. On lance le moteur de règles
    contexte, titre, detail = run_analysis(input_data)
    
    # 2. On renvoie la réponse
    return AnalysisOutput(
        contexte_detecte=contexte,
        recommandation_titre=titre,
        recommandation_detail=detail,
        score_confiance=90
    )

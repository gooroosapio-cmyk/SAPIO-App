from fastapi import FastAPI, HTTPException
from backend.models.schemas import FinancialInput, AnalysisOutput
from backend.core.engine import run_analysis

app = FastAPI(title="SAPIO-App Engine", version="1.0")

@app.get("/")
def home():
    return {"message": "Moteur SAPIO opérationnel. Utilisez /analyze pour envoyer des données."}

# C'est ici que le Front-end va frapper à la porte
@app.post("/analyze", response_model=AnalysisOutput)
def analyze_data(input_data: FinancialInput):
    
    # 1. On lance le moteur de règles (engine.py)
    contexte, titre, detail = run_analysis(input_data)
    
    # 2. On construit la réponse
    # Note : Le score de confiance est simulé à 90% pour l'instant
    return AnalysisOutput(
        contexte_detecte=contexte,
        recommandation_titre=titre,
        recommandation_detail=detail,
        score_confiance=90
    )
  

from pydantic import BaseModel
from typing import Optional, List

# Ce modèle définit ce que le Frontend DOIT envoyer
class FinancialInput(BaseModel):
    # Données quantitatives (Chiffres)
    chiffre_affaires: float
    marge_nette: float
    croissance_client: float
    tresorerie_disponible: float
    
    # Données qualitatives (Contexte humain)
    facteur_risque_externe: Optional[str] = "Normal"
    culture_prioritaire: Optional[str] = "Equilibre"

# Ce modèle définit ce que l'IA VA répondre
class AnalysisOutput(BaseModel):
    contexte_detecte: str
    recommandation_titre: str
    recommandation_detail: str
    score_confiance: int
  

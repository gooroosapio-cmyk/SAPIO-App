import json
import os

# Fonction pour charger les règles depuis le fichier JSON
def charger_regles():
    # On cherche le fichier qui est deux étages plus haut dans le dossier data
    chemin = os.path.join(os.path.dirname(__file__), '../../specifications/ContextesBusiness.json')
    try:
        with open(chemin, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return None

# Le moteur d'analyse (Version améliorée de ton test Colab)
def run_analysis(donnees):
    regles = charger_regles()
    
    if not regles:
        return "Erreur", "Fichier de règles introuvable", "Vérifier le chemin JSON"

    meilleur_contexte = "CON_NON_IDENTIFIE"
    recommandation_titre = "Analyse impossible"
    recommandation_detail = "Les données ne correspondent à aucun scénario connu."

    # Conversion des données reçues (format Pydantic) en dictionnaire simple
    input_dict = donnees.dict()

    # Logique de comparaison
    for contexte in regles["contextes"]:
        conditions_remplies = True
        conditions = contexte.get("conditions", {})

        # Vérification Marge Nette
        if "marge_nette" in conditions:
            if "min" in conditions["marge_nette"] and input_dict["marge_nette"] < conditions["marge_nette"]["min"]:
                conditions_remplies = False
            if "max" in conditions["marge_nette"] and input_dict["marge_nette"] > conditions["marge_nette"]["max"]:
                conditions_remplies = False

        # Vérification Croissance Client
        if "croissance_client" in conditions:
            if "min" in conditions["croissance_client"] and input_dict["croissance_client"] < conditions["croissance_client"]["min"]:
                conditions_remplies = False

        # Si ça match, on capture les infos
        if conditions_remplies:
            meilleur_contexte = contexte["id"]
            recommandation_titre = contexte.get("recommandation_type", "Conseil générique")
            recommandation_detail = f"Priorité détectée : {contexte.get('priorite', 'N/A')}"
            break

    return meilleur_contexte, recommandation_titre, recommandation_detail
  

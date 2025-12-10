export default function Dashboard() {
    console.log("🟢 Démarrage du Dashboard...");

    // 1. TENTATIVE DE RÉCUPÉRATION DES DONNÉES
    let result = null;
    let rawData = null;

    try {
        // On va chercher ce que SettingsIA a enregistré
        rawData = localStorage.getItem('sapio_last_analysis');
        
        if (rawData) {
            result = JSON.parse(rawData);
        }
    } catch (e) {
        console.error("Erreur lecture JSON", e);
        return `
            <div style="color:red; padding:20px; border:1px solid red;">
                <h3>⚠️ Erreur de données</h3>
                <p>Impossible de lire les résultats.</p>
                <small>${e.message}</small>
                <br>
                <a href="#settings" style="display:inline-block; margin-top:10px; padding:5px 10px; background:#eee;">Retour</a>
            </div>
        `;
    }

    // 2. SI AUCUNE DONNÉE N'EST TROUVÉE (Cas fréquent)
    if (!result) {
        return `
            <div style="text-align:center; padding:30px; font-family:sans-serif;">
                <div style="font-size:50px; margin-bottom:10px;">📭</div>
                <h3 style="color:#555;">Aucun résultat disponible</h3>
                <p style="color:#777;">Le moteur IA n'a rien renvoyé ou la sauvegarde a échoué.</p>
                
                <div style="background:#f0f0f0; padding:10px; margin:20px 0; font-family:monospace; font-size:12px; text-align:left; overflow:hidden;">
                    Debug: rawData est ${rawData === null ? 'NULL' : 'VIDE'}
                </div>

                <a href="#settings" style="background:#3498db; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">
                    🔄 Relancer l'analyse
                </a>
            </div>
        `;
    }

    // 3. AFFICHAGE DES RÉSULTATS (Si tout va bien)
    // On utilise des valeurs par défaut (||) pour éviter les crashs si un champ manque
    const contexte = result.contexte_detecte || "Non identifié";
    const titre = result.recommandation_titre || "Pas de titre";
    const detail = result.recommandation_detail || "Pas de détail disponible.";
    const score = result.score_confiance || 0;

    return `
        <div class="dashboard-container fade-in">
            <div style="text-align:center; margin-bottom:20px;">
                <h2 style="color:#27ae60; margin:0;">✅ Analyse Terminée</h2>
                <small style="color:#7f8c8d;">Confiance IA : ${score}%</small>
            </div>

            <div style="background:white; border-left:5px solid #3498db; padding:15px; margin-bottom:15px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <h3 style="margin-top:0; color:#2c3e50; font-size:16px;">📍 Contexte Détecté</h3>
                <p style="font-size:18px; font-weight:bold; color:#2980b9; margin:5px 0;">${contexte}</p>
            </div>

            <div style="background:white; border-left:5px solid #e67e22; padding:15px; margin-bottom:20px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <h3 style="margin-top:0; color:#d35400; font-size:16px;">💡 Recommandation Stratégique</h3>
                <p style="font-weight:bold; margin-bottom:5px;">${titre}</p>
                <p style="color:#555; line-height:1.4;">${detail}</p>
            </div>

            <div style="text-align:center;">
                <a href="#settings" style="background:#95a5a6; color:white; padding:10px 20px; text-decoration:none; border-radius:30px; font-size:14px;">
                    Faire une nouvelle simulation
                </a>
            </div>
        </div>
    `;
}

// components/SettingsIA.js
// Composant de configuration et de saisie des données pour l'IA

// Fonction de simulation de l'analyse (remplace le BACKEND IA)
function simulateAnalysis(data) {
    let contexte = "CON_NEUTRE";
    let recommandation = "Évaluation standard des performances.";
    let justification = "Les indicateurs sont dans la moyenne. Aucune alerte critique.";

    if (data.marge_nette < 5 && data.taux_croissance_client > 15) {
        // Règle simplifiée basée sur CON_CROISSANCE_AGRESSIVE
        contexte = "CON_CROISSANCE_AGRESSIVE";
        recommandation = "Continuer d'investir massivement en marketing. Votre croissance justifie la faible marge actuelle.";
        justification = "Forte acquisition client au détriment de la marge brute, cohérent avec une stratégie d'expansion rapide.";
    } else if (data.marge_nette > 15 && data.taux_croissance_client < 5) {
        // Règle simplifiée basée sur CON_STABILISATION_RENTABILITE
        contexte = "CON_STABILISATION_RENTABILITE";
        recommandation = "Concentrez-vous sur l'optimisation des coûts fixes. La rentabilité est bonne, mais la stagnation est un risque.";
        justification = "Marge nette excellente, mais croissance client trop faible. Risque de stagnation à moyen terme.";
    }

    return { contexte, recommandation, justification };
}

// Fonction appelée par le bouton "Lancer l'Analyse"
export function handleAnalysis() {
    // 1. Collecter les données de l'interface
    const data = {
        marge_nette: parseFloat(document.getElementById('marge_nette').value),
        taux_croissance_client: parseFloat(document.getElementById('taux_croissance_client').value),
        culture_prioritaire: document.getElementById('culture_prioritaire').value,
    };
    
    // 2. Simuler l'analyse (appel à la fonction ci-dessus)
    const result = simulateAnalysis(data);
    
    // 3. Stocker le résultat pour l'afficher sur le dashboard
    localStorage.setItem('iaResult', JSON.stringify(result));
    
    // 4. Rediriger vers le dashboard pour afficher le résultat
    window.location.hash = '#dashboard';
}


// Rendu du composant
export function createSettingsIA() {
    const settings = document.createElement('section');
    settings.id = 'ia-settings-view';
    settings.innerHTML = `
        <h2>Paramètres & Simulation IA</h2>
        
        <div class="settings-group">
            <h3>1. Entrée des Données Clés (DataSchema)</h3>
            
            <label for="marge_nette">Marge Nette Actuelle (%) :</label>
            <input type="number" id="marge_nette" value="10">
            <p class="description">Performance financière (Financier).</p>
            
            <label for="taux_croissance_client">Taux de Croissance Client (%) :</label>
            <input type="number" id="taux_croissance_client" value="12">
            <p class="description">Dynamique d'acquisition (Client).</p>

            <label for="culture_prioritaire">Culture Prioritaire (Qualitatif) :</label>
            <select id="culture_prioritaire">
                <option value="Innovation">Innovation</option>
                <option value="Efficacité">Efficacité</option>
                <option value="Service Client">Service Client</option>
                <option value="Stabilité" selected>Stabilité</option>
            </select>
        </div>
        
        <div class="settings-group">
            <h3>2. Logique Business</h3>
            <p>L'IA compare les données aux règles internes (simulées) :</p>
            <ul id="context-list">
                <li>**CON_CROISSANCE_AGRESSIVE** (Marge < 5% ET Croissance > 15%)</li>
                <li>**CON_STABILISATION_RENTABILITE** (Marge > 15% ET Croissance < 5%)</li>
            </ul>
        </div>
        
        <button id="run-ia-analysis">Lancer l'Analyse IA</button>
    `;
    return settings;
}

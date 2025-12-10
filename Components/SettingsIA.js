// Adresse de ton Cerveau IA (Colle ton URL Render ici entre les guillemets)
const API_URL = "https://sapio-app.onrender.com"; 

export default function SettingsIA() {
    return `
      <div class="card fade-in">
        <h2>📊 Configuration de l'Analyse</h2>
        <p>Saisissez les données financières clés pour que l'IA détecte le contexte.</p>
        
        <form id="kpiForm" class="kpi-grid">
            <div class="input-group">
                <label>Chiffre d'Affaires (M€)</label>
                <input type="number" id="ca" step="0.1" placeholder="ex: 12.5" required>
            </div>
            <div class="input-group">
                <label>Marge Nette (%)</label>
                <input type="number" id="marge" step="0.1" placeholder="ex: 8.5" required>
            </div>
            <div class="input-group">
                <label>Croissance Clients (%)</label>
                <input type="number" id="croissance" step="0.1" placeholder="ex: 15" required>
            </div>
            <div class="input-group">
                <label>Trésorerie Disponible (M€)</label>
                <input type="number" id="treso" step="0.1" placeholder="ex: 2.0" required>
            </div>
            
            <div class="full-width">
                <button type="submit" class="btn-primary" id="analyzeBtn">
                    ✨ Lancer l'Analyse IA
                </button>
            </div>
        </form>
      </div>
    `;
}

// Logique pour gérer le formulaire et l'appel API
export function handleAnalysis() {
    const form = document.getElementById('kpiForm');
    const btn = document.getElementById('analyzeBtn');

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 1. Récupération des valeurs
            const data = {
                chiffre_affaires: parseFloat(document.getElementById('ca').value),
                marge_nette: parseFloat(document.getElementById('marge').value),
                croissance_client: parseFloat(document.getElementById('croissance').value),
                tresorerie_disponible: parseFloat(document.getElementById('treso').value),
                // Valeurs par défaut pour le qualitatif (à améliorer plus tard)
                facteur_risque_externe: "Normal",
                culture_prioritaire: "Equilibre"
            };

            // Animation de chargement
            btn.innerHTML = "⏳ Analyse en cours...";
            btn.disabled = true;

            try {
                // 2. APPEL VERS LE CERVEAU PYTHON (Render)
                const response = await fetch(`${API_URL}/analyze`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Erreur de connexion API");

                const result = await response.json();

                // 3. Sauvegarde et Redirection
                localStorage.setItem('sapio_last_analysis', JSON.stringify(result));
                window.location.hash = "#dashboard";

            } catch (error) {
                console.error("Erreur:", error);
                alert("❌ Erreur : Impossible de joindre le cerveau IA. Vérifiez que le serveur Render est actif.");
                btn.innerHTML = "✨ Réessayer";
                btn.disabled = false;
            }
        });
    }
}
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

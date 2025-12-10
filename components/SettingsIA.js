// 👇 COLLE TON URL RENDER ICI (Garde les guillemets !)
const API_URL = "https://sapio-app.onrender.com"; 

export default function SettingsIA() {
    return `
      <div class="card fade-in" style="max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📊 Configuration de l'Analyse</h2>
        <p style="margin-bottom: 20px;">Entrez vos données financières pour interroger le Moteur IA.</p>
        
        <form id="kpiForm" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="input-group">
                <label style="font-weight: bold; display: block; margin-bottom: 5px;">Chiffre d'Affaires (M€)</label>
                <input type="number" id="ca" step="0.1" placeholder="ex: 12.5" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <div class="input-group">
                <label style="font-weight: bold; display: block; margin-bottom: 5px;">Marge Nette (%)</label>
                <input type="number" id="marge" step="0.1" placeholder="ex: 8.5" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <div class="input-group">
                <label style="font-weight: bold; display: block; margin-bottom: 5px;">Croissance Clients (%)</label>
                <input type="number" id="croissance" step="0.1" placeholder="ex: 15" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <div class="input-group">
                <label style="font-weight: bold; display: block; margin-bottom: 5px;">Trésorerie Disponible (M€)</label>
                <input type="number" id="treso" step="0.1" placeholder="ex: 2.0" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            
            <button type="submit" id="analyzeBtn" style="background: #3498db; color: white; border: none; padding: 12px; font-size: 16px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                ✨ Lancer l'Analyse IA
            </button>
        </form>
      </div>
    `;
}

// Logique gérée par le navigateur
export function handleAnalysis() {
    const form = document.getElementById('kpiForm');
    const btn = document.getElementById('analyzeBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Récupération des valeurs
            const data = {
                chiffre_affaires: parseFloat(document.getElementById('ca').value),
                marge_nette: parseFloat(document.getElementById('marge').value),
                croissance_client: parseFloat(document.getElementById('croissance').value),
                tresorerie_disponible: parseFloat(document.getElementById('treso').value),
                facteur_risque_externe: "Normal",
                culture_prioritaire: "Equilibre"
            };

            // Feedback utilisateur
            const originalText = btn.innerHTML;
            btn.innerHTML = "⏳ Connexion au cerveau IA en cours...";
            btn.disabled = true;
            btn.style.background = "#95a5a6";

            try {
                // Appel API
                const response = await fetch(`${API_URL}/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Erreur serveur ou connexion");

                const result = await response.json();

                // Sauvegarde et redirection
                localStorage.setItem('sapio_last_analysis', JSON.stringify(result));
                window.location.hash = "#dashboard";

            } catch (error) {
                console.error(error);
                alert("❌ Erreur de connexion au serveur Render.\nLe serveur est peut-être en train de démarrer (cela prend 1 minute). Réessayez !");
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = "#e74c3c"; // Rouge en cas d'erreur
            }
        });
    } else {
        console.error("Formulaire non trouvé dans le DOM");
    }
}

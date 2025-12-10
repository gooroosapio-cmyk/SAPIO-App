// 👇 REMPLACE CETTE LIGNE PAR TON VRAI LIEN RENDER !
const API_URL = "https://sapio-app.onrender.com"; 

export default function SettingsIA() {
    return `
      <div class="card fade-in" style="max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📊 Configuration</h2>
        
        <form id="kpiForm" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="input-group">
                <label style="font-weight: bold;">Chiffre d'Affaires (M€)</label>
                <input type="number" id="ca" step="0.1" value="10" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="input-group">
                <label style="font-weight: bold;">Marge Nette (%)</label>
                <input type="number" id="marge" step="0.1" value="5" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="input-group">
                <label style="font-weight: bold;">Croissance Clients (%)</label>
                <input type="number" id="croissance" step="0.1" value="15" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="input-group">
                <label style="font-weight: bold;">Trésorerie (M€)</label>
                <input type="number" id="treso" step="0.1" value="2" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            
            <button type="submit" id="analyzeBtn" style="background: #3498db; color: white; border: none; padding: 15px; font-size: 16px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px;">
                ✨ Lancer l'Analyse
            </button>
        </form>

        <p id="statusMsg" style="text-align: center; color: #7f8c8d; margin-top: 10px; font-size: 14px;"></p>
      </div>
    `;
}

// Fonction logique
export function handleAnalysis() {
    const form = document.getElementById('kpiForm');
    const btn = document.getElementById('analyzeBtn');
    const status = document.getElementById('statusMsg');

    // Vérification de sécurité : est-ce que l'URL a été changée ?
    if (API_URL.includes("XXXXXXXX")) {
        alert("⚠️ ATTENTION !\nTu as oublié de mettre ton lien Render dans le code SettingsIA.js !\nL'analyse ne pourra pas marcher.");
        return;
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche le rechargement de page classique
            
            // 1. Feedback Visuel Immédiat
            btn.innerHTML = "⏳ Connexion au Cerveau IA...";
            btn.style.background = "#95a5a6";
            btn.disabled = true;
            status.innerHTML = "Envoi des données vers le serveur...";

            // 2. Préparation des données
            const data = {
                chiffre_affaires: parseFloat(document.getElementById('ca').value),
                marge_nette: parseFloat(document.getElementById('marge').value),
                croissance_client: parseFloat(document.getElementById('croissance').value),
                tresorerie_disponible: parseFloat(document.getElementById('treso').value),
                facteur_risque_externe: "Normal",
                culture_prioritaire: "Equilibre"
            };

            try {
                // 3. Appel API (Le moment de vérité)
                console.log("Envoi vers :", `${API_URL}/analyze`);
                
                const response = await fetch(`${API_URL}/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`Erreur Serveur: ${response.status}`);
                }

                const result = await response.json();
                console.log("Résultat reçu :", result);

                // 4. Sauvegarde (Crucial !)
                localStorage.setItem('sapio_last_analysis', JSON.stringify(result));

                // 5. Succès ! On prévient l'utilisateur avant de bouger
                status.innerHTML = "✅ Analyse réussie ! Redirection...";
                status.style.color = "green";
                
                // Petit délai pour voir le message vert
                setTimeout(() => {
                    window.location.hash = "#dashboard";
                }, 1000);

            } catch (error) {
                console.error(error);
                // 6. Gestion d'erreur visible sur mobile
                btn.innerHTML = "❌ Réessayer";
                btn.style.background = "#e74c3c";
                btn.disabled = false;
                status.innerHTML = `Erreur : ${error.message}.<br>Le serveur Render dort peut-être encore (attendre 1min).`;
                alert(`ECHEC DE L'ANALYSE :\n${error.message}\n\nVérifie ta connexion internet et que le serveur Render est actif.`);
            }
        });
    }
                    }

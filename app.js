// --- CODE DE DIAGNOSTIC (Load modules one by one) ---
const app = document.getElementById('app');

// Fonction qui essaie de charger un fichier sans faire planter le site
async function chargerComposant(chemin) {
    try {
        const module = await import(chemin);
        return module.default;
    } catch (erreur) {
        console.error("Echec :", chemin, erreur);
        // Si ça plante, on retourne une fonction qui affiche l'erreur en rouge
        return () => `
            <div style="background:#ffcccc; color:#cc0000; padding:10px; border:1px solid red; margin:10px;">
                <strong>⚠️ Erreur de chargement :</strong> ${chemin}<br>
                <small>${erreur.message}</small>
            </div>`;
    }
}

async function router() {
    // 1. Message d'attente (pour prouver que le JS démarre)
    app.innerHTML = "<h2 style='text-align:center; margin-top:50px;'>⏳ Chargement de SAPIO-App...</h2>";

    // 2. Chargement sécurisé des briques
    // Si Header.js n'existe pas, ça affichera un carré rouge au lieu d'une page blanche
    const Header = await chargerComposant('./components/Header.js');
    const Footer = await chargerComposant('./components/Footer.js');
    const Sidebar = await chargerComposant('./components/Sidebar.js');

    // 3. Gestion de la page centrale
    const hash = window.location.hash || '#settings';
    let contentHTML = "";
    
    if (hash === '#settings') {
        try {
            // On charge SettingsIA
            const moduleSettings = await import('./components/SettingsIA.js');
            contentHTML = moduleSettings.default(); // Affiche le HTML
            
            // Une fois affiché, on active le bouton (si la fonction existe)
            setTimeout(() => {
                if (moduleSettings.handleAnalysis) {
                    moduleSettings.handleAnalysis();
                }
            }, 500);
        } catch (e) {
            contentHTML = `<div style="color:red; padding:20px;">Erreur SettingsIA : ${e.message}</div>`;
        }
    } 
    else if (hash === '#dashboard') {
        const Dashboard = await chargerComposant('./components/Dashboard.js');
        contentHTML = Dashboard();
    }

    // 4. Affichage Final
    app.innerHTML = `
        <div style="font-family: sans-serif; display: flex; flex-direction: column; min-height: 100vh;">
            ${Header()}
            
            <div style="display: flex; flex: 1;">
                <aside style="background: #f4f4f4; min-width: 200px; padding: 10px;">
                    ${Sidebar()}
                </aside>
                <main style="flex: 1; padding: 20px;">
                    ${contentHTML}
                </main>
            </div>

            ${Footer()}
        </div>
    `;
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

const app = document.getElementById('app');

// Fonction blindée pour charger un composant
async function chargerComposant(chemin) {
    try {
        const module = await import(chemin);
        
        // VÉRIFICATION DE SÉCURITÉ : Est-ce que le fichier contient bien du code valide ?
        if (!module.default || typeof module.default !== 'function') {
            throw new Error(`Le fichier est vide ou mal formaté (pas d'export default).`);
        }
        
        return module.default; // Si tout va bien, on retourne le composant
    } catch (erreur) {
        console.error("Echec :", chemin, erreur);
        // Au lieu de faire planter tout le site, on retourne une "boîte d'erreur"
        return () => `
            <div style="background:#ffebee; color:#c62828; padding:15px; border:2px solid #ef5350; margin:10px; border-radius:4px;">
                <strong>⚠️ Problème avec : ${chemin}</strong><br>
                <small>${erreur.message}</small>
            </div>`;
    }
}

async function router() {
    // 1. On affiche le message de chargement
    app.innerHTML = "<h2 style='text-align:center; margin-top:50px; font-family:sans-serif;'>⏳ Chargement de SAPIO-App...</h2>";

    // 2. On charge les morceaux un par un
    // Si l'un d'eux plante, ça affichera une case rouge au lieu de bloquer
    const Header = await chargerComposant('./components/Header.js');
    const Sidebar = await chargerComposant('./components/Sidebar.js');
    const Footer = await chargerComposant('./components/Footer.js');

    // 3. On charge la page centrale
    const hash = window.location.hash || '#settings';
    let contentHTML = "";
    
    if (hash === '#settings') {
        const SettingsIA = await chargerComposant('./components/SettingsIA.js');
        contentHTML = SettingsIA(); // On génère le HTML
        
        // On active le bouton après un court instant
        setTimeout(async () => {
            try {
                 const module = await import('./components/SettingsIA.js');
                 if(module.handleAnalysis) module.handleAnalysis();
            } catch(e) { console.log("Pas de script d'analyse"); }
        }, 500);
    } 
    else if (hash === '#dashboard') {
        const Dashboard = await chargerComposant('./components/Dashboard.js');
        contentHTML = Dashboard();
    }

    // 4. On assemble le tout (Si Header est cassé, la case rouge s'affichera ici)
    app.innerHTML = `
        <div style="font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; min-height: 100vh;">
            ${Header()}
            
            <div style="display: flex; flex: 1;">
                <aside style="background: #f8f9fa; min-width: 200px; padding: 10px; border-right:1px solid #ddd;">
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

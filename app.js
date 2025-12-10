const app = document.getElementById('app');

// Fonction d'importation sécurisée
async function load(path, name) {
    // On affiche à l'écran ce qu'on essaie de charger
    const loadingMsg = document.getElementById('loading-text');
    if(loadingMsg) loadingMsg.innerText = `Chargement de ${name}...`;
    
    try {
        const module = await import(path);
        return module.default;
    } catch (e) {
        console.error(e);
        // Si ça plante, on retourne une fonction qui affiche l'erreur en rouge
        return () => `<div style="background:red; color:white; padding:5px;">⚠️ Erreur ${name}</div>`;
    }
}

async function router() {
    // 1. Initialisation de l'écran de chargement
    app.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
            <div style="font-size:40px;">🚀</div>
            <h2 id="loading-text">Démarrage...</h2>
        </div>
    `;

    // 2. Chargement Séquentiel (Un par un pour voir où ça coince)
    const Header = await load('./components/Header.js', 'Header');
    const Sidebar = await load('./components/Sidebar.js', 'Sidebar');
    const Footer = await load('./components/Footer.js', 'Footer');
    
    // 3. Préparation du contenu central
    const hash = window.location.hash || '#settings';
    let contentHTML = "";

    if (hash === '#settings') {
        const SettingsIA = await load('./components/SettingsIA.js', 'SettingsIA');
        contentHTML = SettingsIA();
        // Activation du bouton
        setTimeout(async () => {
            try {
                const mod = await import('./components/SettingsIA.js');
                if(mod.handleAnalysis) mod.handleAnalysis();
            } catch(e){}
        }, 500);
    } 
    else if (hash === '#dashboard') {
        const Dashboard = await load('./components/Dashboard.js', 'Dashboard');
        contentHTML = Dashboard();
    }

    // 4. Affichage Final (Si on arrive ici, c'est gagné)
    app.innerHTML = `
        <div style="font-family: sans-serif; display: flex; flex-direction: column; min-height: 100vh; background: #f0f2f5;">
            ${Header()}
            
            <div style="padding: 15px; display: flex; flex-direction: column; gap: 15px; flex: 1;">
                ${Sidebar()}

                <main style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    ${contentHTML}
                </main>
            </div>

            ${Footer()}
        </div>
    `;
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

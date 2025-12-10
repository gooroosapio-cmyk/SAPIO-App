const app = document.getElementById('app');

// Fonction de chargement ultra-sécurisée
async function safeImport(path) {
    try {
        const module = await import(path);
        return module.default;
    } catch (e) {
        console.error("Erreur chargement " + path, e);
        // En cas d'erreur, on renvoie une fonction vide (un fantôme) pour ne pas faire planter le site
        return () => `<div style="color:red; font-size:10px;">[Erreur: ${path}]</div>`;
    }
}

async function router() {
    // 1. Chargement des composants (On lance tout en parallèle)
    // Note: On utilise ./components/ avec "c" minuscule comme dans ta capture d'écran
    const [Header, Sidebar, Footer, SettingsIA, Dashboard] = await Promise.all([
        safeImport('./components/Header.js'),
        safeImport('./components/Sidebar.js'),
        safeImport('./components/Footer.js'),
        safeImport('./components/SettingsIA.js'),
        safeImport('./components/Dashboard.js')
    ]);

    // 2. Quel contenu afficher au centre ?
    const hash = window.location.hash || '#settings';
    let contentHTML = "";
    
    // Rendu conditionnel
    if (hash === '#settings') {
        contentHTML = SettingsIA();
        // Activation du bouton après affichage
        setTimeout(async () => {
             try { 
                 const mod = await import('./components/SettingsIA.js');
                 if(mod.handleAnalysis) mod.handleAnalysis();
             } catch(e) {}
        }, 300);
    } 
    else if (hash === '#dashboard') {
        contentHTML = Dashboard();
    }

    // 3. Assemblage Final (Layout Mobile-First)
    app.innerHTML = `
        <div style="font-family: sans-serif; display: flex; flex-direction: column; min-height: 100vh; background: #f4f6f7;">
            ${Header()}
            
            <div style="flex: 1; padding: 10px; display: flex; flex-direction: column; gap: 20px;">
                <div style="background: #eef2f3; padding: 10px; border-radius: 8px;">
                    ${Sidebar()}
                </div>

                <main style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    ${contentHTML}
                </main>
            </div>

            ${Footer()}
        </div>
    `;
}

// Lancement
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

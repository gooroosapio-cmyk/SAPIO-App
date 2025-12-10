// --- 0. SÉCURITÉ ANTI-PAGE BLANCHE (AIDE AU DEBUG SUR MOBILE) ---
window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += `
        <div style="color: red; background: white; padding: 20px; border: 2px solid red; margin: 20px;">
            <h3>⚠️ Une erreur est survenue !</h3>
            <p><strong>Erreur :</strong> ${message}</p>
            <p><strong>Fichier :</strong> ${source}</p>
            <p><strong>Ligne :</strong> ${lineno}</p>
        </div>
    `;
};

// --- 1. IMPORTATIONS ---
// On importe les composants (Attention aux majuscules, c'est strict !)
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Sidebar from './components/Sidebar.js';
import SettingsIA, { handleAnalysis } from './components/SettingsIA.js';
import Dashboard from './components/Dashboard.js';

// --- 2. CIBLAGE DE L'ÉLÉMENT PRINCIPAL ---
const app = document.getElementById('app');

// --- 3. FONCTION DE ROUTAGE (NAVIGATION) ---
function router() {
    // Récupère l'URL actuelle (ex: #dashboard), sinon va sur #settings
    const hash = window.location.hash || '#settings';

    // Génération des blocs HTML
    const headerHTML = Header();
    const footerHTML = Footer();
    
    // Essai de chargement de la Sidebar (sécurisé)
    let sidebarHTML = '';
    try {
        sidebarHTML = Sidebar();
    } catch (e) {
        console.warn("Erreur Sidebar:", e);
    }

    // Choix du contenu central
    let mainContent = '';
    
    if (hash === '#settings') {
        mainContent = SettingsIA();
    } 
    else if (hash === '#dashboard') {
        mainContent = Dashboard();
    } 
    else {
        mainContent = `<div style="padding:20px; text-align:center;"><h2>Page introuvable</h2><a href="#settings">Retour à l'accueil</a></div>`;
    }

    // --- 4. ASSEMBLAGE DE LA PAGE (LAYOUT) ---
    // On utilise flexbox pour avoir la sidebar à gauche et le contenu à droite
    app.innerHTML = `
        <div class="app-wrapper" style="display: flex; flex-direction: column; min-height: 100vh;">
            ${headerHTML}
            
            <div class="middle-section" style="display: flex; flex: 1;">
                <aside class="sidebar-container" style="background: #f8f9fa; min-width: 200px; padding: 10px; border-right: 1px solid #ddd;">
                    ${sidebarHTML}
                </aside>

                <main style="flex: 1; padding: 20px; background: white;">
                    ${mainContent}
                </main>
            </div>

            ${footerHTML}
        </div>
    `;

    // --- 5. ACTIVATION DES SCRIPTS SPÉCIFIQUES ---
    // Une fois le HTML dessiné, on active les boutons
    if (hash === '#settings') {
        // Petit délai pour être sûr que le formulaire existe
        setTimeout(() => {
            handleAnalysis(); 
        }, 50);
    }
}

// --- 6. LANCEMENT ---
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
      

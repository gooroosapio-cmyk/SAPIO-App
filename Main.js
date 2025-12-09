// Importation de tous les composants
import { createHeader } from './components/Header.js';
import { createDashboard } from './components/Dashboard.js';
import { createFooter } from './components/Footer.js';
import { createSidebar } from './components/Sidebar.js';
import { createSettingsIA, handleAnalysis } from './components/SettingsIA.js'; // IMPORTATION DE handleAnalysis

const appRoot = document.getElementById('root');

// Fonction qui gère l'affichage en fonction de l'URL
function renderView(viewName) {
    appRoot.innerHTML = ''; 
    
    // 1. Ajouter l'entête et le pied de page (fixes)
    appRoot.appendChild(createHeader("SAPIO-App", "Contrôleur de Gestion par IA"));
    
    const contentContainer = document.createElement('div');
    contentContainer.id = 'main-content-area';
    contentContainer.appendChild(createSidebar());
    
    let viewElement;
    
    if (viewName === 'settings') {
        viewElement = createSettingsIA();
        // Attacher l'écouteur d'événement pour le bouton d'analyse
        setTimeout(() => {
            document.getElementById('run-ia-analysis')?.addEventListener('click', handleAnalysis);
        }, 0);
    } else {
        viewElement = createDashboard();
    }
    
    contentContainer.appendChild(viewElement);
    appRoot.appendChild(contentContainer);
    appRoot.appendChild(createFooter());
    
    // Gérer les interactions après le rendu (simule le routage)
    document.getElementById('go-to-settings')?.addEventListener('click', () => {
        window.location.hash = '#settings';
    });
}

// Gérer le changement de hash dans l'URL (Navigation)
function handleRoute() {
    const hash = window.location.hash.substring(1); 
    renderView(hash || 'dashboard'); 
}

// Lancement de l'application
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', handleRoute);

console.log("Le Front-end de SAPIO-App est prêt pour la simulation.");
        

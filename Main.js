// Importation de tous les composants
import { createHeader } from './components/Header.js';
import { createDashboard } from './components/Dashboard.js';
import { createFooter } from './components/Footer.js'; // Nouveau
import { createSidebar } from './components/Sidebar.js'; // Nouveau

console.log("Le code de l'application SAPIO-App est initialisé. Structure complète de l'interface.");

function initializeApp() {
    const appRoot = document.getElementById('root');
    
    // 1. Entête
    const headerElement = createHeader("SAPIO-App", "Contrôleur de Gestion par IA");
    appRoot.appendChild(headerElement);
    
    // 2. Conteneur principal (pour Sidebar et Dashboard côte à côte)
    const contentContainer = document.createElement('div');
    contentContainer.id = 'main-content-area';
    
    // 2.1 Ajout de la Sidebar
    contentContainer.appendChild(createSidebar());
    
    // 2.2 Ajout du Dashboard
    contentContainer.appendChild(createDashboard());
    
    appRoot.appendChild(contentContainer);
    
    // 3. Pied de page
    appRoot.appendChild(createFooter());
    
    console.log("Les composants de l'interface (Header, Sidebar, Dashboard, Footer) sont montés.");
}

// Lancement de l'application
document.addEventListener('DOMContentLoaded', initializeApp);

// Importation des deux composants
import { createHeader } from './components/Header.js';
import { createDashboard } from './components/Dashboard.js';

console.log("Le code de l'application SAPIO-App est initialisé. Dashboard intégré.");

function initializeApp() {
    const appRoot = document.getElementById('root');
    
    // 1. Création de l'entête
    const headerElement = createHeader("SAPIO-App", "Contrôleur de Gestion par IA");
    appRoot.appendChild(headerElement);
    
    // 2. Création et affichage du Dashboard
    const dashboardElement = createDashboard();
    appRoot.appendChild(dashboardElement);
    
    // Message de confirmation dans la console
    console.log("Les composants Header et Dashboard sont montés.");
}

// Lancement de l'application
document.addEventListener('DOMContentLoaded', initializeApp);

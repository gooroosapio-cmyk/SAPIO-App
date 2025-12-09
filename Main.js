// Importation du nouveau composant
import { createHeader } from './components/Header.js';

console.log("Le code de l'application SAPIO-App est initialisé.");

function initializeApp() {
    const appRoot = document.getElementById('root');
    
    // 1. Création de l'entête
    const headerElement = createHeader("SAPIO-App", "Contrôleur de Gestion par IA");
    appRoot.appendChild(headerElement);
    
    // 2. Conteneur principal
    const main = document.createElement('main');
    main.innerHTML = `
        <h2>Analyse de la situation</h2>
        <p>Début de l'intégration des composants d'interface.</p>
    `;
    appRoot.appendChild(main);
}

// Lancement de l'application
document.addEventListener('DOMContentLoaded', initializeApp);

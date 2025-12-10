// --- IMPORTATIONS (Attention aux majuscules/minuscules !) ---
// On importe les blocs visuels depuis le dossier components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import SettingsIA, { handleAnalysis } from './components/SettingsIA.js';
import Dashboard from './components/Dashboard.js';

// On cible la boîte principale dans index.html
const app = document.getElementById('app');

// --- LE ROUTEUR (Le Cerveau de la navigation) ---
function router() {
    // 1. Quelle page l'utilisateur veut voir ? (ex: #dashboard)
    // Si pas de hash, on va par défaut sur #settings
    const hash = window.location.hash || '#settings';

    // 2. Préparation du contenu (Layout)
    // On efface l'écran précédent
    app.innerHTML = '';

    // On prépare les variables pour le HTML
    const headerHTML = Header(); // Charge le haut de page
    const footerHTML = Footer(); // Charge le bas de page
    let contentHTML = '';        // Le contenu changera selon la page

    // 3. Logique de choix de page
    if (hash === '#settings') {
        // Page de configuration (Formulaire)
        contentHTML = SettingsIA();
    } 
    else if (hash === '#dashboard') {
        // Page de résultats
        contentHTML = Dashboard();
    } 
    else {
        // Page 404
        contentHTML = `<div style="text-align:center; padding:50px;"><h2>⚠️ Page introuvable</h2><a href="#settings">Retour à l'accueil</a></div>`;
    }

    // 4. Assemblage final (Injection dans le HTML)
    app.innerHTML = `
        <div class="app-container">
            ${headerHTML}
            <main class="main-content">
                ${contentHTML}
            </main>
            ${footerHTML}
        </div>
    `;

    // 5. Activation des scripts spécifiques (Après l'affichage)
    // C'est ici qu'on "branche" les boutons une fois qu'ils sont dessinés
    if (hash === '#settings') {
        handleAnalysis(); // Active le bouton "Lancer l'analyse"
    }
}

// --- ÉCOUTEURS D'ÉVÉNEMENTS ---
// Si l'utilisateur change l'URL manuellement ou clique sur Précédent
window.addEventListener('hashchange', router);
// Au premier chargement de la page
window.addEventListener('load', router);

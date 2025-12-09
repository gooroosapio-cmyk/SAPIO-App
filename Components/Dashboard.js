// components/Dashboard.js
// Composant du tableau de bord

function displayResults() {
    const resultJSON = localStorage.getItem('iaResult');
    if (!resultJSON) {
        return `
            <p>Statut : En attente de configuration et d'analyse.</p>
            <p class="message-waiting">Veuillez aller dans les Paramètres IA pour lancer la première analyse.</p>
        `;
    }
    
    const result = JSON.parse(resultJSON);
    
    return `
        <div class="kpi-card accent">
            <h3>Contexte IA Identifié : ${result.contexte}</h3>
            <p>${result.justification}</p>
        </div>
        <div class="chart-container">
            <h3>Recommandation Tactique</h3>
            <p class="recommendation-text"><strong>${result.recommandation}</strong></p>
            <button onclick="localStorage.removeItem('iaResult'); window.location.reload();">Effacer l'analyse</button>
        </div>
    `;
}

export function createDashboard() {
    const dashboard = document.createElement('section');
    dashboard.id = 'dashboard-view';
    dashboard.innerHTML = `
        <div class="kpi-card">
            <h3>Synthèse des Données</h3>
            <p>Les données clés actuelles seront affichées ici après la saisie.</p>
        </div>
        
        ${displayResults()} 
    `;
    return dashboard;
}

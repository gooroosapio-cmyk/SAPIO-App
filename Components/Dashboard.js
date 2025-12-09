// components/Dashboard.js
// Composant du tableau de bord
export function createDashboard() {
    const dashboard = document.createElement('section');
    dashboard.id = 'dashboard-view';
    dashboard.innerHTML = `
        <div class="kpi-card">
            <h3>Performance Actuelle</h3>
            <p><strong>+4.5%</strong> par rapport au mois dernier.</p>
        </div>
        <div class="kpi-card">
            <h3>Recommandation IA</h3>
            <p>Optimiser les dépenses publicitaires sur la semaine 49.</p>
        </div>
        <div class="chart-container">
            <h3>Visualisation des Données</h3>
            <p>Le graphique de l'évolution financière sera implémenté ici.</p>
        </div>
    `;
    return dashboard;
}

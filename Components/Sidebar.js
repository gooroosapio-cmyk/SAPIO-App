// components/Sidebar.js
// Composant Barre Latérale pour la navigation/les filtres
export function createSidebar() {
    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebar-nav';
    sidebar.innerHTML = `
        <h3>Navigation</h3>
        <ul>
            <li><a href="#dashboard">Tableau de Bord</a></li>
            <li><a href="#data-import">Importer Données</a></li>
            <li><a href="#ia-settings">Paramètres IA</a></li>
        </ul>
        <hr>
        <h3>Filtres Rapides</h3>
        <button>Trimestre 1</button>
        <button>Trimestre 2</button>
    `;
    return sidebar;
}

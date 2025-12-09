// components/Header.js
// Composant d'entête/navigation
export function createHeader(title, subtitle) {
    const header = document.createElement('header');
    header.innerHTML = `
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <nav>
            <a href="#dashboard">Dashboard</a> |
            <a href="#reports">Rapports IA</a>
        </nav>
    `;
    return header;
}
  

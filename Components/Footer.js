// components/Footer.js
// Composant Pied de page
export function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>&copy; 2024 SAPIO-App. Tous droits réservés.</p>
        <p><a href="#">Confidentialité</a> | <a href="#">Conditions d'utilisation</a></p>
    `;
    return footer;
}

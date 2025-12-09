// Fichier JavaScript principal pour SAPIO-App
console.log("Le code de l'application SAPIO-App est initialisé.");

// Cette fonction sera lancée au démarrage de la page
function initializeApp() {
    const container = document.getElementById('app-container');
    const message = document.createElement('p');
    message.textContent = "Le moteur d'IA est prêt à être intégré dans la prochaine étape !";
    container.appendChild(message);
}

// Lancer l'application après le chargement de la page
document.addEventListener('DOMContentLoaded', initializeApp);

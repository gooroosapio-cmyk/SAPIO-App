export default function Sidebar() {
    return `
        <nav style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#settings" style="text-decoration: none; color: #2c3e50; padding: 10px; background: white; border-radius: 5px; border: 1px solid #ddd; text-align: center;">
                ⚙️ Config
            </a>
            <a href="#dashboard" style="text-decoration: none; color: #2c3e50; padding: 10px; background: white; border-radius: 5px; border: 1px solid #ddd; text-align: center;">
                📊 Résultats
            </a>
        </nav>
    `;
}

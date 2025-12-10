export default function Sidebar() {
    return `
        <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px;">
            <a href="#settings" style="background: white; padding: 8px 15px; border-radius: 20px; text-decoration: none; color: #333; border: 1px solid #ddd; white-space: nowrap;">⚙️ Config</a>
            <a href="#dashboard" style="background: white; padding: 8px 15px; border-radius: 20px; text-decoration: none; color: #333; border: 1px solid #ddd; white-space: nowrap;">📊 Résultats</a>
        </div>
    `;
}

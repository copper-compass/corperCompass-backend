import { getCurrentUser, logout } from '../auth.js';

export function initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const user = getCurrentUser();
    let navHTML = `
        <a href="/">Home</a>
        <a href="/areas.html">Areas</a>
        <a href="/lodges.html">Lodges</a>
        <a href="/map.html">Map</a>                    <!-- NEW -->
        <a href="/budget.html">Budget</a>
    `;
    if (user) {
        navHTML += `
            <a href="/dashboard.html">Dashboard</a>
            <a href="#" id="logout-link">Logout (${user.name})</a>
        `;
        if (user.role === 'admin') {
            navHTML += `<a href="/admin.html">Admin</a>`;
        }
    } else {
        navHTML += `<a href="/login.html">Login</a> <a href="/register.html">Register</a>`;
    }
    nav.innerHTML = navHTML;
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

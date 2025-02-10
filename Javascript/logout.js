// logout component
document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.onclick = function () {
            localStorage.removeItem('uid');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        };
    }
});
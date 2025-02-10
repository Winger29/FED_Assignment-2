document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const navbarPlaceholder = document.getElementById('navbarPlaceholder');
        if (!navbarPlaceholder) {
            console.error('navbarPlaceholder not found');
            return;
        }

        console.log('Navbar script is running. navbarPlaceholder found.');

        const userId = localStorage.getItem('uid');
        const username = localStorage.getItem('username');

        console.log('User ID:', userId);
        console.log('Username:', username);

        if (userId) {
            navbarPlaceholder.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">
                        <a class="navbar-brand" href="#">MokeSell</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavLoggedIn" aria-controls="navbarNavLoggedIn" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavLoggedIn">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="profile.html">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="mylistings.html">My Listings</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="icons/profile_blk.svg" alt="Profile Icon" style="width: 30px; height: 30px;">
                                        <span class="ms-2">${username || 'User'}</span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                        <li><a class="dropdown-item" href="profile.html">${username || 'Profile'}</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="#" id="logoutLink">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            `;

            // Attach logout event listener
            document.getElementById('logoutLink').onclick = function () {
                localStorage.removeItem('uid');
                localStorage.removeItem('username');
                alert('You have been logged out.');
                window.location.href = 'home.html';
            };
        } else {
            navbarPlaceholder.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a class="navbar-brand" href="#">MokeSell</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="listings.html">Listings</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="search.html">Search</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="chat.html">Chat</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="contact.html">Contact</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="login.html">Login</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            `;
        }
    }, 500); // Small delay to ensure elements are loaded
});

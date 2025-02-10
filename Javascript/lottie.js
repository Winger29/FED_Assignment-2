document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('mainContent');
        
        if (loader && mainContent) {
            setTimeout(() => {
                loader.style.display = 'none';
                mainContent.style.display = 'block';
            }, 2500); 
        }
    });
});
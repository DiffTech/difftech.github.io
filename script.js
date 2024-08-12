// Change nav background on scroll and show logo
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('nav ul li.logo');
    
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});

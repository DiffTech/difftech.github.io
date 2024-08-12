// Change nav background on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});

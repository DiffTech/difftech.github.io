// Function to load external HTML
function loadNavBar() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('body').insertAdjacentHTML('afterbegin', xhr.responseText);
            generateNavLinks(); // Generate the navigation links after loading the nav HTML
        }
    };
    xhr.send();
}

// Function to generate the navigation links and content sections dynamically
// change the order here if you want to reorder 
function generateNavLinks() {
    const sections = [
        { id: 'projects', title: 'Projects', content: 'Details about your projects...' },
        { id: 'engineering', title: 'Engineering', content: 'Details about your engineering...' },
        { id: 'our-story', title: 'Our Story', content: 'Details about your company\'s story...' },
        { id: 'contact-us', title: 'Contact Us', content: 'Contact information...' },
    ];

    const navLinks = document.getElementById('nav-links');

    sections.forEach((section, index) => {
        // Create the navigation link
        const navItem = document.createElement('li');
        if (index === 2) { // Insert the logo before the "Our Story" section
            const logoItem = document.createElement('li');
            logoItem.classList.add('logo');
            logoItem.innerHTML = '<img src="assets/logo.png" alt="Logo">';
            navLinks.appendChild(logoItem);
        }
        navItem.innerHTML = `<a href="${section.id}.html">${section.title}</a>`;
        navLinks.appendChild(navItem);
    });

    // Change nav background on scroll and show logo
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }
    });
}

// Load the navigation bar when the page loads
window.addEventListener('DOMContentLoaded', loadNavBar);

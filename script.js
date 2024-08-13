// Define the company name
const companyName = 'DiffTech';

// Function to load external HTML
function loadNavBar() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('body').insertAdjacentHTML('afterbegin', xhr.responseText);
            generateNavLinks(); // Generate the navigation links after loading the nav HTML
        } else if (xhr.readyState === 4) {
            console.error('Failed to load nav.html', xhr.status, xhr.statusText);
        }
    };
    xhr.send();
}

// Function to generate the navigation links and content sections dynamically
function generateNavLinks() {
    const sections = [
        { id: 'projects', title: 'Projects', content: 'Details about your projects...' },
        { id: 'engineering', title: 'Engineering', content: 'Details about your engineering...' },
        { id: 'our-story', title: 'Our Story', content: 'Details about your company\'s story...' },
        { id: 'contact-us', title: 'Contact Us', content: 'Contact information...' },
    ];

    const navLinks = document.getElementById('nav-links');
    if (!navLinks) {
        console.error('Navigation links container not found');
        return;
    }

    sections.forEach((section, index) => {
        // Insert the logo before the "Our Story" section
        if (index === 2) {
            const logoItem = document.createElement('li');
            logoItem.classList.add('logo');
            logoItem.innerHTML = '<a href="index.html"><img src="assets/logo.png" alt="Logo"></a>';
            navLinks.appendChild(logoItem);
        }

        // Create the navigation link
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="${section.id}.html">${section.title}</a>`;
        navLinks.appendChild(navItem);
    });

    // Change nav background on scroll and show logo
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            } else {
                nav.classList.remove('scrolled');
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }
        }
    });

    // Set the company name dynamically in the hero section and title
    const heroTitle = document.querySelector('#hero h1');
    const pageTitle = document.querySelector('title');
    
    if (heroTitle) {
        heroTitle.textContent = companyName;
    }
    if (pageTitle) {
        pageTitle.textContent = `${section.id} - ${companyName}`;
    }
}

// Load the navigation bar when the page loads
window.addEventListener('DOMContentLoaded', loadNavBar);

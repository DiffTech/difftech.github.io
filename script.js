// Define the sections and their order
const sections = [
    { id: 'projects', title: 'Projects', content: 'Details about your projects...' },
    { id: 'engineering', title: 'Engineering', content: 'Details about your engineering...' },
    { id: 'our-story', title: 'Our Story', content: 'Details about your company\'s story...' },
    { id: 'contact-us', title: 'Contact Us', content: 'Contact information...' },
];

// Get references to the navigation and content containers
const navLinks = document.getElementById('nav-links');
const contentSections = document.getElementById('content-sections');

// Generate the navigation links and content sections dynamically
sections.forEach((section, index) => {
    // Create the navigation link
    const navItem = document.createElement('li');
    if (index === 2) { // Insert the logo before the "Our Story" section
        const logoItem = document.createElement('li');
        logoItem.classList.add('logo');
        logoItem.innerHTML = '<img src="assets/logo.png" alt="Logo">';
        navLinks.appendChild(logoItem);
    }
    navItem.innerHTML = `<a href="#${section.id}">${section.title}</a>`;
    navLinks.appendChild(navItem);

    // Create the content section
    const sectionItem = document.createElement('section');
    sectionItem.id = section.id;
    sectionItem.innerHTML = `<h2>${section.title}</h2><p>${section.content}</p>`;
    contentSections.appendChild(sectionItem);
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

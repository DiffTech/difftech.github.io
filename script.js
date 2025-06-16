document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize projects
    loadProjects();
});

function initializeNavigation() {
    const sections = [
        { id: 'projects', title: 'Projects' },
        { id: 'eng', title: 'Engineering' },
        { id: 'home', title: '', isLogo: true },
        { id: 'os', title: 'Our Story' },
        { id: 'contact-us', title: 'Contact' },
    ];

    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    sections.forEach(section => {
        const navItem = document.createElement('li');
        if (section.isLogo) {
            navItem.classList.add('logo');
            navItem.innerHTML = '<a href="index.html"><img src="assets/logo.png" alt="DiffTech Logo"></a>';
        } else {
            navItem.innerHTML = `<a href="${section.id}.html">${section.title}</a>`;
        }
        navLinks.appendChild(navItem);
    });

    // Handle navigation background on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 1)';
            nav.style.backdropFilter = 'none';
        }

        if (currentScroll > lastScroll) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .feature-item').forEach(element => {
        observer.observe(element);
    });
}

function loadProjects() {
    const projects = [
        {
            title: 'Project Alpha',
            description: 'Innovative solution for modern challenges',
            image: 'assets/project1.jpg'
        },
        {
            title: 'Project Beta',
            description: 'Pushing technological boundaries',
            image: 'assets/project2.jpg'
        },
        {
            title: 'Project Gamma',
            description: 'Next-generation development',
            image: 'assets/project3.jpg'
        }
    ];

    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card', 'fade-up');
        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

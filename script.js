document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize projects
    loadProjects();
    
    // Load Instagram feed
    loadInstagramFeed();

    // Load Instagram feed
    loadInstagramFeed();
});

function initializeNavigation() {
    const sections = [
        { id: 'projects', title: 'Projects', href: 'projects.html' },
        { id: 'eng', title: 'Engineering', href: 'eng.html' },
        { id: 'home', title: '', isLogo: true, href: 'index.html' },
        { id: 'os', title: 'Our Story', href: 'os.html' },
        { id: 'contact-us', title: 'Contact', href: 'contact-us.html' },
    ];

    const navLinks = document.getElementById('nav-links');
    if (!navLinks) {
        console.error('Navigation container not found');
        return;
    }

    // Clear existing navigation links
    navLinks.innerHTML = '';

    sections.forEach(section => {
        const navItem = document.createElement('li');
        if (section.isLogo) {
            navItem.classList.add('logo');
            navItem.innerHTML = `<a href="${section.href}"><img src="assets/logo.png" alt="DiffTech Logo"></a>`;
        } else {
            const link = document.createElement('a');
            link.href = section.href;
            link.textContent = section.title;
            navItem.appendChild(link);
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

// Instagram Feed Integration
async function loadInstagramFeed() {
    const projectsSection = document.querySelector('#latest-projects');
    if (!projectsSection) return;

    // Create Instagram feed container
    const feedContainer = document.createElement('div');
    feedContainer.className = 'instagram-feed';
    projectsSection.insertBefore(feedContainer, projectsSection.querySelector('.projects-container'));

    // Load Instagram feed
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=YOUR_INSTAGRAM_ACCESS_TOKEN`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            const posts = data.data.filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM').slice(0, 6);
            
            // Create slideshow container
            const slideshowContainer = document.createElement('div');
            slideshowContainer.className = 'instagram-slideshow';
            
            posts.forEach((post, index) => {
                const slide = document.createElement('div');
                slide.className = `instagram-slide${index === 0 ? ' active' : ''}`;
                
                const img = document.createElement('img');
                img.src = post.media_url;
                img.alt = post.caption || 'Instagram post';
                
                const link = document.createElement('a');
                link.href = post.permalink;
                link.target = '_blank';
                link.appendChild(img);
                
                slide.appendChild(link);
                slideshowContainer.appendChild(slide);
            });
            
            feedContainer.appendChild(slideshowContainer);
            
            // Create navigation dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slideshow-dots';
            
            posts.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = `dot${index === 0 ? ' active' : ''}`;
                dot.addEventListener('click', () => showSlide(index));
                dotsContainer.appendChild(dot);
            });
            
            feedContainer.appendChild(dotsContainer);
            
            // Start automatic slideshow
            startSlideshow();
        }
    } catch (error) {
        console.error('Error loading Instagram feed:', error);
    }
}

let slideshowInterval;
let currentSlide = 0;

function startSlideshow() {
    slideshowInterval = setInterval(() => {
        const slides = document.querySelectorAll('.instagram-slide');
        if (slides.length === 0) return;
        
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000); // Change slide every 5 seconds
}

function showSlide(index) {
    const slides = document.querySelectorAll('.instagram-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
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

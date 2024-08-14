// Define the company name
const companyName = 'DiffTech';

// Function to load external HTML (if needed)
function loadNavBar() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('body').insertAdjacentHTML('afterbegin', xhr.responseText);
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
        } else if (xhr.readyState === 4) {
            console.error('Failed to load nav.html', xhr.status, xhr.statusText);
        }
    };
    xhr.send();
}

}

// Call the function to load the navigation bar
loadNavBar();

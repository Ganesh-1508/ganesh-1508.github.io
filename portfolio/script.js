// JavaScript Interactivity - Ganesh Ghodke Portfolio

document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("PzFvR9Pb_Nrg0wo4t");
    initTheme();
    initNavigation();
    initScrollReveal();
    initContactForm();
    initResumeDownload();
});

// 1. Dark Mode / Light Mode Theme Controller
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Apply initial theme (default to dark unless explicitly saved as light)
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        //showToast(`Switched to ${newTheme} mode`);
    });
}

// 2. Navigation & Header Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        trackActiveLink();
    });

    // Mobile Toggle Click
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Track active link in viewport
    function trackActiveLink() {
        const scrollPosition = window.scrollY + 120;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// 3. Scroll Reveal Animations (Intersection Observer)
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// 4. Contact Form Simulation (with Premium Toast)
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;

        btnText.textContent = 'Transmitting...';
        submitBtn.disabled = true;

        emailjs.sendForm(
            "service_mxctike",
            "template_b9u8vi5",
            form
        )
        .then(() => {
            showToast("✅ Message sent successfully!");
            form.reset();

            btnText.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);

            showToast("❌ Failed to send message.");

            btnText.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}
// 6. Resume Download Action
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Initiating file download: Ganesh_Ghodke_Resume.pdf');
    });
}

// 7. Toast Notification Utility
function showToast(message) {
    // Check if toast already exists
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.classList.add('toast');
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
    `;
    
    // Trigger slide-up
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const toggleIcon = document.querySelector('.nav-toggle i');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        toggleIcon.classList.toggle('fa-bars');
        toggleIcon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
        }
    });
}); 


// Add to your existing scripts
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // Close expanded image when clicking outside
    document.addEventListener('click', function(e) {
        if(e.target.closest('.gallery-item')) return;
        document.querySelector('.gallery-item.expanded')?.classList.remove('expanded');
    });
});


//chatbot

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-container');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    let isMenuOpen = false;

    // Handle scroll behavior
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        nav.classList.toggle('scrolled', currentScroll > 50);

        // Hide/show nav based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100 && !isMenuOpen) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    }

    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.querySelector('i').className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Update active link
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveLink();
    });

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
            
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });

    // Initialize active state
    updateActiveLink();
});



document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;
    const totalSlides = document.querySelectorAll('.result-slide').length;
    const slidesContainer = document.getElementById('resultsSlides');
    const dotsContainer = document.getElementById('resultDots');

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'result-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }

    // Function to update slide position
    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlideIndex * 25}%)`; // 25% for each slide
        
        // Update dots
        document.querySelectorAll('.result-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    // Function to move slides
    window.moveSlide = function(direction) {
        currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentSlideIndex = index;
        updateSlidePosition();
    }

    // Auto-advance slides
    let autoAdvance = setInterval(() => moveSlide(1), 5000);

    // Pause auto-advance on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    slidesContainer.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => moveSlide(1), 5000);
    });

    // Touch support
    let touchStartX = 0;
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) { // 50px threshold
            moveSlide(difference > 0 ? 1 : -1);
        }
    });

    // Initialize first slide
    updateSlidePosition();
});


// Add this to your existing script
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});
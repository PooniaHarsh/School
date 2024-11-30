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



   // Add this script to handle tab switching
   const tabButtons = document.querySelectorAll('.tab-button');
   const gallerySections = document.querySelectorAll('.gallery-section');

   tabButtons.forEach(button => {
       button.addEventListener('click', () => {
           const targetTab = button.getAttribute('data-tab');

           // Remove active class from all buttons and sections
           tabButtons.forEach(btn => btn.classList.remove('active'));
           gallerySections.forEach(section => section.classList.remove('active'));

           // Add active class to the clicked button and corresponding section
           button.classList.add('active');
           document.querySelector(`.gallery-section.${targetTab}`).classList.add('active');
       });
   });









document.querySelector('.plus-code strong').addEventListener('click', function() {
    const coordinates = this.textContent;
    navigator.clipboard.writeText(coordinates).then(() => {
        // Show feedback that coordinates were copied
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltiptext';
        tooltip.textContent = 'Copied!';
        this.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 2000);
    });
});













 // Add to your existing scripts
 document.addEventListener('DOMContentLoaded', function() {
    // Touch event handling
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            // Handle menu open/close on swipe
            const navMenu = document.querySelector('.nav-menu');
            if (diff > 0 && !navMenu.classList.contains('active')) {
                // Swipe left - open menu
                navMenu.classList.add('active');
            } else if (diff < 0 && navMenu.classList.contains('active')) {
                // Swipe right - close menu
                navMenu.classList.remove('active');
            }
        }
    }

    // Improved scroll handling
    let lastScroll = 0;
    const header = document.querySelector('.nav-container');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
            if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
                // Scrolling down - hide header
                header.classList.add('nav-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('nav-hidden');
            }
            lastScroll = currentScroll;
        }
    });

    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize events
            adjustLayoutForScreen();
        }, 250);
    });

    function adjustLayoutForScreen() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('is-mobile', isMobile);
        
        // Adjust any necessary layout elements
        if (!isMobile) {
            document.querySelector('.nav-menu').classList.remove('active');
        }
    }

    // Initialize layout
    adjustLayoutForScreen();
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


// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const clearChat = document.querySelector('.clear-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const quickOptions = document.querySelectorAll('.quick-option');
    const suggestedMessages = document.querySelectorAll('.suggested-message');

    // Toggle chat box
    chatButton.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        chatButton.querySelector('.notification-badge').style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Clear chat messages
    clearChat.addEventListener('click', () => {
        const confirmClear = confirm('Are you sure you want to clear the chat history?');
        if (confirmClear) {
            while (chatMessages.children.length > 1) { // Keep the welcome message
                chatMessages.removeChild(chatMessages.lastChild);
            }
        }
    });

    // Send message function
    function sendMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle user input
    function handleUserInput(message) {
        sendMessage(message, true);
        showTypingIndicator();
        
        // Simulate bot response
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = getBotResponse(message);
            sendMessage(botResponse, false);
        }, 1000);
    }

    // Show/hide typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'flex';
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'none';
    }

    // Simple bot responses
    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes('admission') || message.includes('apply')) {
            return 'For admissions, please visit our admissions page or contact us at 01596-242241.';
        } else if (message.includes('fee') || message.includes('fees')) {
            return 'Our fee structure varies by grade. Please contact our office for detailed information.';
        } else if (message.includes('timing') || message.includes('hours')) {
            return 'School hours are from 8:00 AM to 2:30 PM, Monday through Saturday.';
        } else if (message.includes('transport') || message.includes('bus')) {
            return 'We provide transport facilities covering major areas around Pilani. Contact us for route details.';
        } else {
            return 'Thank you for your message. Please contact our office for more specific information.';
        }
    }

    // Event listeners
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserInput(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            handleUserInput(chatInput.value.trim());
            chatInput.value = '';
        }
    });

    // Quick options and suggested messages
    quickOptions.forEach(option => {
        option.addEventListener('click', () => {
            handleUserInput(option.dataset.query);
        });
    });

    suggestedMessages.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            handleUserInput(suggestion.dataset.query);
        });
    });
});






     
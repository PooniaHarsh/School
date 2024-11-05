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
    const sendButton = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');

    // Enhanced responses with more natural language and variations
    const responses = {
        greetings: {
            keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                "Hello! How can I assist you today?",
                "Hi there! What can I help you with?",
                "Welcome! How may I help you?"
            ]
        },
        admission: {
            keywords: ['admission', 'enroll', 'join', 'register'],
            responses: [
                "For admissions, you can:\n• Visit our Admissions page\n• Call us at 01596-242241\n• Email at info@adarshschoolpilani.com\n\nWould you like me to provide more details about the admission process?"
            ]
        },
        fees: {
            keywords: ['fee', 'fees', 'cost', 'payment'],
            responses: [
                "Our fee structure varies by grade level. For detailed information:\n• Contact our admission office\n• Call: 01596-242241\n• Visit our campus\n\nWould you like to schedule a meeting with our admission counselor?"
            ]
        },
        contact: {
            keywords: ['contact', 'phone', 'email', 'reach'],
            responses: [
                "You can reach us through:\n• Phone: 01596-242241\n• Mobile: +91 9462001107\n• Email: info@adarshschoolpilani.com\n• Address: Pilani - Chirawa Rd, near Panchayat Samiti"
            ]
        },
        timing: {
            keywords: ['timing', 'hours', 'schedule', 'time'],
            responses: [
                "School Timings:\n• Monday to Saturday\n• 8:00 AM to 2:30 PM\n\nOffice Hours:\n• 8:00 AM to 4:00 PM"
            ]
        },
        facilities: {
            keywords: ['facility', 'facilities', 'infrastructure', 'amenities'],
            responses: [
                "Our facilities include:\n• Modern Classrooms\n• Computer Labs\n• Science Labs\n• Library\n• Sports Ground\n• Transport\n\nWould you like specific information about any facility?"
            ]
        },
        default: [
            "I'm here to help! Could you please be more specific about what you'd like to know?",
            "I'd be happy to assist you. Could you please rephrase your question?",
            "Let me help you. What specific information are you looking for?"
        ]
    };

    // Show typing indicator
    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typing;
    }

    // Get random response from array
    function getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Find matching response category
    function findMatchingResponse(message) {
        const lowercaseMsg = message.toLowerCase();
        
        for (const category in responses) {
            if (category === 'default') continue;
            
            const keywords = responses[category].keywords;
            if (keywords && keywords.some(keyword => lowercaseMsg.includes(keyword))) {
                return getRandomResponse(responses[category].responses);
            }
        }
        
        return getRandomResponse(responses.default);
    }

    // Send message function
    function sendMessage(message) {
        if (message.trim() === '') return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message sent';
        userMessage.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(userMessage);

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Get and add bot response with delay
        setTimeout(() => {
            typingIndicator.remove();
            const botMessage = document.createElement('div');
            botMessage.className = 'message received';
            botMessage.innerHTML = `<div class="message-content">${findMatchingResponse(message)}</div>`;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);

        // Clear input
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event Listeners
    chatButton.addEventListener('click', () => {
        chatBox.classList.add('active');
        chatButton.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
        chatButton.style.display = 'flex';
    });

    sendButton.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });

    // Add quick reply buttons
    const quickReplies = [
        'Admission Process',
        'Fee Structure',
        'School Timings',
        'Contact Info',
        'Facilities'
    ];

    const quickRepliesContainer = document.createElement('div');
    quickRepliesContainer.className = 'quick-replies';
    quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'quick-reply';
        button.textContent = reply;
        button.addEventListener('click', () => sendMessage(reply));
        quickRepliesContainer.appendChild(button);
    });
    chatBox.insertBefore(quickRepliesContainer, chatBox.querySelector('.chat-input-container'));
});
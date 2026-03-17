// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeProjectFilters();
    initializeProjectModal();
    initializeForms();
    initializeAnimations();
    initializeFeedback();
    initializeToasts();
    initializePasswordToggles();
    
    // Smooth scrolling for anchor links
    initializeSmoothScroll();
});

// Navigation Functions
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// Project Filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                        item.classList.remove('fade-out');
                    }, 100);
                } else {
                    item.classList.add('fade-out');
                    item.classList.remove('fade-in');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Modal
function initializeProjectModal() {
    const projectModal = document.getElementById('projectModal');
    if (!projectModal) return;
    
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-bs-target') && e.target.getAttribute('data-bs-target') === '#projectModal') {
            const title = e.target.getAttribute('data-title');
            const image = e.target.getAttribute('data-image');
            const description = e.target.getAttribute('data-description');
            
            modalTitle.textContent = title;
            modalImage.src = image;
            modalImage.alt = title;
            modalDescription.textContent = description;
        }
    });
}

// Form Handling
function initializeForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Newsletter Forms
    const newsletterForms = document.querySelectorAll('[id$="NewsletterForm"], #newsletterForm');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Forgot Password
    const sendResetButton = document.getElementById('sendResetLink');
    if (sendResetButton) {
        sendResetButton.addEventListener('click', handleForgotPassword);
    }
}

// Form Submit Handlers
function handleContactSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        e.target.classList.remove('was-validated');
    }, 2000);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    if (!email) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="loading"></span>';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showToast('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="loading"></span> Signing In...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        const toast = new bootstrap.Toast(document.getElementById('loginToast'));
        toast.show();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    // Check password match
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').classList.add('is-invalid');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="loading"></span> Creating Account...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        const toast = new bootstrap.Toast(document.getElementById('registerToast'));
        toast.show();
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }, 2000);
}

function handleForgotPassword(e) {
    const email = document.getElementById('resetEmail').value;
    if (!email) {
        showToast('Please enter your email address.', 'error');
        return;
    }
    
    const originalText = e.target.innerHTML;
    e.target.innerHTML = '<span class="loading"></span> Sending...';
    e.target.disabled = true;
    
    setTimeout(() => {
        showToast('Password reset link sent to your email!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal')).hide();
        e.target.innerHTML = originalText;
        e.target.disabled = false;
    }, 2000);
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                isValid = false;
            }
            
            // Password validation
            if (field.type === 'password' && field.value.length < 8) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                isValid = false;
            }
        }
    });
    
    form.classList.add('was-validated');
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Counter animation
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Feedback System
function initializeFeedback() {
    const feedbackStars = document.querySelectorAll('.rating-star');
    const submitFeedbackBtn = document.getElementById('submitFeedback');
    let selectedRating = 0;
    
    feedbackStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarRating(selectedRating);
        });
        
        star.addEventListener('mouseover', () => {
            updateStarRating(index + 1, true);
        });
    });
    
    document.querySelector('.rating-stars').addEventListener('mouseleave', () => {
        updateStarRating(selectedRating);
    });
    
    if (submitFeedbackBtn) {
        submitFeedbackBtn.addEventListener('click', () => {
            const message = document.getElementById('feedbackMessage').value;
            
            if (selectedRating === 0) {
                showToast('Please select a rating.', 'error');
                return;
            }
            
            // Simulate feedback submission
            submitFeedbackBtn.innerHTML = '<span class="loading"></span> Submitting...';
            submitFeedbackBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Thank you for your feedback!', 'success');
                bootstrap.Modal.getInstance(document.getElementById('feedbackModal')).hide();
                document.getElementById('feedbackForm').reset();
                selectedRating = 0;
                updateStarRating(0);
                submitFeedbackBtn.innerHTML = 'Submit Feedback';
                submitFeedbackBtn.disabled = false;
            }, 1500);
        });
    }
}

function updateStarRating(rating, isHover = false) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Toast Notifications
function initializeToasts() {
    // Auto-show toasts if they exist
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        // Configure toast options
        toast.setAttribute('data-bs-delay', '5000');
    });
}

function showToast(message, type = 'info') {
    // Create toast element
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const iconClass = type === 'success' ? 'fa-check-circle text-success' : 
                     type === 'error' ? 'fa-exclamation-circle text-danger' : 
                     'fa-info-circle text-primary';
    
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas ${iconClass} me-2"></i>
                <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Password Toggle
function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('#togglePassword, #toggleRegisterPassword, #toggleConfirmPassword');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('toggle', '').toLowerCase();
            const passwordField = targetId === 'password' ? 
                document.getElementById('loginPassword') :
                targetId === 'registerpassword' ?
                document.getElementById('registerPassword') :
                document.getElementById('confirmPassword');
            
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
}

// Smooth Scroll
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search Functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchHandler = debounce((query) => {
        // Implement search logic here
        console.log('Searching for:', query);
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        searchHandler(e.target.value);
    });
}

// Window resize handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive behavior
    if (window.innerWidth > 991) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
}, 250));

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.log('Page was reloaded');
    }
});

// Export functions for external use if needed
window.BuildCorpApp = {
    showToast,
    validateForm,
    isValidEmail
};
// Language Management
let currentLanguage = 'es';

// Gallery Data
const galleryData = {
    route1: [
        { src: 'assets/gallery/laguna1.jpg', alt: 'Laguna Azul Vista 1' },
        { src: 'assets/gallery/laguna2.jpg', alt: 'Laguna Azul Vista 2' },
        { src: 'assets/gallery/laguna3.jpg', alt: 'Laguna Azul Vista 3' },
        { src: 'assets/gallery/laguna4.jpg', alt: 'Laguna Azul Vista 4' },
        { src: 'assets/gallery/laguna5.jpg', alt: 'Laguna Azul Vista 5' }
    ],
    route2: [
        { src: 'assets/gallery/condor1.jpg', alt: 'Sendero del Cóndor Vista 1' },
        { src: 'assets/gallery/condor2.jpg', alt: 'Sendero del Cóndor Vista 2' },
        { src: 'assets/gallery/condor3.jpg', alt: 'Sendero del Cóndor Vista 3' },
        { src: 'assets/gallery/condor4.jpg', alt: 'Sendero del Cóndor Vista 4' },
        { src: 'assets/gallery/condor5.jpg', alt: 'Sendero del Cóndor Vista 5' }
    ],
    route3: [
        { src: 'assets/gallery/valle1.jpg', alt: 'Valle Escondido Vista 1' },
        { src: 'assets/gallery/valle2.jpg', alt: 'Valle Escondido Vista 2' },
        { src: 'assets/gallery/valle3.jpg', alt: 'Valle Escondido Vista 3' },
        { src: 'assets/gallery/valle4.jpg', alt: 'Valle Escondido Vista 4' },
        { src: 'assets/gallery/valle5.jpg', alt: 'Valle Escondido Vista 5' }
    ]
};

let currentGallery = [];
let currentImageIndex = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupScrollEffects();
    setupLanguageToggle();
    setupMobileMenu();
    setupFormValidation();
    updateLanguage();
}

// Event Listeners Setup
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('#historia');
            if (nextSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = nextSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const contactModal = document.getElementById('contactModal');
        const galleryModal = document.getElementById('galleryModal');
        
        if (event.target === contactModal) {
            closeContactModal();
        }
        if (event.target === galleryModal) {
            closeGallery();
        }
    });

    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(event) {
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                prevImage();
            } else if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'Escape') {
                closeGallery();
            }
        }
        
        const contactModal = document.getElementById('contactModal');
        if (contactModal.style.display === 'block' && event.key === 'Escape') {
            closeContactModal();
        }
    });
}

// Scroll Effects
function setupScrollEffects() {
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(47, 69, 56, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(47, 69, 56, 0.8)';
            header.style.backdropFilter = 'blur(15px)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.route-card, .story-content, .location-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Language Toggle
function setupLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateLanguage();
    
    // Update toggle button text
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');
    langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-es][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder-es][data-placeholder-en]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
}

// Mobile Menu
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Contact Modal Functions
function openContactModal(routeName = '') {
    const modal = document.getElementById('contactModal');
    const routeSelect = document.getElementById('route');
    
    if (routeName) {
        // Set the route based on the button clicked
        const routeMap = {
            'Miradores del Lago General Carrera': 'miradores-lago',
            'General Carrera Lake Viewpoints': 'miradores-lago',
            'Aventura al Ventisquero Tronador': 'ventisquero-tronador',
            'Tronador Glacier Adventure': 'ventisquero-tronador',
            'Senderos de Arrieros': 'senderos-arrieros',
            'Drover Trails': 'senderos-arrieros'
        };
        
        const routeValue = routeMap[routeName] || '';
        if (routeValue && routeSelect) {
            routeSelect.value = routeValue;
        }
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Gallery Functions
function openGallery(routeId) {
    const modal = document.getElementById('galleryModal');
    const images = galleryData[routeId] || [];
    
    if (images.length === 0) {
        console.warn('No images found for route:', routeId);
        return;
    }
    
    currentGallery = images;
    currentImageIndex = 0;
    
    loadGalleryImages();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentGallery = [];
    currentImageIndex = 0;
}

function loadGalleryImages() {
    const mainImage = document.getElementById('galleryMainImage');
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    
    if (!currentGallery.length) return;
    
    // Load main image
    mainImage.src = currentGallery[currentImageIndex].src;
    mainImage.alt = currentGallery[currentImageIndex].alt;
    
    // Load thumbnails
    thumbnailsContainer.innerHTML = '';
    currentGallery.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.alt;
        thumbnail.className = 'gallery-thumbnail';
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            loadGalleryImages();
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function nextImage() {
    if (currentGallery.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    loadGalleryImages();
}

function prevImage() {
    if (currentGallery.length === 0) return;
    currentImageIndex = currentImageIndex === 0 ? currentGallery.length - 1 : currentImageIndex - 1;
    loadGalleryImages();
}

// Form Validation and Submission
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate based on field type
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        isValid = phoneRegex.test(value);
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

function clearFieldError(event) {
    event.target.classList.remove('error');
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate all fields
    let isFormValid = true;
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification(
            currentLanguage === 'es' 
                ? 'Por favor, completa todos los campos requeridos correctamente.' 
                : 'Please fill in all required fields correctly.',
            'error'
        );
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = currentLanguage === 'es' ? 'Enviando...' : 'Sending...';
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Close modal
        closeContactModal();
        
        // Show success message
        showNotification(
            currentLanguage === 'es' 
                ? '¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.' 
                : 'Thank you! Your request has been sent. We will contact you soon.',
            'success'
        );
        
        // In a real application, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => {
        //     // Handle response
        // });
        
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '3000',
        maxWidth: '400px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Map Initialization (Placeholder)
function initMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Mapa incrustado de Google Maps con coordenadas exactas
        mapContainer.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-72.477512!3d-46.734703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ0JzA0LjkiUyA3MsKwMjgnMzkuMCJX!5e1!3m2!1ses!2scl!4v1635000000000!5m2!1ses!2scl&q=-46.734703,-72.477512"
                width="100%" 
                height="100%" 
                style="border:0; border-radius: 15px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Vista satelital de Cabalgatas El Palenque en Mallín Grande">
            </iframe>
        `;
        
        // Example of how you would integrate Google Maps:
        /*
        const map = new google.maps.Map(mapContainer, {
            center: { lat: -46.734703, lng: -72.477512 }, // Coordenadas exactas de Mallín Grande
            zoom: 12,
            styles: [
                // Custom map styling for rustic theme
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#2F4538"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#1565C0"}]
                }
            ]
        });
        
        const marker = new google.maps.Marker({
            position: { lat: -46.734703, lng: -72.477512 },
            map: map,
            title: 'Cabalgatas El Palenque - Mallín Grande'
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3>Cabalgatas El Palenque</h3>
                    <p>Predio Leon S/N, Mallín Grande</p>
                    <p>Chile Chico, Región de Aysén</p>
                    <p><strong>Tel:</strong> +56 9 92936382</p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        */
    }
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        // Adjust video aspect ratio if needed
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
`;
document.head.appendChild(notificationStyles);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.nextImage = nextImage;
window.prevImage = prevImage;

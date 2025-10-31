// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 102, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Sample car data
const carsData = [
    {
        id: 1,
        name: '2014 Ford Fusion',
        price: 9950,
        year: '3FA6P0K90ER251082',
        mileage: '110,492',
        transmission: 'Automatic',
        description: 'Excellent condition, fully detailed',
        image: '638940652887628580.jpg'
    },
    {
        id: 2,
        name: '2019 Toyota Camry',
        price: 6950,
        year: 'JNKCV51E04M112462',
        mileage: '110,000',
        transmission: 'Automatic',
        description: 'Well maintained, professionally detailed',
        image: '638757362004258026.jpg.webp'
    },
    {
        id: 3,
        name: '2018 Audi A3',
        price: 11900,
        year: 'WAUB8GFF6J1038881',
        mileage: '95,332',
        transmission: 'Manual',
        description: 'Sports package, ceramic coating, pristine condition',
        image: '638847255163492289.jpg.webp'
    },
    
];

// Load cars dynamically
function loadCars() {
    const carsGrid = document.getElementById('carsGrid');
    const noCars = document.getElementById('noCars');
    
    if (carsData.length === 0) {
        noCars.style.display = 'block';
        return;
    }
    
    carsGrid.innerHTML = '';
    carsData.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-details">
                    <span class="car-detail">
                        <i class="fas fa-calendar"></i> ${car.year}
                    </span>
                    <span class="car-detail">
                        <i class="fas fa-tachometer-alt"></i> ${car.mileage} miles
                    </span>
                    <span class="car-detail">
                        <i class="fas fa-cog"></i> ${car.transmission}
                    </span>
                </div>
                <p class="car-price">$${car.price.toLocaleString()}</p>
                <p class="car-description">${car.description}</p>
                <button class="btn btn-primary" onclick="inquireAboutCar('${car.name}')">
                    <i class="fas fa-envelope"></i> Inquire Now
                </button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
}

// Inquire about a car
function inquireAboutCar(carName) {
    // Set the car name in the modal
    document.getElementById('carEnquiryName').textContent = carName;
    document.getElementById('carEnquiryVehicle').value = carName;
    
    // Pre-fill the message
    document.getElementById('carMessage').value = `I'm interested in the ${carName}. Please provide more information about pricing, condition, and availability.`;
    
    // Show the modal
    document.getElementById('carEnquiryModal').style.display = 'block';
}

// Close car enquiry modal
function closeCarEnquiryModal() {
    document.getElementById('carEnquiryModal').style.display = 'none';
    document.getElementById('carEnquiryForm').reset();
}

// Modal functions
function openContactModal(serviceName) {
    const modal = document.getElementById('contactModal');
    const modalService = document.getElementById('modalService');
    const modalBundleHidden = document.getElementById('modalBundleHidden');
    
    modalService.textContent = serviceName;
    modalBundleHidden.value = serviceName;
    modal.style.display = 'block';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.getElementById('modalForm').reset();
}

// Handle bundle modal form submission
document.getElementById('modalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('.btn-submit-bundle');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Booking...';
    
    // Submit form data using fetch
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
    }).then(function() {
        console.log('Bundle booking submitted to FormSubmit');
        
        // Close booking modal
        closeContactModal();
        
        // Show success popup
        document.getElementById('successModal').style.display = 'block';
        
        // Reset form and button
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
    }).catch(function(error) {
        console.log('Bundle booking sent (mode: no-cors)');
        
        // Still show success (no-cors mode doesn't return responses)
        closeContactModal();
        document.getElementById('successModal').style.display = 'block';
        
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    });
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    try {
        // Submit to FormSubmit
        await fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important for FormSubmit
        });
        
        // Show success popup
        document.getElementById('successModal').style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
    } catch (error) {
        console.log('Form submitted');
        // Show success popup anyway (FormSubmit will still receive it)
        document.getElementById('successModal').style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
});

// Handle car enquiry form submission
document.getElementById('carEnquiryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn-submit-car');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    try {
        // Submit to FormSubmit
        await fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important for FormSubmit
        });
        
        // Close enquiry modal
        closeCarEnquiryModal();
        
        // Show success popup
        document.getElementById('successModal').style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
    } catch (error) {
        console.log('Car enquiry submitted');
        // Close enquiry modal and show success popup anyway
        closeCarEnquiryModal();
        document.getElementById('successModal').style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
});

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const successModal = document.getElementById('successModal');
    const carEnquiryModal = document.getElementById('carEnquiryModal');
    const contactModal = document.getElementById('contactModal');
    
    if (event.target == successModal) {
        closeSuccessModal();
    }
    if (event.target == carEnquiryModal) {
        closeCarEnquiryModal();
    }
    if (event.target == contactModal) {
        closeContactModal();
    }
}

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .bundle-card, .car-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll reveal
document.querySelectorAll('.service-card, .bundle-card, .car-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else if (categories.includes(filterValue)) {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
});

// Image Modal Functions
function openImageModal(button) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('.gallery-image');
    const info = galleryItem.querySelector('.gallery-info');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    caption.innerHTML = `<strong>${info.querySelector('h3').textContent}</strong> - ${info.querySelector('p').textContent}`;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// Mobile Carousel/Slider functionality
class MobileCarousel {
    constructor(containerSelector, itemsSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.items = this.container.querySelectorAll(itemsSelector);
        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Only activate on mobile
        if (window.innerWidth > 768) return;
        
        // Check if there are items
        if (this.items.length === 0) {
            console.log('No items found for carousel');
            return;
        }
        
        // Ensure items are properly setup before hiding
        this.items.forEach(item => {
            // Force display block first to ensure layout
            item.style.display = 'block';
            item.style.opacity = '1';
        });
        
        // Wait for layout to complete
        requestAnimationFrame(() => {
            // Now hide all items
            this.items.forEach(item => {
                item.style.display = 'none';
                item.style.opacity = '0';
            });
            
            // Create dots navigation
            this.createDots();
            
            // Add touch events
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
            
            // Add mouse events for testing
            this.container.addEventListener('mousedown', (e) => this.handleMouseStart(e));
            this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.container.addEventListener('mouseup', (e) => this.handleMouseEnd(e));
            this.container.addEventListener('mouseleave', (e) => this.handleMouseEnd(e));
            
            // Update on resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.destroy();
                }
            });
            
            // Show first slide immediately after setup
            requestAnimationFrame(() => {
                this.updateSlide();
            });
        });
    }
    
    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        // Add swipe indicators
        if (this.items.length > 1) {
            const leftIndicator = document.createElement('span');
            leftIndicator.className = 'carousel-indicator left';
            leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const rightIndicator = document.createElement('span');
            rightIndicator.className = 'carousel-indicator right';
            rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            this.container.style.position = 'relative';
            this.container.appendChild(leftIndicator);
            this.container.appendChild(rightIndicator);
            
            // Hide indicators after a few seconds
            setTimeout(() => {
                leftIndicator.style.display = 'none';
                rightIndicator.style.display = 'none';
            }, 5000);
        }
        
        // Add slide counter
        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        counter.innerHTML = `<span class="current">1</span> / <span class="total">${this.items.length}</span>`;
        dotsContainer.appendChild(counter);
        this.counter = counter;
        
        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.container.appendChild(dotsContainer);
        this.dotsContainer = dotsContainer;
    }
    
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.currentX = e.touches[0].clientX;
        this.isDragging = true;
        this.container.style.cursor = 'grabbing';
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
        const diff = this.currentX - this.startX;
        
        // Add resistance effect
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (!this.isDragging) return;
        
        const diff = this.currentX - this.startX;
        const threshold = 50; // Threshold for swipe detection
        
        console.log('Swipe diff:', diff, 'Current index:', this.currentIndex);
        
        if (Math.abs(diff) > threshold) {
            // Swipe right (positive diff) = go to previous slide
            if (diff > 0 && this.currentIndex > 0) {
                console.log('Swiping right - going back');
                this.currentIndex--;
            } 
            // Swipe left (negative diff) = go to next slide
            else if (diff < 0 && this.currentIndex < this.items.length - 1) {
                console.log('Swiping left - going forward');
                this.currentIndex++;
            }
        }
        
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.container.style.cursor = 'grab';
        
        // Use requestAnimationFrame for smoother transition
        requestAnimationFrame(() => {
            this.updateSlide();
        });
    }
    
    handleMouseStart(e) {
        this.startX = e.clientX;
        this.currentX = e.clientX;
        this.isDragging = true;
        this.container.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
    }
    
    handleMouseEnd(e) {
        if (!this.isDragging) return;
        
        const diff = this.currentX - this.startX;
        const threshold = 50; // Threshold for swipe detection
        
        console.log('Mouse swipe diff:', diff, 'Current index:', this.currentIndex);
        
        if (Math.abs(diff) > threshold) {
            // Swipe right (positive diff) = go to previous slide
            if (diff > 0 && this.currentIndex > 0) {
                console.log('Swiping right - going back');
                this.currentIndex--;
            } 
            // Swipe left (negative diff) = go to next slide
            else if (diff < 0 && this.currentIndex < this.items.length - 1) {
                console.log('Swiping left - going forward');
                this.currentIndex++;
            }
        }
        
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.container.style.cursor = 'grab';
        
        // Use requestAnimationFrame for smoother transition
        requestAnimationFrame(() => {
            this.updateSlide();
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }
    
    updateSlide() {
        console.log('Updating slide to index:', this.currentIndex, 'Total items:', this.items.length);
        
        // First, hide all non-active slides instantly
        this.items.forEach((item, index) => {
            if (index !== this.currentIndex) {
                item.classList.remove('active-slide');
                item.style.transition = 'none';
                item.style.opacity = '0';
                item.style.display = 'none';
                item.style.transform = 'translateX(0) scale(1)';
            }
        });
        
        // Then animate the active slide
        const activeItem = this.items[this.currentIndex];
        if (activeItem) {
            // Show the new slide
            activeItem.style.display = 'block';
            activeItem.classList.add('active-slide');
            
            // Force reflow
            void activeItem.offsetHeight;
            
            // Reset initial state
            activeItem.style.opacity = '0';
            activeItem.style.transform = 'translate3d(25px, 0, 0) scale(0.95)';
            activeItem.style.transition = 'none';
            
            // Apply smooth animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    activeItem.style.transition = 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                    activeItem.style.opacity = '1';
                    activeItem.style.transform = 'translate3d(0, 0, 0) scale(1)';
                });
            });
        }
        
        // Update dots
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Update counter
        if (this.counter) {
            const current = this.counter.querySelector('.current');
            current.textContent = this.currentIndex + 1;
        }
        
        // Add haptic feedback (vibration) on supported devices
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }
    
    destroy() {
        if (this.dotsContainer) {
            this.dotsContainer.remove();
        }
        
        // Remove swipe indicators
        const indicators = this.container.querySelectorAll('.carousel-indicator');
        indicators.forEach(indicator => indicator.remove());
        
        this.items.forEach(item => {
            item.style.display = '';
            item.style.opacity = '';
            item.style.transform = '';
            item.style.transition = '';
            item.classList.remove('active-slide');
        });
    }
}

// Initialize carousels for mobile
function initMobileCarousels() {
    if (window.innerWidth <= 768) {
        console.log('Initializing mobile carousels...');
        
        // Services carousel - Featured cards
        new MobileCarousel('.featured-services', '.featured-card');
        
        // Services carousel - Additional services
        new MobileCarousel('.additional-services', '.service-item');
        
        // Bundles carousel
        new MobileCarousel('.bundles-grid', '.bundle-card');
        
        // Gallery carousel
        new MobileCarousel('.gallery-grid', '.gallery-item');
        
        // Cars carousel - will be initialized after cars load
    }
}

// Initialize cars carousel separately
function initCarsCarousel() {
    if (window.innerWidth <= 768) {
        const carsGrid = document.getElementById('carsGrid');
        const carCards = carsGrid ? carsGrid.querySelectorAll('.car-card') : [];
        
        if (carCards.length > 0) {
            console.log('Initializing cars carousel with', carCards.length, 'cars');
            // Remove any existing carousel-dots from previous init
            const existingDots = carsGrid.querySelector('.carousel-dots');
            if (existingDots) {
                existingDots.remove();
            }
            // Remove any existing indicators
            const existingIndicators = carsGrid.querySelectorAll('.carousel-indicator');
            existingIndicators.forEach(indicator => indicator.remove());
            
            new MobileCarousel('#carsGrid', '.car-card');
        } else {
            console.log('No cars to show carousel for');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to hero section first
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Load cars first
    loadCars();
    
    // Wait for images and layout to be ready
    if (document.readyState === 'complete') {
        // Page is already fully loaded
        initMobileCarousels();
        initCarsCarousel();
        revealOnScroll();
    } else {
        // Wait for full page load including images
        window.addEventListener('load', () => {
            console.log('Page fully loaded, initializing carousels');
            initMobileCarousels();
            // Small delay for cars carousel since they're dynamically loaded
            requestAnimationFrame(() => {
                initCarsCarousel();
            });
            revealOnScroll();
        });
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

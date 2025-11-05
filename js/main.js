// =========================
// GALLERY PAGE SCRIPTS
// =========================

// Gallery Carousel
let currentSlideIndex = 0;
const totalSlides = 31;  // ATUALIZADO: 15 fotos antigas + 16 novas = 31 total

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (n >= totalSlides) {
        currentSlideIndex = 0;
    } else if (n < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = n;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    thumbnails[currentSlideIndex].classList.add('active');
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlideIndex + 1;
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function previousSlide() {
    showSlide(currentSlideIndex - 1);
}

function goToSlide(n) {
    showSlide(n);
}

// Pet Carousel
let currentPetSlideIndex = 0;
const totalPetSlides = 16;

function showPetSlide(n) {
    const petWrapper = document.getElementById('petCarouselWrapper');
    if (!petWrapper) return;
    
    const slides = petWrapper.querySelectorAll('.carousel-slide');
    const thumbnails = document.querySelectorAll('.pet-gallery-section .thumbnail');

    if (n >= totalPetSlides) {
        currentPetSlideIndex = 0;
    } else if (n < 0) {
        currentPetSlideIndex = totalPetSlides - 1;
    } else {
        currentPetSlideIndex = n;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    slides[currentPetSlideIndex].classList.add('active');
    thumbnails[currentPetSlideIndex].classList.add('active');
    
    const currentPetSlideElement = document.getElementById('currentPetSlide');
    if (currentPetSlideElement) {
        currentPetSlideElement.textContent = currentPetSlideIndex + 1;
    }
}

function nextPetSlide() {
    showPetSlide(currentPetSlideIndex + 1);
}

function previousPetSlide() {
    showPetSlide(currentPetSlideIndex - 1);
}

function goToPetSlide(n) {
    showPetSlide(n);
}

function initPetGallery() {
    // Initialize pet carousel with first slide
    const petWrapper = document.getElementById('petCarouselWrapper');
    if (petWrapper) {
        showPetSlide(0);
    }
}

// =========================
// HOME PAGE SCRIPTS
// =========================

// Hours Modal functionality
function initHoursModal() {
    const modal = document.getElementById('hours-modal');
    const trigger = document.querySelector('.hours-trigger');
    const closeBtn = document.querySelector('.hours-modal-close');

    if (!modal || !trigger || !closeBtn) return;

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// =========================
// GLOBAL INITIALIZATION
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Hours Modal (Home page)
    initHoursModal();
    
    // Gallery page initialization
    if (document.querySelector('.carousel-slide')) {
        showSlide(0);
        initPetGallery();
        
        // Auto-advance carousel every 8 seconds
        setInterval(() => {
            nextSlide();
        }, 8000);
        
        // Close lightbox on outside click
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target.id === 'lightbox') {
                    closeLightbox();
                }
            });
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && typeof nextSlide === 'function') nextSlide();
        if (e.key === 'ArrowLeft' && typeof previousSlide === 'function') previousSlide();
        if (e.key === 'Escape' && typeof closeLightbox === 'function') closeLightbox();
    });
});

// =========================
// COCKTAILS CAROUSEL
// =========================

let currentCocktailIndex = 0;
const totalCocktails = 11;

function showCocktail(index) {
    const slides = document.querySelectorAll('.cocktail-slide');
    const indicators = document.querySelectorAll('.cocktail-indicator');
    
    if (!slides.length) return;
    
    // Loop around
    if (index >= totalCocktails) {
        currentCocktailIndex = 0;
    } else if (index < 0) {
        currentCocktailIndex = totalCocktails - 1;
    } else {
        currentCocktailIndex = index;
    }
    
    // Update slides
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentCocktailIndex].classList.add('active');
    
    // Update indicators
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[currentCocktailIndex]) {
        indicators[currentCocktailIndex].classList.add('active');
    }
}

function nextCocktail() {
    showCocktail(currentCocktailIndex + 1);
}

function prevCocktail() {
    showCocktail(currentCocktailIndex - 1);
}

function gotoCocktail(index) {
    showCocktail(index);
}

// Auto-advance cocktails carousel every 5 seconds
if (document.querySelector('.cocktails-carousel')) {
    setInterval(() => {
        nextCocktail();
    }, 5000);
}

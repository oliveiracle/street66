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

// =========================
// LOCATION WELCOME MODAL
// =========================

function closeLocationModal() {
    const modal = document.getElementById('location-modal');
    if (modal) {
        modal.classList.remove('show');
        localStorage.setItem('locationModalShown', 'true');
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function showLocationModal() {
    // Only show once per session
    if (localStorage.getItem('locationModalShown') === 'true') {
        return;
    }

    const modal = document.getElementById('location-modal');
    if (!modal) return;

    modal.classList.add('show');

    // Street 66 Bar location
    const barLat = 53.3448;
    const barLon = -6.2639;

    // Try to get user location using IP geolocation API
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const userLat = data.latitude;
            const userLon = data.longitude;
            const city = data.city;
            const country = data.country_name;
            const countryCode = data.country_code;
            const flag = data.country_code ? getFlagEmoji(data.country_code) : '🌍';

            // Calculate distance
            const distance = calculateDistance(barLat, barLon, userLat, userLon);
            const distanceText = distance < 1 ? 
                `${Math.round(distance * 1000)} meters` : 
                `${Math.round(distance).toLocaleString()} km`;

            // Update modal content
            document.getElementById('locationTitle').textContent = `${flag} Welcome from ${city}!`;
            document.getElementById('locationText').textContent = `You're browsing from ${city}, ${country}`;
            document.getElementById('distanceText').textContent = `📍 ${distanceText} away from Street 66`;

            // Update SVG dot position (simplified - just animate it)
            const userDot = document.getElementById('userDot');
            const connectionLine = document.getElementById('connectionLine');
            
            // Random position for visual effect (since we can't accurately map to SVG coords)
            const randomX = 100 + Math.random() * 600;
            const randomY = 100 + Math.random() * 200;
            
            if (userDot) {
                userDot.setAttribute('cx', randomX);
                userDot.setAttribute('cy', randomY);
            }
            
            if (connectionLine) {
                connectionLine.setAttribute('x2', randomX);
                connectionLine.setAttribute('y2', randomY);
            }
        })
        .catch(error => {
            console.log('Location detection failed:', error);
            document.getElementById('locationTitle').textContent = '🌍 Welcome to Street 66!';
            document.getElementById('locationText').textContent = 'Thanks for visiting our site!';
            document.getElementById('distanceText').textContent = '📍 33-34 Parliament St, Temple Bar, Dublin';
        });
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// Show location modal on page load (all pages)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showLocationModal, 1500); // Show after 1.5 seconds
});

window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// Aurora-style scroll reveal animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Observe all stagger containers
    document.querySelectorAll('.stagger-container').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
    setupScrollAnimations();
}

// Run image zoom setup as soon as DOM is ready (does not depend on jQuery)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImageZoom);
} else {
    setupImageZoom();
}

// Image zoom modal functionality (runs on DOM ready, does not depend on jQuery)
var imageZoomInitialized = false;

function setupImageZoom() {
    if (imageZoomInitialized) return;
    imageZoomInitialized = true;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.2s ease;
    `;

    // Backdrop: click to close (covers full screen, behind content)
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.80);
        cursor: pointer;
        z-index: 0;
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10001;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        border-radius: 50%;
    `;
    closeBtn.onmouseover = function() {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.transform = 'scale(1.1)';
    };
    closeBtn.onmouseout = function() {
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.transform = 'scale(1)';
    };

    // Image container (clicking image does not close)
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
        position: relative;
        z-index: 10000;
        max-width: 85%;
        max-height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: auto;
    `;

    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        pointer-events: auto;
    `;

    // Prevent clicks on image/container from closing modal
    imgContainer.addEventListener('click', function(e) { e.stopPropagation(); });
    modalImg.addEventListener('click', function(e) { e.stopPropagation(); });

    imgContainer.appendChild(modalImg);
    modal.appendChild(backdrop);
    modal.appendChild(closeBtn);
    modal.appendChild(imgContainer);
    document.body.appendChild(modal);

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openModal(src) {
        modalImg.src = src;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Click backdrop to close
    backdrop.addEventListener('click', function() {
        closeModal();
    });

    // Close button
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });

    // ESC to close (single listener, only when modal is open)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function shouldZoomImage(img) {
        if (!img || img.tagName !== 'IMG') return false;
        if (img.classList && img.classList.contains('no-zoom')) return false;
        if (img.closest && img.closest('#image-modal')) return false;
        if (img.closest && img.closest('.more-works-container')) return false;
        var alt = (img.getAttribute('alt') || '').toLowerCase();
        if (alt.indexOf('logo') !== -1) return false;
        var src = (img.getAttribute('src') || img.src) || '';
        if (src.indexOf('logo') !== -1 || src.indexOf('favicon') !== -1) return false;
        return true;
    }

    function refreshZoomCursors() {
        var images = document.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            if (shouldZoomImage(images[i])) {
                images[i].style.cursor = 'zoom-in';
            }
        }
    }

    // Event delegation: handle clicks even if images are added later
    document.addEventListener('click', function(e) {
        if (modal.style.display === 'flex' && modal.contains(e.target)) return;
        var target = e.target;
        var img = target && target.closest ? target.closest('img') : null;
        if (!shouldZoomImage(img)) return;
        e.preventDefault();
        openModal(img.src);
    });

    refreshZoomCursors();
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Setup scroll animations (image zoom is initialized on DOMContentLoaded above)
    setupScrollAnimations();

})

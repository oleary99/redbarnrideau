document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Visitor tracking
    trackVisitor();

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Gallery filtering functionality
    initGalleryFilter();

});

// Visitor tracking function
function trackVisitor() {
    try {
        // Get or create visitor ID
        let visitorId = localStorage.getItem('visitor-id');
        if (!visitorId) {
            visitorId = generateVisitorId();
            localStorage.setItem('visitor-id', visitorId);
        }

        // Track visit
        const visitData = {
            visitorId: visitorId,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            screenResolution: `${screen.width}x${screen.height}`
        };

        // Store visit data locally (you can later implement server-side tracking)
        let visits = JSON.parse(localStorage.getItem('site-visits') || '[]');
        visits.push(visitData);
        
        // Keep only last 100 visits to avoid storage issues
        if (visits.length > 100) {
            visits = visits.slice(-100);
        }
        
        localStorage.setItem('site-visits', JSON.stringify(visits));
        
        // Update visit counter
        let visitCount = parseInt(localStorage.getItem('visit-count') || '0');
        visitCount++;
        localStorage.setItem('visit-count', visitCount.toString());

        console.log(`Visit #${visitCount} tracked for visitor ${visitorId}`);
        
    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
}

// Generate unique visitor ID
function generateVisitorId() {
    return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get visitor statistics (for admin use)
function getVisitorStats() {
    try {
        const visits = JSON.parse(localStorage.getItem('site-visits') || '[]');
        const totalVisits = visits.length;
        const uniqueVisitors = new Set(visits.map(v => v.visitorId)).size;
        
        // Group by date
        const visitsByDate = visits.reduce((acc, visit) => {
            const date = new Date(visit.timestamp).toDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Most popular pages
        const pageViews = visits.reduce((acc, visit) => {
            acc[visit.page] = (acc[visit.page] || 0) + 1;
            return acc;
        }, {});

        return {
            totalVisits,
            uniqueVisitors,
            visitsByDate,
            pageViews,
            averageVisitsPerDay: totalVisits / Object.keys(visitsByDate).length || 0
        };
    } catch (error) {
        console.error('Error getting visitor stats:', error);
        return null;
    }
}

// Handle contact form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        id: 'contact_' + Date.now()
    };

    // Store contact data locally (implement server-side storage later)
    try {
        let contacts = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
        contacts.push(contactData);
        localStorage.setItem('contact-submissions', JSON.stringify(contacts));

        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        console.log('Contact form submitted:', contactData);
    } catch (error) {
        console.error('Error saving contact data:', error);
        showNotification('There was an error submitting your message. Please try again.', 'error');
    }
}

// Show notification to user
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

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
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Admin function to view contact submissions
function getContactSubmissions() {
    try {
        const contacts = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
        console.table(contacts);
        return contacts;
    } catch (error) {
        console.error('Error retrieving contact submissions:', error);
        return [];
    }
}

// Admin function to export visitor data
function exportVisitorData() {
    const stats = getVisitorStats();
    const contacts = getContactSubmissions();
    const visits = JSON.parse(localStorage.getItem('site-visits') || '[]');
    
    const exportData = {
        generatedAt: new Date().toISOString(),
        summary: stats,
        allVisits: visits,
        contactSubmissions: contacts
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `redbarn-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    console.log('Analytics data exported:', exportData.summary);
}

// Gallery filtering functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) {
        return; // Not on gallery page
    }

    // Function to apply filter
    function applyFilter(filterValue) {
        galleryItems.forEach(item => {
            const itemCategories = item.getAttribute('data-category');
            if (itemCategories && itemCategories.includes(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Apply initial filter for "available" items on page load
    applyFilter('available');

    // Add click event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            applyFilter(filterValue);
        });
    });
}

// Handle URL parameters for pre-selecting rams
function handleRamInquiry() {
    const urlParams = new URLSearchParams(window.location.search);
    const ramParam = urlParams.get('ram');
    
    if (ramParam && document.getElementById('contact-form')) {
        const subjectField = document.querySelector('select[name="subject"]');
        const messageField = document.querySelector('textarea[name="message"]');
        
        if (subjectField) {
            subjectField.value = 'Breeding Inquiry';
        }
        
        if (messageField) {
            const ramName = ramParam.charAt(0).toUpperCase() + ramParam.slice(1);
            messageField.value = `I am interested in breeding services with ${ramName}. Please provide more information about availability and pricing.`;
        }
    }
}

// Initialize ram inquiry handling on contact page
document.addEventListener('DOMContentLoaded', function() {
    handleRamInquiry();
});


// Make admin functions available globally for console access
window.getVisitorStats = getVisitorStats;
window.getContactSubmissions = getContactSubmissions;
window.exportVisitorData = exportVisitorData;
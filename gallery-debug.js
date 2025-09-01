// COMPREHENSIVE GALLERY DEBUG SCRIPT

console.log("=== GALLERY DEBUG START ===");

function debugGalleryState() {
    console.log("\n--- DEBUGGING GALLERY STATE ---");
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log(`Filter buttons found: ${filterButtons.length}`);
    console.log(`Gallery items found: ${galleryItems.length}`);
    
    filterButtons.forEach((btn, index) => {
        const filter = btn.getAttribute('data-filter');
        const isActive = btn.classList.contains('active');
        console.log(`Button ${index}: filter="${filter}", active=${isActive}, text="${btn.textContent}"`);
    });
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const style = window.getComputedStyle(item);
        const display = style.display;
        const opacity = style.opacity;
        const transform = style.transform;
        const visibility = style.visibility;
        
        console.log(`Item ${index}: category="${category}"`);
        console.log(`  - display: ${display}`);
        console.log(`  - opacity: ${opacity}`);
        console.log(`  - transform: ${transform}`);
        console.log(`  - visibility: ${visibility}`);
        console.log(`  - inline style: ${item.style.cssText}`);
    });
}

function testFilterFunction(filterValue) {
    console.log(`\n--- TESTING FILTER: ${filterValue} ---`);
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const itemCategories = item.getAttribute('data-category');
        console.log(`Item ${index}: category="${itemCategories}"`);
        
        if (filterValue === 'all' || (itemCategories && itemCategories.includes(filterValue))) {
            console.log(`  -> SHOULD SHOW (filter matches)`);
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            console.log(`  -> SHOULD HIDE (filter doesn't match)`);
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    setTimeout(() => {
        console.log(`\n--- AFTER FILTER APPLIED: ${filterValue} ---`);
        debugGalleryState();
    }, 500);
}

// Test functions to be called from console
window.debugGallery = debugGalleryState;
window.testAllFilter = () => testFilterFunction('all');
window.testAvailableFilter = () => testFilterFunction('available');

// Auto-debug on load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - running initial debug");
    setTimeout(debugGalleryState, 1000);
});

// Debug right now if DOM is already loaded
if (document.readyState === 'loading') {
    console.log("Document is still loading...");
} else {
    console.log("Document already loaded - running debug now");
    setTimeout(debugGalleryState, 100);
}

console.log("=== GALLERY DEBUG SCRIPT LOADED ===");
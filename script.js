document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const images = document.querySelectorAll('.image-stage img');
    const overlay = document.getElementById('zoomOverlay');
    const zoomedImg = document.getElementById('zoomedImg');

    // 1. SCROLL TRACKING
    // Trigger the image change when the text section is 60% visible
    const observerOptions = {
        root: null,
        threshold: 0.6
    };

    const handleIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = entry.target.getAttribute('data-step');
                
                // Switch the active map image
                images.forEach(img => {
                    img.classList.toggle('active', img.getAttribute('data-step') === stepIndex);
                });
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    steps.forEach(step => observer.observe(step));

    // 2. ZOOM LOGIC
    window.openZoom = () => {
        const activeImg = document.querySelector('.image-stage img.active');
        if (activeImg) {
            zoomedImg.src = activeImg.src;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Stop scrolling while zoomed
        }
    };

    window.closeZoom = () => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeZoom();
    });
});
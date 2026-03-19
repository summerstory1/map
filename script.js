document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const images = document.querySelectorAll('.image-stage img');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Triggers when half the text block is on screen
    };

    const handleIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = entry.target.getAttribute('data-step');
                
                images.forEach(img => {
                    if (img.getAttribute('data-step') === stepIndex) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    steps.forEach(step => observer.observe(step));
});
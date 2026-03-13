// ==================== Navbar Scroll Effect ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ==================== Smooth Scroll for Nav Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Active Nav Link Highlight ====================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = '#3b82f6';
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id) sectionObserver.observe(section);
});

// ==================== Scroll Reveal Animation ====================
const revealElements = document.querySelectorAll(
    '.checklist-card, .instruction-step, .timeline-item, .embed-step, .dash-card, .tip-box'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index % 6 * 0.08}s, transform 0.6s ease ${index % 6 * 0.08}s`;
    revealObserver.observe(el);
});

// ==================== Checklist Card Click Interaction ====================
document.querySelectorAll('.checklist-card').forEach(card => {
    card.addEventListener('click', function () {
        const icon = this.querySelector('.check-icon');
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);
    });
});

// ==================== Dashboard Card Hover Parallax ====================
document.querySelectorAll('.dash-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ==================== Progress Bar Reset on Visibility ====================
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFill.style.animation = 'none';
                void progressFill.offsetHeight; // force reflow
                progressFill.style.animation = 'loadProgress 3s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    progressObserver.observe(progressFill);
}

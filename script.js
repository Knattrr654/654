// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(124, 58, 237, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.borderBottom = '1px solid #333333';
    }
});

// Smooth Scrolling for Navigation Links
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

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.feature-card, .episode-card, .platform-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid #7c3aed';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeWriter(typingElement, '654 Podcast', 150);
    }
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Sound Wave Animation Control
const soundWaves = document.querySelectorAll('.wave');
let waveInterval;

function startWaveAnimation() {
    soundWaves.forEach((wave, index) => {
        wave.style.animationPlayState = 'running';
    });
}

function pauseWaveAnimation() {
    soundWaves.forEach(wave => {
        wave.style.animationPlayState = 'paused';
    });
}

// Play button interactions
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulate play action
        console.log('Playing episode...');
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Platform Card Hover Effects
const platformCards = document.querySelectorAll('.platform-card');
platformCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Episode Card Interactions
const episodeCards = document.querySelectorAll('.episode-card');
episodeCards.forEach(card => {
    const playBtn = card.querySelector('.play-button');
    
    card.addEventListener('mouseenter', () => {
        playBtn.style.transform = 'scale(1.1)';
        playBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        playBtn.style.transform = 'scale(1)';
        playBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
});

// Preloader Animation
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 3px solid #333; border-top: 3px solid #7c3aed; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="color: #7c3aed; font-family: Inter, sans-serif; margin: 0;">Laden...</h3>
        </div>
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
// showPreloader();

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
        z-index: 9999;
        transition: width 0.25s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link tracking
updateActiveNavLink();

// Add active link styles
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: #7c3aed !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Particle System for Background
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particle system
createParticleSystem();

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Your scroll event handlers here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

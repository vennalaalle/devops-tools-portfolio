// Copy code functionality
function copyCode() {
    const code = document.getElementById('jenkinsCode').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
            Copied!
        `;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.tool-card, .pipeline-step, .code-preview');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add data attributes for tool cards
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
}

// Dynamic status indicator
function updatePipelineStatus() {
    const statusText = document.querySelector('.status-text');
    const statuses = [
        { text: 'Build: <strong>SUCCESS</strong>', color: 'var(--accent-color)' },
        { text: 'Tests: <strong>PASSING</strong>', color: 'var(--accent-color)' },
        { text: 'Quality: <strong>A+</strong>', color: 'var(--accent-color)' },
        { text: 'Deploy: <strong>READY</strong>', color: 'var(--accent-color)' }
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % statuses.length;
        statusText.innerHTML = statuses[currentIndex].text;
    }, 3000);
}

// Matrix rain effect (subtle background)
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.03';
    canvas.style.zIndex = '0';
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = '12px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initializeToolCards();
    updatePipelineStatus();
    createMatrixEffect();
    
    // Smooth scroll
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
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to copy code
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        copyCode();
    }
});

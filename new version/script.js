// ===== CONFIGURAÇÕES E CONSTANTES =====
const CONFIG = {
    LOADING_DELAY: 1500,
    SCROLL_THRESHOLD: 300,
    SNOWFLAKE_COUNT: 60,
    TYPING_SPEED: {
        normal: 100,
        deleting: 50,
        pause: 2000
    }
};

// ===== GERENCIAMENTO DE ESTADO =====
const State = {
    currentTheme: localStorage.getItem('theme') || 'dark',
    sidebarHidden: false,
    lastScrollTop: 0
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeLoadingScreen();
    initializeCursor();
    initializeMobileMenu();
    initializeTheme();
    initializeNavigation();
    initializeProjectModal();
    initializeBackToTop();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSidebarScroll();
}

// ===== SISTEMA DE LOADING =====
function initializeLoadingScreen() {
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                createSnowflakes();
            }, 500);
        }, CONFIG.LOADING_DELAY);
    });
}

// ===== CURSOR PERSONALIZADO =====
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    const updateCursor = debounce((e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 100);
    }, 10);

    document.addEventListener('mousemove', updateCursor);

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===== MENU MOBILE =====
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const icon = this.querySelector('i');
    
    navMenu.classList.toggle('show');
    this.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    
    if (navMenu.classList.contains('show')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const icon = mobileMenuToggle.querySelector('i');
    
    navMenu.classList.remove('show');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    icon.classList.replace('fa-times', 'fa-bars');
}

// ===== SISTEMA DE TEMAS =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    document.body.setAttribute('data-theme', State.currentTheme);
    updateThemeIcon();

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    State.currentTheme = State.currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', State.currentTheme);
    localStorage.setItem('theme', State.currentTheme);
    
    updateThemeIcon();
    updateSnowflakesTheme();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (State.currentTheme === 'dark') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// ===== SISTEMA DE PARTÍCULAS =====
function createSnowflakes() {
    if (window.innerWidth <= 768) return; // Não criar em mobile

    const container = document.getElementById('particles-bg');
    container.innerHTML = '';
    
    for (let i = 0; i < CONFIG.SNOWFLAKE_COUNT; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 8 + 2;
        const opacity = Math.random() * 0.8 + 0.2;
        const animationDuration = Math.random() * 10 + 5;
        const startDelay = Math.random() * 5;
        const startPosition = Math.random() * 100;
        
        snowflake.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, 
                rgba(255, 255, 255, ${opacity}), 
                rgba(220, 240, 255, ${opacity * 0.7})
            );
            filter: blur(${Math.random() * 1.2}px);
            left: ${startPosition}%;
            opacity: ${opacity};
            box-shadow: 
                0 0 ${size * 1.5}px rgba(255, 255, 255, ${opacity * 0.4}),
                inset 0 0 ${size * 0.8}px rgba(255, 255, 255, 0.6);
            animation: snowfall ${animationDuration}s linear ${startDelay}s infinite;
        `;
        
        container.appendChild(snowflake);
    }
}

function updateSnowflakesTheme() {
    const snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(snowflake => {
        if (State.currentTheme === 'light') {
            snowflake.style.background = `linear-gradient(45deg, 
                rgba(0, 0, 0, 0.3), 
                rgba(80, 100, 150, 0.2)
            )`;
        } else {
            snowflake.style.background = `linear-gradient(45deg, 
                rgba(255, 255, 255, 0.9), 
                rgba(220, 240, 255, 0.7)
            )`;
        }
    });
}

// ===== NAVEGAÇÃO ENTRE SEÇÕES =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const viewProjectsBtn = document.querySelector('.view-projects-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('projects');
        });
    }

    // Navegação por hash na URL
    window.addEventListener('load', handleHashNavigation);
}

function handleNavigation(e) {
    e.preventDefault();
    const targetSection = this.getAttribute('data-section');
    switchSection(targetSection);
    closeMobileMenu();
}

function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    }
}

function switchSection(sectionId) {
    // Atualizar seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Atualizar links de navegação
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('data-section') === sectionId) {
            navLink.classList.add('active');
        }
    });
    
    // Scroll para topo e atualizar URL
    document.getElementById('main-content').scrollTop = 0;
    history.pushState(null, null, `#${sectionId}`);
}

// ===== MODAL DE PROJETOS =====
function initializeProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');

    projectCards.forEach(card => {
        card.addEventListener('click', () => openProjectModal(card));
    });

    closeModal.addEventListener('click', closeProjectModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeProjectModal();
        }
    });
}

function openProjectModal(card) {
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    const imgSrc = card.querySelector('.project-img').src;
    const title = card.querySelector('.project-title').textContent;
    const desc = card.querySelector('.project-desc').textContent;
    const alt = card.querySelector('.project-img').alt;
    
    modalImg.src = imgSrc;
    modalImg.alt = alt;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Foco no botão de fechar para acessibilidade
    document.querySelector('.close-modal').focus();
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ===== BOTÃO VOLTAR AO TOPO =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > CONFIG.SCROLL_THRESHOLD) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== EFEITO DE DIGITAÇÃO =====
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const words = ['Designer UI/UX', 'Analista de OS', 'Fotógrafo'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        heroTitle.innerHTML = `Desenvolvedor & <span>${currentWord.substring(0, charIndex)}</span>`;
        
        let typeSpeed = isDeleting ? CONFIG.TYPING_SPEED.deleting : CONFIG.TYPING_SPEED.normal;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = CONFIG.TYPING_SPEED.pause;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// ===== ANIMAÇÕES NO SCROLL =====
function initializeScrollAnimations() {
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

    document.querySelectorAll('.project-card, .skill, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== SIDEBAR NO SCROLL (MOBILE) =====
function initializeSidebarScroll() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    if (window.innerWidth <= 768) {
        sidebar.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleSidebarScroll, 10);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            showSidebar();
        }
    });
}

function handleSidebarScroll() {
    if (window.innerWidth <= 768) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > State.lastScrollTop && currentScroll > 100) {
            if (!State.sidebarHidden) {
                hideSidebar();
            }
        } else if (currentScroll < State.lastScrollTop) {
            if (State.sidebarHidden) {
                showSidebar();
            }
        }
        
        State.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
        showSidebar();
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.style.transform = 'translateY(-100%)';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
    State.sidebarHidden = true;
    
    mainContent.style.marginTop = '0';
    mainContent.style.transition = 'margin-top 0.3s ease';
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.style.transform = 'translateY(0)';
    sidebar.style.opacity = '1';
    sidebar.style.pointerEvents = 'auto';
    State.sidebarHidden = false;
    
    mainContent.style.marginTop = '';
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EVENT LISTENERS GLOBAIS =====
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        createSnowflakes();
    }
}, 250));
// Sistema de Loading
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Iniciar partículas após loading
            createSnowflakes();
        }, 500);
    }, 1500);
});

// Cursor Personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

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

const updateCursor = debounce((e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
}, 10);

document.addEventListener('mousemove', updateCursor);

document.querySelectorAll('a, button, .project-card, .skill').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Menu Mobile
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Sistema de Temas
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// SISTEMA DE FLOCOS DE NEVE MELHORADO
// Sistema de Partículas de Neve no Fundo Principal
function createSnowflakes() {
    const container = document.getElementById('particles-bg');
    const snowflakeCount = 60; // Número otimizado para fundo
    
    // Limpar partículas antigas
    container.innerHTML = '';
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Propriedades variadas para realismo
        const size = Math.random() * 8 + 2; // Tamanhos variados
        const opacity = Math.random() * 0.8 + 0.2;
        const animationDuration = Math.random() * 10 + 5; // 5-15 segundos
        const startDelay = Math.random() * 5;
        const startPosition = Math.random() * 100;
        
        snowflake.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, 
                rgba(255, 255, 255, ${opacity}), 
                rgba(220, 240, 255, ${opacity * 0.7})
            );
            border-radius: 50%;
            filter: blur(${Math.random() * 1.2}px);
            pointer-events: none;
            z-index: -1;
            left: ${startPosition}%;
            top: -50px;
            opacity: ${opacity};
            box-shadow: 
                0 0 ${size * 1.5}px rgba(255, 255, 255, ${opacity * 0.4}),
                inset 0 0 ${size * 0.8}px rgba(255, 255, 255, 0.6);
            animation: snowfall ${animationDuration}s linear ${startDelay}s infinite;
        `;
        
        container.appendChild(snowflake);
    }
}

// Atualizar partículas quando o tema mudar
function updateSnowflakesTheme() {
    const snowflakes = document.querySelectorAll('.snowflake');
    const currentTheme = document.body.getAttribute('data-theme');
    
    snowflakes.forEach(snowflake => {
        if (currentTheme === 'light') {
            snowflake.style.background = `linear-gradient(45deg, 
                rgba(0, 0, 0, 0.3), 
                rgba(80, 100, 150, 0.2)
            )`;
            snowflake.style.boxShadow = `
                0 0 8px rgba(0, 0, 0, 0.2),
                inset 0 0 4px rgba(255, 255, 255, 0.5)
            `;
        } else {
            snowflake.style.background = `linear-gradient(45deg, 
                rgba(255, 255, 255, 0.9), 
                rgba(220, 240, 255, 0.7)
            )`;
            snowflake.style.boxShadow = `
                0 0 8px rgba(255, 255, 255, 0.3),
                inset 0 0 4px rgba(255, 255, 255, 0.8)
            `;
        }
    });
}

// Modificar o event listener do tema para atualizar as partículas
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
    updateSnowflakesTheme(); // Atualizar cores das partículas
});

// Inicializar partículas quando a página carregar
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Iniciar partículas no fundo principal
            createSnowflakes();
        }, 500);
    }, 1500);
});

// Recriar partículas quando a janela for redimensionada (otimização)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createSnowflakes();
    }, 250);
});

// ... o resto do JavaScript permanece igual ...

// Navegação entre Seções
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const viewProjectsBtn = document.querySelector('.view-projects-btn');

function switchSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('data-section') === sectionId) {
            navLink.classList.add('active');
        }
    });
    
    document.getElementById('main-content').scrollTop = 0;
    
    history.pushState(null, null, `#${sectionId}`);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        switchSection(targetSection);
    });
});

viewProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('projects');
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    }
});

// Modal de Projetos
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('.project-img').src;
        const title = card.querySelector('.project-title').textContent;
        const desc = card.querySelector('.project-desc').textContent;
        
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});

function closeProjectModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

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

// Validação de Formulário
const contactForm = document.querySelector('form');
const formSuccess = document.getElementById('form-success');

function validateField(field, errorElement) {
    if (field.value.trim() === '') {
        field.classList.add('error');
        errorElement.style.display = 'block';
        return false;
    } else {
        field.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

function validateEmail(email, errorElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        errorElement.style.display = 'block';
        return false;
    } else {
        email.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
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

// Efeito de Digitação na Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.innerHTML;
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
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Iniciar efeito após 1 segundo
    setTimeout(type, 1000);
}

// Inicializar efeitos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
});

// Otimização de Performance - Intersection Observer para animações
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

// Observar elementos para animação
document.querySelectorAll('.project-card, .skill, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Variáveis para controle da sidebar
let lastScrollTop = 0;
let sidebarHidden = false;
const sidebar = document.querySelector('.sidebar');

// Função para mostrar/esconder sidebar no scroll
function handleSidebarScroll() {
    if (window.innerWidth <= 768) { // Apenas em mobile
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scroll para baixo - esconder sidebar
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            if (!sidebarHidden) {
                hideSidebar();
            }
        } 
        // Scroll para cima - mostrar sidebar
        else if (currentScroll < lastScrollTop) {
            if (sidebarHidden) {
                showSidebar();
            }
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
        // Em desktop, garantir que sidebar esteja visível
        showSidebar();
    }
}

// Função para esconder sidebar com efeito
function hideSidebar() {
    sidebar.style.transform = 'translateY(-100%)';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
    sidebarHidden = true;
    
    // Ajustar o main-content para ocupar espaço extra
    const mainContent = document.querySelector('.main-content');
    mainContent.style.marginTop = '0';
    mainContent.style.transition = 'margin-top 0.3s ease';
}

// Função para mostrar sidebar com efeito
function showSidebar() {
    sidebar.style.transform = 'translateY(0)';
    sidebar.style.opacity = '1';
    sidebar.style.pointerEvents = 'auto';
    sidebarHidden = false;
    
    // Restaurar margin do main-content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.marginTop = '';
}

// Event listener para scroll
window.addEventListener('scroll', handleSidebarScroll);

// Re-inicializar quando a janela for redimensionada
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        showSidebar(); // Sempre mostrar em desktop
    }
});

// Inicializar estado da sidebar
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        // Adicionar transição CSS via JavaScript para controle preciso
        sidebar.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
});

// Otimização: Debounce para o scroll
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleSidebarScroll, 10);
});
// --- CONTROLO DAS ABAS DE PROJECTOS ---
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll("#projetos .tab-content");
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const tabLinks = document.querySelectorAll("#projetos .tab-link");
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// --- CONTROLO DAS ABAS DE HABILIDADES ---
function openSkillTab(evt, tabName) {
    const tabContents = document.querySelectorAll("#habilidades .skill-tab-content");
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const tabLinks = document.querySelectorAll("#habilidades .skill-tab-link");
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// --- CONFIGURAÇÃO INICIAL AO CARREGAR A PÁGINA ---
document.addEventListener("DOMContentLoaded", function() {
    // Garante que a primeira aba de projectos esteja activa
    const webTab = document.getElementById("web");
    if (webTab) {
        webTab.classList.add('active');
    }

    // Garante que a primeira aba de habilidades esteja activa
    const devTab = document.getElementById("desenvolvimento");
    if (devTab) {
        devTab.classList.add('active');
    }
});


// --- CONTROLE DO MENU HAMBÚRGUER ---
document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Função para abrir/fechar o menu
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Muda o ícone de barras para 'X' e vice-versa
        const icon = menuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Fechar menu');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Abrir menu');
        }
    });

    // Função para fechar o menu ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            // Restaura o ícone para barras
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Abrir menu');
        });
    });
});

// --- CONTROLE DO MODAL DE PROJETOS ---
document.addEventListener("DOMContentLoaded", function() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close-btn');
    const overlays = document.querySelectorAll('.modal-overlay');

    // Função para abrir o modal
    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
    };

    // Função para fechar o modal
    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
    };

    // Adiciona evento de clique aos botões de abrir
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    // Adiciona evento de clique aos botões de fechar (o 'x')
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Adiciona evento de clique aos overlays para fechar
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });
});

// Adicione este código ao final do seu arquivo script.js

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o elemento existe antes de iniciar
    if (document.querySelector('.typing-target')) {
        const options = {
            strings: [
                'Matheus Henrique',
                'Desenvolvedor Web',
                'Designer',
                'Pentester'
            ],
            typeSpeed: 20,      // Velocidade de digitação
            backSpeed: 25,      // Velocidade ao apagar
            backDelay: 2000,    // Tempo de espera antes de apagar
            startDelay: 500,    // Tempo de espera antes de começar
            loop: true,         // Faz a animação repetir
            showCursor: true,
            cursorChar: '|',
        };

        new Typed('.typing-target', options);
    }
});

// ============================================================================
// NOVO EFEITO DE DECODIFICAÇÃO DE TEXTO (TEXT SCRAMBLE EFFECT)
// ============================================================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// --- INICIALIZAÇÃO DO EFEITO ---
document.addEventListener("DOMContentLoaded", function() {
    const phrases = [
        'Matheus Henrique',
        'Desenvolvedor Fullstack',
        'Designer Criativo',
        'Pentester',
        'Editor de Vídeo'
    ];

    const el = document.getElementById('headline-text');
    if (el) {
        const fx = new TextScramble(el);
        let counter = 0;

        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000); // Tempo de espera antes de ir para a próxima frase
            });
            counter = (counter + 1) % phrases.length;
        };

        // Adiciona um pequeno delay antes de iniciar para dar tempo da página carregar
        setTimeout(next, 1000);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const visitorBadge = document.querySelector(".visitor-counter img");
    const badgeSource = visitorBadge?.dataset.src;

    if (badgeSource) {
        const badgeUrl = new URL(badgeSource);
        badgeUrl.searchParams.set("cache", Date.now().toString());
        visitorBadge.src = badgeUrl.toString();
    }
});
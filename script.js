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

// --- CONFIGURAÇÃO INICIAL AO CARREGAR A PÁGINA ---
document.addEventListener("DOMContentLoaded", function() {
    // Garante que a primeira aba de projectos esteja activa
    const webTab = document.getElementById("web");
    if (webTab) {
        webTab.classList.add('active');
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
    const constellation = document.querySelector(".skills-constellation");
    const svg = constellation?.querySelector(".constellation-lines");
    const edgeLayer = svg?.querySelector(".constellation-edge-layer");
    const particleLayer = svg?.querySelector(".constellation-particle-layer");
    const nodeElements = Array.from(constellation?.querySelectorAll(".constellation-node") || []);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const supportsConstellationInteraction = window.matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine)").matches;

    if (constellation && svg && edgeLayer && particleLayer && nodeElements.length
        && !prefersReducedMotion.matches && supportsConstellationInteraction) {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const nodes = nodeElements.map((element, index) => ({
            element,
            index,
            x: parseFloat(element.style.getPropertyValue("--x")) * 10,
            y: parseFloat(element.style.getPropertyValue("--y")) * 5.2,
            offsetX: 0,
            offsetY: 0,
            velocityX: 0,
            velocityY: 0,
            influence: 0
        }));
        const edges = [];
        const connectedPairs = new Set();
        const particles = [];
        const pointer = { x: 0, y: 0, active: false };
        let frameId = 0;
        let animationStart = 0;
        let isVisible = true;

        nodes.forEach((node, index) => {
            const nearestNodes = nodes
                .filter(candidate => candidate !== node)
                .map(candidate => ({
                    candidate,
                    distance: Math.hypot(candidate.x - node.x, candidate.y - node.y)
                }))
                .sort((first, second) => first.distance - second.distance)
                .slice(0, 2);

            nearestNodes.forEach(({ candidate }) => {
                const startIndex = Math.min(index, candidate.index);
                const endIndex = Math.max(index, candidate.index);
                const key = `${startIndex}-${endIndex}`;

                if (!connectedPairs.has(key)) {
                    connectedPairs.add(key);
                    const path = document.createElementNS(svgNamespace, "path");
                    edgeLayer.appendChild(path);
                    edges.push({ start: nodes[startIndex], end: nodes[endIndex], path });
                }
            });
        });

        const particleEdges = edges.slice(0, 10);
        particleEdges.forEach((edge, index) => {
            const particle = document.createElementNS(svgNamespace, "circle");
            particle.setAttribute("r", index % 3 === 0 ? "2.3" : "1.7");
            particleLayer.appendChild(particle);
            particles.push({ edge, element: particle, phase: index / particleEdges.length });
        });

        const distanceToSegment = (pointX, pointY, start, end) => {
            const deltaX = end.x - start.x;
            const deltaY = end.y - start.y;
            const lengthSquared = deltaX * deltaX + deltaY * deltaY;
            const projection = lengthSquared
                ? Math.max(0, Math.min(1, ((pointX - start.x) * deltaX + (pointY - start.y) * deltaY) / lengthSquared))
                : 0;
            return Math.hypot(pointX - (start.x + projection * deltaX), pointY - (start.y + projection * deltaY));
        };

        const render = timestamp => {
            frameId = 0;
            if (!isVisible) return;

            if (!animationStart) animationStart = timestamp;
            const elapsed = timestamp - animationStart;
            const bounds = constellation.getBoundingClientRect();
            const pointerX = (pointer.x / bounds.width) * 1000;
            const pointerY = (pointer.y / bounds.height) * 520;
            const influenceRadius = 165;
            let hasMotion = false;

            nodes.forEach(node => {
                const baseX = parseFloat(node.element.style.getPropertyValue("--x")) * 10;
                const baseY = parseFloat(node.element.style.getPropertyValue("--y")) * 5.2;
                const currentX = baseX + node.offsetX;
                const currentY = baseY + node.offsetY;
                const deltaX = currentX - pointerX;
                const deltaY = currentY - pointerY;
                const distance = Math.hypot(deltaX, deltaY);
                const falloff = pointer.active && distance < influenceRadius
                    ? Math.pow(1 - distance / influenceRadius, 2)
                    : 0;
                const repel = distance ? (falloff * 24) / distance : 0;
                const targetX = pointer.active ? deltaX * repel : 0;
                const targetY = pointer.active ? deltaY * repel : 0;

                node.velocityX = (node.velocityX + (targetX - node.offsetX) * 0.12) * 0.78;
                node.velocityY = (node.velocityY + (targetY - node.offsetY) * 0.12) * 0.78;
                node.offsetX += node.velocityX;
                node.offsetY += node.velocityY;
                node.x = baseX + node.offsetX;
                node.y = baseY + node.offsetY;
                node.influence = falloff;

                node.element.style.setProperty("--motion-x", `${(node.offsetX * bounds.width) / 1000}px`);
                node.element.style.setProperty("--motion-y", `${(node.offsetY * bounds.height) / 520}px`);
                node.element.style.setProperty("--motion-scale", (1 + falloff * 0.1).toFixed(3));
                node.element.classList.toggle("is-active", falloff > 0.18);

                if (Math.abs(node.offsetX) + Math.abs(node.offsetY) > 0.08
                    || Math.abs(node.velocityX) + Math.abs(node.velocityY) > 0.08) {
                    hasMotion = true;
                }
            });

            edges.forEach(({ start, end, path }) => {
                path.setAttribute("d", `M${start.x} ${start.y} L${end.x} ${end.y}`);

                const edgeDistance = pointer.active
                    ? distanceToSegment(pointerX, pointerY, start, end)
                    : Infinity;
                const edgeInfluence = Math.max(0, 1 - edgeDistance / 95);
                path.style.strokeOpacity = (0.18 + edgeInfluence * 0.75).toFixed(3);
                path.style.strokeWidth = (1 + edgeInfluence * 1.5).toFixed(2);
                path.style.stroke = edgeInfluence > 0.08 ? "#9af3a1" : "";
                path.style.strokeDasharray = edgeInfluence > 0.08 ? "3 7" : "";
                path.style.strokeDashoffset = edgeInfluence > 0.08 ? `${-(elapsed * 0.018) % 10}` : "0";

                if (edgeInfluence > 0.08) hasMotion = true;
            });

            particles.forEach(({ edge, element, phase }) => {
                const progress = (elapsed * 0.00007 + phase) % 1;
                const particleX = edge.start.x + (edge.end.x - edge.start.x) * progress;
                const particleY = edge.start.y + (edge.end.y - edge.start.y) * progress;
                const distance = pointer.active ? Math.hypot(pointerX - particleX, pointerY - particleY) : Infinity;
                const opacity = pointer.active ? Math.max(0.08, 1 - distance / 190) : 0;

                element.setAttribute("cx", particleX.toFixed(2));
                element.setAttribute("cy", particleY.toFixed(2));
                element.style.opacity = opacity.toFixed(2);
            });

            if (pointer.active || hasMotion) {
                frameId = requestAnimationFrame(render);
            } else {
                nodes.forEach(node => {
                    node.element.classList.remove("is-active");
                    node.element.style.setProperty("--motion-scale", "1");
                });
                edges.forEach(({ path }) => {
                    path.style.strokeOpacity = "0.18";
                    path.style.strokeWidth = "1";
                    path.style.stroke = "";
                    path.style.strokeDasharray = "";
                    path.style.strokeDashoffset = "0";
                });
            }
        };

        const scheduleRender = () => {
            if (!frameId && isVisible) frameId = requestAnimationFrame(render);
        };

        constellation.addEventListener("pointerenter", event => {
            if (event.pointerType === "touch") return;
            pointer.active = true;
            scheduleRender();
        });

        constellation.addEventListener("pointermove", event => {
            if (event.pointerType === "touch") return;
            const bounds = constellation.getBoundingClientRect();
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
            pointer.active = true;
            scheduleRender();
        });

        constellation.addEventListener("pointerleave", () => {
            pointer.active = false;
            scheduleRender();
        });

        document.addEventListener("visibilitychange", () => {
            isVisible = !document.hidden;
            if (!isVisible && frameId) {
                pointer.active = false;
                cancelAnimationFrame(frameId);
                frameId = 0;
            }
            if (isVisible) scheduleRender();
        });

        window.addEventListener("resize", scheduleRender, { passive: true });
    }

    const visitorBadge = document.querySelector(".visitor-counter img");
    const badgeSource = visitorBadge?.dataset.src;

    if (badgeSource) {
        const badgeUrl = new URL(badgeSource);
        badgeUrl.searchParams.set("cache", Date.now().toString());
        visitorBadge.src = badgeUrl.toString();
    }
});
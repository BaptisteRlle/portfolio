const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.x -= dx / 50;
            this.y -= dy / 50;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(107, 189, 143, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    const particleCount = Math.min(100, (canvas.width * canvas.height) / 10000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(107, 189, 143, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

init();
animate();

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('nav a');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
    observer.observe(el);
});

const projects = [
    {
        title: "Agenda C++",
        screenshots: [
            "img/agenda-cpp-1.jpg",
            "img/agenda-cpp-2.jpg"
        ],
        description: `
            <div class="project-detail">
                <h4><i class="fas fa-bullseye"></i> Objectif</h4>
                <p>
                    Développer un agenda en C++ capable de gérer plusieurs événements :
                    création, modification, suppression, affichage et export dans différents formats.
                </p>
            </div>
            <div class="modal-screenshots">
                <img src="img/agenda-cpp-1.jpg" alt="Interface Agenda">
                <img src="img/agenda-cpp-2.jpg" alt="Code C++">
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-tools"></i> Technologies utilisées</h4>
                <p>C++, gestion de structures, manipulation de fichiers, logique algorithmique.</p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-lightbulb"></i> Développement</h4>
                <p>
                    L'agenda est structuré autour de plusieurs structures permettant de représenter les agendas,
                    les événements et les dates. Le code est organisé pour séparer la logique métier
                    (gestion des événements) des fonctions d'affichage et d'export.
                </p>
                <p>
                    Le programme inclut notamment la génération d'identifiants uniques, la vérification
                    des années bissextiles, la gestion des ajouts et suppressions d'événements et
                    l'export HTML ou dans un fichier.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-star"></i> Fonctionnalités principales</h4>
                <p>
                    Création d'agenda, ajout et suppression d'événements, affichage complet,
                    export HTML, sauvegarde dans un fichier, vérification de dates et gestion
                    d'identifiants uniques.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-chart-bar"></i> Résultats</h4>
                <p>
                    Un des premiers projets C++ qui m'a permis de mieux comprendre le développement
                    logiciel structuré, la manipulation de données et l'organisation du code.
                </p>
            </div>
            <div class="modal-tags">
                <span class="tag"><i class="fab fa-cuttlefish"></i> C++</span>
                <span class="tag"><i class="fas fa-database"></i> Structures</span>
                <span class="tag"><i class="fas fa-file"></i> Fichiers</span>
            </div>
        `
    },
    {
        title: "Portfolio personnel",
        screenshots: [
            "img/portfolio-1.jpg",
            "img/portfolio-2.jpg"
        ],
        description: `
            <div class="project-detail">
                <h4><i class="fas fa-bullseye"></i> Objectif</h4>
                <p>
                    Concevoir un site web moderne pour présenter mon parcours, mes projets et
                    mes compétences, tout en pratiquant le développement front-end.
                </p>
            </div>
            <div class="modal-screenshots">
                <img src="img/portfolio-1.jpg" alt="Portfolio Accueil">
                <img src="img/portfolio-2.jpg" alt="Portfolio Projets">
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-tools"></i> Technologies utilisées</h4>
                <p>HTML, CSS, JavaScript (animations, interactions, menu responsive).</p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-lightbulb"></i> Développement</h4>
                <p>
                    Le site est organisé en plusieurs sections (accueil, à propos, parcours,
                    projets, compétences, contact) avec une navigation fluide et un design 
                    basé sur une palette de verts. 
                </p>
                <p>
                    J'ai intégré des animations, un fond dynamique en canvas, un système de 
                    cartes pour les projets et un modal détaillant chaque réalisation.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-star"></i> Fonctionnalités principales</h4>
                <p>
                    Navigation fixe avec surlignage de la section active, cartes projets
                    cliquables, affichage détaillé dans un modal, sections de compétences 
                    repliables et formulaire de contact avec feedback visuel.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-chart-bar"></i> Résultats</h4>
                <p>
                    Amélioration de mes compétences en intégration web, en structuration 
                    de pages HTML/CSS et en JavaScript pour les interactions et animations.
                </p>
            </div>
            <div class="modal-tags">
                <span class="tag"><i class="fab fa-html5"></i> HTML</span>
                <span class="tag"><i class="fab fa-css3-alt"></i> CSS</span>
                <span class="tag"><i class="fab fa-js"></i> JavaScript</span>
            </div>
        `
    },
    {
        title: "Morpion JS",
        screenshots: [
            "img/morpion-1.jpg",
            "img/morpion-2.jpg"
        ],
        description: `
            <div class="project-detail">
                <h4><i class="fas fa-bullseye"></i> Objectif</h4>
                <p>
                    Mettre en pratique le développement web interactif en créant un site
                    proposant plusieurs variantes du jeu du morpion, avec différents modes de jeu.
                </p>
            </div>
            <div class="modal-screenshots">
                <img src="img/morpion-1.jpg" alt="Morpion Interface">
                <img src="img/morpion-2.jpg" alt="Morpion Gameplay">
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-tools"></i> Technologies utilisées</h4>
                <p>JavaScript, HTML, CSS.</p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-lightbulb"></i> Développement</h4>
                <p>
                    Le projet repose sur une organisation modulaire permettant d'ajouter facilement de 
                    nouveaux modes de jeu :
                </p>
                <p>
                    — Morpion classique (3×3) : gestion des coups, détection de victoire, modes 1v1 et 1vBot.<br>
                    — Morpion Ultime : version avancée composée de 9 sous-grilles avec règles spécifiques.<br>
                    — Morpion 2.0 : variante spéciale avec contraintes supplémentaires.<br>
                    — Bot simple : IA basique qui joue des coups valides.
                </p>
                <p>
                    Le site fonctionne sans rechargement : tout est géré dynamiquement via JavaScript.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-star"></i> Fonctionnalités principales</h4>
                <p>
                    Mode 1v1 avec saisie des noms et accès aux trois variantes (classique, 2.0, ultime).
                    Mode 1vBot avec choix du nom du joueur et IA simple.
                    Interface dynamique, gestion des scores par mode, boutons de reset et mise en page uniforme.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-chart-bar"></i> Résultats</h4>
                <p>
                    Meilleure maîtrise de JavaScript et du DOM, compréhension avancée des algorithmes
                    de gestion de jeu (détection de victoire, tours de jeu, IA simple) et mise en place
                    d'une architecture modulable pour ajouter d'autres IA ou variantes.
                </p>
            </div>
            <div class="modal-tags">
                <span class="tag"><i class="fab fa-js"></i> JavaScript</span>
                <span class="tag"><i class="fas fa-gamepad"></i> Jeu</span>
                <span class="tag"><i class="fas fa-code"></i> DOM</span>
            </div>
        `
    },
    {
        title: "FootStats",
        screenshots: [
            "img/footstats-1.jpg",
            "img/footstats-2.jpg"
        ],
        description: `
            <div class="project-detail">
                <h4><i class="fas fa-bullseye"></i> Objectif</h4>
                <p>
                    Mettre en pratique les notions fondamentales du développement web dynamique :
                    manipulation du DOM, programmation orientée objet en JavaScript, utilisation d'une API externe
                    et modularisation du code avec Webpack.
                </p>
            </div>
            <div class="modal-screenshots">
                <img src="img/footstats-1.jpg" alt="FootStats Interface">
                <img src="img/footstats-2.jpg" alt="FootStats Équipes">
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-tools"></i> Technologies utilisées</h4>
                <p>JavaScript ES6, HTML / CSS, Webpack, API REST TheSportsDB.</p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-lightbulb"></i> Développement</h4>
                <p>
                    Le projet suit une architecture modulaire basée sur plusieurs classes :
                    Ligues (recherche et affichage des ligues + suggestions),
                    Équipes (chargement et présentation de toutes les équipes d'une ligue),
                    InfosÉquipes (affichage des informations détaillées : logo, pays, stade, capacité, description),
                    Classement (récupération du classement et affichage du top 5).
                </p>
                <p>
                    L'application est intégralement dynamique : aucun rechargement de page,
                    toutes les données sont obtenues via des requêtes API.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-star"></i> Fonctionnalités principales</h4>
                <p>
                    Recherche d'une ligue via une barre dynamique (suggestions en direct).
                    Affichage du logo et des informations de la ligue.
                    Liste des équipes de la ligue sélectionnée.
                    Fiche équipe : logo, pays, stade, capacité, description.
                    Classement : affichage du top 5 des équipes de la ligue.
                </p>
            </div>
            <div class="project-detail">
                <h4><i class="fas fa-chart-bar"></i> Résultats / apprentissages</h4>
                <p>
                    Maîtrise de la programmation orientée objet en JavaScript.
                    Utilisation concrète d'une API REST avec fetch.
                    Gestion d'un projet modulaire et structuré avec Webpack.
                    Compréhension de la chaîne de build moderne (Babel, PostCSS).
                    Amélioration de la logique algorithmique grâce au traitement dynamique de données.
                    Mise en place d'une interface utilisateur simple, claire et entièrement générée via JavaScript.
                </p>
            </div>
            <div class="modal-tags">
                <span class="tag"><i class="fab fa-js"></i> JavaScript ES6</span>
                <span class="tag"><i class="fas fa-object-group"></i> POO</span>
                <span class="tag"><i class="fas fa-server"></i> API REST</span>
                <span class="tag"><i class="fas fa-box"></i> Webpack</span>
            </div>
        `
    },
    {
        title: "FoodHub",
        screenshots: [
            "img/foodhub-1.jpg",
            "img/foodhub-2.jpg"
        ],
        description: `
            <div class="project-detail">
                <h4><i class="fas fa-bullseye"></i> Objectif</h4>
                <p>
                    L’objectif était de développer une application complète en Java afin de découvrir JavaFX 
                    et de mettre en pratique la création d’une interface moderne tout en manipulant une base de données.
                </p>
            </div>

            <div class="modal-screenshots">
                <img src="img/foodhub-1.jpg" alt="FoodHub Interface">
                <img src="img/foodhub-2.jpg" alt="FoodHub Détails">
            </div>

            <div class="project-detail">
                <h4><i class="fas fa-tools"></i> Technologies utilisées</h4>
                <p>
                    Java, JavaFX pour l’interface graphique, PostgreSQL hébergé sur AlwaysData pour la gestion des données,
                    et utilisation du design pattern Singleton.
                </p>
            </div>

            <div class="project-detail">
                <h4><i class="fas fa-lightbulb"></i> Développement</h4>
                <p>
                    Le projet a consisté à mettre en place une architecture claire et modulaire 
                    tout en assurant la communication entre l’interface JavaFX et la base PostgreSQL. 
                    Le pattern Singleton a été utilisé pour gérer la connexion à la base de données de manière fiable et centralisée.
                </p>
            </div>

            <div class="project-detail">
                <h4><i class="fas fa-star"></i> Fonctionnalités principales</h4>
                <p>
                    Gestion basique des recettes : ajout, consultation, recherche et tri des recettes selon différents critères. 
                    Une interface simple permet d’explorer les données et de naviguer entre les différentes vues.
                </p>
            </div>

            <div class="project-detail">
                <h4><i class="fas fa-chart-bar"></i> Résultats</h4>
                <p>
                    Ce projet m’a permis de consolider mes compétences en Java, d’apprendre à concevoir une interface JavaFX 
                    et d’interagir avec une base de données PostgreSQL. Il m’a également aidé à mieux structurer une application 
                    grâce à l’utilisation de design patterns.
                </p>
            </div>

            <div class="modal-tags">
                <span class="tag"><i class="fas fa-java"></i> Java</span>
                <span class="tag"><i class="fas fa-utensils"></i> Recettes</span>
                <span class="tag"><i class="fas fa-database"></i> Gestion</span>
            </div>

        `
    }
];

function openModal(index) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `<h3>${projects[index].title}</h3>${projects[index].description}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('projectModal')) {
        closeModal();
    }
});

function toggleSkill(index) {
    const categories = document.querySelectorAll('.skill-category');
    const content = categories[index].querySelector('.skill-content');
    const toggle = categories[index].querySelector('.skill-toggle');
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}

function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '✓ Message envoyé !';
    btn.style.background = '#6bbd8f';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

window.addEventListener('load', () => {
    document.body.style.opacity = '1';        
});
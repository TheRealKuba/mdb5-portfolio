document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        // Scroll to the top with smooth behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100); // Delay to ensure page is fully loaded

    const letters = document.querySelectorAll(".letter");
    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("main-content");

    // Disable scrolling during intro animation
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");

    // Set animation delay for each letter
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.2}s`;
        letter.style.setProperty("--flash-delay", `${index * 0.2}s`);
    });

    // After letter animation is complete
    setTimeout(() => {
        letters.forEach((letter) => {
            letter.classList.add("blacken");
        });

        // Change the text to "Welcome"
        setTimeout(() => {
            intro.innerHTML = '<div class="welcome">Welcome</div>';

            // Hide intro screen and show main content after a delay
            setTimeout(() => {
                intro.style.display = "none";
                mainContent.style.display = "block";

                // Enable scrolling again
                document.body.classList.remove("no-scroll");
                document.documentElement.classList.remove("no-scroll");
            }, 1000);
        }, 1000);
    }, letters.length * 200 + 1500);
});

// Rotating text
var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

// Intersection observer for sections
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    },
    { threshold: 0.1 }
);
sections.forEach((section) => observer.observe(section));

// Scroll event to hide #start div
const startDiv = document.getElementById("start");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        startDiv.classList.add("hidden");
    } else {
        startDiv.classList.remove("hidden");
    }
});

// Typing animation for text
const animateTyping = (el) => {
    const text = el.dataset.text;
    let i = 0;

    const interval = setInterval(() => {
        el.innerText = text.slice(0, i + 1);
        i++;
        if (i === text.length) clearInterval(interval);
    }, 100);
};

const texts = document.querySelectorAll(".typing-text");
const typingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
                entry.target.classList.add("animated");
                animateTyping(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

texts.forEach((text) => typingObserver.observe(text));

// Scroll progress bar
window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("progress-bar");
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Mousemove effect for the "about" section
const aboutSection = document.querySelector(".about-section");
const aboutPhoto = document.querySelector(".about-photo");
const aboutPhotoImg = aboutPhoto.querySelector("img");
const aboutContent = document.querySelector(".about-content");

const aboutObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutPhoto.classList.add("active");
                aboutContent.classList.add("active");
            }
        });
    },
    { threshold: 0.3 }
);

aboutObserver.observe(aboutSection);

aboutSection.addEventListener("mousemove", (e) => {
    const { width, height, left, top } = aboutSection.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 1.0) * 20;
    const y = ((e.clientY - top) / height - 1.0) * 15;

    aboutPhotoImg.style.transform = `translate(${x}px, ${y}px)`;
    aboutContent.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
});

aboutSection.addEventListener("mouseleave", () => {
    aboutPhotoImg.style.transform = "translate(0, 0)";
    aboutContent.style.transform = "translateX(0)";
});
window.addEventListener('scroll', function() {
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;  // Celková výška dokumentu bez vzhledu okna
    var scrollTop = window.scrollY;  // Aktuální pozice scrollu

    // Výpočet procenta, jak daleko je uživatel na stránce
    var scrollPercent = (scrollTop / docHeight) * 100;

    // Nastavení šířky progress baru
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
});
document.addEventListener('DOMContentLoaded', () => {
    const sliderContent = document.querySelector('.slider-content');

    // Nastavení počátečního posunu slideru (například o 100px)
    sliderContent.style.transform = `translateX(100px)`;  // Nastavte požadovaný počáteční posun

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset;

        // Posuneme obrázky horizontálně na základě scrollování, přičemž počáteční posun zůstane zachován
        sliderContent.style.transform = `translateX(calc(100px - ${scrollPosition * 0.5}px))`;
    });
});
document.addEventListener('mousemove', (e) => {
    const section = document.getElementById('parallax-section');
    const content = section.querySelector('.parallax-content');

    // Získání pozice myši v rámci okna
    const mouseX = e.clientX / window.innerWidth - 0.9; // Střed myši
    const mouseY = e.clientY / window.innerHeight - 0.9; // Střed myši

    // Změna transformace na základě pohybu myši
    content.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 20}px, 0)`;
});
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');

    // Funkce pro počítání čísel s zpomalováním
    function animateStatNumber(stat) {
        const target = stat.dataset.target; // Cílové číslo
        let current = 0;
        const duration = 2000; // Celkový čas trvání animace v milisekundách
        const startTime = performance.now(); // Čas začátku animace

        // Funkce pro zpomalování počítání
        function count() {
            const elapsedTime = performance.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Pokrok animace od 0 do 1
            current = Math.floor(progress * target); // Vypočítáme aktuální číslo na základě pokroku

            stat.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(count); // Pokračuj v animaci
            } else {
                stat.textContent = target; // Pokud je animace hotová, nastavíme konečné číslo
            }
        }

        count(); // Začneme animaci
    }

    // Sledujeme scrollování a zobrazení sekce
    function checkIfInView() {
        const section = document.getElementById('stats');
        const sectionPosition = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Pokud je sekce alespoň z 75% viditelná, začneme animaci čísel
        if (sectionPosition < windowHeight * 0.75) {
            stats.forEach((stat) => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateStatNumber(stat); // Spustíme animaci
                }
            });
        }
    }

    // Volání funkce při scrollování
    window.addEventListener('scroll', checkIfInView);
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-section');
    const aboutPhoto = document.querySelector('.about-photo');
    const aboutContent = document.querySelector('.about-content');

    // Funkce pro kontrolu, zda je sekce viditelná na obrazovce
    function checkIfInView() {
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Pokud je sekce alespoň z 75% viditelná, aktivujeme animaci
        if (sectionPosition < windowHeight * 0.75) {
            aboutSection.classList.add('visible');
            aboutPhoto.classList.add('visible');
            aboutContent.classList.add('visible');
        }
    }

    // Sledujeme scrollování a zobrazení sekce
    window.addEventListener('scroll', checkIfInView);

    // Zavoláme funkci na začátku, abychom zkontrolovali, jestli sekce není už viditelná při načtení stránky
    checkIfInView();
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-section');

    function checkIfInView() {
        const sectionPosition = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Zkontroluje, zda je celá sekce viditelná
        if (sectionPosition.top >= 0 && sectionPosition.bottom <= windowHeight) {
            aboutSection.classList.add('visible'); // Přidá třídu pro animaci
        } else {
            aboutSection.classList.remove('visible'); // Odebere třídu, pokud sekce zmizí
        }
    }

    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Zkontroluje hned při načtení stránky
});

document.addEventListener('DOMContentLoaded', () => {
    // Získáme šířku okna pro detekci mobilního zařízení
    const isMobile = window.innerWidth <= 768; // Mějte na paměti, že můžete upravit tuto šířku podle potřeby

    // Zajistíme, že některé efekty se nebudou spouštět na mobilních zařízeních
    if (isMobile) {
        // Deaktivujte nebo zjednodušte animace na mobilních zařízeních
        document.querySelector('.slider-content').style.transition = 'none';
        // Ostatní optimalizace pro mobilní zařízení, např. zjednodušený parallax efekt:
        const aboutSection = document.querySelector('.about-section');
        aboutSection.removeEventListener('mousemove', parallaxEffect);
    }

    // Zbytek kódu zůstává beze změny, až na optimalizace
});

// Přidáme funkci pro paralax efekt, kterou deaktivujeme na mobilních zařízeních
const parallaxEffect = (e) => {
    const { width, height, left, top } = aboutSection.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 1.0) * 20;
    const y = ((e.clientY - top) / height - 1.0) * 15;
    aboutPhotoImg.style.transform = `translate(${x}px, ${y}px)`;
    aboutContent.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
};
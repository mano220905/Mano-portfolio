document.addEventListener("DOMContentLoaded", () => {

    // FOOTER YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open") ? "✕" : "☰";

    });

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";

        });

    });


    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // SCROLL PROGRESS
    const scrollProgress = document.getElementById("scrollProgress");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = documentHeight > 0 ?
            (scrollTop / documentHeight) * 100 :
            0;

        scrollProgress.style.width = progress + "%";

    });


    // ACTIVE NAVIGATION
    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navItems.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // COUNTER ANIMATION
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1300;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easedProgress = 1 - Math.pow(1 - progress, 3);

                counter.textContent =
                    Math.floor(target * easedProgress);

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // DARK MODE
    const themeToggle = document.getElementById("themeToggle");

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        themeToggle.textContent =
            document.body.classList.contains("dark-theme") ?
            "☀" :
            "◐";

    });


    // CUSTOM CURSOR
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (window.matchMedia("(pointer: fine)").matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

        });

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();

        document.querySelectorAll("a, button, .project-art").forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursorOutline.style.width = "48px";
                cursorOutline.style.height = "48px";

            });

            element.addEventListener("mouseleave", () => {

                cursorOutline.style.width = "32px";
                cursorOutline.style.height = "32px";

            });

        });

    }


    // MAGNETIC BUTTON EFFECT
    const magneticButtons = document.querySelectorAll(".magnetic");

    if (window.matchMedia("(pointer: fine)").matches) {

        magneticButtons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect = button.getBoundingClientRect();

                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.12}px)`;

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }


    // PROJECT PROOF POPUP
    const proofModal = document.getElementById("proofModal");
    const proofImage = document.getElementById("proofImage");
    const proofTitle = document.getElementById("proofTitle");
    const proofClose = document.getElementById("proofClose");

    const proofButtons = document.querySelectorAll(".proof-trigger");

    let previouslyFocusedElement = null;

    function openProof(button) {

        previouslyFocusedElement = document.activeElement;

        proofImage.src = button.dataset.image;
        proofTitle.textContent = button.dataset.title;
        proofImage.alt = button.dataset.title + " project proof";

        proofModal.classList.add("active");
        proofModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        proofClose.focus();

    }

    function closeProof() {

        proofModal.classList.remove("active");
        proofModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        proofImage.src = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }

    }

    proofButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();
            openProof(button);

        });

    });

    proofClose.addEventListener("click", closeProof);

    proofModal.addEventListener("click", event => {

        if (event.target === proofModal) {
            closeProof();
        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            proofModal.classList.contains("active")
        ) {
            closeProof();
        }

    });

});
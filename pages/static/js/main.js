const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

const galleryItems = document.querySelectorAll(".gallery-item");
const navLinkItems = navLinks.querySelectorAll("a");
const sections = document.querySelectorAll("section[id]");

const galleryImages = Array.from(galleryItems).map(
    el => el.querySelector("img").src
);
let currentIndex = 0;

window.addEventListener(
    "scroll",
    () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true }
);

navToggle.addEventListener("click", () => {
    const open = navToggle.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
});

navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
    });
});

function openLightbox(index) {
    currentIndex = index;
    lbImg.src = galleryImages[index];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
        lbImg.src = "";
    }, 300);
}

function showPrev() {
    currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lbImg.src = galleryImages[currentIndex];
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lbImg.src = galleryImages[currentIndex];
}

galleryItems.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
});

lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", showPrev);
lbNext.addEventListener("click", showNext);

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
});

const revealTargets = document.querySelectorAll(
    ".about-grid, .skill-group, .project-card, .gallery-item, .contact-card"
);

revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const siblings = Array.from(entry.target.parentElement.children);
            const delay = siblings.indexOf(entry.target) * 75;
            setTimeout(() => entry.target.classList.add("visible"), delay);
            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinkItems.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        });
    },
    { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

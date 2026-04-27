const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const stepButton = document.querySelector("#step-scroll-btn");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => sectionObserver.observe(section));

if (stepButton) {
  const updateStepLabel = () => {
    const nextSection = [...sections].find((section) => section.offsetTop > window.scrollY + 150);
    const label = stepButton.querySelector("span");
    const arrow = stepButton.querySelector(".arrow");

    if (!label || !arrow) {
      return;
    }

    label.textContent = nextSection ? "Next" : "Top";
    arrow.textContent = nextSection ? "v" : "^";
  };

  stepButton.addEventListener("click", () => {
    const nextSection = [...sections].find((section) => section.offsetTop > window.scrollY + 150);

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateStepLabel);
  updateStepLabel();
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:sujalparmar2709@gmail.com?subject=${subject}&body=${body}`;
  });
}

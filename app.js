const menuToggle = document.querySelector(".menu-toggle");
const topbarPanel = document.querySelector(".topbar-panel");
const revealItems = document.querySelectorAll(".reveal");
const currentYear = document.getElementById("current-year");
const leadForm = document.getElementById("lead-form");
const formStatus = document.getElementById("form-status");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && topbarPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbarPanel.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  topbarPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      topbarPanel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

if (leadForm && formStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const category = formData.get("category");
    const message = formData.get("message");

    const subject = encodeURIComponent(`New Gravion Query - ${category || "General Enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nCategory: ${category}\n\nRequirement:\n${message}`
    );

    formStatus.textContent = "Query prepared. Your email app will open so you can send it directly.";
    window.location.href = `mailto:info@gravionprofin.com?subject=${subject}&body=${body}`;
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* =========================================================
   RAJ INDUSTRIES - Interactive Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".header");
  const year = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  /* ---------------------------------------------------------
     1. Current Year
  --------------------------------------------------------- */
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     2. Mobile Navigation
  --------------------------------------------------------- */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      if (header) header.classList.toggle("open", isOpen);

      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.innerHTML = isOpen ? "✕" : "☰";
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
        if (header) header.classList.remove("open");
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     3. Sticky Header Effect
  --------------------------------------------------------- */
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------------------------------------------------------
     4. Smooth Scrolling
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          10;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ---------------------------------------------------------
     5. Scroll Reveal Animation
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    ".section, .product-card, .why-card, .leader-card, .cta-strip, .contact-form"
  );

  revealElements.forEach(element => {
    element.classList.add("js-reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  /* ---------------------------------------------------------
     6. Active Navigation Link
  --------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navItems.forEach(item => item.classList.remove("active"));

          const activeLink = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "-20% 0px -60% 0px"
      }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ---------------------------------------------------------
     7. Business Experience Counter
     --------------------------------------------------------- */
  const counters = document.querySelectorAll(".leader-highlight strong");

  const animateCounter = element => {
    const text = element.textContent.trim();
    const match = text.match(/(\d+)(\+?)/);

    if (!match) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let current = 0;
    const duration = 1000;
    const startTime = performance.now();

    const updateCounter = currentTime => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(target * easedProgress);

      element.textContent = `${current}${suffix} Years`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${target}${suffix} Years`;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /* ---------------------------------------------------------
     8. Product Card Interaction
  --------------------------------------------------------- */
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      if (window.innerWidth < 800) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -4;
      const rotateY = ((x / rect.width) - 0.5) * 4;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ---------------------------------------------------------
     9. Leader Card Subtle Interaction
  --------------------------------------------------------- */
  document.querySelectorAll(".leader-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("leader-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("leader-hover");
    });
  });

  /* ---------------------------------------------------------
     10. Contact Form Validation + WhatsApp Enquiry
     --------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const product = document.getElementById("product")?.value;
      const message = document.getElementById("message")?.value.trim();

      if (!name || !phone || !product || !message) {
        showFormMessage(
          "Please fill in all the required fields.",
          "error"
        );
        return;
      }

      const cleanPhone = phone.replace(/\D/g, "");

      if (cleanPhone.length < 10 || cleanPhone.length > 13) {
        showFormMessage(
          "Please enter a valid mobile number.",
          "error"
        );
        return;
      }

      const whatsappNumber = "919122619049";

      const whatsappMessage =
        `Hello RAJ INDUSTRIES,%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Mobile: ${encodeURIComponent(phone)}%0A` +
        `Product: ${encodeURIComponent(product)}%0A` +
        `Requirement: ${encodeURIComponent(message)}`;

      showFormMessage(
        "Thank you! Opening WhatsApp to send your enquiry...",
        "success"
      );

      setTimeout(() => {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank",
          "noopener,noreferrer"
        );
      }, 700);
    });
  }

  function showFormMessage(message, type) {
    if (!formNote) return;

    formNote.textContent = message;
    formNote.className = `form-note ${type}`;

    setTimeout(() => {
      formNote.textContent = "";
      formNote.className = "form-note";
    }, 5000);
  }

  /* ---------------------------------------------------------
     11. Phone Number Click -> Call
  --------------------------------------------------------- */
  document.querySelectorAll(".contact-info span").forEach(item => {
    const text = item.textContent.trim();

    if (text.includes("9122619049")) {
      item.innerHTML =
        `<a href="tel:+919122619049">+91 9122619049</a>, ` +
        `<a href="tel:+919431428095">+91 9431428095</a>`;
    }
  });

  /* ---------------------------------------------------------
     12. Floating WhatsApp Button + Number Selection Popup
  --------------------------------------------------------- */
  const whatsappButton = document.createElement("button");
  whatsappButton.type = "button";
  whatsappButton.className = "floating-whatsapp";
  whatsappButton.setAttribute("aria-label", "Choose a WhatsApp number");
  whatsappButton.innerHTML = "💬";

  const whatsappModal = document.createElement("div");
  whatsappModal.className = "whatsapp-modal";
  whatsappModal.setAttribute("aria-hidden", "true");
  whatsappModal.innerHTML = `
    <div class="whatsapp-modal-overlay"></div>
    <div class="whatsapp-modal-card" role="dialog" aria-modal="true" aria-labelledby="whatsappModalTitle">
      <button type="button" class="whatsapp-modal-close" aria-label="Close">×</button>
      <div class="whatsapp-modal-icon">💬</div>
      <h3 id="whatsappModalTitle">Chat with RAJ INDUSTRIES</h3>
      <p>Select a WhatsApp number to start your conversation.</p>

      <a class="whatsapp-number-option" href="https://wa.me/919122619049?text=Hello%20RAJ%20INDUSTRIES,%20I%20want%20to%20know%20more%20about%20Poha%20and%20Murmura." target="_blank" rel="noopener noreferrer">
        <span class="whatsapp-option-icon">📱</span>
        <span>
          <strong>+91 9122619049</strong>
          <small>Send WhatsApp Message</small>
        </span>
        <span class="whatsapp-arrow">→</span>
      </a>

      <a class="whatsapp-number-option" href="https://wa.me/919431428095?text=Hello%20RAJ%20INDUSTRIES,%20I%20want%20to%20know%20more%20about%20Poha%20and%20Murmura." target="_blank" rel="noopener noreferrer">
        <span class="whatsapp-option-icon">📱</span>
        <span>
          <strong>+91 9431428095</strong>
          <small>Send WhatsApp Message</small>
        </span>
        <span class="whatsapp-arrow">→</span>
      </a>
    </div>
  `;

  document.body.appendChild(whatsappButton);
  document.body.appendChild(whatsappModal);

  const closeWhatsAppModal = () => {
    whatsappModal.classList.remove("show");
    whatsappModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("whatsapp-modal-open");
  };

  const openWhatsAppModal = () => {
    whatsappModal.classList.add("show");
    whatsappModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("whatsapp-modal-open");
  };

  whatsappButton.addEventListener("click", openWhatsAppModal);
  whatsappModal.querySelector(".whatsapp-modal-overlay").addEventListener("click", closeWhatsAppModal);
  whatsappModal.querySelector(".whatsapp-modal-close").addEventListener("click", closeWhatsAppModal);

  whatsappModal.querySelectorAll(".whatsapp-number-option").forEach(option => {
    option.addEventListener("click", () => setTimeout(closeWhatsAppModal, 150));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && whatsappModal.classList.contains("show")) {
      closeWhatsAppModal();
    }
  });

  /* ---------------------------------------------------------
     13. Back To Top Button
  --------------------------------------------------------- */
  const topButton = document.createElement("button");

  topButton.className = "back-to-top";
  topButton.type = "button";
  topButton.innerHTML = "↑";
  topButton.setAttribute("aria-label", "Back to top");

  document.body.appendChild(topButton);

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        topButton.classList.add("show");
      } else {
        topButton.classList.remove("show");
      }
    },
    { passive: true }
  );

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  /* ---------------------------------------------------------
     14. Prevent Empty Buttons / Links
  --------------------------------------------------------- */
  document.querySelectorAll(".btn, .product-link, .nav-cta").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");

      setTimeout(() => {
        btn.classList.remove("clicked");
      }, 300);
    });
  });

  /* ---------------------------------------------------------
     15. Keyboard Accessibility
  --------------------------------------------------------- */
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks) {
      navLinks.classList.remove("active");
      if (header) header.classList.remove("open");

      if (menuBtn) {
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
});

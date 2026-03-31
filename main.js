/* ============================================================
   SmileCare Dental Clinic — main.js
   Handles: navbar scroll, mobile menu, scroll animations,
            active nav links, form validation, back-to-top
============================================================ */

(function () {
  'use strict';

  /* ===== ELEMENTS ===== */
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('navLinks');
  const backToTop   = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');

  /* ===================================================
     1. NAVBAR — sticky + shadow on scroll
  =================================================== */
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ===================================================
     2. BACK TO TOP — show after 400px scroll
  =================================================== */
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===================================================
     3. ACTIVE NAV LINK — highlight current section
  =================================================== */
  function handleActiveNav() {
    let currentSection = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /* ===================================================
     4. SCROLL ANIMATIONS — fade-in on scroll
  =================================================== */
  function setupScrollAnimations() {
    // Add CSS for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
      .animate-target {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1),
                    transform 0.65s cubic-bezier(0.4,0,0.2,1);
      }
      .animate-target.animated {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Elements to animate
    const animateSelectors = [
      '.service-card',
      '.testi-card',
      '.about-text',
      '.about-visual',
      '.contact-info',
      '.contact-form-wrap',
      '.section-header',
      '.hero-text',
      '.hero-card-wrap',
      '.trust-item'
    ];

    const targets = document.querySelectorAll(animateSelectors.join(','));

    targets.forEach(function (el, index) {
      el.classList.add('animate-target');
      // Stagger service/testimonial cards
      const delay = el.closest('.services-grid, .testi-grid')
        ? (Array.from(el.parentElement.children).indexOf(el)) * 80
        : 0;
      el.style.transitionDelay = delay + 'ms';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===================================================
     5. MOBILE MENU — hamburger toggle
  =================================================== */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a nav link is clicked
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ===================================================
     6. SMOOTH SCROLL — for anchor links
  =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ===================================================
     7. CONTACT FORM — validation + submission
  =================================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      contactForm.addEventListener('submit', function (e) {

  const nameInput  = document.getElementById('name');
  const phoneInput = document.getElementById('phone');

  let valid = true;

  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    valid = false;
  }

  const phoneVal = phoneInput.value.trim().replace(/[\s\-]/g, '');
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  if (!phoneRegex.test(phoneVal)) {
    valid = false;
  }

  if (!valid) {
    e.preventDefault(); // only block if invalid
  }
});

      const nameInput  = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const nameError  = document.getElementById('nameError');
      const phoneError = document.getElementById('phoneError');
      const submitBtn  = document.getElementById('submitBtn');

      let valid = true;

      // Reset errors
      nameError.classList.remove('visible');
      phoneError.classList.remove('visible');
      nameInput.style.borderColor = '';
      phoneInput.style.borderColor = '';

      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameError.classList.add('visible');
        nameInput.style.borderColor = '#ef4444';
        valid = false;
      }

      // Validate phone (Indian mobile: 10 digits, optionally prefixed with +91)
      const phoneVal = phoneInput.value.trim().replace(/[\s\-]/g, '');
      const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneVal)) {
        phoneError.classList.add('visible');
        phoneInput.style.borderColor = '#ef4444';
        valid = false;
      }

      if (!valid) return;

      // Simulate submission (loading state)
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';

        // Show success message
        formSuccess.classList.add('show');
        contactForm.reset();

        // Hide success after 6 seconds
        setTimeout(function () {
          formSuccess.classList.remove('show');
        }, 6000);
      }, 1200);
    });

    // Clear error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
        const errId = this.id + 'Error';
        const errEl = document.getElementById(errId);
        if (errEl) errEl.classList.remove('visible');
      });
    });
  }

  /* ===================================================
     8. SCROLL EVENT LISTENER — batched
  =================================================== */
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleNavbarScroll();
        handleBackToTop();
        handleActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ===================================================
     9. INIT on DOM ready
  =================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    handleNavbarScroll();
    handleBackToTop();
    handleActiveNav();
    setupScrollAnimations();

    // Hero entrance animation on load
    const heroText = document.querySelector('.hero-text');
    const heroCard = document.querySelector('.hero-card-wrap');
    if (heroText) {
      heroText.style.opacity = '0';
      heroText.style.transform = 'translateY(24px)';
      heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      requestAnimationFrame(function () {
        setTimeout(function () {
          heroText.style.opacity = '1';
          heroText.style.transform = 'translateY(0)';
        }, 100);
      });
    }
    if (heroCard) {
      heroCard.style.opacity = '0';
      heroCard.style.transform = 'translateX(24px)';
      heroCard.style.transition = 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s';
      requestAnimationFrame(function () {
        setTimeout(function () {
          heroCard.style.opacity = '1';
          heroCard.style.transform = 'translateX(0)';
        }, 100);
      });
    }
  });

  /* ===================================================
     10. SERVICE CARD — ripple on click
  =================================================== */
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Scroll to contact on card click
      const contact = document.getElementById('contact');
      if (contact) {
        const top = contact.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
    card.style.cursor = 'pointer';
  });

})();

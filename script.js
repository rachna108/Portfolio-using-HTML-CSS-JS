document.addEventListener('DOMContentLoaded', () => {
  
  /* =========================================
   * 1. TYPING EFFECT
   * ========================================= */
  const typingElement = document.querySelector('.typing');
  if (typingElement) {
    const titles = [
      'a Web Developer.',
      'a Java Enthusiast.',
      'a Problem Solver.',
      'open to opportunities!'
    ];
    let current = 0;
    let char = 0;
    let isDeleting = false;

    const type = () => {
      const currentTitle = titles[current];
      
      if (isDeleting) {
        // Erasing
        typingElement.textContent = currentTitle.substring(0, char--);
        if (char < 0) {
          isDeleting = false;
          current = (current + 1) % titles.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, 50);
        }
      } else {
        // Typing
        typingElement.textContent = currentTitle.substring(0, char++);
        if (char > currentTitle.length) {
          isDeleting = true;
          setTimeout(type, 2000); // Wait before deleting
        } else {
          setTimeout(type, 100);
        }
      }
    };

    type();
  }

  /* =========================================
   * 2. SCROLL SPY (Active Link Highlighting)
   * ========================================= */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      // -150 offset for the sticky header
      if (pageYOffset >= (sectionTop - 150)) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (currentSection && a.getAttribute('href').includes(currentSection)) {
        a.classList.add('active');
      }
    });
  });

  /* =========================================
   * 3. LIGHTBOX UTILITY (Certificates)
   * ========================================= */
  function setupLightbox(triggerSelector, lightboxId, imgId, closeId) {
    const triggers = document.querySelectorAll(triggerSelector);
    const lightbox = document.getElementById(lightboxId);
    const lightboxImg = document.getElementById(imgId);
    const closeBtn = document.getElementById(closeId);

    if (!lightbox || !lightboxImg || !closeBtn) return;

    triggers.forEach(img => {
      img.addEventListener('click', (e) => {
        // Use the src of the clicked image
        lightboxImg.src = e.target.src;
        lightbox.style.display = 'flex';
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = ''; // Clear src
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Initialize for Certificates
  setupLightbox('.cert-img', 'cert-lightbox', 'cert-lightbox-img', 'cert-lightbox-close');


  /* =========================================
   * 4. CUSTOM CURSOR
   * ========================================= */
  const cursor = document.querySelector(".cursor");
  const cursor2 = document.querySelector(".cursor2");

  if (cursor && cursor2) {
    document.addEventListener("mousemove", function(e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor2.style.left = e.clientX + "px";
      cursor2.style.top = e.clientY + "px";
    });
  }

  /* =========================================
   * 5. BACK TO TOP BUTTON
   * ========================================= */
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================
   * 6. THEME TOGGLE (Light/Dark)
   * ========================================= */
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    });
  }

  /* =========================================
   * 7. SCROLL REVEAL ANIMATION (The Observer)
   * ========================================= */
  const observerOptions = {
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-element');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden-element');
  hiddenElements.forEach((el) => observer.observe(el));

});
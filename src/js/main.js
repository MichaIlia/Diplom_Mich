document.addEventListener('DOMContentLoaded', () => {

  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  const navbar = document.getElementById('mainNav');
  const backToTopBtn = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateNavLink = () => {
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });
  activateNavLink();

  const heroSection = document.querySelector('.hero-section');

  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      if (scrollY < heroHeight) {
        heroSection.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    }, { passive: true });
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.story-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      statsAnimated = true;

      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent, 10);
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            setTimeout(updateCounter, stepTime);
          } else {
            stat.textContent = target;
          }
        };

        updateCounter();
      });
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats();

  const drinkCards = document.querySelectorAll('.drink-card');

  drinkCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  const imagesToPreload = [
    'src/image/bg.jpg',
    'src/image/drink_bin.jpg',
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

});

/* ============================================================
   WANDERLUSTERS TRAVEL TEAM — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behavior ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const heroPresent = document.querySelector('.hero');
    if (heroPresent) {
      navbar.classList.add('transparent');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          navbar.classList.remove('transparent');
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
          navbar.classList.add('transparent');
        }
      }, { passive: true });
    } else {
      navbar.classList.add('solid');
    }
  }

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
      hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      })
    );
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll fade-up animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── Destination filter (destinations.html) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destItems  = document.querySelectorAll('.dest-item');
  if (filterBtns.length && destItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        destItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── Netlify form success message (shows after redirect back with ?success=true) ── */
  if (window.location.search.includes('success=true')) {
    const successEl = document.getElementById('plan-success') || document.getElementById('contact-success');
    if (successEl) {
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

})();

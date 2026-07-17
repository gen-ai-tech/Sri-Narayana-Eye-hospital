// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks     = document.getElementById('navLinks');
  const navOverlay   = document.getElementById('navOverlay');
  const navDrawerClose = document.getElementById('navDrawerClose');

  function openNav() {
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // lock background scroll
    if (mobileToggle) {
      mobileToggle.classList.remove('fa-bars');
      mobileToggle.classList.add('fa-xmark');
    }
  }

  function closeNav() {
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (mobileToggle) {
      mobileToggle.classList.remove('fa-xmark');
      mobileToggle.classList.add('fa-bars');
    }
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.contains('active') ? closeNav() : openNav();
    });
  }

  // Close via the × button inside the drawer
  if (navDrawerClose) {
    navDrawerClose.addEventListener('click', closeNav);
  }

  // Close by clicking the overlay backdrop
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('active')) {
          closeNav();
        }
      }
    });
  });

  // Virtual Triage Quiz Logic
  const startQuizBtn = document.getElementById('startQuizBtn');
  const quizModal = document.getElementById('quizModal');
  const closeQuizBtn = document.getElementById('closeQuizBtn');
  const quizOptions = document.querySelectorAll('.quiz-option');

  if (startQuizBtn && quizModal && closeQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
      document.getElementById('q1').classList.add('active');
      quizModal.classList.add('active');
    });

    closeQuizBtn.addEventListener('click', () => {
      quizModal.classList.remove('active');
    });

    quizModal.addEventListener('click', (e) => {
      if (e.target === quizModal) {
        quizModal.classList.remove('active');
      }
    });

    quizOptions.forEach(option => {
      option.addEventListener('click', function () {
        const nextStepId = this.getAttribute('data-next');
        if (nextStepId) {
          this.closest('.quiz-question').classList.remove('active');
          const nextStep = document.getElementById(nextStepId);
          if (nextStep) {
            nextStep.classList.add('active');
          }
        }
      });
    });
  }

  // Appointment Form Submission Logic
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const formMessage = document.getElementById('formMessage');
      const originalBtnText = submitBtn.innerText;

      submitBtn.innerText = 'Submitting...';
      submitBtn.disabled = true;
      formMessage.style.display = 'none';

      const name = document.getElementById('patientName').value;
      const phone = document.getElementById('patientPhone').value;
      const reason = document.getElementById('visitReason').value;

      const message = `Hello, I would like to book an appointment.\n\nName: ${name}\nPhone: ${phone}\nReason: ${reason}`;
      const whatsappUrl = `https://wa.me/919940814568?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');

      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = '#d1fae5';
      formMessage.style.color = '#065f46';
      formMessage.innerText = 'Redirecting you to WhatsApp...';

      appointmentForm.reset();
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    });
  }
});

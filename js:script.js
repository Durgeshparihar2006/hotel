/**
 * Luxury Haven Hotel - Custom JavaScript
 * This file contains all custom functionality for the hotel website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.reveal');
    
    // Booking form variables
    const nextStepBtns = document.querySelectorAll('.next-step');
    const prevStepBtns = document.querySelectorAll('.prev-step');
    const bookingSteps = document.querySelectorAll('.booking-step-content');
    const stepIndicators = document.querySelectorAll('.booking-step');
    const progressBar = document.querySelector('.progress-bar');
    
    // Contact form variables
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Date variables for booking
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const summaryCheckIn = document.getElementById('summary-check-in');
    const summaryCheckOut = document.getElementById('summary-check-out');
    const confirmationCheckIn = document.getElementById('confirmation-check-in');
    const confirmationCheckOut = document.getElementById('confirmation-check-out');
    
    /**
     * Handle scroll events
     */
    window.addEventListener('scroll', function() {
      // Add scrolled class to navbar when scrolled
      if (window.scrollY > 50) {
        header.querySelector('.navbar').classList.add('scrolled');
      } else {
        header.querySelector('.navbar').classList.remove('scrolled');
      }
      
      // Show/hide back to top button
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
      
      // Reveal sections on scroll
      revealSections();
    });
    
    /**
     * Reveal sections when scrolled into view
     */
    function revealSections() {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
          section.classList.add('active');
        }
      });
    }
    
    /**
     * Back to top button functionality
     */
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    /**
     * Booking form steps functionality
     */
    if (nextStepBtns.length > 0) {
      nextStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const currentStep = parseInt(this.getAttribute('data-step'));
          const nextStep = currentStep + 1;
          
          // Update dates in summary if available
          if (currentStep === 1 && checkInInput && checkOutInput) {
            if (checkInInput.value && summaryCheckIn) {
              summaryCheckIn.textContent = formatDate(checkInInput.value);
              if (confirmationCheckIn) confirmationCheckIn.textContent = formatDate(checkInInput.value);
            }
            
            if (checkOutInput.value && summaryCheckOut) {
              summaryCheckOut.textContent = formatDate(checkOutInput.value);
              if (confirmationCheckOut) confirmationCheckOut.textContent = formatDate(checkOutInput.value);
            }
          }
          
          // Hide current step and show next step
          document.getElementById(`booking-step-${currentStep}`).classList.remove('active');
          document.getElementById(`booking-step-${nextStep}`).classList.add('active');
          
          // Update step indicators
          document.getElementById(`step-indicator-${currentStep}`).classList.remove('active');
          document.getElementById(`step-indicator-${nextStep}`).classList.add('active');
          
          // Update progress bar
          if (progressBar) {
            progressBar.style.width = `${(nextStep / 4) * 100}%`;
          }
          
          // Scroll to top of form
          window.scrollTo({
            top: document.querySelector('.booking-progress').offsetTop - 100,
            behavior: 'smooth'
          });
        });
      });
      
      prevStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const currentStep = parseInt(this.getAttribute('data-step'));
          const prevStep = currentStep - 1;
          
          // Hide current step and show previous step
          document.getElementById(`booking-step-${currentStep}`).classList.remove('active');
          document.getElementById(`booking-step-${prevStep}`).classList.add('active');
          
          // Update step indicators
          document.getElementById(`step-indicator-${currentStep}`).classList.remove('active');
          document.getElementById(`step-indicator-${prevStep}`).classList.add('active');
          
          // Update progress bar
          if (progressBar) {
            progressBar.style.width = `${(prevStep / 4) * 100}%`;
          }
          
          // Scroll to top of form
          window.scrollTo({
            top: document.querySelector('.booking-progress').offsetTop - 100,
            behavior: 'smooth'
          });
        });
      });
    }
    
    /**
     * Contact form submission
     */
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        
        // Simulate form submission with timeout
        setTimeout(function() {
          // Hide loading state
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
          
          // Show success message
          successMessage.classList.remove('d-none');
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(function() {
            successMessage.classList.add('d-none');
          }, 5000);
        }, 2000);
      });
    }
    
    /**
     * Format date for display
     * @param {string} dateString - Date string in YYYY-MM-DD format
     * @return {string} Formatted date string
     */
    function formatDate(dateString) {
      if (!dateString) return 'Not selected';
      
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
    
    // Initialize page
    revealSections();
  });
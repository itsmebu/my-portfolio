// Enhanced JavaScript with mobile optimizations

// Menu toggle functionality
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x');
};

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 100);
});

// Scroll to contact section
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({
    behavior: 'smooth'
  });
}

// Typing effect - Updated with data analyst roles
const typingText = document.querySelector('.typing-text');
const professions = ['Web Developer', 'Data Analyst', 'Full Stack Developer', 'Python Developer'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
  const currentProfession = professions[professionIndex];
  
  if (isDeleting) {
    // Remove characters
    typingText.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    // Add characters
    typingText.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }
  
  // Check if word is complete
  if (!isDeleting && charIndex === currentProfession.length) {
    isDeleting = true;
    typingDelay = newTextDelay;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    typingDelay = 500;
  }
  
  setTimeout(type, typingDelay);
}

// Contact Form with SweetAlert
document.addEventListener('DOMContentLoaded', () => {
  // Start typing effect after a short delay
  setTimeout(type, 1000);
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.getAttribute('data-width');
        skillBar.style.width = width;
        observer.unobserve(skillBar);
      }
    });
  }, { threshold: 0.3 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
  
  // Enhanced Form submission with SweetAlert
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Show loading state
      submitBtn.classList.add('loading');
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message with SweetAlert
        await Swal.fire({
          title: 'Message Sent Successfully!',
          text: `Thank you ${formData.name}, I have received your message and will get back to you within 24 hours.`,
          icon: 'success',
          confirmButtonText: 'Great!',
          customClass: {
            popup: 'success-pulse'
          },
          background: 'var(--second-bg-color)',
          color: 'var(--text-color)',
          confirmButtonColor: 'var(--main-color)'
        });
        
        // Reset form
        contactForm.reset();
        
      } catch (error) {
        // Show error message with SweetAlert
        await Swal.fire({
          title: 'Oops!',
          text: 'There was an error sending your message. Please try again or contact me directly at parillajohnphilip2@gmail.com',
          icon: 'error',
          confirmButtonText: 'Try Again',
          background: 'var(--second-bg-color)',
          color: 'var(--text-color)',
          confirmButtonColor: 'var(--main-color)'
        });
      } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
      }
    });
  }
});

// Scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
  const reveals = document.querySelectorAll('.service-card, .project-card, .about-content, .home-content');
  
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 50;
    
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    }
  }
}

// Initialize scroll reveal on page load
window.addEventListener('load', reveal);

// Touch device optimizations
document.addEventListener('touchstart', function() {}, {passive: true});
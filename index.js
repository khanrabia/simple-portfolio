// Simple fade-in animation for sections on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
  
    function checkSections() {
      const triggerBottom = window.innerHeight * 0.9;
  
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
  
        if(sectionTop < triggerBottom) {
          section.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', checkSections);
    checkSections(); // initial check
  });
  
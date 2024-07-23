document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".navbar-nav li a");

  const options = {
    threshold: 0.8
  };

  let currentSectionIndex = 0;
  let isScrolling = false;

  const updateNavLinks = (index) => {
    navLinks.forEach(link => link.parentElement.classList.remove("active"));
    navLinks[index].parentElement.classList.add("active");
  };

  const intersectionHandler = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach((section, index) => {
          if (section === entry.target) {
            currentSectionIndex = index;
            updateNavLinks(currentSectionIndex);
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(intersectionHandler, options);
  sections.forEach(section => {
    observer.observe(section);
  });

  const navigateToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      isScrolling = true;
      navLinks[index].click();
      setTimeout(() => {
        isScrolling = false;
      }, 1000); // Delay to prevent rapid successive scrolling
    }
  };

  const handleWheel = (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      // Scrolling down
      navigateToSection(currentSectionIndex + 1);
    } else {
      // Scrolling up
      navigateToSection(currentSectionIndex - 1);
    }
  };

  window.addEventListener('wheel', handleWheel, false);

  // Listen for messages from the iframe
  window.addEventListener('message', function(event) {
    if (event.origin !== window.location.origin) {
      return; // Ensure the message is from the correct origin
    }
    const data = event.data;
    if (data.type === 'iframeScroll') {
      if (data.direction === 'up') {
        navigateToSection(currentSectionIndex - 1);
      } else if (data.direction === 'down') {
        navigateToSection(currentSectionIndex + 1);
      }
    }
  });

  // Sending scroll events to iframes
  const iframes = document.querySelectorAll('iframe');
  const sendScrollMessage = (direction) => {
    iframes.forEach(iframe => {
      iframe.contentWindow.postMessage({ type: 'iframeScroll', direction }, window.location.origin);
    });
  };

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      sendScrollMessage('down');
    } else {
      sendScrollMessage('up');
    }
  }, false);
});

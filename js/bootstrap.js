document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".navbar-nav li a");

  const options = {
    threshold: 0.5
  };

  const intersectionHandler = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.parentElement.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.parentElement.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(intersectionHandler, options);
  sections.forEach(section => {
    observer.observe(section);
  });

  let lastScrollTime = 0;
  let scrollTimeout;

  const handleWheel = (event) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastScrollTime;

    if (timeDiff > 500) {
      if (event.deltaY > 0) {
        console.log("Scrolling down");
      } else {
        console.log("Scrolling up");
      }
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (event.deltaY > 0) {
        console.log("Final scroll down");
      } else {
        console.log("Final scroll up");
      }
    }, 500);

    lastScrollTime = currentTime;
  };

  window.addEventListener('wheel', handleWheel, false);
});

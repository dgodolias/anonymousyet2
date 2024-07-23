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
});

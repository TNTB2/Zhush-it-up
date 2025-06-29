document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  // Ensure nav starts closed on page load
  navLinks.classList.remove("active", "closing");

  // Toggle burger menu open/close
  burger.addEventListener("click", () => {
    if (!navLinks.classList.contains("active")) {
      // Opening menu
      navLinks.classList.add("active");
      navLinks.classList.remove("closing");

      // Restart slide-in animation
      navLinks.querySelectorAll("li").forEach((li) => {
        li.style.animation = "none";
        li.offsetHeight; // trigger reflow
        li.style.animation = "";
      });
    } else {
      // Closing menu
      navLinks.classList.add("closing");

      // Listen for animation end on last item to hide menu
      const lastLi = navLinks.querySelector("li:last-child");
      lastLi.addEventListener("animationend", function handler() {
        navLinks.classList.remove("active", "closing");
        // Clean up animation styles
        navLinks.querySelectorAll("li").forEach((li) => {
          li.style.animation = "none";
        });
        lastLi.removeEventListener("animationend", handler);
      });
    }
  });

  // Close burger menu when any nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        // Close menu immediately on link click to prevent broken state after navigation
        navLinks.classList.remove("active");
        navLinks.classList.remove("closing");
      }
    });
  });

  // Optional: on window resize, force menu closed (to avoid glitch)
  window.addEventListener("resize", () => {
    if (navLinks.classList.contains("active") || navLinks.classList.contains("closing")) {
      navLinks.classList.remove("active", "closing");
    }
  });
});

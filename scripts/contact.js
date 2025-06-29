document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  if (!name || !email || !subject || !message) {
    status.textContent = "Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  // Simulated successful submission
  status.textContent = "Message sent! Please continue via WhatsApp.";
  status.style.color = "#1b4332";

  // Optionally reset form
  this.reset();
});

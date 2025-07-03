

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default redirect

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");
  const buttonWrapper = document.getElementById("buttonWrapper");

  // Prepare form data
  const formData = {
    name,
    email,
    subject,
    message,
  };

  fetch("https://formsubmit.co/ajax/info@zhushitup.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        buttonWrapper.style.display = "none";
        status.style.display = "block";
        status.textContent = "Thank you for your message! We'll be in touch soon.";
        document.getElementById("contactForm").reset();
      } else {
        status.style.display = "block";
        status.style.color = "red";
        status.textContent = "Something went wrong. Please try again later.";
      }
    })
    .catch(() => {
      status.style.display = "block";
      status.style.color = "red";
      status.textContent = "Network error. Please try again.";
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      // If this item is already active, close it
      if(item.classList.contains('active')) {
        item.classList.remove('active');
      } else {
        // Close any other open FAQ
        faqItems.forEach(i => i.classList.remove('active'));
        // Open this one
        item.classList.add('active');
      }
    });
  });
});

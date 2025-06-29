document.addEventListener('DOMContentLoaded', () => {
  // Toggle wrappers
  const roleToggle = document.getElementById('roleToggle');
  const authToggle = document.getElementById('authToggle');

  // Form containers
  const userForms = document.getElementById('user-forms');
  const companyForms = document.getElementById('company-forms');

  // Forms inside user and company containers
  const userLoginForm = document.getElementById('user-login-form');
  const userRegisterForm = document.getElementById('user-register-form');
  const companyLoginForm = document.getElementById('company-login-form');
  const companyRegisterForm = document.getElementById('company-register-form');

  // Helper to move slider element inside toggle wrapper
  function moveSlider(wrapper, activeIndex) {
    const slider = wrapper.querySelector('.toggle-slider');
    slider.style.left = `${activeIndex * 50}%`;
  }

  // Setup toggle logic for a toggle-wrapper element
  function setupToggle(wrapper, onChange) {
    const options = wrapper.querySelectorAll('.toggle-option');

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        moveSlider(wrapper, index);
        onChange(option.dataset.value);
      });
    });
  }

  // Role toggle changes user/company forms shown
  setupToggle(roleToggle, (role) => {
    if (role === 'user') {
      userForms.classList.remove('hidden');
      companyForms.classList.add('hidden');
    } else {
      userForms.classList.add('hidden');
      companyForms.classList.remove('hidden');
    }
    // Reset auth toggle to login when switching roles
    authToggle.querySelectorAll('.toggle-option').forEach(o => o.classList.remove('active'));
    authToggle.querySelector('.toggle-option[data-value="login"]').classList.add('active');
    moveSlider(authToggle, 0);

    // Show login forms by default
    userLoginForm.classList.remove('hidden');
    userRegisterForm.classList.add('hidden');
    companyLoginForm.classList.remove('hidden');
    companyRegisterForm.classList.add('hidden');
  });

  // Auth toggle changes login/register forms shown
  setupToggle(authToggle, (auth) => {
    if (userForms.classList.contains('hidden')) {
      // Company forms active
      if (auth === 'login') {
        companyLoginForm.classList.remove('hidden');
        companyRegisterForm.classList.add('hidden');
      } else {
        companyLoginForm.classList.add('hidden');
        companyRegisterForm.classList.remove('hidden');
      }
    } else {
      // User forms active
      if (auth === 'login') {
        userLoginForm.classList.remove('hidden');
        userRegisterForm.classList.add('hidden');
      } else {
        userLoginForm.classList.add('hidden');
        userRegisterForm.classList.remove('hidden');
      }
    }
  });

  // Initialise sliders and state
  moveSlider(roleToggle, 0);
  moveSlider(authToggle, 0);
  userForms.classList.remove('hidden');
  companyForms.classList.add('hidden');
  userLoginForm.classList.remove('hidden');
  userRegisterForm.classList.add('hidden');
  companyLoginForm.classList.remove('hidden');
  companyRegisterForm.classList.add('hidden');
});

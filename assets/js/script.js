console.log('✅ JavaScript is running!');

// Hämta element från DOM
const nav = document.querySelector('.nav');
const menuList = document.getElementById('menu-list');
const menuIcon = document.getElementById('menu-icon');
const closeMenu = document.getElementById('close-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const allLinks = document.querySelectorAll('a[href^="#"]');
const form = document.getElementById('contact-form-container');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// 📌 Öppna hamburgermenyn vid klick
menuIcon.addEventListener('click', () => {
  menuList.classList.add('show-menu');
});

// 📌 Stäng menyn vid klick på kryss
function closeMenuFunction() {
  menuList.classList.remove('show-menu');
}
closeMenu.addEventListener('click', closeMenuFunction);

// 📌 Stäng menyn vid klick på en meny-länk
menuLinks.forEach((link) => {
  link.addEventListener('click', closeMenuFunction);
});

// 📌 Skrolla smidigt till sektion vid klick på länk
allLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Om menyn är öppen, stäng den
    if (menuList.classList.contains('show-menu')) {
      closeMenuFunction();
    }
  });
});

// 📌 Formulärvalidering och POST-förfrågan
function showError(input, message) {
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains('error-message')) {
    existingError.remove();
  }

  const error = document.createElement('p');
  error.classList.add('error-message');
  error.style.color = 'red';
  error.style.fontSize = '14px';
  error.style.marginTop = '5px';
  error.textContent = message;
  input.insertAdjacentElement('afterend', error);
}

function clearError(input) {
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains('error-message')) {
    existingError.remove();
  }
}

function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;

  // Kontrollera namn
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Kontrollera e-post
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Email is required');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Kontrollera meddelande
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Message cannot be empty');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  // 📌 Skicka formuläret med fetch om allt är giltigt
  if (isValid) {
    console.log('🚀 Form is valid and ready to be submitted!');

    const formData = new FormData(form);

    fetch('https://httpbin.org/anything', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('✅ Form submitted successfully:', data);
        form.innerHTML =
          "<p style='color: green;'>Thank you! Your message has been sent.</p>";
      })
      .catch((error) => {
        console.error('❌ Error submitting form:', error);
      });
  }
});

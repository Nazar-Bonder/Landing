// ==========================================================================
// 1. Конфігурація та регулярні вирази (RegEx)
// ==========================================================================
const REGEX_NAME = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\-\s]{2,60}$/;
const REGEX_PHONE = /^\+380\d{9}$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_MODEL = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s\-./()+]{2,80}$/;

// ==========================================================================
// 2. Допоміжні функції керування UI-станами та доступністю (ARIA)
// ==========================================================================
function showError(inputElement, errorElement, message) {
  if (inputElement) {
    inputElement.classList.remove('is-valid');
    inputElement.classList.add('is-invalid');
    inputElement.setAttribute('aria-invalid', 'true');
  }
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function showSuccess(inputElement, errorElement) {
  if (inputElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    inputElement.setAttribute('aria-invalid', 'false');
  }
  errorElement.textContent = '';
  errorElement.hidden = true;
}

function resetFieldState(inputElement, errorElement) {
  if (inputElement) {
    inputElement.classList.remove('is-invalid', 'is-valid');
    inputElement.setAttribute('aria-invalid', 'false');
  }
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.hidden = true;
  }
}

// ==========================================================================
// 3. Окремі функції валідації для кожного поля форми
// ==========================================================================
function validateName() {
  const input = document.getElementById('username');
  const error = document.getElementById('usernameError');
  const value = input.value.trim();

  if (value.length < 2) {
    showError(input, error, "Введіть ім'я та прізвище (мінімум 2 символи).");
    return false;
  }
  if (!REGEX_NAME.test(value)) {
    showError(input, error, "Ім'я може містити лише літери, пробіл, дефіс або апостроф.");
    return false;
  }

  showSuccess(input, error);
  return true;
}

function validatePhone() {
  const input = document.getElementById('phone');
  const error = document.getElementById('phoneError');
  const value = input.value.trim();

  if (!REGEX_PHONE.test(value)) {
    showError(input, error, 'Введіть номер у форматі +380XXXXXXXXX (9 цифр після +380).');
    return false;
  }

  showSuccess(input, error);
  return true;
}

function validateEmail() {
  const input = document.getElementById('email');
  const error = document.getElementById('emailError');
  const value = input.value.trim();

  if (!REGEX_EMAIL.test(value)) {
    showError(input, error, 'Введіть коректну електронну пошту (наприклад: user@gmail.com).');
    return false;
  }

  showSuccess(input, error);
  return true;
}

function validateDeviceModel() {
  const input = document.getElementById('deviceModel');
  const error = document.getElementById('deviceModelError');
  const value = input.value.trim();

  if (value.length < 2) {
    showError(input, error, 'Вкажіть бренд та модель пристрою (мінімум 2 символи).');
    return false;
  }
  if (!REGEX_MODEL.test(value)) {
    showError(input, error, 'Назва моделі містить недопустимі символи.');
    return false;
  }

  showSuccess(input, error);
  return true;
}

function validateDeviceType() {
  const checkedRadio = document.querySelector('input[name="deviceType"]:checked');
  const error = document.getElementById('deviceTypeError');

  if (!checkedRadio) {
    showError(null, error, 'Оберіть тип вашого пристрою зі списку.');
    return false;
  }

  showSuccess(null, error);
  return true;
}

function validateMessage() {
  const input = document.getElementById('message');
  const error = document.getElementById('messageError');
  const value = input.value.trim();

  if (value.length < 10) {
    showError(input, error, `Опишіть поломку детальніше (мінімум 10 символів, зараз: ${value.length}).`);
    return false;
  }

  showSuccess(input, error);
  return true;
}

function validateAgreement() {
  const checkbox = document.getElementById('agreement');
  const error = document.getElementById('agreementError');

  if (!checkbox.checked) {
    showError(checkbox, error, 'Необхідно погодитися на обробку персональних даних.');
    return false;
  }

  showSuccess(checkbox, error);
  return true;
}

// ==========================================================================
// 4. Перевірка готовності всієї форми для візуального стану кнопки Submit
// ==========================================================================
function isEntireFormReady() {
  const nameVal = document.getElementById('username').value.trim();
  const phoneVal = document.getElementById('phone').value.trim();
  const emailVal = document.getElementById('email').value.trim();
  const modelVal = document.getElementById('deviceModel').value.trim();
  const deviceChecked = Boolean(document.querySelector('input[name="deviceType"]:checked'));
  const messageVal = document.getElementById('message').value.trim();
  const agreementChecked = document.getElementById('agreement').checked;

  return (
    nameVal.length >= 2 &&
    REGEX_NAME.test(nameVal) &&
    REGEX_PHONE.test(phoneVal) &&
    REGEX_EMAIL.test(emailVal) &&
    modelVal.length >= 2 &&
    REGEX_MODEL.test(modelVal) &&
    deviceChecked &&
    messageVal.length >= 10 &&
    agreementChecked
  );
}

function updateSubmitButtonVisualState() {
  const submitBtn = document.getElementById('submitBtn');
  if (!submitBtn) return;

  if (isEntireFormReady()) {
    submitBtn.classList.remove('is-passive');
  } else {
    submitBtn.classList.add('is-passive');
  }
}

// ==========================================================================
// 5. UX-покращення: автоформатування телефону та авторозтягування textarea
// ==========================================================================
function handlePhoneUxInput(event) {
  const input = event.target;
  let cleaned = input.value.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '+380' + cleaned.slice(1);
  }

  if (cleaned.indexOf('+') > 0) {
    cleaned = cleaned.replace(/\+/g, '');
  }

  if (cleaned.startsWith('+380') && cleaned.length > 13) {
    cleaned = cleaned.slice(0, 13);
  }

  input.value = cleaned;
}

function autoResizeTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.max(112, textarea.scrollHeight)}px`;
}

// ==========================================================================
// 6. Ініціалізація обробників подій після завантаження DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('diagnosticForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const fieldsConfig = [
    { id: 'username', validator: validateName },
    { id: 'phone', validator: validatePhone },
    { id: 'email', validator: validateEmail },
    { id: 'deviceModel', validator: validateDeviceModel },
    { id: 'message', validator: validateMessage }
  ];

  // Динамічна валідація (blur + input)
  fieldsConfig.forEach(({ id, validator }) => {
    const element = document.getElementById(id);
    let isTouched = false;

    element.addEventListener('blur', () => {
      isTouched = true;
      validator();
      updateSubmitButtonVisualState();
    });

    element.addEventListener('input', () => {
      if (isTouched) {
        validator();
      }
      updateSubmitButtonVisualState();
    });
  });

  // UX телефону
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (event) => {
    handlePhoneUxInput(event);
    updateSubmitButtonVisualState();
  });

  // Авторозтягування textarea без повзунка
  const messageTextarea = document.getElementById('message');
  autoResizeTextarea(messageTextarea);
  messageTextarea.addEventListener('input', () => {
    autoResizeTextarea(messageTextarea);
  });

  // Валідація радіокнопок та чекбокса
  document.querySelectorAll('input[name="deviceType"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      validateDeviceType();
      updateSubmitButtonVisualState();
    });
  });

  document.getElementById('agreement').addEventListener('change', () => {
    validateAgreement();
    updateSubmitButtonVisualState();
  });

  // Початковий пасивний стан кнопки при завантаженні сторінки
  updateSubmitButtonVisualState();

  // Модальне вікно
  function openModal() {
    successModal.hidden = false;
    closeModalBtn.focus();
  }

  function closeModal() {
    successModal.hidden = true;
  }

  closeModalBtn.addEventListener('click', closeModal);

  successModal.addEventListener('click', (event) => {
    if (event.target === successModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !successModal.hidden) {
      closeModal();
    }
  });

  // Обробка відправки форми (Submit)
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = [
      validateName(),
      validatePhone(),
      validateEmail(),
      validateDeviceModel(),
      validateDeviceType(),
      validateMessage(),
      validateAgreement()
    ];

    const isFormValid = results.every(Boolean);

    if (!isFormValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Очищуємо форму, повертаємо початкову висоту textarea і пасивну кнопку
    form.reset();
    messageTextarea.style.height = '112px';

    fieldsConfig.forEach(({ id }) => {
      resetFieldState(
        document.getElementById(id),
        document.getElementById(`${id}Error`)
      );
    });
    resetFieldState(null, document.getElementById('deviceTypeError'));
    resetFieldState(
      document.getElementById('agreement'),
      document.getElementById('agreementError')
    );

    updateSubmitButtonVisualState();
    openModal();
  });
});
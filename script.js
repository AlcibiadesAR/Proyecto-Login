document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("formlogin");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const emailError = document.getElementById("errorEmail");
  const passwordError = document.getElementById("errorPassword");
  const confirmPasswordError = document.getElementById("errorConfirmPassword");
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = '<ion-icon name="eye-off-outline" id="eye-off-outline"></ion-icon>';
  const eyeOnIcon = '<ion-icon name="eye-outline" id="eye-off-outline"></ion-icon>';

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInput.addEventListener("blur", function () {
    validateEmail();
  });

  emailInput.addEventListener("change", function () {
    clearError(emailError);
  });

  passwordInput.addEventListener("change", function () {
    clearError(passwordError);
  });

  confirmPasswordInput.addEventListener("change", function () {
    clearError(confirmPasswordError);
  });

 
  eyeIcon.addEventListener('click', function() {
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
      confirmPasswordInput.type = 'text';

      eyeIcon.innerHTML = eyeOnIcon;
    } else{
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password';

      eyeIcon.innerHTML = eyeOffIcon;
    }
  })

  function validateForm() {
    const isValidateEmail = validateEmail();
    const isValidatePassword = validatePassword();
    const passwordMatch = validatePasswordMatch();

    if (isValidateEmail && isValidatePassword && passwordMatch) {
      saveToLoacalStorage();
      alert("Has ingresado con éxito");
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInput.value.trim();
    if (!emailRegex.test(emailValue)) {
      showError(emailError, "Ingresa un email válido");
      return false;
    }

    return true;
  }

  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    if (passwordValue.length < 8) {
      showError(
        passwordError,
        "Ingresa una contraseña de al menos 8 caracteres"
      );
      return false;
    }
    return true;
  }

  function validatePasswordMatch() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (passwordValue != confirmPasswordValue) {
      showError(confirmPasswordError, "Las contraseñas no coinciden");
      return false;
    }

    return true;
  }

  function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  }

  function clearError(errorElement) {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  }

  function saveToLoacalStorage() {
    const emailValue = emailInput.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      "Email": emailInput.value,
      "Password": passwordInput.value,
    };
  }
});

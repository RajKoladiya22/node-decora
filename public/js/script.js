// Show and Hide password
const showPassword = (inputId, iconId) => {
    let inputPassword = document.getElementById(inputId);
    let eyeIcon = document.getElementById(iconId);

    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        eyeIcon.src = 'assets/img/eye-unhide.svg';
    } else {
        inputPassword.type = 'password';
        eyeIcon.src = 'assets/img/Eye.svg';
    }
};

// Register page

if (location.pathname.includes("register.html")) {
    const agree = document.querySelector("#agree");
    const submit = document.querySelector(".register-btn");''
    submit.setAttribute('disabled',true);
    submit.classList.remove("otp-acttive");
    
    agree.addEventListener('change', function () {
        // submit.disabled = !this.checkValidity();
        // submit.classList.add("otp-acttive");
        if (this.checked) {
            submit.removeAttribute('disabled');
            submit.classList.add("otp-acttive");
        } else {
            submit.setAttribute('disabled', true);
            submit.classList.remove("otp-acttive");
        }
    });
    
}

// OTP page
const inputs = document.querySelectorAll(".otp-num");
const button = document.querySelector(".otp-verify");
const a_tag = document.querySelector(".verify-a");

if (location.pathname.includes("otp.html")) {


    window.addEventListener("load", () => inputs[0].focus());
    button.setAttribute("disabled", "disabled");
    
    inputs[0].addEventListener("paste", function (event) {
      event.preventDefault();
    
      const pastedValue = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      const otpLength = inputs.length;
    
      for (let i = 0; i < otpLength; i++) {
        if (i < pastedValue.length) {
          inputs[i].value = pastedValue[i];
          inputs[i].removeAttribute("disabled");
          inputs[i].focus;
        } else {
          inputs[i].value = ""; // Clear any remaining inputs
          inputs[i].focus;
        }
      }
    });
    
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = input;
        const nextInput = input.nextElementSibling;
        const prevInput = input.previousElementSibling;
    
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
    
        if (
          nextInput &&
          nextInput.hasAttribute("disabled") &&
          currentInput.value !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }
    
        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", true);
              input.value = "";
              prevInput.focus();
            }
          });
        }
    
        button.classList.remove("otp-acttive");
        button.setAttribute("disabled", "disabled");
    
        const inputsNo = inputs.length;
        if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
          button.classList.add("otp-acttive");
          button.removeAttribute("disabled");
          a_tag.setAttribute("href","index.html");
    
          return;
        }
      });
    });
}



//header script

$(document).ready(function() {
    $("#toggle").click(function(){
        $("#add-class").addClass("active");
    });
    $("#cross").click(function(){
        $("#add-class").removeClass("active");
    });

})
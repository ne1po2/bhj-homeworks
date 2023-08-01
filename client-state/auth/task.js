function sendAjaxRequest(url, data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(xhr.responseText);
      } else {
        onError(xhr.status);
      }
    }
  };
  xhr.send(data);
}

function handleLoginSuccess(userId) {
  const signinForm = document.getElementById("signin");
  signinForm.classList.remove("signin_active");

  const welcomeBlock = document.getElementById("welcome");
  welcomeBlock.classList.add("welcome_active");

  const userIdSpan = document.getElementById("user_id");
  userIdSpan.textContent = userId;

  localStorage.setItem("user_id", userId);
}

function handleLoginError() {
  alert("Неверный логин/пароль");
  const loginInput = document.querySelector("input[name='login']");
  const passwordInput = document.querySelector("input[name='password']");
  loginInput.value = "";
  passwordInput.value = "";
}

function checkStoredUserId() {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    const welcomeBlock = document.getElementById("welcome");
    welcomeBlock.classList.add("welcome_active");

    const userIdSpan = document.getElementById("user_id");
    userIdSpan.textContent = userId;
  }
}

document.getElementById("signin__form").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = {
    login: formData.get("login"),
    password: formData.get("password"),
  };
  const jsonData = JSON.stringify(data);

  const url = "https://students.netoservices.ru/nestjs-backend/auth";
  sendAjaxRequest(
    url,
    jsonData,
    function (response) {
      const jsonResponse = JSON.parse(response);
      if (jsonResponse.success) {
        handleLoginSuccess(jsonResponse.user_id);
      } else {
        handleLoginError();
      }
    },
    function (status) {
      handleLoginError(status);
    }
  );
});

document.addEventListener("DOMContentLoaded", function () {
  checkStoredUserId();
});
const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");

const submit = document.querySelector("#submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!email.value.trim()) {
    alert("Please fill email");
    return;
  }
  if (!password.value.trim()) {
    alert("Please fill password");
    return;
  }
  if (
    email.value.trim() === localStorage.getItem("email") &&
    password.value.trim() === localStorage.getItem("password")
  ) {
    setTimeout(() => {
      window.location = "../index.html";
    }, 500);
  } else {
    alert("Incorrect passwoed & email");
  }
});

const fName = document.querySelector("#inputFName");
const lName = document.querySelector("#inputLName");
const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");

const submit = document.querySelector("#submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fName.value == "" ||
    lName.value == "" ||
    email.value == "" ||
    password.value == ""
  ) {
    alert("Please fill data");
  } else {
    localStorage.setItem("fname", fName.value);
    localStorage.setItem("lname", lName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "./login.html";
    }, 500);
  }
});

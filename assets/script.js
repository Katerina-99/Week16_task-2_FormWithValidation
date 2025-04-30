const form = document.forms.myForm;
const button = document.querySelector("#submitBtn");
const userNameInput = form.elements.userName;
const emailInput = form.elements.email;
const ageInput = form.elements.age;
const professionInput = form.elements.profession;
const passwordInput = form.elements.password;
const genderInputs = form.elements.gender;
const formElements = document.querySelectorAll("input, select");

let agreeTermsCheckbox = form.elements.agreeTerms;

button.disabled = true;

//Errors
const usernameError = document.querySelector("#usernameError");
const genderError = document.querySelector("#genderError");

//добавляем обработчик событий на focus и blur. меняем цвет границ инпута
formElements.forEach((element) => {
  element.addEventListener("focus", () => {
    element.style.outline = "none";
    element.style.border = "2px solid #3CB371";
    element.style.borderRadius = "5px";
  });

  element.addEventListener("blur", () => {
    element.style.border = "";
    element.style.borderRadius = "";
  });
});

//разблокируем или блкируем кнопку отправки в зависимости от состояния чекбокса
agreeTermsCheckbox.addEventListener("change", () => {
  button.disabled = !agreeTermsCheckbox.checked;
});

//функция на валидность имени(чтобы были только буквы и пробелы)
const validateUserName = (name) => {
  let regexName = /^[A-Za-zА-Яа-яЁё\s]+$/;
  return regexName.test(name);
};

//слушатель события на кнопку отправить
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;
  let genderSelected = false;

  //очистка предыдущих сообщений об ошибках
  usernameError.style.display = "none";

  //проверяем поле имени на валидность
  if (validateUserName(userNameInput.value) === false) {
    usernameError.textContent = "Имя должно содержать только буквы и пробелы";
    usernameError.style.display = "block";
    hasError = true;
  }

  //перебираем чекбоксы и если одни из них выбран меняем значение переменной
  for (let input of genderInputs) {
    if (input.checked) {
      genderSelected = true;
      break;
    }
  }

  //проверяем если хоть один чекбокс пола выбран
  if (!genderSelected) {
    genderError.textContent = "Пожалуйста, выберите пол";
    genderError.style.display = "block";
    hasError = true;
  } else {
    genderError.textContent = "";
    genderError.style.display = "none";
  }

  if (hasError === false) {
    alert("Форма успешно отправлена!");

    console.log(`Значение поля Имя: ${userNameInput.value}`);
    console.log(`Значение поля Email: ${emailInput.value}`);
    console.log(`Значение поля Возраст: ${ageInput.value}`);
    console.log(`Значение поля Пол: ${genderInputs.value}`);
    console.log(`Значение поля Профессия: ${professionInput.value}`);
    console.log(`Значение поля Пароль: ${passwordInput.value}`);
    console.log(`Значение поля Согласие: ${agreeTermsCheckbox.checked}`);

    form.reset();
  }
});

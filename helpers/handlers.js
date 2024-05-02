import storageService from "../services/localStorageService.js";
import { displayList } from "./list.js";
import apiService from "../services/apiService.js";
import { displayAdminPage } from "../templates/adminPage.js";

let username = "";

function handleRegFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const answerCounts =
    storageService.load(storageService.STORAGE_KEYS.answerCounts) ?? 0;

  if (answerCounts >= 4 && formData.get("name") !== "admin") {
    alert("Ви досягли ліміт відповідей!");
    form.elements.submit.disabled = true;
    return;
  }

  if (!formData.get("password") && formData.get("name") !== "admin") {
    form.remove();
    storageService.save(
      storageService.STORAGE_KEYS.answerCounts,
      answerCounts + 1
    );
    displayList();
  } else if (
    formData.get("name") === "admin" &&
    formData.get("password") === "admin"
  ) {
    form.remove();
    displayAdminPage();
  }

  username = formData.get("name");
}

function handleRegFormInput(event) {
  const form = event.currentTarget;
  const formData = new FormData(form);
  if (formData.get("name") === "admin") {
    adminPasswordField.classList.add("active");
    form.elements.submit.disabled = false;
  } else {
    adminPasswordField.classList.remove("active");
  }
}

function gandleDataSend() {
  const list = document.getElementById("list");
  const topChoises = [...list.children].slice(0, 3);

  const statuses = [];

  topChoises.forEach((item, i) => {
    const data = {
      name: item.textContent.trim(),
      priority: i + 1,
      username,
    };

    apiService
      .addNewSelection(data)
      .then(({ status }) => statuses.push(status))
      .then(() => {
        if (statuses.length !== 3) return;

        const isAllCreated = statuses.every((status) => status === 201);

        if (isAllCreated) {
          alert("Ваша відповідь записана! Дякуємо за участь!");
        } else {
          alert("Щось пішло не так, спробуйте ще раз!");
        }
        location.reload();
      })
      .catch(console.log);
  });
}

export default { handleRegFormInput, handleRegFormSubmit, gandleDataSend };
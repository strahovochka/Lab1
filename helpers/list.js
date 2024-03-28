import data from "../data.json" assert { type: "json" };
import refs from "../refs.js";
import handlers from "./handlers.js";

function createListMarkup() {
  const listMarkup = data
    .map(
      (item) =>
        `<li class="item" draggable="true"><span>${item}</span>
        <i class="uil uil-draggabledots"></i>
        </li>`
    )
    .join("");

  return `<ul class="sortable-list" id="list">${listMarkup}</ul> <button class="answer-send-btn" id="answerSendBtn">Send</button>`;
}

function displayList() {
  refs.listContainer.innerHTML = createListMarkup();
  const sortableList = document.querySelector(".sortable-list");

  Sortable.create(sortableList, {
    animation: 150,
  });

  document
    .getElementById("answerSendBtn")
    .addEventListener("click", handlers.gandleDataSend);
}

export { displayList };

import refs from "../refs.js";
import apiService from "../services/apiService.js";

async function displayAdminPage() {
  const allSelections = await apiService.getAll();

  const uniqueResults = {}; // обʼєкт у форматі ключ це назва вибору, значення це обʼєкт { 1: 0, 2: 0, 3: 0 }

  allSelections.forEach(({ name, priority }) => {
    if (!uniqueResults[name]) uniqueResults[name] = { 1: 0, 2: 0, 3: 0 };

    uniqueResults[name][priority] += 1;
  });
  let i = 3;
  while (Object.keys(uniqueResults).length > 10 && i > 0) {
    Object.keys(uniqueResults).forEach (item => {
      if (uniqueResults[item][i] === 1) {
        delete uniqueResults[item]
      }
    })
    i--;
  }
  refs.listContainer.innerHTML = createTable(uniqueResults); // додаємо таблицю на сторінку
}

function createRow(name, priorities) {
  return `<tr>
    <td>${name}</td>
    <td>${priorities[1]}</td>
    <td>${priorities[2]}</td>
    <td>${priorities[3]}</td>
    </tr>`;
}

function createTable(results) {
  const choises = Object.keys(results);
  const priorities = Object.values(results);
  const tbodyMarkup = choises
    .map((choise, i) => createRow(choise, priorities[i]))
    .join("");

  return `<table class="admin-table">
            <thead>
                <th>Name</th>
                <th>First</th>
                <th>Second</th>
                <th>Third</th>
            </thead>
            <tbody>
            ${tbodyMarkup}  
            </tbody>
        </table>`;
}

export { displayAdminPage };

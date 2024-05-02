import refs from "../refs.js";
import apiService from "../services/apiService.js";
import calc from "../helpers/calculations.js"

async function displayAdminPage() {
  const allSelections = await apiService.getAll();
  //console.log(allSelections)
  const uniqueResults = {}; // обʼєкт у форматі ключ це назва вибору, значення це обʼєкт { 1: 0, 2: 0, 3: 0 }
  allSelections.forEach(({ name, priority }) => {
    if (!uniqueResults[name]) uniqueResults[name] = { 1: 0, 2: 0, 3: 0 };

    uniqueResults[name][priority] += 1;
  });
  let i = 3;
  while (Object.keys(uniqueResults).length > 10 && i > 0) {
    Object.keys(uniqueResults).forEach(item => {
      if (uniqueResults[item][i] === 1) {
        delete uniqueResults[item]
        allSelections.forEach(itemSelection => {
          if (itemSelection.name === item) {
            delete allSelections[itemSelection];
          }
        })
      }
    })
    i--;
  }
  const userAnswersCollection = {};

  const choisesArray = Object.keys(uniqueResults).map((choise) =>
    choise.toLowerCase()
  );

  allSelections.forEach(({ username, name, priority }) => {
    if (!choisesArray.includes(name.toLowerCase())) {
      return;
    }

    const selectionObj = { name, priority };

    if (userAnswersCollection[username]) {
      userAnswersCollection[username].push(selectionObj);
    } else {
      userAnswersCollection[username] = [selectionObj];
    }
  });

  let rangeMatrix = calc.createRangeMatrix(userAnswersCollection, uniqueResults);
  let permuteResult = calc.permutationResult(Object.keys(uniqueResults).length, rangeMatrix);
  let minSums = calc.getMinRanges(permuteResult, "sum");
  let minMax = calc.getMinRanges(permuteResult, "max");

  console.log(rangeMatrix);
  console.log(permuteResult);
  console.log(minSums);
  let ranguvanniaSum = [];
  minSums.forEach(object => {
    ranguvanniaSum.push(calc.convertToRanguvannia(object.permutation));
  })
  console.log(minSums); // dispaly SUM and table for all of perm results
  console.log(ranguvanniaSum); // display table for all of perm results

  let ranguvanniaMax = [];
  console.log(minMax); // display MM  and table for all of perm results
  minMax.forEach(object => {
    ranguvanniaMax.push(calc.convertToRanguvannia(object.permutation));
  }) 
  console.log(ranguvanniaMax); // display table for all of perm results

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

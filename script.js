const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser(); //calling three times bcz we want three user by default

//Fetch random users and add money
async function getRandomUser() {
  //using async we don't have to use .then with fetch
  const res = await fetch("https://randomuser.me/api"); //fetch returns a promise so we use await for it to finish
  const data = await res.json();

  const user = data.results[0]; //fetch gives a object which has result array which contain name can check it by console.log(data)

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000), //Math.random generates a random decimal
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  UpdateDOM();
}

//Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money); //using .money since a, b are objects not number

  UpdateDOM();
}

//Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  UpdateDOM();
}

//Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <storng>${formatMoney(
    wealth
  )}</strong> </h3>`;
  main.appendChild(wealthEl);
}

//Add new obj to data array
function addData(obj) {
  data.push(obj);

  UpdateDOM();
}

function UpdateDOM(providedData = data) {
  //this equal to set the default value to be passed in the function
  //clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Adding event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

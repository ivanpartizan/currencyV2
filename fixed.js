const currencies = "https://openexchangerates.org/api/currencies.json";

const input = document.querySelector("#amount");
const button = document.querySelector("#convert");
const swap = document.querySelector(".iconBox");
const resultHeading = document.querySelector("#result");
const fromToText = document.querySelector("#fromTo");
const toFromText = document.querySelector("#toFrom");

const select = document.querySelectorAll("select");

async function getCurrencies() {
  const response = await fetch(currencies);
  const data = await response.json();

  const keys = Object.keys(data);
  const values = Object.values(data);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].match(/(CLF|CNH|MRO|STD|VEF|XAG|XAU|XPD|XPT)/)) continue;
    select[0].innerHTML =
      select[1].innerHTML += `<option value="${keys[i]}">${keys[i]} - ${values[i]}</option>`;
  }
}

getCurrencies();

async function getData(rev = "false") {
  if (input.value > 0) {
    let fromOptions = document.querySelector("#from");
    let toOptions = document.querySelector("#to");
    let fromValue = fromOptions.options[fromOptions.selectedIndex].value;
    let fromText = fromOptions.options[fromOptions.selectedIndex].text;
    let toValue = toOptions.options[toOptions.selectedIndex].value;
    let toText = toOptions.options[toOptions.selectedIndex].text;

    if (rev === "swap") {
      [fromValue, toValue] = [toValue, fromValue];
      [fromText, toText] = [toText, fromText];
    }

    const url = `https://api.exchangerate.host/convert?from=${fromValue}&to=${toValue}&amount=${input.value}`;

    const response = await fetch(url);
    const data = await response.json();

    resultHeading.innerText = `${input.value} ${fromText.slice(6)}s =
    ${data.result} ${toText.slice(6)}s`;

    fromToText.innerText = `1 ${fromValue} = ${data.info.rate} ${toValue}`;
    toFromText.innerText = `1 ${toValue} = ${1 / data.info.rate} ${fromValue}`;
  } else {
    alert("Please, enter a valid amount");
  }
}

button.addEventListener("click", getData);

swap.addEventListener("click", () => {
  getData("swap");
});

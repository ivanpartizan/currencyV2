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
  console.log(data);
  const keys = Object.keys(data);
  const values = Object.values(data);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].match(/(CLF|CNH|MRO|STD|VEF|XAG|XAU|XPD|XPT)/)) continue;
    select[0].innerHTML =
      select[1].innerHTML += `<option value="${keys[i]}">${keys[i]} - ${values[i]}</option>`;
  }
}

getCurrencies();

const apiKey = "bf762ef2bf54e3c071fa8668";

async function getData(reverse = "false") {
  if (input.value > 0) {
    let fromOptions = document.querySelector("#from");
    let toOptions = document.querySelector("#to");
    let fromValue = fromOptions.options[fromOptions.selectedIndex].value;
    let fromText = fromOptions.options[fromOptions.selectedIndex].text;
    let toValue = toOptions.options[toOptions.selectedIndex].value;
    let toText = toOptions.options[toOptions.selectedIndex].text;

    if (reverse === "swap") {
      [toOptions.value, fromOptions.value] = [
        fromOptions.value,
        toOptions.value,
      ];
      getData();
      return;
    }

    const url = `https://v6.exchangerate-api.com/v6/bf762ef2bf54e3c071fa8668/latest/${fromValue}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    console.log(`${data.conversion_rates[toValue] * input.value}`);
    console.log(fromText, toText);
    resultHeading.innerText = `${input.value} ${fromText.slice(6)}s =
    ${data.conversion_rates[toValue] * input.value} ${toText.slice(6)}s`;

    fromToText.innerText = `1 ${fromValue} = ${data.conversion_rates[toValue]} ${toValue}`;
    toFromText.innerText = `1 ${toValue} = ${
      1 / data.conversion_rates[toValue]
    } ${fromValue}`;
  } else {
    resultHeading.innerHTML = "Please, enter a valid amount";
    resultHeading.style.fontSize = "16px";
    fromToText.innerHTML = "";
    toFromText.innerHTML = "";
    setTimeout(function () {
      resultHeading.innerHTML = "";
      resultHeading.style.fontSize = "32px";
    }, 2000);
  }
}

button.addEventListener("click", getData);

swap.addEventListener("click", () => {
  getData("swap");
});

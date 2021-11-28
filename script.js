const aaa = "https://openexchangerates.org/api/currencies.json";
const url = "https://api.exchangerate.host/latest";

const select = document.querySelectorAll("select");

async function getCurrencies() {
  const response = await fetch(aaa);
  const data = await response.json();

  console.log(data);
  const entries = Object.keys(data);
  const values = Object.values(data);
  console.log(entries, values);

  for (let i = 0; i < entries.length; i++) {
    if (entries[i] == "CLF") continue;
    if (entries[i] == "CNH") continue;
    if (entries[i] == "MRO") continue;
    if (entries[i] == "STD") continue;
    if (entries[i] == "VEF") continue;
    if (entries[i] == "XAG") continue;
    if (entries[i] == "XAU") continue;
    if (entries[i] == "XPD") continue;
    if (entries[i] == "XPT") continue;

    select[0].innerHTML += `<option value="${entries[i]}">${entries[i]} - ${values[i]}</option>`;

    select[1].innerHTML += `<option value="${entries[i]}">${entries[i]} - ${values[i]}</option>`;
  }
}

getCurrencies();

// async function getData() {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
// }

// getData();

import { setCardProperties } from "./util.js";

const API_URI = "https://randomuser.me/api/";
const FIELDS = ["name", "picture", "nat", "registered"];

async function fetchUser(hideAddress) {
  console.debug(`Fetching user data (location: ${!hideAddress})`);

  const fieldsToFetch = hideAddress ? FIELDS : [...FIELDS, "location"];

  const res = await fetch(`${API_URI}?inc=${fieldsToFetch.join(",")}`);
  const data = await res.json();

  return data?.results[0];
}

async function generateUser() {
  const hideAddress = document.querySelector(".hide-address").checked;
  const personData = await fetchUser(hideAddress);

  const person = {
    firstName: personData.name.first,
    lastName: personData.name.last,
    registered: new Date(personData.registered.date),
    picture: personData.picture.medium,
    country: personData.location?.country,
    city: personData.location?.city,
  };

  const card = document.querySelector(".user-card");
  setCardProperties(card, person);

  let history = JSON.parse(window.localStorage.getItem("history")) || [];

  history.push(person);
  if (history.length > 10) {
    history.shift();
  }

  window.localStorage.setItem("history", JSON.stringify(history));
  console.debug("Added item to history");

  // Remove .hidden class
  card.classList.remove("hidden");
}

function setLocationInfo() {
  const location = document.querySelector(".location-container");
  const hideAddressCheckbox = document.querySelector(".hide-address");
  const state = hideAddressCheckbox.checked;

  if (state) {
    location.classList.add("hidden");
  } else {
    location.classList.remove("hidden");
  }
}

window.addEventListener("load", async () => {
  const newUserButton = document.getElementById("new-user");
  newUserButton.addEventListener("click", generateUser);

  const hideAddressCheckbox = document.querySelector(".hide-address");
  hideAddressCheckbox.addEventListener("change", setLocationInfo);

  console.debug("Registered event handlers");

  setLocationInfo(hideAddressCheckbox.checked);
});

import { setCardProperties } from "./util.js";

function addHistoryItem(person) {
  const historyContainer = document.querySelector(".history");
  const itemTemplate = document.querySelector("#history-item");

  const card = itemTemplate.content.cloneNode(true);
  setCardProperties(card, person);

  historyContainer.appendChild(card);
}

function clearHistoryItems() {
  const historyContainer = document.querySelector(".history");

  while (historyContainer.lastElementChild.tagName != "TEMPLATE") {
    historyContainer.removeChild(historyContainer.lastElementChild);
  }
}

function addHistoryItems(history, sort) {
  if (!history) return;

  let sorter = () => {
    switch (sort) {
      case "lastNameAsc":
        return (a, b) => a.lastName > b.lastName;
      case "lastNameDesc":
        return (a, b) => a.lastName < b.lastName;
      case "registeredAsc":
        return (a, b) => a.registered > b.registered;
      case "registeredDesc":
        return (a, b) => a.registered < b.registered;
      default:
        return undefined;
    }
  };

  if (sorter()) {
    history.sort(sorter());
  }

  clearHistoryItems();
  for (const item of history) {
    item.registered = new Date(item.registered);
    addHistoryItem(item);
  }

  console.debug(`Populated history with ${history.length} items`);
}

window.addEventListener("load", async () => {
  const history = JSON.parse(window.localStorage.getItem("history"));

  const sortBySelect = document.querySelector("#sort");
  sortBySelect.addEventListener("change", (e) =>
    addHistoryItems(history, e.target.value)
  );

  console.debug("Registered event handlers");

  addHistoryItems(history, sortBySelect.value);
});

const DATE_FORMAT = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

export function formatDate(date) {
  return date.toLocaleString("en-US", DATE_FORMAT);
}

export function setCardProperties(card, person) {
  const picture = card.querySelector(".picture");
  picture.setAttribute("src", person.picture);

  const name = card.querySelector(".name");
  name.textContent = `${person.firstName} ${person.lastName}`;

  const registeredAt = card.querySelector(".registered-at");
  registeredAt.textContent = `Registered ${formatDate(person.registered)}`;

  const locationContainer = card.querySelector(".location-container");
  const location = locationContainer.querySelector(".location");

  if (person.city && person.country) {
    location.textContent = `${person.city}, ${person.country}`;
  } else {
    locationContainer.classList.add("hidden");
  }
}

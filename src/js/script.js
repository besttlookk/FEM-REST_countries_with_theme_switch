//!  Custom filter
const filterField = document.querySelector("#filter-field");
const filterText = document.querySelector("#filter-text");
const filterList = document.querySelector("#filter-list");
const options = document.querySelectorAll(".filter__option");
const caret = document.querySelector("#caret");
// ! Search
const inputEl = document.querySelector("#input");
const formEl = document.querySelector("#form");
// ! container that holds all the cards
const cardContainer = document.querySelector("#card-container");
// !theme toggle
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

let countriesArr = [];

// !for custom filter
filterField.addEventListener("click", () => {
  filterList.classList.toggle("hide");
  updateCaret();
});

// ! custom filter otions
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // hide and show options on click on option
    filterList.classList.toggle("hide");
    let selectedOption = e.target.textContent;
    if (selectedOption === "America") selectedOption = "Americas";
    filterText.textContent = selectedOption;
    if (selectedOption === "All") updateDOM(countriesArr);
    else {
      const filterCountries = countriesArr.filter(
        (country) => country.region === selectedOption
      );
      updateDOM(filterCountries);
    }

    updateCaret();
  });
});

// ! caret of custom filter
function updateCaret() {
  if (filterList.classList.contains("hide")) {
    caret.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    caret.classList.replace("fa-angle-up", "fa-angle-down");
  }
}

//! making network request to get the list of all countries
function fetchAllCountries() {
  fetch("https://restcountries.com/v2/all")
    .then((data) => data.json())
    .then((countries) => {
      countriesArr = countries;
      updateDOM(countries);
    });
}

//! Search feature
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputEl.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  if (inputValue === "") {
    updateDOM(countriesArr);
  } else {
    const filterCountries = countriesArr.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    updateDOM(filterCountries);
  }
});

// ! function for updating DOM based on countries array
function updateDOM(countries) {
  cardContainer.innerHTML = "";
  countries.forEach((country) => {
    const cardClass = [
      "shadow-around",
      "rounded-md",
      "bg-white",
      "overflow-hidden",
      "dark:bg-dm-secondary",
      "cursor-pointer",
      "transform",
      "hover:scale-105",
    ];
    const card = document.createElement("a");
    card.classList.add(...cardClass);
    card.setAttribute(
      "href",
      `../detail.html?country=${country.name.toLowerCase()}`
    );
    card.innerHTML = `
        <div class="" style="height:160px">
          <img alt="flag" src="${country.flags.png}" class="w-full h-full object-cover">
        </div>
        <div class="px-6 pt-6 pb-12">
          <h3 class="font-extrabold mb-5 dark:text-white text-xl md:text-2xl">${country.name}</h3>
          <p class="text-lg"><span class="font-bold dark:text-white">Population:</span><span class="text-gray-600 dark:text-gray-100"> ${country.population}</span> </p>
          <p class="text-lg"><span class="font-bold dark:text-white">Region:</span> <span class="text-gray-600 dark:text-gray-100">${country.region}</span></p>
          <p class="text-lg"><span class="font-bold dark:text-white">Population:</span> <span class="text-gray-600 dark:text-gray-100">${country.capital}<span></p>
        </div>
    `;

    cardContainer.appendChild(card);
  });
}

// !theme toggle
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeToggle.textContent = "Dark Mode";
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

// ! making network request when page loads
fetchAllCountries();

//

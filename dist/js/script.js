"use strict";

//!  Custom filter
var filterField = document.querySelector("#filter-field");
var filterText = document.querySelector("#filter-text");
var filterList = document.querySelector("#filter-list");
var options = document.querySelectorAll(".filter__option");
var caret = document.querySelector("#caret"); // ! Search

var inputEl = document.querySelector("#input");
var formEl = document.querySelector("#form"); // ! container that holds all the cards

var cardContainer = document.querySelector("#card-container"); // !theme toggle

var themeToggle = document.querySelector("#theme-toggle");
var themeIcon = document.querySelector("#theme-icon");
var countriesArr = []; // !for custom filter

filterField.addEventListener("click", function () {
  filterList.classList.toggle("hide");
  updateCaret();
}); // ! custom filter otions

options.forEach(function (option) {
  option.addEventListener("click", function (e) {
    // hide and show options on click on option
    filterList.classList.toggle("hide");
    var selectedOption = e.target.textContent;
    if (selectedOption === "America") selectedOption = "Americas";
    filterText.textContent = selectedOption;
    if (selectedOption === "All") updateDOM(countriesArr);else {
      var filterCountries = countriesArr.filter(function (country) {
        return country.region === selectedOption;
      });
      updateDOM(filterCountries);
    }
    updateCaret();
  });
}); // ! caret of custom filter

function updateCaret() {
  if (filterList.classList.contains("hide")) {
    caret.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    caret.classList.replace("fa-angle-up", "fa-angle-down");
  }
} //! making network request to get the list of all countries


function fetchAllCountries() {
  fetch("https://restcountries.com/v2/all").then(function (data) {
    return data.json();
  }).then(function (countries) {
    countriesArr = countries;
    updateDOM(countries);
  });
} //! Search feature


formEl.addEventListener("submit", function (e) {
  e.preventDefault();
});
inputEl.addEventListener("input", function (e) {
  var inputValue = e.target.value;

  if (inputValue === "") {
    updateDOM(countriesArr);
  } else {
    var filterCountries = countriesArr.filter(function (country) {
      return country.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    updateDOM(filterCountries);
  }
}); // ! function for updating DOM based on countries array

function updateDOM(countries) {
  cardContainer.innerHTML = "";
  countries.forEach(function (country) {
    var _card$classList;

    var cardClass = ["shadow-around", "rounded-md", "bg-white", "overflow-hidden", "dark:bg-dm-secondary", "cursor-pointer", "transform", "hover:scale-105"];
    var card = document.createElement("a");

    (_card$classList = card.classList).add.apply(_card$classList, cardClass);

    card.setAttribute("href", "../detail.html?country=".concat(country.name.toLowerCase()));
    card.innerHTML = "\n        <div class=\"\" style=\"height:160px\">\n          <img alt=\"flag\" src=\"".concat(country.flags.png, "\" class=\"w-full h-full object-cover\">\n        </div>\n        <div class=\"px-6 pt-6 pb-12\">\n          <h3 class=\"font-extrabold mb-5 dark:text-white text-xl md:text-2xl\">").concat(country.name, "</h3>\n          <p class=\"text-lg\"><span class=\"font-bold dark:text-white\">Population:</span><span class=\"text-gray-600 dark:text-gray-100\"> ").concat(country.population, "</span> </p>\n          <p class=\"text-lg\"><span class=\"font-bold dark:text-white\">Region:</span> <span class=\"text-gray-600 dark:text-gray-100\">").concat(country.region, "</span></p>\n          <p class=\"text-lg\"><span class=\"font-bold dark:text-white\">Population:</span> <span class=\"text-gray-600 dark:text-gray-100\">").concat(country.capital, "<span></p>\n        </div>\n    ");
    cardContainer.appendChild(card);
  });
} // !theme toggle


themeToggle.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeToggle.textContent = "Dark Mode";
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}); // ! making network request when page loads

fetchAllCountries(); //
//# sourceMappingURL=script.js.map
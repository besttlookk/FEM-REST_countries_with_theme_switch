"use strict";

// !theme toggle
var themeToggle = document.querySelector("#theme-toggle");
var themeIcon = document.querySelector("#theme-icon"); //

var flagImgEl = document.querySelector("#flag-img");
var countryNameEl = document.querySelector("#country-name");
var nativeEl = document.querySelector("#native");
var populationEl = document.querySelector("#population");
var regionEl = document.querySelector("#region");
var subRegionEl = document.querySelector("#sub-region");
var capitalEl = document.querySelector("#capital");
var domainEl = document.querySelector("#domain");
var currencyEl = document.querySelector("#currency");
var languagesEl = document.querySelector("#languages");
var neigboursEl = document.querySelector("#neighbours"); // !to select query string

var params = new Proxy(new URLSearchParams(window.location.search), {
  get: function get(searchParams, prop) {
    return searchParams.get(prop);
  }
});
var country = params.country;

function fetchCountryDetail() {
  fetch("https://restcountries.com/v2/name/".concat(country)).then(function (data) {
    return data.json();
  }).then(function (country) {
    console.log(country);
    flagImgEl.setAttribute("src", country[0].flags.svg);
    countryNameEl.textContent = country[0].name;
    nativeEl.textContent = country[0].nativeName;
    populationEl.textContent = country[0].population;
    regionEl.textContent = country[0].region;
    subRegionEl.textContent = country[0].subregion;
    capitalEl.textContent = country[0].capital;
    domainEl.textContent = country[0].topLevelDomain[0];
    currencyEl.textContent = country[0].currencies[0].name;
    var countriesArr = country[0].languages.map(function (lang) {
      return lang.name;
    });
    languagesEl.textContent = countriesArr.join(", "); // get name of neighbours

    if (country[0].borders) {
      country[0].borders.forEach(function (countryCode) {
        return getCountryName(countryCode);
      });
    }
  });
}

fetchCountryDetail(); // !theme toggle

themeToggle.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeToggle.textContent = "Dark Mode";
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

function getCountryName(countryCode) {
  fetch("https://restcountries.com/v2/alpha/".concat(countryCode)).then(function (data) {
    return data.json();
  }).then(function (country) {
    var _newAnchor$classList;

    var newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", "../detail.html?country=".concat(country.name.toLowerCase()));
    var classList = ["py-2", "px-6", "shadow-around", "text-gray-700", "cursor-pointer", "hover:scale-105", "transform", "active:translate-y-px", "dark:text-white", "dark:bg-dm-secondary", "rounded-md"];

    (_newAnchor$classList = newAnchor.classList).add.apply(_newAnchor$classList, classList);

    newAnchor.innerHTML = "\n        <p>".concat(country.name, "</p>\n      ");
    neigboursEl.appendChild(newAnchor);
  });
}
//# sourceMappingURL=detail.js.map
// !theme toggle
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

//
const flagImgEl = document.querySelector("#flag-img");
const countryNameEl = document.querySelector("#country-name");
const nativeEl = document.querySelector("#native");
const populationEl = document.querySelector("#population");
const regionEl = document.querySelector("#region");
const subRegionEl = document.querySelector("#sub-region");
const capitalEl = document.querySelector("#capital");
const domainEl = document.querySelector("#domain");
const currencyEl = document.querySelector("#currency");
const languagesEl = document.querySelector("#languages");
const neigboursEl = document.querySelector("#neighbours");

// !to select query string
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const country = params.country;

function fetchCountryDetail() {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((data) => data.json())
    .then((country) => {
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
      const countriesArr = country[0].languages.map((lang) => lang.name);
      languagesEl.textContent = countriesArr.join(", ");
      // get name of neighbours
      if (country[0].borders) {
        country[0].borders.forEach((countryCode) =>
          getCountryName(countryCode)
        );
      }
    });
}

fetchCountryDetail();

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

function getCountryName(countryCode) {
  fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    .then((data) => data.json())
    .then((country) => {
      const newAnchor = document.createElement("a");
      newAnchor.setAttribute(
        "href",
        `../detail.html?country=${country.name.toLowerCase()}`
      );
      const classList = [
        "py-2",
        "px-6",
        "shadow-around",
        "text-gray-700",
        "cursor-pointer",
        "hover:scale-105",
        "transform",
        "active:translate-y-px",
        "dark:text-white",
        "dark:bg-dm-secondary",
        "rounded-md",
      ];
      newAnchor.classList.add(...classList);
      newAnchor.innerHTML = `
        <p>${country.name}</p>
      `;
      neigboursEl.appendChild(newAnchor);
    });
}

const searchButton = document.querySelector("#searchButton");
const countryNameInput = document.querySelector("#countryName");
const countryInfo = document.querySelector("#countryInfo");
const countryNameResult = document.querySelector("#countryNameResult");
const countryCapital = document.querySelector("#countryCapital");
const countryContinent = document.querySelector("#countryContinent");
const countryLanguage = document.querySelector("#countryLanguage");
const countryDemonym = document.querySelector("#countryDemonym");
const countryPopulation = document.querySelector("#countryPopulation");
const countryCurrency = document.querySelector("#countryCurrency");
const countryFlag = document.querySelector("#countryFlag");

const mapsButton = document.createElement("button");
mapsButton.style.display = "none";

let googleMapsLink = "";

function recoverCountry(countryName) {
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  axios
    .get(apiUrl)
    .then((response) => {
      if (response.status === 200 && response.data.length > 0) {
        const countryData = response.data[0];

        const name = countryData.name.common || "Data not available";
        const capital = countryData.capital || "Data not available";
        const continent = countryData.region || "Data not available";

        const languageCode = Object.keys(countryData.languages)[0];
        const lang =
          countryData.languages[languageCode] || "Data not available";

        const demonym = countryData.demonyms?.eng.f || "Data not available";
        const population = countryData.population || "Data not available";

        const currencyCode = Object.keys(countryData.currencies)[0];
        const currency =
          countryData.currencies[currencyCode]?.name || "Data not available";
        const symbolCurrency =
          countryData.currencies[currencyCode]?.symbol || "Data not available";

        const flag = countryData.flags?.png;

        googleMapsLink = countryData.maps?.googleMaps || "Data not available";

        countryNameResult.textContent = name;
        countryCapital.textContent = capital;
        countryContinent.textContent = continent;
        countryLanguage.textContent = lang;
        countryDemonym.textContent = demonym;
        countryPopulation.textContent = population;
        countryCurrency.textContent = `${currency} ${symbolCurrency}`;
        countryFlag.src = flag;
        countryInfo.appendChild(mapsButton);

        mapsButton.textContent = "See on the map";
        mapsButton.style.display = "flex";

        countryNameInput.value = "";
      } else {
        alert("A problem has occurred, please come back later..");
      }
    })
    .catch((error) => {
      console.error("The field may be empty or incorrect !");
    });
}

searchButton.addEventListener("click", () => {
  let inputValue = countryNameInput.value;
  recoverCountry(inputValue);
});

mapsButton.addEventListener("click", () => {
  if (googleMapsLink) {
    window.open(googleMapsLink, "_blank");
  }
});

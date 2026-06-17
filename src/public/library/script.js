async function fetchCountries() {
    let results;
    try {
        results = await fetch('https://restcountries.com/v3.1/all');
    } catch (error) {}
    let data = await results.json();
    let countries = data.map(item => ({
        name: item.name.common,
        flag: item.flags.png
    })).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return countries
}

async function createCountries() {
    let countries = await fetchCountries()

    countries.forEach(country => {
        let countriesContainer = document.getElementById('countries-container');
        let countryContainer = document.createElement('div');
        let flag = document.createElement('img');
        let countryName = document.createElement('p');

        flag.src = country.flag;
        countryName.innerText = country.name;

        countryContainer.appendChild(flag);
        countryContainer.appendChild(countryName);
        countriesContainer.appendChild(countryContainer);

        countryContainer.classList.add('country-container');
        flag.classList.add('flag');
        countryName.classList.add('country-name');
    });
}
createCountries()

let backButton = document.getElementById('back-button')
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu'
    return
}, {
    once: true
})
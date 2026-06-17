function formatString(string) {
    return string.split(' ').join('-').toLowerCase();
}
  
async function fetchCountries(continents) {
    let response;
    try {
      response = await fetch('https://restcountries.com/v3.1/all');
    } catch (error) {
      return;
    }
    let data = await response.json();
    let countries = data
      .map((item) => ({
        name: item.name.common,
        codes: [item?.cca2, item?.cca3],
        flag: item.flags.png,
        continent: item.continents[0],
      }))
      .filter((item) => continents.includes(formatString(item.continent)));
    return countries;
  }

let soundEnabled = localStorage.getItem('sound') ? localStorage.getItem('sound') : true;
let flagsNum = localStorage.getItem('flags-num') ? localStorage.getItem('flags-num') : 25;
let continents = localStorage.getItem('continents') ? JSON.parse(localStorage.getItem('continents')) : ['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania'];

let soundCheckbox = document.getElementById('sound')
soundCheckbox.checked = JSON.parse(soundEnabled)
soundCheckbox.addEventListener('change', (event) => {
    localStorage.setItem('sound', soundCheckbox.checked)
})
let flagsRange = document.getElementById('flags-range')
let currentValue = document.getElementById('current-value')
let maxValue = document.getElementById('max-value')

async function setDefaultRange() {
    let countries = await fetchCountries(continents)
    flagsRange.value = flagsNum
    flagsRange.max = countries.length
    maxValue.innerText = countries.length;
    currentValue.innerText = flagsRange.value
    flagsRange.addEventListener('input', (event) => {
        currentValue.innerText = flagsRange.value
        localStorage.setItem('flags-num', flagsRange.value)
    })
}

setDefaultRange()

let countriesLabels = Array.from(document.getElementsByClassName('country'))
countriesLabels.forEach((countryLabel) => {
    if (continents.includes(countryLabel.id)) {
        countryLabel.checked = true
    }
    
    countryLabel.addEventListener('change', async (event) => {
        if (countryLabel.checked) {
            continents.push(countryLabel.id)
        } else {
            continents = Array.from(continents).filter((value) => value !== countryLabel.id)
        }
        localStorage.setItem('continents', JSON.stringify(continents))

        let countries = await fetchCountries(continents)
        flagsRange.max = countries.length
        maxValue.innerText = countries.length;
        if (parseInt(currentValue.innerText) > countries.length) {
            currentValue.innerText = maxValue.innerText
            localStorage.setItem('flags-num', flagsRange.value)
        }
    })
})

let backButton = document.getElementById('back-button')
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu'
    return;
}, {
    once: true
})

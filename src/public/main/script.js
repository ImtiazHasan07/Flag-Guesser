let continents = localStorage.getItem('continents') ? localStorage.getItem('continents') : ['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania'];
let score = document.getElementById('score')
let page = document.getElementById('page')
let totalPages = 25;

score.innerText = 0;
page.innerText = 1;

document.body.innerHTML = document.body.innerHTML.replace('$totalPages', totalPages);

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
    let countries = data.map((item) => ({
        name: item.name.common,
        codes: [item?.cca2, item?.cca3],
        flag: item.flags.png,
        continent: item.continents[0]
    })).filter((item) => continents.includes(formatString(item.continent)));
    return countries
}

function getRandomCountry(countries, correctCountry) {
    let randomCountry = countries.filter((option) => option !== correctCountry)[Math.floor(Math.random() * countries.length)];
    return randomCountry;
}

function playSound(soundEffect) {
    let enableSound = localStorage.getItem('sound')
    if (JSON.parse(enableSound)) {
        soundEffect.play();
    }
}

async function main() {
    let countries = await fetchCountries(continents)
    let chosenCountry = randomCountry(countries);
    let flag = document.getElementById('flag')
    let options = Array.from(document.getElementsByClassName('options'))

    flag.src = chosenCountry.flag

    let backButton = document.getElementById('back-button')
    backButton.addEventListener('click', (event) => {
        window.location.href = '../menu' 
        return
    }, { once : true })

    let used = []

    let correctOption = randomOption(options)
    correctOption.innerText = chosenCountry.name
    console.log(correctOption.innerText)

    options.filter((item) => item !== correctOption).forEach((option) => {
        option.innerText = randomCountry(countries, used).name
    })

    let selectedOption;
    options.forEach((option) => {
        option.addEventListener('click', (event) => {
            if (selectedOption) return;
            selectedOption = option

            if (selectedOption.innerText === correctOption.innerText) {
                selectedOption.style['background-color'] = '#009a30'
                score = document.getElementById('score')
                score.innerText++
            } else {
                selectedOption.style['background-color'] = '#df1111'
                correctOption.style['background-color'] = '#009a30'
            }

            let nextButton = document.getElementById('next-button')
            nextButton.addEventListener('click', (event) => {
                if (parseInt(page.innerText) >= parseInt(totalPages)) {
                localStorage.setItem('score', score.innerText)
                window.location.href = '../end' 
                return;
                }
                page = document.getElementById('page')
                page.innerText ++

                options.forEach((option) => {
                    option.style['background-color'] = '#ffffff'
                })
                main()
            }, { once : true })
        })
    })
}

main()

function randomCountry(countries, country) {
    let randomCountry = country
    while (randomCountry === country) {
        randomCountry = countries[Math.floor(Math.random() * countries.length)]

        if (Array.isArray(country) && country.includes(randomCountry)) {
            randomCountry = country
        }
    }
    return randomCountry
}

function randomOption(options) {
    let option = options[Math.floor(Math.random() * options.length)]
    return option
}
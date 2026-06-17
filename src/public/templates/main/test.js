            
let score = document.getElementById('score')
let page = document.getElementById('page')
let flagsNum = localStorage.getItem('flags-number') ? localStorage.getItem('flags-number') : 25;
let options = document.getElementsByClassName('options')

let countries = await getCountries()
let totalPages = flagsNum;
let correctSoundEffect = document.getElementById('correct-sound-effect')
let incorrectSoundEffect = document.getElementById('incorrect-sound-effect')

score.innerText = 0;
page.innerText = 1;

document.body.innerHTML = document.body.innerHTML.replace('$totalPages', totalPages);

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

async function getCountries() {
    let results;
    try {
        results = await fetch('https://restcountries.com/v3.1/all');
    } catch (error) {}
    let data = await results.json();
    let countries = data.map((item) => ({
        name: item.name.common,
        flag: item.flags.png
    })).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return countries
}

async function getQuestion() {
    let chosenCountry = randomCountry(countries);
    let used = []

    let flag = document.getElementById('flag')
    flag.src = chosenCountry.flag

    let correctOption = options[Math.floor(Math.random() * options.length)]
    correctOption.innerText = chosenCountry.name
    console.log(correctOption.innerText)

    options = Array.from(options).filter((item) => item !== correctOption)
    used.push(chosenCountry)

    options.forEach((option) => {
        let temp = randomCountry(countries, used).name
        option.innerText = temp
        used.push(temp)
    })

    let selectedOption;
    // options = Array.from(document.getElementsByClassName('options'))
    options.forEach((option) => {
        option.addEventListener('click', (event) => {
            if (selectedOption) return;
            selectedOption = option

            if (selectedOption.innerText === correctOption.innerText) {
                if (JSON.parse(localStorage.getItem('sound'))) {
                    correctSoundEffect.play()
                }
                selectedOption.style['background-color'] = '#009a30'
                score = document.getElementById('score')
                score.innerText++
            } else {
                if (JSON.parse(localStorage.getItem('sound'))) {
                    incorrectSoundEffect.play()
                }
                selectedOption.style['background-color'] = '#df1111'
                correctOption.style['background-color'] = '#009a30'
            }
        })
    })
}

let nextButton = document.getElementById('next-button')
nextButton.addEventListener('click', (event) => {
    console.log('hi')
    if (parseInt(page.innerText) === totalPages) {
        sessionStorage.setItem('score', score.innerText);
        sessionStorage.setItem('total-score', totalPages);
        window.location.href = '../end'
        return;
    }
    page = document.getElementById('page')
    page.innerText++
    let options = Array.from(document.getElementsByClassName('options'))
    options.forEach((option) => {
        option.style['background-color'] = '#ffffff'
    })
    getQuestion()
}, {
    once: true
})

getQuestion()

let backButton = document.getElementById('back')
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu'
    return
}, {
    once: true
})
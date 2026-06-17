let score = document.getElementById('score');
let page = document.getElementById('page');
let continents = localStorage.getItem('continents') ? localStorage.getItem('continents') : ['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania'];
let totalPages = localStorage.getItem('flags-number') ? localStorage.getItem('flags-number') : 25;

let correctSoundEffect = document.getElementById('correct-sound-effect');
let incorrectSoundEffect = document.getElementById('incorrect-sound-effect');

score.innerText = '0';
page.innerText = '1';

document.body.innerHTML = document.body.innerHTML.replace('$totalPages', totalPages);

function formatString(string) {
    return string.split(' ').join('-').toLowerCase();
}

async function fetchCountries(continents) {
    try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        let countries = data.map((item) => ({
            name: item.name.common,
            codes: [item?.cca2, item?.cca3],
            flag: item.flags.png,
            continent: item.continents[0]
        })).filter((item) => continents.includes(formatString(item.continent)));
        return countries
    } catch (error) {}
}

function getRandomCountry(countries, correctCountry) {
    let randomCountry = countries.filter((option) => option !== correctCountry)[Math.floor(Math.random() * countries.length)];
    return randomCountry;
}

function playSound(soundEffect) {
    // if (JSON.parse(localStorage.getItem('sound'))) {
    //     soundEffect.play();
    // }
}

function setupGame(countries) {
    let options = Array.from(document.getElementsByClassName('options'));
    let chosenCountry = getRandomCountry(countries);

    let flag = document.getElementById('flag');
    flag.src = chosenCountry.flag;

    let correctOption = options[Math.floor(Math.random() * options.length)];
    correctOption.innerText = chosenCountry.name;
    console.log(`Correct Country: ${correctOption.innerText}`)

    options.forEach((option) => {
        if (option !== correctOption) {
            let otherCountry = getRandomCountry(countries, chosenCountry.name);
            option.innerText = otherCountry.name;
        }
        option.addEventListener('click', (event) => {
            let score = document.getElementById('score');
            let page = document.getElementById('page');
            if (option.innerText === correctOption.innerText) {
                console.log('Correct!')
                option.style['background-color'] = '#009a30';
                playSound(correctSoundEffect);
                score.innerText = parseInt(score.innerText) + 1;
                console.log(parseInt(score.innerText) - 1, '->', score.innerText)
            } else {
                console.log('Incorrect!')
                option.style['background-color'] = '#df1111';
                correctOption.style['background-color'] = '#009a30';
                playSound(incorrectSoundEffect);
            }
            options.forEach((option) => {
                option.disabled = true
            })
            let nextButton = document.getElementById('next-button');
            nextButton.addEventListener('click', () => {
                if (parseInt(page.innerText) >= totalPages) {
                    endGame();
                } else {
                    page.innerText = parseInt(page.innerText) + 1;
                    options.forEach((option) => {
                        option.style['background-color'] = '#ffffff'
                        option.disabled = false
                    })
                    setupGame(countries);
                }
                return;
            }, { once: true });
        return;
        }, { once: true });
    });
    return;
}

function endGame() {
    let score = document.getElementById('score');
    localStorage.setItem('score', score.innerText);
    window.location.href = '../end';
}

fetchCountries(continents).then((fetchedCountries) => {
    setupGame(fetchedCountries);
});

let backButton = document.getElementById('back-button')
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu'
    return;
}, {
    once: true
})
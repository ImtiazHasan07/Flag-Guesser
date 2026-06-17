let countries;
let score = document.getElementById('score')
let page = document.getElementById('page')
let pages = localStorage.getItem('flags-number') ? localStorage.getItem('flags-number') : 25;

let correctSoundEffect = document.getElementById('correct-sound-effect')
let incorrectSoundEffect = document.getElementById('incorrect-sound-effect')

score.innerText = 0;
page.innerText = 1;

document.body.innerHTML = document.body.innerHTML.replace('$pages', pages);

fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
        countries = data.map((item) => {
            return {
                name: item.name.common,
                codes: [item?.cca2, item?.cca3],
                flag: item.flags.png,
                continent: item.continents[0]
            };
        })

        function main(countries) {
            let chosenCountry = randomCountry(countries);
            let flag = document.getElementById('flag')
            let options = document.getElementsByClassName('options')

            flag.src = chosenCountry.flag

            let backButton = document.getElementById('back')
            backButton.addEventListener('click', (event) => {
                window.location.href = '../menu'
                return
            }, {
                once: true
            })

            let used = []

            let correctOption = randomOption(options)
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
            options = document.getElementsByClassName('options')
            Array.from(options).forEach((option) => {
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

                    let nextButton = document.getElementById('next')
                    nextButton.addEventListener('click', (event) => {
                        if (parseInt(page.innerText) === parseInt(pages)) {
                            sessionStorage.setItem('score', score.innerText);
                            sessionStorage.setItem('total-score', pages);
                            window.location.href = '../end'
                            return
                        }
                        page = document.getElementById('page')
                        page.innerText++

                        Array.from(options).forEach((option) => {
                            option.style['background-color'] = '#ffffff'
                        })
                        main(countries)
                    }, {
                        once: true
                    })
                })
            })
        }
        main(countries)
    }).catch((error) => {})

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
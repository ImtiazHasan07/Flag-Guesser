let countries;
let score = document.getElementById('score')
let page = document.getElementById('page')
let pages = 25;

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
                flag: item.flag,
            };
        })

        function main(countries) {
            let chosenCountry = randomCountry(countries);
            let flag = document.getElementById('flag')
            let options = document.getElementsByClassName('options')
    
            flag.innerText = chosenCountry.flag

            let backButton = document.getElementById('back')
            backButton.addEventListener('click', (event) => {
                window.location.href = '../menu/index.html' 
                return
            }, { once : true })
    
            let used = []
    
            let correctOption = randomOption(options)
            correctOption.innerText = chosenCountry.name
            console.log(correctOption.innerText)

            options = Array.from(options).filter((item) => item !== correctOption)
    
            options.forEach((option) => {
                option.innerText = randomCountry(countries, used).name
            })
    
            let selectedOption;
            options = document.getElementsByClassName('options')
            Array.from(options).forEach((option) => {
                option.addEventListener('click', (event) => {
                    if (selectedOption) return;
                    selectedOption = option
    
                    if (selectedOption.innerText === correctOption.innerText) {
                        selectedOption.style['background-color'] = '#009a30'
                        score = document.getElementById('score')
                        score.innerText ++
                    } else {
                        selectedOption.style['background-color'] = '#df1111'
                        correctOption.style['background-color'] = '#009a30'
                    }
    
                    let nextButton = document.getElementById('next')
                    nextButton.addEventListener('click', (event) => {
                        if (parseInt(page.innerText) === parseInt(pages)) {
                        window.location.href = '../end/index.html' 
                        return
                        }
                        page = document.getElementById('page')
                        page.innerText ++

                        Array.from(options).forEach((option) => {
                            option.style['background-color'] = '#ffffff'
                        })
                        main(countries)
                    }, { once : true })
                })
            })
        }

        main(countries)

    }).catch((error) => {
        console.log('Error: An error occurred while making the request.', error)
    })

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
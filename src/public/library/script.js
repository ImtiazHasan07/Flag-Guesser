let backButton = document.getElementById('back')
let countries_container = document.getElementById('countries_container')

backButton.addEventListener('click', (event) => {
    window.location.href = '../menu/index.html'
    return
}, {
    once: true
})

fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
        countries = data.map((item) => {
            return {
                name: item.name.common,
                flag: item.flag
            };
        }).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        countries.forEach((country) => {
            let countriesContainer = document.getElementById('countries_container')
            let countryContainer = document.createElement('div')
            let flag = document.createElement('p')
            let countryName = document.createElement('p')

            flag.innerText = country.flag
            countryName.innerText = country.name

            countriesContainer.appendChild(countryContainer)
            countryContainer.appendChild(flag)
            countryContainer.appendChild(countryName)

            countryContainer.classList.add('country_container');
            flag.classList.add('flag');
            countryName.classList.add('country_name');
        })

    }).catch((error) => {
        console.log('Error: An error occurred while making the request.', error)
    })
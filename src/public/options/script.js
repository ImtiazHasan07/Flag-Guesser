let soundEnabled = localStorage.getItem('sound') ? localStorage.getItem('sound') : true;
let flagsNum = localStorage.getItem('flags-num') ? localStorage.getItem('flags-num') : 25;
let continents = localStorage.getItem('continents') ? JSON.parse(localStorage.getItem('continents')) : ['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania'];

let soundCheckbox = document.getElementById('sound')
soundCheckbox.checked = JSON.parse(soundEnabled)

soundCheckbox.addEventListener('change', (event) => {
    // console.log(`${!soundCheckbox.checked} -> ${soundCheckbox.checked}`)
    localStorage.setItem('sound', soundCheckbox.checked)
})

let flagsRange = document.getElementById('flags-range')
let currentValue = document.getElementById('current-value')
let maxValue = document.getElementById('max-value')
flagsRange.value = flagsNum
currentValue.innerText = flagsRange.value
maxValue.innerText = 197;
flagsRange.addEventListener('input', (event) => {
    currentValue.innerText = flagsRange.value
    localStorage.setItem('flags-num', flagsRange.value)
})

let countries = Array.from(document.getElementsByClassName('country'))
countries.forEach((element) => {
    if (continents.includes(element.id)) {
        element.checked = true
    }
    
    element.addEventListener('change', (event) => {
        if (element.checked) {
            continents.push(element.id)
        } else {
            continents = Array.from(continents).filter((value) => value !== element.id)
        }
        localStorage.setItem('continents', JSON.stringify(continents))
    })
})

let backButton = document.getElementById('back')
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu'
    return;
}, {
    once: true
})

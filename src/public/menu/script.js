let play = document.getElementById('play')
let options = document.getElementById('options')
let library = document.getElementById('library')

play.addEventListener('click', (event) => {
    window.location.href = '../main'
})

options.addEventListener('click', (event) => {
    window.location.href = '../options'
})

library.addEventListener('click', (event) => {
    console.log('hi')
    window.location.href = ''
})
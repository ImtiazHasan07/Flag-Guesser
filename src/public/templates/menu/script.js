let play = document.getElementById('play')
let options = document.getElementById('options')
let library = document.getElementById('library')

play.addEventListener('click', () => {
    window.location.href = '../main'
})

options.addEventListener('click', () => {
    window.location.href = '../options'
})

library.addEventListener('click', () => {
    window.location.href = '../library'
})
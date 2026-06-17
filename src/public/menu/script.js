let play = document.getElementById('play')
let options = document.getElementById('options')
let library = document.getElementById('library')

play.addEventListener('click', () => {
    window.location.href = '../main/index.html'
})

options.addEventListener('click', () => {
    window.location.href = '../options/index.html'
})

library.addEventListener('click', () => {
    window.location.href = '../library/index.html'
})
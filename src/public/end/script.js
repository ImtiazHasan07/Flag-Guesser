let score = document.getElementById('score')
let total_score = document.getElementById('total_score')
let playAgain = document.getElementById('play_again')
let mainMenu = document.getElementById('main_menu')

score = 0
total_score = 0

playAgain.addEventListener('click', () => {
    window.location.href = '../main/index.html'    
})

mainMenu.addEventListener('click', () => {
    window.location.href = '../menu/index.html'    
})
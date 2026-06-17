let score = localStorage.getItem('score') ? localStorage.getItem('score') : 0;
let totalScore = localStorage.getItem('flags-number') ? localStorage.getItem('flags-number') : 25;

console.log(score)

document.body.innerHTML = document.body.innerHTML.replace('$score', score);
document.body.innerHTML = document.body.innerHTML.replace('$total-score', totalScore);

let playAgain = document.getElementById('play-again');
let mainMenu = document.getElementById('main-menu');

playAgain.addEventListener('click', (event) => {
    window.location.href = '../main';
})

mainMenu.addEventListener('click', (event) => {
    window.location.href = '../menu';
})
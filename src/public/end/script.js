let score = localStorage.getItem('score');
if (!score) {
    window.location.href = '../main';
    score = 0;
}

let totalScore = localStorage.getItem('flags-num') ? localStorage.getItem('flags-num') : 25;

document.body.innerHTML = document.body.innerHTML.replace('$score', score);
document.body.innerHTML = document.body.innerHTML.replace('$total-score', totalScore);

let playAgain = document.getElementById('play-again-button');
playAgain.addEventListener('click', (event) => {
    window.location.href = '../main';
})

let mainMenu = document.getElementById('main-menu-button');
mainMenu.addEventListener('click', (event) => {
    window.location.href = '../menu';
})
localStorage.removeItem('score');
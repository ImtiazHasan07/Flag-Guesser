let playAgain = document.getElementById('play-again')
let mainMenu = document.getElementById('main-menu');

playAgain.addEventListener('click', (event) => {
    window.location.href = '../main';
})

mainMenu.addEventListener('click', (event) => {
    window.location.href = '../menu';
})

function main() {
    let score = localStorage.getItem('score');
    if (!score) {
        window.location.href = '../main'
        score = 0
    }
    let totalScore = localStorage.getItem('flags-number') ? localStorage.getItem('flags-number') : 25;

    document.body.innerHTML = document.body.innerHTML.replace('$score', score);
    document.body.innerHTML = document.body.innerHTML.replace('$total-score', totalScore);
    localStorage.removeItem('score')
}
main()
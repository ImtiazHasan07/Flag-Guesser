let backButton = document.getElementById('back')

backButton.addEventListener('click', (event) => {
    window.location.href = '../menu/index.html'
    return
}, {
    once: true
})
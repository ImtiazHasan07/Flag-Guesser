let score = document.getElementById('score');
let page = document.getElementById('page');
let continents = localStorage.getItem('continents') ? localStorage.getItem('continents') : ['africa', 'asia', 'europe', 'north-america', 'south-america', 'oceania'];
let totalPages = localStorage.getItem('flags-num') ? localStorage.getItem('flags-num') : 25;
let enableSound = localStorage.getItem('sound') === 'false' ? false : true;

score.innerText = 0;
page.innerText = 1;

document.body.innerHTML = document.body.innerHTML.replace(
  '$totalPages',
  totalPages
);

function formatString(string) {
  return string.split(' ').join('-').toLowerCase();
}

async function fetchCountries(continents) {
  let response;
  try {
    response = await fetch('https://restcountries.com/v3.1/all');
  } catch (error) {
    return;
  }
  let data = await response.json();
  let countries = data
    .map((item) => ({
      name: item.name.common,
      codes: [item?.cca2, item?.cca3],
      flag: item.flags.png,
      continent: item.continents[0],
    }))
    .filter((item) => continents.includes(formatString(item.continent)));
  return countries;
}

function getRandomCountry(countries, options) {
    let randomCountry = countries.filter(
        (country) => !options || !options.map((option) => option.innerText).includes(country)
    )[Math.floor(Math.random() * countries.length)];
    return randomCountry;
}

function playSound(soundEffect) {
    if (JSON.parse(enableSound)) {
        soundEffect.play();
    }
}

let backButton = document.getElementById('back-button');
backButton.addEventListener('click', (event) => {
    window.location.href = '../menu';
    return;
  },
  { once: true }
);

async function main() {
  if (totalPages === '0') return;
  let countries = await fetchCountries(continents);
  let chosenCountry = getRandomCountry(countries);
  let flag = document.getElementById('flag');
  let correctSoundEffect = document.getElementById('correct-sound-effect');
  let incorrectSoundEffect = document.getElementById('incorrect-sound-effect');
  let gameOverSoundEffect = document.getElementById('game-over-sound-effect');
  let options = Array.from(document.getElementsByClassName('options'));

  flag.src = chosenCountry.flag;

  let correctOption = options[Math.floor(Math.random() * options.length)];
  correctOption.innerText = chosenCountry.name;
//   console.log(correctOption.innerText);

  options
    .filter((item) => item !== correctOption)
    .forEach((option) => {
      option.innerText = getRandomCountry(countries, options).name;
    });

  let selectedOption;
  options.forEach((option) => {
    option.addEventListener('click', (event) => {
      if (selectedOption) return;
      selectedOption = option;

      if (selectedOption.innerText === correctOption.innerText) {
        selectedOption.style['background-color'] = '#009a30';
        score = document.getElementById('score');
        score.innerText++;
        playSound(correctSoundEffect);
      } else {
        selectedOption.style['background-color'] = '#df1111';
        correctOption.style['background-color'] = '#009a30';
        playSound(incorrectSoundEffect);
      }

      let nextButton = document.getElementById('next-button');
      nextButton.addEventListener('click', (event) => {
          if (parseInt(page.innerText) >= parseInt(totalPages)) {
            localStorage.setItem('score', score.innerText);
            playSound(gameOverSoundEffect)
            setTimeout(window.location.href = '../end', 2000);
            return;
          }
          page = document.getElementById('page');
          page.innerText++;

          options.forEach((option) => {
            option.style['background-color'] = '#ffffff';
          });
          main();
        },
        { once: true }
      );
    });
  });
}

main();

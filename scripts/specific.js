// refer to question 2 before development starts for scope document
'use strict';

(async function getSpecific() {
  try {
    const pageParams = new URLSearchParams(window.location.search);
    if (!pageParams.toString()) {
      alert('Oops! There is no query string!');
    } else {
      const data = await (await fetch(
        `https://api.magicthegathering.io/v1/cards/${pageParams.get('id')}`
      )).json();
      const imgContainer = document.getElementById('cardImage');
      const cardDetailsContainer = document.getElementById('cardDetails');

      //Append the image to the div called “cardImage”, set the width of the image to 100%.
      const cardIMG = document.createElement('img');
      cardIMG.style.width = '100%';
      //Test to see if the imageUrl value is undefined, if the value is undefined, use the placeholder image instead
      if (typeof data.card.imageUrl != 'undefined') {
        cardIMG.src = data.card.imageUrl;
      } else {
        cardIMG.src = 'https://via.placeholder.com/223x310';
      }

      const h2 = document.createElement('h2');
      h2.textContent = data.card.name;

      const about = document.createElement('div');
      about.innerHTML = `<b>About: </b>${data.card.text}`;

      const rarity = document.createElement('div');
      rarity.innerHTML = `<b>Rarity: </b> ${data.card.rarity}`;

      const colors = document.createElement('div');
      colors.innerHTML = `<b>Colors: </b>${data.card.colors}`;

      const returnLink = document.createElement('a');
      returnLink.innerHTML = 'Back to the home page >>';
      returnLink.setAttribute('href', './index.html');

      // The card template followed the original code inside the card-specific.html file
      imgContainer.appendChild(cardIMG);
      cardDetailsContainer.appendChild(h2);
      cardDetailsContainer.appendChild(about);
      cardDetailsContainer.appendChild(rarity);
      cardDetailsContainer.appendChild(colors);
      cardDetailsContainer.appendChild(returnLink);
    }
  } catch (error) {
    showMessage('Something went wrong!');
  }
})();

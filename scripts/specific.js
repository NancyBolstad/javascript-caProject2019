// refer to question 2 before development starts for scope document
'use strict';

function hasQueryString() {
  const pageParams = new URLSearchParams(window.location.search);
  const id = pageParams.get('id');
  if (!pageParams.toString() || !id.toString()) {
    alert('Empty query string! Redirecting you to the home page ...');
    window.location = './index.html';
  } else {
    const url = `https://api.magicthegathering.io/v1/cards/${pageParams.get(
      'id'
    )}`;
    fetchCard(url, showCard);
  }
}

async function fetchCard(url, doSomeThing) {
  try {
    const data = await (await fetch(url)).json();
    doSomeThing(data.card);
  } catch (error) {
    showMessage('Something went wrong!');
  }
}

function showCard(card) {
  const imgContainer = document.getElementById('cardImage');
  const cardDetailsContainer = document.getElementById('cardDetails');

  //Append the image to the div called “cardImage”, set the width of the image to 100%.
  const cardIMG = document.createElement('img');
  cardIMG.style.width = '100%';
  //Test to see if the imageUrl value is undefined, if the value is undefined, use the placeholder image instead
  if (typeof card.imageUrl != 'undefined') {
    cardIMG.src = card.imageUrl;
  } else {
    cardIMG.src = 'https://via.placeholder.com/223x310';
  }

  const h2 = document.createElement('h2');
  h2.textContent = card.name;

  const about = document.createElement('div');
  about.innerHTML = `<b>About: </b>${card.text}`;

  const rarity = document.createElement('div');
  rarity.innerHTML = `<b>Rarity: </b> ${card.rarity}`;

  const colors = document.createElement('div');
  colors.innerHTML = `<b>Colors: </b>${card.colors}`;

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

hasQueryString();

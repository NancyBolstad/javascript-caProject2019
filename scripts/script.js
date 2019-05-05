'use strict';

//Reusable API calling function for executing multiple AJAX tasks.
async function makeAPICall(doThisAfterRequest) {
  const url = 'https://api.magicthegathering.io/v1/cards';
  try {
    const data = await (await fetch(url)).json();
    const { cards } = data;
    doThisAfterRequest(cards);
  } catch (error) {
    showMessage('Something went wrong!');
  }
}

//Create a function that takes the JSON Object as an argument, and can be used for displaying cards
function generateCards(cards) {
  const container = document.getElementById('cards');

  //Used the following keys to create cards: name, imageUrl and id.
  cards.forEach(element => {
    const newCard = document.createElement('div');
    const { name, imageUrl, id } = element;
    newCard.setAttribute('class', 'col-sm-4');

    const newCardContainer = document.createElement('div');
    newCardContainer.setAttribute('class', 'card-container');

    const h4 = document.createElement('h4');
    h4.textContent = name;

    const cardIMG = document.createElement('img');
    cardIMG.style.width = '100%';
    //Test to see if the imageUrl value is undefined, if the value is undefined, please use a placeholder image instead.
    if (typeof imageUrl === 'undefined') {
      cardIMG.src = 'https://via.placeholder.com/223x310';
    } else {
      cardIMG.src = imageUrl;
    }

    const viewMore = document.createElement('a');
    viewMore.setAttribute('class', 'btn btn-success');
    viewMore.textContent = 'View More';
    //Passed in id as a query string in the URL.
    viewMore.href = `card-specific.html?id=${id}`;

    //Append all the data to the div with the “cards” ID attached to it.
    container.appendChild(newCard);
    newCard.appendChild(newCardContainer);
    newCardContainer.appendChild(h4);
    newCardContainer.appendChild(cardIMG);
    newCardContainer.appendChild(viewMore);
  });
}

//The search button will trigger a click event.
document.getElementById('searchButton').addEventListener('click', () => {
  const cardsContainer = document.getElementById('cards');

  if (
    document.getElementById('search').value == '' ||
    document.getElementById('search').value == null
  ) {
    alert('Input cannot be empty, try again!');
  } else {
    //First, delete all the HTML inside the div that has the ID “cards” attached to it.
    while (cardsContainer.hasChildNodes()) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
    //Make a call to the api get all the results back
    makeAPICall(cardsFilter);
  }
});

function cardsFilter(cards) {
  //Get the string value from the search text box
  const valueToSearch = document.getElementById('search').value;
  //Filter through all the results. If it finds any results it should be added to the result array.
  const result = cards.filter(element => {
    return element.name.toLowerCase() == valueToSearch.toLowerCase();
  });

  //Display the searching result. If the application doesn’t find any results a suitable message should be displayed.
  if (result.length > 0) {
    generateCards(result);
  } else {
    showMessage("The card's name does not exist.");
  }
}

//A reusable function for displaying message.
function showMessage(msg) {
  const messageContainer = document.getElementById('cards');
  const errorMessage = document.createElement('h1');
  errorMessage.style.color = 'red';
  errorMessage.textContent = msg;
  messageContainer.appendChild(errorMessage);
}

makeAPICall(generateCards);

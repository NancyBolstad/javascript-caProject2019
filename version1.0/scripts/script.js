// refer to question 1 before development starts for scope document
// connect to this api https://api.magicthegathering.io/v1/cards
const container = document.getElementById("cards");
window.onload = getAllCards();

function getAllCards() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://api.magicthegathering.io/v1/cards", true);

  request.onload = function () {
    var data = JSON.parse(request.response);
    if (request.status >= 200 && request.status < 400) {
      generateCards(data.cards);
    } else {
      const errorMessage = document.createElement("h1");
      errorMessage.textContent = "Gah, it's not working!";
      container.appendChild(errorMessage);
    }
  };
  request.send();
}


document.getElementById("searchButton").addEventListener("click", function () {
  const userInput = document.getElementById("search").value;
  const apiURL = "https://api.magicthegathering.io/v1/cards";
  if (userInput == "" || userInput == null) {
    alert("Input cannot be empty, try again!");
    getAllCards();
  } else {
    var searchObj = {};
    searchObj.name = document.getElementById("search").value;
  }

  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }


  fetch(apiURL).then(function (response) {
    return response.json();
  }).then(function (data) {
    var result = findCards(data.cards, searchObj);

    if (result.length > 0) {
      generateCards(result);
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.style.color = "red";
      errorMessage.textContent = "The name does not exist. Try something else?";
      container.appendChild(errorMessage);
    }
  });
});

function generateCards(data) {
  data.forEach(function (element) {
    
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "col-sm-4");

      const newCardContainer = document.createElement("div");
      newCardContainer.setAttribute("class", "card-container");

      const h4 = document.createElement("h4");
      h4.textContent = element.name;

      const cardIMG = document.createElement('img');
      cardIMG.style.width = "100%";
      if (typeof element.imageUrl!= "undefined") {
      cardIMG.src = element.imageUrl;
      }else{
        cardIMG.src = "https://via.placeholder.com/223x310";
      }

      const viewMore = document.createElement("a");
      const cardID = element.id;
      viewMore.setAttribute("class", "btn btn-success");
      viewMore.textContent = "View More";
      viewMore.href = "card-specific.html?id=" + cardID;

      container.appendChild(newCard);
      newCard.appendChild(newCardContainer);
      newCardContainer.appendChild(h4);
      newCardContainer.appendChild(cardIMG);
      newCardContainer.appendChild(viewMore);
    
  });
}


function findCards(data, criteria) {
  const filterKeys = Object.keys(criteria);
  return data.filter(function (item) {
    return filterKeys.every(function (key) {
      if (!criteria[key].length) {
        return true;
      }
      return criteria[key].includes(item[key]);
    });
  });
}
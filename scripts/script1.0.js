// refer to question 1 before development starts for scope document
// connect to this api https://api.magicthegathering.io/v1/cards
const container = document.getElementById("cards");
const apiURL = "https://api.magicthegathering.io/v1/cards";

function getAllCards() {
  //Connect to the URL provided
  var request = new XMLHttpRequest();
  request.open("GET", apiURL, true);

  request.onload = function () {
    //Convert the results to JSON format
    var data = JSON.parse(request.response);
    if (request.status >= 200 && request.status < 400) {
      //Call the function from the method that returns the JSON data and pass in the JSON data.
      generateCards(data.cards);
    } else {
      displayError("Gah, something went wrong!");
    }
  };
  request.send();
}

//Create a function, that takes the JSON Object as an argument. Used the following keys: name, imageUrl and id.
function generateCards(jsonObject) {
  jsonObject.forEach(function (element) {

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "col-sm-4");

    const newCardContainer = document.createElement("div");
    newCardContainer.setAttribute("class", "card-container");

    const h4 = document.createElement("h4");
    h4.textContent = element.name;

    const cardIMG = document.createElement("img");
    cardIMG.style.width = "100%";
    if (typeof element.imageUrl === "undefined") {
      cardIMG.src = "https://via.placeholder.com/223x310";
    } else {
      cardIMG.src = element.imageUrl;
    }

    const viewMore = document.createElement("a");
    const cardID = element.id;
    viewMore.setAttribute("class", "btn btn-success");
    viewMore.textContent = "View More";
    //Passed in id as a query string in the URL.
    viewMore.href = "card-specific.html?id=" + cardID;

    //Append all the data to the div with the “cards” ID attached to it.
    container.appendChild(newCard);
    newCard.appendChild(newCardContainer);
    newCardContainer.appendChild(h4);
    newCardContainer.appendChild(cardIMG);
    newCardContainer.appendChild(viewMore);

  });
}

//The search button will trigger a mouse click event. Warning: This search box does not support keyboard.  
document.getElementById("searchButton").addEventListener("click", function () {
  const userInput = document.getElementById("search").value;
  if (userInput == "" || userInput == null) {
    alert("Input cannot be empty, try again!");
  } else {
    searchCards(userInput);
  }
});

function searchCards(target) {
  //Delete all the HTML inside the div that has the ID “cards” attached to it.
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  //Make a call to the api get all the results back.
  var searchRequest = new XMLHttpRequest();
  searchRequest.open("GET", apiURL, true);
  searchRequest.onload = function () {
    var data = JSON.parse(searchRequest.response);
    if (searchRequest.status >= 200 && searchRequest.status < 400) {
      //Filter through all the results by the value that was in the textbox. If it finds any results it should be added to a new array.     
      var result = data.cards.filter(function (card) {
        return (card.name == target);
      });

      //Display the result following the same pattern with other cards, but only card that the user searched for will be display.
      if (result.length > 0) {
        generateCards(result);
      } else {
        //If the application doesn’t find any results,a suitable message should be displayed.
        displayError("Card does not exist.");
      }
    }
  };
  searchRequest.send();
}

function displayError(msg) {
  const errorMessage = document.createElement("h1");
  errorMessage.style.color = "red";
  errorMessage.textContent = msg;
  container.appendChild(errorMessage);
}

getAllCards();

function loadDoc(url, aFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      aFunction(this);
    } else {
      displayError("Gah, something went wrong!");
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
const apiURL = "https://api.magicthegathering.io/v1/cards";
const container = document.getElementById("cards");

makeAPICall(generateCards);


//Reusable API calling function for executing multiple AJAX tasks. Refer to: https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
function makeAPICall(callback) {
  //Connect to the URL provided
  var request = new XMLHttpRequest();
  request.open("GET", apiURL, true);

  request.onload = function () {
    //Convert the results to JSON format
    var data = JSON.parse(request.response);
    if (request.status >= 200 && request.status < 400) {
      //Call the function from the method that returns the JSON data and pass in the JSON data.
      callback(data.cards);
    } else {
      showMessage("Request failed.");
    }
  };
  request.send();
}

//Create a function, that takes the JSON Object as an argument.
function generateCards(jsonObject) {
  //Used the following keys to create cards: name, imageUrl and id.
  jsonObject.forEach(function (element) {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "col-sm-4");

    const newCardContainer = document.createElement("div");
    newCardContainer.setAttribute("class", "card-container");

    const h4 = document.createElement("h4");
    h4.textContent = element.name;

    const cardIMG = document.createElement("img");
    cardIMG.style.width = "100%";
    //Test to see if the imageUrl value is undefined, if the value is undefined, please use a placeholder image instead.
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

//The search button will trigger a click event.   
document.getElementById("searchButton").addEventListener("click", function () {
  if (document.getElementById("search").value == "" || document.getElementById("search").value == null) {
    alert("Input cannot be empty, try again!");
  } else {
    //First, delete all the HTML inside the div that has the ID “cards” attached to it.
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
    //Make a call to the api get all the results back
    makeAPICall(cardsFilter);
  }
});

function cardsFilter(jsonObject) {
  //get the value from the search text box
  const valueToSearch = document.getElementById("search").value;
  //Filter through all the results by the value that was in the textbox. If it finds any results it should be added to the result array.
  const result = jsonObject.filter(function (element) {
    return (element.name == valueToSearch);
  });

  //Display the searching result. If the application doesn’t find any results a suitable message should be displayed.
  if (result.length > 0) {
    generateCards(result);
  } else {
    showMessage("The card's name does not exist.");
  }
}

function showMessage(msg) {
  const errorMessage = document.createElement("h1");
  errorMessage.style.color = "red";
  errorMessage.textContent = msg;
  container.appendChild(errorMessage);
}
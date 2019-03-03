// refer to question 2 before development starts for scope document

// get URL query string
function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function getSpecific() {
    // const variable for the id
    const id = getQueryStringValue("id");

    // Take the id constiable, make an API call, but append the ID to end of the API Call.
    const request = new XMLHttpRequest();
    request.open("GET", "https://api.magicthegathering.io/v1/cards/" + id, true);
    request.onload = function () {
        const data = JSON.parse(request.response);
        //Get the following keys: imageUrl, name, text, rarity and colors. Display their values.
        if (request.status >= 200 && request.status < 400) {
            const imgContainer = document.getElementById("cardImage");
            const cardDetailsContainer = document.getElementById("cardDetails");

            //Append the image to the div called “cardImage”, set the width of the image to 100%.
            const cardIMG = document.createElement("img");
            cardIMG.style.width = "100%";
            //Test to see if the imageUrl value is undefined, if the value is undefined, use the placeholder image instead
            if (typeof data.card.imageUrl != "undefined") {
                cardIMG.src = data.card.imageUrl;
            } else {
                cardIMG.src = "https://via.placeholder.com/223x310";
            }

            const h2 = document.createElement("h2");
            h2.textContent = data.card.name;

            const about = document.createElement("div");
            about.innerHTML = "<b>About: </b>" + data.card.text;

            const rarity = document.createElement("div");
            rarity.innerHTML = "<b>Rarity: </b>" + data.card.rarity;

            const colors = document.createElement("div");
            colors.innerHTML = "<b>Colors: </b>" + data.card.colors;

            // The card template followed the original code inside the card-specific.html file 
            imgContainer.appendChild(cardIMG);
            cardDetailsContainer.appendChild(h2);
            cardDetailsContainer.appendChild(about);
            cardDetailsContainer.appendChild(rarity);
            cardDetailsContainer.appendChild(colors);
        } else {
            alert("Request failed.");
        }
    };
    request.send();
}

// Test to see if there is no query string. If there isn't, display a suitable message.
function testQueryStringValue() {
    const queryString = window.location.search;
    if (!queryString.toString()) {
        alert("Oops! There is no query string!");
    } else {
        getSpecific();
    }
}

testQueryStringValue();
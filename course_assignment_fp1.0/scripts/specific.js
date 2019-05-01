// refer to question 2 before development starts for scope document
// get URL query string
window.onload = testQueryStringValue();

function testQueryStringValue() {
    var queryString = window.location.search;
    if (!queryString.toString()) {
        alert("No query string!");
    } else {
        getSpecific();
    }
}
//https://www.codexworld.com/how-to/get-query-string-from-url-javascript/

function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function getSpecific() {
    var id = getQueryStringValue("id");
    var appendedURL = "https://api.magicthegathering.io/v1/cards/" + id;

    var request = new XMLHttpRequest();
    request.open('GET', appendedURL, true);

    request.onload = function () {
        const data = JSON.parse(request.response);
        if (request.status >= 200 && request.status < 400) {
            const imgContainer = document.getElementById("cardImage");
            const cardDetailsContainer = document.getElementById("cardDetails");

            const cardIMG = document.createElement('img');
            cardIMG.style.width = "100%";
            if (typeof data.card.imageUrl !="undefined") {
                cardIMG.src = data.card.imageUrl;
            } else {
                cardIMG.src = "https://via.placeholder.com/223x310";
            }

            const h2 = document.createElement('h2');
            h2.textContent = data.card.name;

            const about = document.createElement('div');
            about.innerHTML = "<b>About: </b>" + data.card.text;

            const rarity = document.createElement('div');
            rarity.innerHTML = "<b>Rarity: </b>" + data.card.rarity;

            const colors = document.createElement('div');
            colors.innerHTML = "<b>Colors: </b>" + data.card.colors;

            imgContainer.appendChild(cardIMG);
            cardDetailsContainer.appendChild(h2);
            cardDetailsContainer.appendChild(about);
            cardDetailsContainer.appendChild(rarity);
            cardDetailsContainer.appendChild(colors);

        } else {
            alert("Gah, it's not working!");
        }
    };
    request.send();
}
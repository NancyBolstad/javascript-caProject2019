// refer to question 3 before development starts for scope document

window.onload=replaceWords();

function replaceWords() {
    //Replace the word “Magic” with the “Something” in all the text inside the div with “aboutText” ID attached to it.
    const text = document.getElementById("aboutText").innerHTML;
    const textAfterReplace = text.replace(/Magic/g, "Something");
    document.getElementById("aboutText").innerHTML = textAfterReplace;
}

//Toggle display: block and display none on the div with the “moreInfoContent” ID attached to it. 
document.getElementById("moreInfoTrigger").addEventListener("click", function () {
    const isHidden = document.getElementById("moreInfoContent").style.display;
    
    if (isHidden === "none") {
        document.getElementById("moreInfoContent").style.display = "block";
    } else {
        document.getElementById("moreInfoContent").style.display = "none";
    }
});
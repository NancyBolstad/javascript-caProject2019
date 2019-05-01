// refer to question 3 before development starts for scope document

window.onload=function alterWords(){
const regex=/Magic/g;
document.getElementById("aboutText").innerHTML=document.getElementById("aboutText").innerHTML.replace(regex,"Something");
};


document.getElementById("moreInfoTrigger").addEventListener("click",function(){
    let isHidden=document.getElementById('moreInfoContent').style.display;
    if(isHidden==="none"){
        document.getElementById('moreInfoContent').style.display="block";
    }else{
        document.getElementById('moreInfoContent').style.display="none";
    }
});
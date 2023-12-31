const OptionA = document.querySelector("#btn1");
const OptionB = document.querySelector("#btn2");


let choice1 = document.querySelector("#optionA");
let choice2 = document.querySelector("#optionB");

OptionA.addEventListener("click", () => {
    choice2.style.display = "block";
    choice1.style.display = "none";
});

OptionB.addEventListener("click", () => {
    choice1.style.display = "block";
    choice2.style.display = "none";
});

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", () => {
    let rightSide=document.querySelector(".rightSide");
    rightSide.innerHTML="";
    let newElement=document.createElement("div");
    newElement.setAttribute("class","right");
    newElement.innerHTML=`
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    `;
    rightSide.appendChild(newElement);
});




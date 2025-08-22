/*let title = document.querySelector('h1') //selecionar tag h1 no documento html
title.innerHTML = "Secret Number"; // alterando título (dentro de h1)

let paragraph = document.querySelector('p'); // selecionar tag p no documento html
paragraph.innerHTML = "Guess a number"; //alterando parágrafo (conteúdo de p)
*/

let generatedNumbersList = [];
let maxNumber = 10;
let secretNumber = generateRandom();
let tries = 1;

//function to show text in tag
function showText(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    //responsiveVoice.speak(text, 'UK English Female', {rate:1.2}); //imported in html file(linha 7)
     if ('speechSynthesis' in window) {//nativa dos navegadores mais usados (no html import needed)
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-UK'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API not supported in this browser.");
    }
}

startMessage();

// function to check guess
function verifyGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber){
        showText('h1', 'You did it, mate!!!');
        let wordTries = tries > 1 ? " tries.": " try.";
        let triesMessage = "You found the secret number in " + tries + wordTries;
        showText("p", triesMessage);
        document.getElementById("restart").removeAttribute("disabled");
    }else{

        if(guess > secretNumber){
            showText("p", "The secret number is lower!");
        }else{
            showText("p", "The secret number is higher!");
        }
        tries++;
        cleanField();
    }
}

// function to clean input
function cleanField(){
    guess = document.querySelector('input');
    guess.value = "";
}

// function to generate random secret number
function generateRandom(){
    let generatedNumber = parseInt(Math.random() * maxNumber + 1);
    let lengthNumbersList = generatedNumbersList.length;

    if (lengthNumbersList == 3){
        generatedNumbersList = [];
    }

    if (generatedNumbersList.includes(generatedNumber)){ // includes works just like in JAVA
        return generateRandom();
    }else{
        generatedNumbersList.push(generatedNumber);
        console.log(generatedNumbersList);
        return generatedNumber;
    }
}

// funtion to show starting message
function startMessage(){
    showText('h1', "Silly Secret Number Game");
    showText('p', "pick a number between 1 and " + maxNumber + ":");
}

// function to start new game
function restartGame(){
    secretNumber = generateRandom();
    cleanField();
    tries = 1;
    startMessage();
    document.getElementById('restart').setAttribute('disabled', true);
    //setAtribute works kinda like set constructors in JAVA
}



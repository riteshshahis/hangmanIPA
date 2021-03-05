// get section class hangman
async function getHangmanData() {
    const response = await fetch('https://api.punkapi.com/v2/beers'); //change to be a hangman list
    return response.json();
}

const removeKids = () => {
        // const clearElements = [".hangman_h1"]
        const parent=document.querySelector(".hangman");
        const hangmanH1=document.querySelector(".hangman_h1")
        console.log(`Hangman H1 is ${hangmanH1}`)
        parent.removeChild(hangmanH1);

        const bubbleParent=document.querySelector(".hangman__bubble");
        const bubbleH2=document.querySelector("h2")
        const bubbleGuess = document.querySelector('.badguess');
        console.log(`bubble h2 is ${bubbleH2}`)
        bubbleParent.removeChild(bubbleH2);
        bubbleParent.removeChild(bubbleGuess);
        const phraseParent=document.querySelector(".hangman__phrase")
        const phraseP=document.querySelector(".new")
        phraseParent.removeChild(phraseP);
        const buttonParent=document.querySelector(".hangman__button")
        const buttonInput=document.querySelector(".txt");
        buttonParent.removeChild(buttonInput);
        const alreadyUsedParent=document.querySelector(".hangman__alreadyUsed");
        const alreadyUsedH4=document.querySelector("h4");
        alreadyUsedParent.removeChild(alreadyUsedH4);
        triedLetters.splice(0, triedLetters.length) // reset tried letters
        document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangmanbefore.png')";

    return ;
}

const make_H1 = () => {

    const hangman_body = document.querySelector('.hangman');

    //Add Clue to Hangman wordset
    const hangmanH1Item = document.createElement('h1'); // has to be key values from html - create an additional list
    hangmanH1Item.innerHTML="Know your IPAs???"
    hangmanH1Item.style.marginLeft="75px";
    hangmanH1Item.style.paddingLeft="200px";
    hangmanH1Item.style.fontSize="40px";
    hangmanH1Item.style.color="blue";
    hangmanH1Item.classList="hangman_h1";
    hangmanH1Item.style.alignItems="center";
    hangmanH1Item.width="300px";
    hangmanH1Item.height="200px";

    hangman_body.appendChild(hangmanH1Item);
}

const checkAgainstArray = (screenButton, targetString) =>{
    const targetArray = targetString.split("");
    const indexToMatch=[];
    let i=0; // count for index 
    for (i=0;i<targetArray.length;i++) {
        if(targetArray[i].toLowerCase() == screenButton.toLowerCase()) {
            indexToMatch.push(i); //matched character in phrase array
        }    
    }
    return indexToMatch;
}

const badGuessStatus = badGuess = (tried, screenButton) => {

    // add to triedLetters
    tried.push(screenButton);
    tried = tried.filter((item, index, tried) => tried.indexOf(item) === index);

    const bubble = document.querySelector('.badguess');
    bubble.innerHTML=tried.join(" ");
    bubble.style.paddingLeft="10%"
    bubble.style.color="red";
    bubble.style.fontSize="30px"

    // set Error if needed

    // set picture
    switch (tried.length) { //had to include '!' as the first char
        case 2:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman1.png')";
            break;
        case 3:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman2.png')";
            break;
        case 4:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman3.png')";
            break;
        case 5:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman4.png')";
            break;
        case 6:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman5.png')";
            break;
        case 7:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman6.png')";
            break;
        case 8:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangman-final.png')";
            document.querySelector('.hangman__bubble').style.opacity="1";
            // const buttonParent=document.querySelector(".hangman__button")
            document.querySelector(".txt").style.visibility = "hidden";
            // buttonParent.removeChild(buttonInput);
    
            break;
        default:
            document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/hangmanbefore.png')";
            break;
    }
}

const displayNewChars = (checkAgainst, screenButton, phraseString, validLetters) => {

    const newPhrase = document.querySelector('.p');


    let arrayToCheck = phraseString.split("");

    arrayToCheck.map((letter, index) => {

        for (i=0; i < validLetters.length; i++) {
            if (validLetters[i].toLowerCase() == letter.toLowerCase()) { //or a space
            return;// matched, so no need to change anything
            }
        }

        //match back any non-alphas as we're not checking those
        let regexp = /[.,\/#!$%\^&\*;:{}=\-_`'~()]/;
        if(regexp.test(letter)) {
            arrayToCheck[index] = letter;
        }
        if (letter==" ") {
        arrayToCheck[index] = "/";
        }
        else {
        arrayToCheck[index] = "_";
        }
    });
    console.log(phraseString);

    dashResult=arrayToCheck.join(" ");; // sets the current string into the page

    let finalDashresult=dashResult;
    if( (JSON.stringify(finalDashresult).replace(/\W/g, '')) == (JSON.stringify(phraseString).replace(/\W/g, '')))
    {
        document.querySelector('.hangman__picture').style.backgroundImage = "url('./styles/mario.gif')";
        document.querySelector('.hangman_h1').innerHTML="YOU WON!!!";
        //disable button for adding letters
        const button = document.querySelector('.txt');
        button.disabled = true; //setting button state to disabled
    }
    return;    
};

const makeTextBox = () => {

    const button = document.querySelector('.hangman__button');

    let buttonInput = document.createElement('input');
    // buttonInput.innerHTML="Enter a character";
    // buttonInput.style.paddingTop="10%";
    buttonInput.style.margin="auto";
    buttonInput.style.display="flex";
    buttonInput.style.flexDirection="column";
    buttonInput.style.alignItems="center";
    buttonInput.classList.add('txt'); // new class added to list item received from input box/button on page
    buttonInput.style.border="none";
    buttonInput.style.height="40%";
    buttonInput.style.width="50%";
    buttonInput.style.fontSize="30px"
    buttonInput.maxLength=1;
    button.appendChild(buttonInput);

}


//global params
let checkCharac="";
let dashResult=[]; //initialise outside as used by a number of functions
let firstRun=true;
let triedLetters=[]; // list of letters that don't fit

const hangman = () => {

    let firstWord=true;
    triedLetters.push("!"); //initialised as need something in there
    validLetterBank = []; //letter bank for all valid letters
    
    make_H1 (); //builds Strapline

    const result = getHangmanData() // need correct api to get data from
        .then(data => {
        // console.log(data);
        const hangmanArray = data.map(element => {
            // console.log(element.tagline); //need to get rid of full stops & replace "-" with space
            return element.tagline;            
        });
        // we'll use this data to randomly go through words and choose
        let index = Math.floor(Math.random() * Math.floor(Object.keys(data).length));
        let cleanHangmanArray = hangmanArray[index].replace(/[\-]/g," ");
        cleanHangmanArray = hangmanArray[index].replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"");

        const phrase = document.querySelector('.hangman__phrase');
        const reset = document.querySelector('.hangman__reset');
        const alreadyUsed = document.querySelector('.hangman__alreadyUsed');
        const bubble = document.querySelector('.hangman__bubble');
        const paraItem = document.createElement('p'); // has to be key values from html - create an additional list
        const alreadyUsedItem = document.createElement('h4');

        alreadyUsedItem.innerHTML="Already Used!!";
        alreadyUsedItem.style.paddingTop="10px";
        alreadyUsedItem.style.fontSize="15px";
        alreadyUsedItem.style.color="red";
        alreadyUsedItem.style.display="flex";
        alreadyUsedItem.style.justifyContent="center";
        alreadyUsed.appendChild(alreadyUsedItem);
        alreadyUsed.style.visibility = "hidden";

        let bubbleHead = document.createElement('h2');
        bubbleHead.innerHTML="Bad Guesses:"
        bubbleHead.style.color="red";
        bubbleHead.style.fontSize="40px"
        bubbleHead.style.paddingTop="100px";
        bubbleHead.style.paddingLeft="20px"    
        bubble.appendChild(bubbleHead);

        let bubbleInput = document.createElement('h6');
        // bubbleInput.style.paddingTop="10%";
        bubbleInput.style.margin="auto";
        bubbleInput.style.color="red";
        bubbleInput.style.fontSize="30px"
        bubbleInput.classList.add('badguess'); // new class added to update bad guesses on page
        bubble.appendChild(bubbleInput);
        let arrayPhrase = cleanHangmanArray.split(" ");

        dashResult = arrayPhrase.map(word => {
            let singleWord =[]; //array for all dashes and forward slashes
            let j=0;
            if (firstWord){
                firstWord=false;
                for(; j<word.length; j++){ //l is the overall counter for all the words in the phrase
                    singleWord[j]="_";
                }
                return singleWord;
            }
            else{
                let k=0;
                let firstDash=true; // every time we're in the next word, we need to have a "/" before the word replaced "_"'s
                for(; k<word.length+1; k++){
                    if(firstDash){
                        firstDash=false;
                        singleWord[k]="/";
                        k++; // we need a /_ as more than one word
                        singleWord[k]="_";
                    }
                    else{
                        singleWord[k]="_";
                    }
                }
                return singleWord;
            }
        });
        paraItem.innerHTML = dashResult.join(" "); // dash equivalent of word
        paraItem.classList.add('new')
        paraItem.style.paddingTop="10px";
        paraItem.style.fontSize="25px";
        paraItem.style.color="blue";
        paraItem.style.display="flex";
        paraItem.style.justifyContent="center";
        phrase.appendChild(paraItem);

        const screenCharStatus = makeTextBox();

        const textButton = document.querySelector('.txt');
        //let's get the character
        textButton.addEventListener('input', (event) => { // on input character
            event.preventDefault(); 
            checkCharac = textButton.value;

            //Check alphanumberic
            let regexp = /^[a-zA-Z0-9]/;
            if(regexp.test(textButton.value)) {
                let screenButton=textButton.value;
                triedLetters.map(letter => {
                    if(letter.toLowerCase() == screenButton.toLowerCase()) { //already tried the letter
                        alreadyUsed.style.visibility = "visible";
                    }
                    else {
                        const checkAgainst = checkAgainstArray (screenButton, cleanHangmanArray);
                        const checkCommas = JSON.stringify(checkAgainst).split("null"); //stupidly I get all ,'s for empty matches

                        if (checkCommas.length-1 == checkAgainst.length) { //no match
                            const badGuessStatus = badGuess(triedLetters, screenButton);
                        }
                        else {
                            alreadyUsed.style.visibility = "hidden";
                            // send array of numbers & character & current string to new function
                            validLetterBank.push(screenButton); //
                            validLetterBank = validLetterBank.filter((item, nuIndex, validLetterBank) => validLetterBank.indexOf(item) === nuIndex);
                            const displayStatus = displayNewChars(checkAgainst, screenButton, cleanHangmanArray, validLetterBank);                            
                            paraItem.innerHTML=dashResult; // dash equivalent of word                            
                        }
                    }
                });
            }
            else{
                    alert("Invalid Character!! Alpha Numberic only please");
            }
            // check against string array and fill OR add to triedLetters
            textButton.value="";
        })
    })
}


const resetButton = document.querySelector('.hangman__reset');

// Set RESET button
const resetItem = document.createElement('h1');
resetItem.innerHTML="RESET/PLAY";
// resetItem.style.paddingTop="10px";
resetItem.style.fontSize="20px";
resetItem.style.color="blue";
resetItem.style.display="flex";
resetItem.style.justifyContent="center";
resetButton.appendChild(resetItem);

resetButton.addEventListener('click', (event) => { // on input character
            event.preventDefault(); 
    if (!firstRun)
    {
        removeKids ();
    }
    hangman(); // Play the game
    firstRun=false
});

let bombs;
let maxClicks;
const bombsNumber = 16;
let clickedNumbers = [];


document.getElementById("play-btn").addEventListener("click", startGame)


function startGame() {
    clickedNumbers = [];

    const cellsNumber = getCellsNumber();
    
    const gridElem = document.querySelector(".grid");
    const introText = document.querySelector("h2");
        
    gridElem.innerHTML = ""; 

    introText.classList.add("hidden");
    gridElem.classList.remove("hidden");
    
    for (let i = 1; i <= cellsNumber; i++) {

        const newElem = createGridElem(i, Math.sqrt(cellsNumber))
        newElem.addEventListener("click", handleCellClick)
        gridElem.append(newElem)
    }

   bombs = generateBombs(bombsNumber, cellsNumber)

   maxClicks = cellsNumber - bombsNumber;

}

function endGame(result) { 
    const resultElem = document.querySelector("h2");
    resultElem.classList.remove(".hidden")
    if (result === "win") {
        resultElem.innerHTML = `hai vinto il tuo punteggio è ${clickedNumbers.length}`;
        
    } else {
        resultElem.innerHTML = `hai perso il tuo punteggio è ${clickedNumbers.length}`;
    }

    const gridItems = document.getElementsByClassName("grid-item");
    for (let i = 0; i < gridItems.length; i++) {
        const curItem = gridItems[i];
        curItem.removeEventListener("click", handleCellClick);

        const curNumber = parseInt(curItem.textContent);

        if(bombs.includes(curNumber)) {
            curItem.classList.add("bomb");
        }

    }

}

// FUNCTIONS



function getCellsNumber() {
    const level = parseInt(document.querySelector("select").value);
    let cellsNumber;
    switch (level) {
    case 1:
        cellsNumber = 100;
        break;
    case 2:
        cellsNumber = 81;
        break;
    case 3:
        cellsNumber = 49;
        break
   
    default:
        cellsNumber = 100;
        break;
   }

   return cellsNumber;
}

function createGridElem(content, cellSize) {
    const gridElem = document.createElement ("div");
    gridElem.style.width = `calc(100% / ${cellSize})`
    gridElem.style.height = `calc(100% / ${cellSize})`
    gridElem.classList.add("grid-item")
    gridElem.innerHTML = `<span>${content}</span>`
    return gridElem
}


function handleCellClick() {
    const clickedNumber = parseInt(this.querySelector("span"));
    if (bombs.includes(clickedNumber)) {
        this.classList.add("bomb");
        endGame("loss");
    } else {
        if(!clickedNumbers.includes(clickedNumber)) {
            this.classList.add("clicked")
 
            if(clickedNumbers.length === maxClicks) {
                endGame("win")
            }
        }
        
    }
    
}

function generateBombs(numbersQuantity, maxNumber) {
    const numbers = [];
    while (numbers.length < numbersQuantity) {
        const rndNumber = getRndInteger(1, maxNumber);
      
        if (!numbers.includes(rndNumber)) {
            numbers.push(rndNumber)
        }
    }
    return numbers
}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }





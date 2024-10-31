let divDeck = document.getElementsByClassName("deck")[0]


/**
    * Returns a random integer between min and max
    * @param {Number} min 
    * @param {Number} max 
    *
    */
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild)
    }
}


function createVisualDeck(div, deck) {
    for (const card of deck) {
        let degree = getRandomInt(0, 5) * (Math.random() < 0.5 ? 1 : -1)
        let offsetX = getRandomInt(48, 52) * -1
        let offsetY = getRandomInt(42, 58) * -1
        let newElement = document.createElement("div")
        newElement.classList.add("deckitem")
        newElement.style.transform = `translate(${offsetX}%, ${offsetY}%) rotate(${degree}deg)`
        divDeck.appendChild(newElement)
    }
}

function createVisualCard(adder, digCard) {
    const suitSymbols = ["♠", "♥", "♦", "♣"]
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerText = `${Object.values(digCard)[0]}`

    adder.appendChild(card)
}

function drawDealer() {
    const Divdealer = document.getElementsByClassName("dealer")[0]

    // function draw(drawTo) {
    //     // pushes the popped item
    //     return drawTo.push(deck.pop())
    // }
    createVisualCard(Divdealer, draw(dealer))
}

function drawPlayer() {
    const Divplayer = document.getElementsByClassName("player")[0]

    // function draw(drawTo) {
    //     // pushes the popped item
    //     return drawTo.push(deck.pop())
    // }
    createVisualCard(Divplayer, draw(hand))
}

const originalDeck = []
const suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"]
// console.log("Start Deck loop")
for (let suit of suits) { // for each suit
    let i = 0
    while (i < 13) {  //for each card in suit
        let card = {}
        card[suit] = i + 1
        originalDeck.push(card)
        i++
    }
}
// console.log("Deck loop finished")
// console.log(originalDeck)

let deck = originalDeck.slice()

createVisualDeck(divDeck, deck)

let hand = []
let dealer = []


function shuffle(array) {
    let currentIndex = array.length //get the array length and its last index

    while (currentIndex != 0) { // as long as we havent gone through all indexes
        // get a random index between 0 and currentIndex
        let randomIndex = Math.floor(Math.random() * (currentIndex))
        // console.log(randomIndex)
        currentIndex--
        // switch the values at randomIndex and currentIndex with each other
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}


function draw(drawTo) {
    // pushes the popped item
    card = deck.pop()
    drawTo.push()
    return card
}

function sum(array) {
    let result = 0
    array.forEach((c, _i) => {

        if (Object.values(c)[0] === 11) {
            result += 11
        } else if (Object.values(c)[0] > 10) {
            result += 10
        } else {
            result += Object.values(c)[0]
        }

    })
    if (result > 21) {
        array.forEach((c, _i) => {
            if (Object.values(c)[0] === 11) {
                result -= 10
            }
        })
    }

    // console.log("Summed: " + result)
    return result
}

function reset() {
    removeChildren(document.getElementsByClassName("player")[0])
    removeChildren(document.getElementsByClassName("dealer")[0])
    deck = originalDeck.slice()
    shuffle(deck)
    hand = []
    dealer = []
    game = true
    stayed = false
    console.clear()
}

let hitstay;


function hit() {
    hitstay(true)
}

function stand() {
    hitstay(false)
}


async function stayOrHit() {
    let res
    let promise = new Promise((resolve) => hitstay = resolve)
    console.log("Waiting")
    await promise.then((result) => { res = result });
    if (res === true) {
        draw(hand)
    } else {
        return false
    }
    console.log("Finished waiting")
}

function checkBust(arr) {
    if (sum(arr) > 21) {
        return true
    }
    return false
}


function winCheck() {
    // win by getting more than dealer but not over 21
    if (sum(hand) === 21) {
        return true
    } else if (sum(hand) > sum(dealer) && sum(hand) < 21) {
        return true
    } else {
        return false
    }
}

function continueGame() {
    let answer = prompt("want to play a new round? y/n")
    if (answer === "y") {
        reset()
        return true
    } else {
        return false
    }

}

let stayed = false
let game = true

shuffle(deck)
console.log(hand)

// Dealer and player receive 2 cards
// does player want to stand or hit?
// is player above 21? Lose
// is dealer above 17? yes: dealer stands, no: dealer hits


async function gameStart() {
    while (game) {
        console.log("Started")
        // Dealer and player receive 2 cards
        drawPlayer()
        drawPlayer()
        drawDealer()
        drawDealer()
        console.log("Your Hand: " + sum(hand))
        console.log("Dealers Hand: " + sum(dealer))
        await stayOrHit() // Does Player want to stand or hit?
        // is player above 21?
        if (checkBust(hand)) {
            console.log("You Lose! you busted")
            //continueGame()
            continue
        }
        // if dealer is under 17 draw one more
        if (sum(dealer) < 17) {
            draw(dealer)
        }
        // is dealer above 21?
        if (checkBust(dealer)) {
            console.log("You Win! dealer busted")
            //continueGame()
            continue
        }
        console.log("Your Hand: " + sum(hand))
        console.log("Dealers Hand: " + sum(dealer))
        if (winCheck()) {
            console.log("You Win!!")
        } else {
            console.log("You Lost!!")
        }
        //continueGame()
        reset()

    }
}

gameStart()

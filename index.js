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
    return drawTo.push(deck.pop())
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
    deck = originalDeck.slice()
    shuffle(deck)
    hand = []
    dealer = []
    game = true
    stayed = false
    console.clear()
}

function stayOrHit() {
    let answer = prompt("Hit or Stay? y/n")
    if (answer === "y") {
        draw(hand)
    } else {
        return false
    }
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


while (game) {
    // Dealer and player receive 2 cards
    draw(hand)
    draw(hand)
    draw(dealer)
    draw(dealer)
    console.log("Your Hand: " + sum(hand))
    console.log("Dealers Hand: " + sum(dealer))
    stayOrHit() // Does Player want to stand or hit?
    // is player above 21?
    if (checkBust(hand)) {
        console.log("You Lose! you busted")
        continueGame()
        continue
    }
    // if dealer is under 17 draw one more
    if (sum(dealer) < 17) {
        draw(dealer)
    }
    // is dealer above 21?
    if (checkBust(dealer)) {
        console.log("You Win! dealer busted")
        continueGame()
        continue
    }
    console.log("Your Hand: " + sum(hand))
    console.log("Dealers Hand: " + sum(dealer))
    if (winCheck()) {
        console.log("You Win!!")
    } else {
        console.log("You Lost!!")
    }
    continueGame()
}

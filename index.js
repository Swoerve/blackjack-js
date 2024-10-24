const originalDeck = []
const suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"]
console.log("Start Deck loop")
for (let suit of suits) { // for each suit
    let i = 0
    while (i < 13) {  //for each card in suit
        let card = {}
        card[suit] = i + 1
        originalDeck.push(card)
        i++
    }
}
console.log("Deck loop finished")
console.log(originalDeck)

let deck = originalDeck.slice()

let hand = []


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
        result += Object.values(c)[0]
    })
    return result
}

console.log(deck)

console.log("Shuffling")
shuffle(deck)
console.log(deck)
console.log("Shuffling, again")
draw(hand)
shuffle(deck)
console.log(deck)

draw(hand)
draw(hand)
draw(hand)

console.log(deck)

console.log(hand)
console.log(sum(hand))
shuffle(deck)
console.log(deck)


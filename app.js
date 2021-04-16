//* 2048 Game!

//* DOM Elements

const elements = {
  //? Find the main grid element
  grid: document.querySelector('#grid'),
  highestValue: document.querySelector('#highest-value'),
  score: document.querySelector('#current-score'),
  highScorce: document.querySelector('#high-score'),
}

//* Variables

const width = 4
const tileArray = []

//* SETUP GRID (Working I think?)

//? For loop through the grid div children and add to array

for (let i = 0; i < width ** 2; i++) {
  //? Create div
  const tile = document.createElement('div')
  //? Add div to to grid
  elements.grid.appendChild(tile)
  //? add div index to grid.innerHTML for debug
  //tile.innerHTML = i
  //? add div to div array
  tileArray.push(tile)

  //? Style the Div
  tile.style.width = `${100 / width}%`
  tile.style.height = `${100 / width}%`
}

//* Start the game

function startGame() {
  addActiveTile()
  addActiveTile()
}
startGame()

//* Check input (Working I think?)

document.addEventListener('keydown', (event) => {

  //? make the const key = the key they was pressed
  const key = event.key

  //? Check which input was pressed (takes arrow or common letter)
  switch (true) {
    case key === 'w' || key === 'ArrowUp': upPressed(); break
    case key === 'a' || key === 'ArrowLeft': leftPressed(); break
    case key === 's' || key === 'ArrowDown': downPressed(); break
    case key === 'd' || key === 'ArrowRight': rightPressed()
  }
})

//* Input Functions (Working I think?)

function upPressed() {
  console.log('up')
  shift('up')
  addActiveTile()
  console.log('---------Console Break--------')
}

function leftPressed() {
  console.log('left')
  shift('left')
  addActiveTile()
  console.log('---------Console Break--------')
}

function downPressed() {
  console.log('down')
  shift('down')
  addActiveTile()
  console.log('---------Console Break--------')
}

function rightPressed() {
  console.log('right')
  shift('right')
  addActiveTile()
  console.log('---------Console Break--------')
}

//* Gameplay Loop Functions 

function addActiveTile() {
  //? loop to get an array of inactive tiles
  const inactiveTileIndex = []
  const inactiveTiles = []
  tileArray.forEach((tile, i) => {
    if (!tile.classList.contains('active')) {
      inactiveTileIndex.push(i)
      inactiveTiles.push(tile)
    }
  })
  console.log(inactiveTileIndex)
  if (inactiveTileIndex.length > 0) { //! This is causing new tiles to be added to old bc it doesnt actually get a random tile of the inactive tiles
    const randTileIndex = Math.floor(Math.random() * inactiveTileIndex.length) // get random inactive tile index
    inactiveTiles[randTileIndex].classList.add('active') // set tile to active
    inactiveTiles[randTileIndex].innerHTML = 2 // give tile an innerhtml of 2
    console.log(`Adding an active tile at ${randTileIndex}`)
  } else {
    //? check if something can merge, if it cant then end the game
    console.error('If you got it working this far well done, but its still broken lmao. Check func addActiveTile for the end game check')
  }
}


//* This should work? check it tho dumby

function shift(direction) {
  //? loop to get an array of active tile indexs
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
    }
  })
  shiftLoopDirection(direction, activeTileIndex)
}

function shiftLoopDirection(direction, activeTileIndex) {
  switch (direction) {
    case 'up':
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`current tile is ${tileIndex}`)
        if (tileIndex - width >= 0) {
          move(tileIndex - width, tileIndex, activeTileIndex, direction, i)
        }
        // moveUp(activeTileIndex)
      })
      break

    case 'left':
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`current tile is ${tileIndex}`)
        if (!(tileIndex % width === 0)) {
          move(tileIndex - 1, tileIndex, activeTileIndex, direction, i)
        }
        // moveUp(activeTileIndex)
      })
      // moveLeft(activeTileIndex)
      break

    case 'down':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`current tile is ${tileIndex}`)
        if (tileIndex + width < width ** 2) {
          move(tileIndex + width, tileIndex, activeTileIndex, direction, i)
        }
        // moveUp(activeTileIndex)
      })
      // moveDown(activeTileIndex)
      break

    case 'right':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`current tile is ${tileIndex}`)
        if (!(tileIndex % width === 3)) {
          move(tileIndex + 1, tileIndex, activeTileIndex, direction, i)
        }
        // moveUp(activeTileIndex)
      })
      // moveRight(activeTileIndex)
      break

    default: console.error('Unexpected direction passed to func shift(direction)')
  }
}

function move(directionValue, tileIndex, activeTileIndex, direction, i) {
  if (tileArray[directionValue].classList.contains('active')) { // is it trying to move into active tile?
    // console.log(`${tileIndex} found active tile ${directionValue}`)

    if (tileArray[directionValue].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
      // console.log(`${tileIndex} is merging into ${directionValue}`)
      tileArray[tileIndex].classList.remove('active')
      tileArray[tileIndex].innerHTML = ''
      tileArray[directionValue].innerHTML = (Number(tileArray[directionValue].innerHTML) * 2)
      //? merge them, update score and highest value thingy
      //! splice activeTileIndex at i to remove the active tile so we dont merge twice
      activeTileIndex.splice(i, 1)
    } else {
      // they are not the same number
      // console.log(`${tileIndex} isnt the same as ${directionValue} and isnt trying to merge`)
    }
  } else {
    //its trying to move into empty tile
    // console.log(`${tileIndex} is moving into empty tile ${directionValue}`)
    tileArray[directionValue].classList.add('active')
    // console.log(`tile at ${directionValue} is active? ${tileArray[directionValue].classList.contains('active')}`)
    tileArray[directionValue].innerHTML = tileArray[tileIndex].innerHTML
    tileArray[tileIndex].classList.remove('active')
    tileArray[tileIndex].innerHTML = ''
    activeTileIndex.splice(i, 1, directionValue)
    //? run moveUp(activeTileIndex) again
    shiftLoopDirection(direction, activeTileIndex)
  }
}


//! moveLeft, moveDown, and moveRight will all be very similar to this
// function moveUp(activeTileIndex) {
//   //? Up logic
//   activeTileIndex.forEach((tileIndex, i) => {
//     // console.log(`current tile is ${tileIndex}`)

//     if (tileIndex - width >= 0) { // is it trying to move into a valid tile?
//       // console.log(`${tileIndex} found a valid tile at ${tileIndex - width}`)

//       if (tileArray[tileIndex - width].classList.contains('active')) { // is it trying to move into active tile?
//         // console.log(`${tileIndex} found active tile ${tileIndex - width}`)

//         if (tileArray[tileIndex - width].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
//           // console.log(`${tileIndex} is merging into ${tileIndex - width}`)
//           tileArray[tileIndex].classList.remove('active')
//           tileArray[tileIndex].innerHTML = ''
//           tileArray[tileIndex - width].innerHTML = (Number(tileArray[tileIndex - width].innerHTML) * 2)
//           //? merge them, update score and highest value thingy
//           //! splice activeTileIndex at i to remove the active tile so we dont merge twice
//           activeTileIndex.splice(i, 1)
//         } else {
//           // they are not the same number
//           // console.log(`${tileIndex} isnt the same as ${tileIndex - width} and isnt trying to merge`)
//         }
//       } else {
//         //its trying to move into empty tile
//         // console.log(`${tileIndex} is moving into empty tile ${tileIndex - width}`)
//         tileArray[tileIndex - width].classList.add('active')
//         // console.log(`tile at ${tileIndex - width} is active? ${tileArray[tileIndex - width].classList.contains('active')}`)
//         tileArray[tileIndex - width].innerHTML = tileArray[tileIndex].innerHTML
//         tileArray[tileIndex].classList.remove('active')
//         tileArray[tileIndex].innerHTML = ''
//         activeTileIndex.splice(i, 1, tileIndex - width)
//         //? run moveUp(activeTileIndex) again
//         moveUp(activeTileIndex)
//       }
//     } else {
//       // console.log(`${tileIndex} is trying to move into an invalid tile, splicing`)
//       // activeTileIndex.splice(i, 1)
//       // do nothing
//     }
//   })
// }

// function moveLeft(activeTileIndex) {
//   //? Left logic
//   activeTileIndex.forEach((tileIndex, i) => {
//     // console.log(`current tile is ${tileIndex}`)

//     if (!(tileIndex % width === 0)) { // is it trying to move into a valid tile?
//       // console.log(`${tileIndex} found a valid tile at ${tileIndex - 1}`)

//       if (tileArray[tileIndex - 1].classList.contains('active')) { // is it trying to move into active tile?
//         // console.log(`${tileIndex} found active tile ${tileIndex - 1}`)

//         if (tileArray[tileIndex - 1].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
//           // console.log(`${tileIndex} is merging into ${tileIndex - 1}`)
//           tileArray[tileIndex].classList.remove('active')
//           tileArray[tileIndex].innerHTML = ''
//           tileArray[tileIndex - 1].innerHTML = (Number(tileArray[tileIndex - 1].innerHTML) * 2)
//           //? merge them, update score and highest value thingy
//           //! splice activeTileIndex at i to remove the active tile so we dont merge twice
//           activeTileIndex.splice(i, 1)
//         } else {
//           // they are not the same number
//           // console.log(`${tileIndex} isnt the same as ${tileIndex - 1} and isnt trying to merge`)
//         }
//       } else {
//         //its trying to move into empty tile
//         // console.log(`${tileIndex} is moving into empty tile ${tileIndex - 1}`)
//         tileArray[tileIndex - 1].classList.add('active')
//         // console.log(`tile at ${tileIndex - 1} is active? ${tileArray[tileIndex - 1].classList.contains('active')}`)
//         tileArray[tileIndex - 1].innerHTML = tileArray[tileIndex].innerHTML
//         tileArray[tileIndex].classList.remove('active')
//         tileArray[tileIndex].innerHTML = ''
//         activeTileIndex.splice(i, 1, tileIndex - 1)
//         //? run moveUp(activeTileIndex) again
//         moveLeft(activeTileIndex)
//       }
//     } else {
//       // console.log(`${tileIndex} is trying to move into an invalid tile, splicing`)
//       // activeTileIndex.splice(i, 1)
//       // do nothing
//     }
//   })
//   //! left and right use +1 or -1 and checks are with %
// }
// function moveDown(activeTileIndex) {
//   //? Down logic
//   activeTileIndex.reverse()
//   activeTileIndex.forEach((tileIndex, i) => {
//     // console.log(`current tile is ${tileIndex}`)

//     if (tileIndex + width < width ** 2) { // is it trying to move into a valid tile?
//       // console.log(`${tileIndex} found a valid tile at ${tileIndex - width}`)

//       if (tileArray[tileIndex + width].classList.contains('active')) { // is it trying to move into active tile?
//         // console.log(`${tileIndex} found active tile ${tileIndex - width}`)

//         if (tileArray[tileIndex + width].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
//           // console.log(`${tileIndex} is merging into ${tileIndex - width}`)
//           tileArray[tileIndex].classList.remove('active')
//           tileArray[tileIndex].innerHTML = ''
//           tileArray[tileIndex + width].innerHTML = (Number(tileArray[tileIndex + width].innerHTML) * 2)
//           //? merge them, update score and highest value thingy
//           //! splice activeTileIndex at i to remove the active tile so we dont merge twice
//           activeTileIndex.splice(i, 1)
//         } else {
//           // they are not the same number
//           // console.log(`${tileIndex} isnt the same as ${tileIndex - width} and isnt trying to merge`)
//         }
//       } else {
//         //its trying to move into empty tile
//         // console.log(`${tileIndex} is moving into empty tile ${tileIndex - width}`)
//         tileArray[tileIndex + width].classList.add('active')
//         // console.log(`tile at ${tileIndex - width} is active? ${tileArray[tileIndex - width].classList.contains('active')}`)
//         tileArray[tileIndex + width].innerHTML = tileArray[tileIndex].innerHTML
//         tileArray[tileIndex].classList.remove('active')
//         tileArray[tileIndex].innerHTML = ''
//         activeTileIndex.splice(i, 1, tileIndex + width)
//         //? run moveUp(activeTileIndex) again
//         moveDown(activeTileIndex)
//       }
//     } else {
//       // console.log(`${tileIndex} is trying to move into an invalid tile, splicing`)
//       // activeTileIndex.splice(i, 1)
//       // do nothing
//     }
//   })
//   //! remember to reverse the activeTileIndex so the tiles sort in the right order
// }
// function moveRight(activeTileIndex) {
//   //? Left logic
//   activeTileIndex.forEach((tileIndex, i) => {
//     // console.log(`current tile is ${tileIndex}`)

//     if (!(tileIndex % width === 3)) { // is it trying to move into a valid tile?
//       // console.log(`${tileIndex} found a valid tile at ${tileIndex - 1}`)

//       if (tileArray[tileIndex + 1].classList.contains('active')) { // is it trying to move into active tile?
//         // console.log(`${tileIndex} found active tile ${tileIndex - 1}`)

//         if (tileArray[tileIndex + 1].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
//           // console.log(`${tileIndex} is merging into ${tileIndex - 1}`)
//           tileArray[tileIndex].classList.remove('active')
//           tileArray[tileIndex].innerHTML = ''
//           tileArray[tileIndex + 1].innerHTML = (Number(tileArray[tileIndex + 1].innerHTML) * 2)
//           //? merge them, update score and highest value thingy
//           //! splice activeTileIndex at i to remove the active tile so we dont merge twice
//           activeTileIndex.splice(i, 1)
//         } else {
//           // they are not the same number
//           // console.log(`${tileIndex} isnt the same as ${tileIndex - 1} and isnt trying to merge`)
//         }
//       } else {
//         //its trying to move into empty tile
//         // console.log(`${tileIndex} is moving into empty tile ${tileIndex - 1}`)
//         tileArray[tileIndex + 1].classList.add('active')
//         // console.log(`tile at ${tileIndex - 1} is active? ${tileArray[tileIndex - 1].classList.contains('active')}`)
//         tileArray[tileIndex + 1].innerHTML = tileArray[tileIndex].innerHTML
//         tileArray[tileIndex].classList.remove('active')
//         tileArray[tileIndex].innerHTML = ''
//         activeTileIndex.splice(i, 1, tileIndex + 1)
//         //? run moveUp(activeTileIndex) again
//         moveRight(activeTileIndex)
//       }
//     } else {
//       // console.log(`${tileIndex} is trying to move into an invalid tile, splicing`)
//       // activeTileIndex.splice(i, 1)
//       // do nothing
//     }
//   })
//   //! remember to reverse the activeTileIndex so the tiles sort in the right order
// }

//* Additional stuffs to do:

//? game initialization
//? end game function
//? score and highest number updates
//? bunch-a css
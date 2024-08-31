/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: GAME
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const pizza = "z"
const hungy = "h"

setLegend(
  [player, bitmap`
................
................
.....999999.....
....99333399....
....93633639....
....93333339....
....93633639....
....99366399....
.....999999.....
...9333333339...
...9333330039...
...9333333339...
...9333333339...
...9.333333.9...
.....0....0.....
....00....00....`],
  [pizza, bitmap`
...9999999999...
..993333333399..
.99336666663399.
9936666666666399
9336633666666339
93663333666CC639
93663333666CC639
9366633666666639
9366666663366639
9366666633336639
9366CC6633336639
9336CC6663366339
9936666666666399
.99336666663399.
..993333333399..
...9999999999...`],
  [hungy, bitmap`
....00000000....
...0020220200...
..022202202220..
..022020020220..
..022022220220..
..022222222220..
..022200002220..
..022022220220..
...0022222200...
....00000000....
.......00.......
.....000000.....
.....0.00.0.....
.....0.00.0.....
......0000......
......0..0......`]
)

setSolids([])

let level = 0
let pizzastack = 0
let peoplefed = 0
let peoplemapfed = 0
let peopleonmap = 0
const levels = [
  map`
..........
..........
...hh.....
..........
..........
..........
p..zz.....
..........`,
  map`
..........
..........
..........
..........
..........
h.........
p.........
.........z`,
  map`
..........
..........
...h......
..........
..........
..........
p..z......
..........`,
  map`
..........
..........
...h......
..........
..........
..........
p..z......
..........`,
]

setMap(levels[level])
peopleonmap = tilesWith(hungy).length
addText(peoplefed.toString(), {
  x: 1,
  y: 1
})
setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})


afterInput(() => {
  const peopleDelivered = tilesWith(player, hungy); // tiles that both contain the player and goal
  const pizzasHad = tilesWith(player, pizza); // ADDED: all the keys that the player is on
  const playerTile = getFirst(player)
  const pizzaatplayer = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === pizza)
  const hungyatplayer = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === hungy)
  if (peopleDelivered.length >= 1 && pizzastack >= 1) {
    pizzastack -= 1
    peoplefed += 1
    peoplemapfed += 1
    hungyatplayer.remove()
    clearText()
    addText(peoplefed.toString(), {
      x: 1,
      y: 1
    })
  }
  // there is one player, so if 1 or more tiles with both a goal and a player, next level
  if (peoplemapfed == peopleonmap) {
    // increase the current level number
    level = level + 1;
    peoplemapfed = 0

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      
      peopleonmap = tilesWith(hungy).length
    } else {
      clearText()
      addText("You WIN!", {
        x: 6,
        y: 6
      })
      getFirst(player).remove()
    }
  }
  // ADDED: remove the lock and key if the key is picked up
  if (pizzasHad.length >= 1) {
    pizzastack += 1
    pizzaatplayer.remove()

  }


})
let persuasionEncounter = (heroes, enemies) => {
    let persuasionBarrier = 0
    let persuasionPower = 0
    enemies.forEach(enemy => {
        persuasionBarrier += enemy.barriers.persuade
    })
    heroes.forEach(hero => {
        persuasionPower += hero.persuade()
    })
    return persuasionPower >= persuasionBarrier
}

let sneakEncounter = (heroes, enemies) => {
    let sneakBarrier = 0
    let sneakPower = 0
    enemies.forEach(enemy => {
        sneakBarrier += enemy.barriers.sneak
    })
    heroes.forEach(hero => {
        sneakPower += hero.sneak()
    })
    return sneakPower >= sneakBarrier
}


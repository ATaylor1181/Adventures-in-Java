const story = function(){

class BaseCharacter {
    constructor(name, health, skills = {attack: 0, sneak: 0, persuade: 0}) {
        this.name = name
        this.maxHealth = health
        this.currentHealth = health
        this.isIncapacitated = false
        this.barriers = {
            attack: 10,
            sneak: 10,
            persuade: 10
        }
        this.skills = skills
    }

    attack(){
        return Math.floor(Math.random() * 20) + 1 + this.skills.attack
    }
    dealDamage(){
        return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1)) + this.equippedWeapon.minDamage
    }
    persuade(){
        return Math.floor(Math.random() * 20) + 1 + this.skills.persuasion
    }
    sneak(){
        return Math.floor(Math.random() * 20) + 1 + this.skills.sneak
    }
}
class Hero extends BaseCharacter {
    constructor(name, health, gender, race, role, skills,
        weapon = {
            name: `none`,

            minDamage: null,
            maxDamage: null
        }, armour = {
            name: `none`,
            attackBarrierBonus: null
        }){
        super(name, health, skills)
        this.gender = gender
        this.race = race
        this.characterRole = role
        this.equippedWeapon = weapon
        this.equippedArmour = armour
    }

    levelUp(skill) {
        this.maxHealth += Math.floor(Math.random() * 6) + 1
        this.skills[skill] += 1
    }
    equipNewWeapon(newWeapon) {
        this.equippedWeapon = newWeapon
    }
    equipNewArmour(newArmour){
        this.equippedArmour = newArmour
    }
    rest(){
        this.currentHealth = this.maxHealth
        this.isIncapacitated = false
    }
}
  
const checkClass = (hero, characterClass) => {
    let lowerCharacterClass = characterClass.toLowerCase()

    switch (lowerCharacterClass) {
        case `warrior`:
            hero.skills.attack += 3
            hero.skills.sneak--
            break
        case `ranger`:
            hero.skills.attack++
            hero.skills.persuade++
            hero.skills.sneak++
            break
        case `rogue`:
            hero.skills.sneak += 3
            hero.skills.attack--
            break
        default:
            characterClass = prompt(`"${characterClass}" is not a valid choice, please choose again`)
            hero.characterRole = characterClass
            checkClass(hero, characterClass)
            break
    }
}

const checkRace = (hero, race) => {
    let lowerCaseRace = race.toLowerCase()

    switch (lowerCaseRace) {
        case `human`:
            break
        case `elf`:
            hero.skills.persuade++
            hero.barriers.persuade++
            hero.skills.attack--
            hero.barriers.sneak--
            break
        case `dwarf`:
            hero.skills.attack++
            hero.barriers.attack++
            hero.skills.sneak--
            hero.barriers.persuade--
            break
        case `halfling`:
            hero.skills.sneak++
            hero.barriers.sneak++
            hero.skills.attack--
            hero.barriers.persuade--
            break
        default:
            race = prompt(`"${race}" is not a valid race. Please choose again`)
            hero.race = race
            checkRace(hero, race)
            break
    }
}

class Monster extends BaseCharacter {
    constructor(name, health, attackBarrier, persuasionBarrier, sneakBarrier, skills, minDamage, maxDamage){
        super(name, health, skills)
        this.barriers.attackBarrier = attackBarrier
        this.barriers.persuade = persuasionBarrier
        this.barriers.sneak = sneakBarrier
        this.equippedWeapon = {
            minDamage: minDamage,
            maxDamage: maxDamage
        }
    }
}


const persuasionEncounter = (heroes, enemies) => {
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
const sneakEncounter = (heroes, enemies) => {
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
const fightEncounter = (heroes, enemies, heroesFirst) => {
    let fighting = true
    let totalHeroes = heroes.length
    let totalEnemies = enemies.length
    while(fighting){
        if(heroesFirst){
            totalEnemies -= teamAttack(heroes, enemies)
            totalHeroes -= teamAttack(enemies, heroes)
        } else {
            totalHeroes -= teamAttack(enemies, heroes)
            totalEnemies -= teamAttack(heroes, enemies)
        }
        if(totalHeroes === 0){
            console.log(`All heroes are incapacitated.`)
            return false
        }
        if(totalEnemies === 0){
            console.log(`All enemies have been defeated.`)
            return true
        }
    }
}
function teamAttack (attackers, defenders) {
    let totalIncapacitated = 0
    let totalAvailableDefenders = 0
    defenders.forEach(defender => {
        if(!defender.isIncapacitated){
            totalAvailableDefenders++
        }
    })
    attackers.forEach(attacker => {
        if(attacker.isIncapacitated || totalAvailableDefenders === 0){
            return
        }
        let target, randomTargetIndex
        while(!target) {
            randomTargetIndex = Math.floor(Math.random() * defenders.length)

            if(!defenders[randomTargetIndex].isIncapacitated){
                target = defenders[randomTargetIndex]
            }
        }
        if(attacker.attack() >= target.barriers.attack){
            let damage = attacker.dealDamage()
            target.currentHealth -= damage
            console.log(`${attacker.name} (Current Health: ${attacker.currentHealth}) hit ${target.name} for ${damage} (current health: ${target.currentHealth})`)
            if(target.currentHealth <= 0){
                console.log(`${target.name} is incapacitated!`)
                target.isIncapacitated = true
                totalIncapacitated++
                totalAvailableDefenders--
            }
        } else {
            console.log(`${attacker.name} missed!`)
        }
    })
    return totalIncapacitated
}
const decisionMaker = (answer) => {
    let lowerAnswer = answer.toLowerCase()

    let result

    switch(lowerAnswer){
        case `attack`:
        result = fightEncounter(heroParty, enemies, true)
        break
        case `sneak`:
        result = sneakEncounter(heroParty, enemies)
        break
        case `persuade`:
        result = persuasionEncounter(heroParty, enemies)
        break
        default:
        return decisionMaker(promt(`Please make sure you spell the choice correctly. Attack, Sneak, or Persuade?`))
        break
                
    }
    return result
}


const riddleEncounter = () => {
    let answer = promt(`I have a key but no lock, rivers with no water, and trees with no roots. What am I?`)
    if(answer.toLowerCase() === `A map` || answer.toLowerCase() === `map`){
        console.log(`Correct!`)
        return true
    } else {
        console.log(`You got it wrong!`)
        return false
    }
}


// character creation
let name = prompt("What is the name of your character?")
let gender = prompt("What gender is your character?")
let race = prompt("What race is your character? (Human, Elf, Dwarf, Halfling)")
let characterRole = prompt("What class is your character? (Warrior, Ranger, Rogue)")
const mainHero = new Hero(name, 10, gender, race, characterRole)
const heroParty = [mainHero]
checkRace(mainHero, mainHero.race)
checkClass(mainHero, mainHero.characterRole)
console.log(`




`)
console.log(`${mainHero.name} had been dreaming of adventure for years. Finally the day had come. ${mainHero.name} had been accepted to train as one of the ${mainHero.race} king's champions. Heart pounding in anticipation, ${mainHero.name} entered the palace training grounds.
        
A burly man stood in the center of the grounds surrounded by people that looked just as amazed as ${mainHero.name}felt. Knowing that this was the right place to be, ${mainHero.name} tried to quietly join the group.
        
"You're late" the burly man huffed. "Go get yourself one of those" he said, nodding towards a weapon rack on the side of the grounds.`)

mainHero.equipNewWeapon({
    name: prompt(`Which weapon do you choose? (Sword, Staff, Dagger, Bow)`),
    minDamage: 1,
    maxDamage: 6
})
console.log(`As ${mainHero.name} pulled the ${mainHero.equippedWeapon.name} from the rack, an attendant walked over and proffered some leather armour. ${mainHero.name} hesitated a moment, then noticed that the rest of the trainees were wearing identical garb. ${mainHero.name} allowed the attendant to assist in donning the armour, before hurrying back to the group.`)
mainHero.equipNewArmour({
    name: `Leather`,
    attackBarrierBonus: 3
})
console.log(`The new recruits split into three groups. One sparring, another in a part of the grounds littered with things to hide behind, probably testing their sneaking skills, and the last group appeared to be haggling with some merchants from the city's market.`)
console.log(` `)
console.log(`After a few hours, the recruits regrouped in the center of the grounds.`)
console.log(` `)
console.log(`"All right" the captain called. "You have learned the basics, now it is time to test your mettle! You will be taken, one at a time, and tested. Understand this failure means death. Now is everyone alright with that or would some of you like to go running home to mumma?" There was some shuffling of feet behind you but noone dared leave, not while the captain was glaring at them anyway.`)
console.log(` `)
console.log(`"If you choose not to test" the captain continued as his face split into a wicked grin "you will be escorted from the palace." His grin vanished almost instantly "Those who succeed however, will progress to real champion training.`)
console.log(` `)
console.log(`At those words a wave of excitement passed through the group. As the captain turned to converse with one of the guards you heard a few of the other recruits scurry off through the gates. Eventually your name is called. Steeling your resolve, you follow a guard into the palace proper and down a flight of stairs, stopping at an unotherwise unmarked door with guards either side.`)
console.log(` `)
console.log(`Your escort turns to you and calmly states "Beyond this door is your test, complete it, retrieve the coin with our kings mark and return. Then you'll progress. Should you fail however, well, someone will be by to clean up whatever's left of you..." he trails off with a bored expression. You find yourself wondering exactly how many recruits he's had to walk down those stairs, and how many came back.`)
console.log(` `)
console.log(`The guard on the left grasps the door handle and with an almost imperceptible whine the door swings open revealing a dimly lit stone corridor. You take a second to center yourself as the guards look on with a faintly bored expression. As you take your first step into the 'test' the door creaks shut behind you and you swear you heard one guard say to the other "One copper coin they're dead within 10 minutes". Feeling faintly annoyed by that you steel your resolve and march down the corridor.`)
console.log(` `)
console.log(`After a few more steps you begin to make out details through the gloom, cell doors line the corridor,all open and apparently abandoned. Moving deeper into the apparently unused dungeon you being to hear the sound of leather and cotton being ripped and torn. Coming to the second cell from the end of the corridor you take a peek inside only to spy a small green skinned creature tearing into a fluffed chair with wild abandon. 'A goblin' you think to yourself. 'Is this my test?' After a moments observation you notice something silver on a chain around it's neck, something clearly bearing the mark of your king. Without a sound you prepare to confront your 'test'.`)
let enemies = [new Monster(`Goblin`, 15, 3, 1, 2, {attack: 0, sneak: 0, persuade: 0}, 1, 3)]
let answer = prompt(`How will you proceed? Attack, Sneak, or Persuade?`)
let victorious = decisionMaker(answer)
if(victorious) {
    console.log(`You succeeded in your ${answer} encounter. You leveled up your ${answer} skill!`)
    mainHero.levelUp(answer.toLowerCase())
} else {
    console.log(`You died...`)
}


//add other party members down here
// const talrand = new Hero(`Talrand`, 10, `Male`, `Human`, `Warrior`,
//                         {attack:6, sneak: 2, persuade: 1},
//                         {name:`Broadsword`, minDamage:2, maxDamage:8},
//                         {name:`Chainmail`, attackBarrierBonus: 5})

// checkClass(talrand, talrand.characterRole)
// checkRace(talrand, talrand.race)

// heroParty.push(talrand)
}
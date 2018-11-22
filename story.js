// character creation
let name = prompt("What is the name of your character?")
let gender = prompt("What gender is your character?")
let race = prompt("What race is your character? (Human, Elf, Dwarf, Halfling)")
let characterRole = prompt("What class is your character? (Warrior, Ranger, Rogue)")
const mainHero = new Hero(name, 10, gender, race, characterRole)
const heroParty = [mainHero]
checkRace(mainHero, mainHero.race)
checkClass(mainHero, mainHero.characterRole)
console.log(
    `${mainHero.name} had been dreaming of adventure for years. Finally the day had come.
     ${mainHero.name} had been accepted to train as one of the ${mainHero.race} king's 
     champions. Heart pounding in anticipation, ${mainHero.name} entered the palace
     training grounds.
     
     A burly man stood in the center of the grounds surrounded by people that looked just as
     amazed as ${mainHero.name} felt. Knowing that this was the right place to be, ${mainHero.name}
     joined the group.
     
     "You're late" the burly man huffed. "Go get yourself one of those" he said, nodding towards
     a weapon rack on the side of the grounds.`
)

mainHero.equipNewWeapon({
    name: prompt(`Which weapon do you choose? (Sword, Staff, Dagger, Bow)`),
    minDamage: 1,
    maxDamage: 6
})
console.log(
    `As ${mainHero.name} pulled the ${mainHero.equippedWeapon.name} from the rack, an attendant 
    walked over and proffered some leather armour. ${mainHero.name} hesitated a moment, then noticed 
    that the rest of the trainees were wearing identical garb. ${mainHero.name} allowed the attendant 
    to assist in donning the armour, then hurried back to the group.`
)
mainHero.equipNewArmour({
    name: `Leather`,
    attackBarrierBonus: 3
})
console.log(
    `The new recruits split into three groups. One sparring, another in a part of the grounds littered 
    with things to hide behind, probably testing their sneaking skills, and the last group appeared to 
    be haggling with some merchants from the city's market.`
)
console.log(`After a few hours, the recruits regrouped in the center of the grounds.`)
console.log(`"All right" the captain called. "You have learned the basics, now it is time to test your
            mettle! You will be taken, one at a time, and tested. Understand this failure means death.
            Now is everyone alright with that or would some of you like to go running home to mumma?"
            There was some shuffling of feet behind you but noone dared leave, not while the captain
            was glaring at them anyway.`)
console.log(`"If you choose not to test" the captain continued as his face split into a wicked grin
             "you will be escorted from the palace." His grin vanished almost instantly "Those who succeed
             however, will progress to real champion training.`)
console.log(`At those words a wave of excitement passed through the group. As the captain turned to converse
            with one of the guards you heard a few of the other recruits scurry off through the gates. Eventually
            your name is called. Steeling your resolve, you follow a guard into the palace proper and down 
            a flight of stairs, stopping at an unotherwise unmarked door with guards either side.`)
console.log(`Your escort turns to you and calmly states "Beyond this door is your test, complete it, retrieve 
            the coin with our kings mark and return. Then you'll progress. Should you fail however, well, someone 
            will be by to clean up whatever's left of you..." he trails off with a bored expression. You find yourself
            wondering exactly how many recruits he's had to walk down those stairs, and how many came back.`)
console.log(`The guard on the left grasps the door handle and with an almost imperceptible whine the door swings 
            open revealing a dimly lit stone corridor. You take a second to center yourself as the guards look 
            on with a faintly bored expression. As you take your first step into the 'test' the door creaks shut 
            behind you and you swear you heard one guard say to the other "One copper coin they're dead within 
            10 minutes". Feeling faintly annoyed by that you steel your resolve and march down the corridor.`)
console.log(`After a few more steps you begin to make out details through the gloom, cell doors line the corridor, 
            all open and apparently abandoned. Moving deeper into the apparently unused dungeon you being to hear 
            the sound of leather and cotton being ripped and torn. Coming to the second cell from the end of the 
            corridor you take a peek inside only to spy a small green skinned creature tearing into a fluffed chair 
            with wild abandon. 'A goblin' you think to yourself. 'Is this my test?' After a moments observation 
            you notice something silver on a chain around it's neck, something clearly bearing the mark of your king.
            Without a sound you prepare to confront your 'test'.`)
let enemies = [new Monster(`Goblin`, 15, 3, 1, 2, {attack: 0, sneak: 0, persuade: 0}, 1, 3)]
let answer = prompt(`How will you proceed? Attack, Sneak, or Persuade?`)
let victorious = decisionMaker(answer)
if(victorious) {
    console.log(`You succeeded in your ${answer} encounter. You leveled up your ${answer} skill!`)
    mainHero.levelUp(answer.toLowerCase())
} else {
    console.log(`You died...`)
}





const talrand = new Hero(`Talrand`, 10, `Male`, `Human`, `Warrior`,
                        {attack:6, sneak: 2, persuade: 1},
                        {name:`Broadsword`, minDamage:2, maxDamage:8},
                        {name:`Chainmail`, attackBarrierBonus: 5})

checkClass(talrand, talrand.characterRole)
checkRace(talrand, talrand.race)

heroParty.push(talrand)

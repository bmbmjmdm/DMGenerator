import CharacterNames from "../lists/names"
import Races from "../lists/races"
import CharacterAppearances from "../lists/appearance"
import Personalities from "../lists/personalities"
import CharacterBackgrounds from "../lists/backgrounds"
import Motivations from "../lists/motivations"
import Equipment from "../lists/equipment"
import Accents from "../lists/accents"
import Abilities from "../lists/abilities"

export const getRandomName = () => {
    return CharacterNames[Math.floor(CharacterNames.length * Math.random())]
}

export const getRandomRace = () => {
    return Races[Math.floor(Races.length * Math.random())]
}

export const getRandomAppearance = () => {
    return CharacterAppearances[Math.floor(CharacterAppearances.length * Math.random())]
}

export const getRandomPersonality = () => {
    return Personalities[Math.floor(Personalities.length * Math.random())]
}

export const getRandomBackground = () => {
    return CharacterBackgrounds[Math.floor(CharacterBackgrounds.length * Math.random())]
}

export const getRandomMotivation = () => {
    return Motivations[Math.floor(Motivations.length * Math.random())]
}

export const getRandomEquipment = () => {
    return Equipment[Math.floor(Equipment.length * Math.random())]
}

export const getRandomAccent = () => {
    return Accents[Math.floor(Accents.length * Math.random())]
}

export const getRandomAbility = () => {
    return Abilities[Math.floor(Abilities.length * Math.random())]
}
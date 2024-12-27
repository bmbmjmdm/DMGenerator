import CharacterNames from '../lists/names';
import Races from '../lists/races';
import CharacterAppearances from '../lists/appearance';
import Personalities from '../lists/personalities';
import CharacterBackgrounds from '../lists/backgrounds';
import Motivations from '../lists/motivations';
import Equipment from '../lists/equipment';
import Accents from '../lists/accents';
import Abilities from '../lists/abilities';
import CityNames from '../lists/cityNames';
import CitySizes from '../lists/citySizes';
import Governments from '../lists/cityGovernments';
import Productions from '../lists/cityProduction';
import CityProblems from '../lists/cityProblems';
import CityAesthetics from '../lists/cityAesthetics';
import CityValues from '../lists/cityValues';
import Districts from '../lists/cityDistricts';
import CityEncounters from '../lists/encountersCity';
import WildernessEncounters from '../lists/encountersWild';
import Quests from '../lists/quests';
import CombatImprovements from '../lists/combat';
import RoleplayImprovements from '../lists/drama';
import questAntagonists from '../lists/questAntagonists';
import questLocations from '../lists/questLocations';
import questRewards from '../lists/questRewards';
import questTypes from '../lists/questTypes';
import questMotivations from '../lists/questMotivations';

const getRandom = (list: string[]) => {
  return list[Math.floor(list.length * Math.random())];
};

export const getRandomName = () => {
  return getRandom(CharacterNames) + ' ' + getRandom(CharacterNames);
};

export const getRandomRace = () => {
  return getRandom(Races);
};

export const getRandomAppearance = () => {
  return getRandom(CharacterAppearances);
};

export const getRandomPersonality = () => {
  return getRandom(Personalities);
};

export const getRandomBackground = () => {
  return getRandom(CharacterBackgrounds);
};

export const getRandomMotivation = () => {
  return getRandom(Motivations);
};

export const getRandomEquipment = () => {
  return getRandom(Equipment);
};

export const getRandomAccent = () => {
  return getRandom(Accents);
};

export const getRandomAbility = () => {
  return getRandom(Abilities);
};
export const getCityName = () => {
  return getRandom(CityNames);
};

export const getCitySize = () => {
  return getRandom(CitySizes);
};

export const getGovernment = () => {
  return getRandom(Governments);
};

export const getProduction = () => {
  return getRandom(Productions);
};
export const getCityProblem = () => {
  return getRandom(CityProblems);
};
export const getCityAesthetic = () => {
  return getRandom(CityAesthetics);
};
export const getCityValue = () => {
  return getRandom(CityValues);
};
export const getDistrict = () => {
  return getRandom(Districts);
};

export const getCityEncounter = () => {
  return getRandom(CityEncounters);
};
export const getWildernessEncounter = () => {
  return getRandom(WildernessEncounters);
};
export const getQuest = () => {
  return getRandom(Quests);
}
export const getCombatImprovements = () => {
  return getRandom(CombatImprovements);
}
export const getRoleplayImprovements = () => {
  return getRandom(RoleplayImprovements);
}
export const getQuestAntagonist = () => {
  return getRandom(questAntagonists);
}
export const getQuestLocation = () => {
  return getRandom(questLocations);
}
export const getQuestReward = () => {
  return getRandom(questRewards);
}
export const getQuestType = () => {
  return getRandom(questTypes);
}
export const getQuestMotivation = () => {
  return getRandom(questMotivations);
}

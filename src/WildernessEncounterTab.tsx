import AnimalAttackIcon from '../assets/animalAttack.png';
import {TabInfo} from './App';
import {getWildernessEncounter} from './randomizer';

const tab: TabInfo = {
  cards: {
    Encounter: {
      lists: [getWildernessEncounter],
      single: true,
    },
  },
  theme: {
    secondaryColor: '#DAB6C4',
    primaryColor: '#54904E',
    black: '#000000',
    white: '#FFFFFF',
    favoriteColor: '#54F176',
    deleteFavoriteColor: '#BA2D0B',
    // unused
    deleteColor: '#EEB4B3',
    repickColor: '#DAB6C4',
    addColor: '#1C7C5477',
  },
  icon: AnimalAttackIcon,
  iconRatio: Math.round((100 * 436) / 400) / 100,
  name: 'Path\nEncounter',
  darkStatusBarText: true
};

export default tab;

import SnatchIcon from '../assets/snatch.png';
import {TabInfo} from './App';
import {getCityEncounter} from './randomizer';

const tab: TabInfo = {
  cards: {
    Encounter: {
      lists: [getCityEncounter],
      single: true,
    },
  },
  theme: {
    secondaryColor: '#D1CFE2', //2F2504
    primaryColor: '#A4508B',
    black: '#000000',
    white: '#FFFFFF',
    favoriteColor: '#1C7C54',
    // unused
    deleteColor: '#EEB4B3',
    addColor: '#1C7C5477',
    repickColor: '#D1CFE2',
  },
  icon: SnatchIcon,
  iconRatio: Math.round((100 * 592) / 550) / 100,
  name: 'City\nEncounter',
  darkStatusBarText: true
};

export default tab;

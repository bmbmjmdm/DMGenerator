import MenuIcon from '../assets/menu.png';
import {TabInfo} from './App';
import {
  getCombatImprovements
} from './randomizer';
import {
  SwordsSVG
} from './SVGs';

const tab: TabInfo = {
  cards: {
    Combat: {
      lists: [getCombatImprovements],
      icon: SwordsSVG
    },
  },
  theme: {
    secondaryColor: '#870058',
    primaryColor: '#B67AEA',
    repickColor: '#87005880',
    deleteColor: '#AC393177',
    addColor: '#7BA861aa',
    favoriteColor: '#7BA861',
    black: '#000000',
    white: '#FFFFFF',
  },
  icon: MenuIcon,
  iconRatio: Math.round((100 * 900) / 800) / 100,
  name: 'Misc',
  darkStatusBarText: false
};

export default tab;

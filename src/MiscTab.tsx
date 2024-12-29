import SpicesIcon from '../assets/spices.png';
import {TabInfo} from './App';
import {
  getCombatImprovements,
  getRoleplayImprovements,
  getSceneImprovements
} from './randomizer';
import {
  SwordsSVG,
  DramaSVG,
  RainbowSVG
} from './SVGs';

const tab: TabInfo = {
  cards: {
    Combat: {
      lists: [getCombatImprovements],
      icon: SwordsSVG
    },
    Roleplay: {
      lists: [getRoleplayImprovements],
      icon: DramaSVG
    },
    Scene: {
      lists: [getSceneImprovements],
      icon: RainbowSVG
    },
  },
  theme: {
    secondaryColor: '#870058',
    primaryColor: '#B67AEA',
    repickColor: '#87005880',
    deleteColor: '#FF666667',
    addColor: '#7BA861aa',
    favoriteColor: '#7BA861',
    black: '#000000',
    white: '#FFFFFF',
  },
  icon: SpicesIcon,
  iconRatio: Math.round((100 * 900) / 800) / 100,
  name: 'Spice Up',
  darkStatusBarText: false
};

export default tab;

import HeadIcon from '../assets/head.png';
import {TabInfo} from './App';
import {
  getRandomAbility,
  getRandomAccent,
  getRandomAppearance,
  getRandomBackground,
  getRandomEquipment,
  getRandomMotivation,
  getRandomName,
  getRandomPersonality,
  getRandomRace,
} from './randomizer';
import {BeardSVG, IDSVG, SnapSVG, HeartSVG, BagSVG, SparkleSVG} from './SVGs';

const tab: TabInfo = {
  cards: {
    'ID and Voice': {
      icon: IDSVG,
      lists: [getRandomName, getRandomRace, getRandomAccent],
    },
    Appearance: {
      icon: BeardSVG,
      lists: [getRandomAppearance],
    },
    Personality: {
      icon: SnapSVG,
      lists: [getRandomPersonality],
    },
    Motivation: {
      icon: HeartSVG,
      lists: [getRandomMotivation, getRandomBackground],
    },
    Equipment: {
      icon: BagSVG,
      lists: [getRandomEquipment],
    },
    Ability: {
      icon: SparkleSVG,
      lists: [getRandomAbility],
      single: true,
    },
  },
  theme: {
    secondaryColor: '#735CDD',
    primaryColor: '#B6E9FF',
    repickColor: '#735CDD90',
    deleteColor: '#EF476F70',
    addColor: '#56E39F80',
    favoriteColor: '#56E39F',
    black: '#000000',
    white: '#FFFFFF',
  },
  icon: HeadIcon,
  iconRatio: Math.round((100 * 655) / 540) / 100,
  name: 'NPC',
};

export default tab;

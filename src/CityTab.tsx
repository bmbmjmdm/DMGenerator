import CityIcon from '../assets/city.png';
import {TabInfo} from './App';
import {
  getCityName,
  getCitySize,
  getGovernment,
  getProduction,
  getCityProblem,
  getCityAesthetic,
  getCityValue,
  getDistrict,
} from './randomizer';
import {
  LumberSVG,
  SignSVG,
  FireSVG,
  FountainSVG,
  HeartSVG,
  MapSVG,
} from './SVGs';

const tab: TabInfo = {
  cards: {
    Basics: {
      icon: SignSVG,
      lists: [getCityName, getCitySize, getGovernment],
    },
    Aesthetic: {
      icon: FountainSVG,
      lists: [getCityAesthetic],
    },
    Production: {
      icon: LumberSVG,
      lists: [getProduction],
    },
    Problems: {
      icon: FireSVG,
      lists: [getCityProblem],
    },
    Values: {
      icon: HeartSVG,
      lists: [getCityValue],
      single: true,
    },
    Sites: {
      icon: MapSVG,
      lists: [getDistrict],
    },
  },
  theme: {
    secondaryColor: '#48639C',
    primaryColor: '#A19B95',
    repickColor: '#48639Caa',
    deleteColor: '#AC393177',
    deleteFavoriteColor: '#AC3931',
    addColor: '#7BA86180',
    favoriteColor: '#7BA861',
    black: '#000000',
    white: '#FFFFFF',
  },
  icon: CityIcon,
  iconRatio: Math.round((100 * 994) / 750) / 100,
  name: 'City',
  darkStatusBarText: false
};

export default tab;

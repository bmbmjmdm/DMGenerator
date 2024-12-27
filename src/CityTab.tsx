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
    secondaryColor: '#D3BD57', //#E5F77D D7B003
    primaryColor: '#A19B95',
    repickColor: '#D7B003aa',
    deleteColor: '#AC393177',
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
/*

    theme: {
      secondaryColor: "#A4508B",
      primaryColor: "#A19B95",
      repickColor: "#A4508B90",
      deleteColor: "#EEB4B3",
      addColor: "#73956Faa",
      favoriteColor: "#73956F",
      black: "#000000",
      white: "#FFFFFF",
    },
    */
export default tab;

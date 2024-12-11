import BuildingIcon from '../assets/building.png'
import { TabInfo } from './App'
import {
  getCityName,
  getCitySize,
  getGovernment,
  getProduction,
  getCityProblem,
  getCityAesthetic,
  getCityValue,
  getDistrict
} from "./randomizer"
import {
  LumberSVG,
  SignSVG,
  FireSVG,
  FountainSVG,
  HeartSVG,
  MapSVG
} from './SVGs'

const tab:TabInfo = {
    cards: {
      Basicsx: {
        icon: <SignSVG />,
        lists: [getCityName, getCitySize, getGovernment],
      },
      Aesthetics: {
        icon: <FountainSVG />,
        lists: [getCityAesthetic],
      },
      Production: {
        icon: <LumberSVG />,
        lists: [getProduction],
      },
      Problems: {
        icon: <FireSVG />,
        lists: [getCityProblem],
      },
      Values: {
        icon: <HeartSVG />,
        lists: [getCityValue],
      },
      Districts: {
        icon: <MapSVG />,
        lists: [getDistrict],
      },
    },
    theme: {
      secondaryColor: "#735CDD",
      primaryColor: "#B6E9FF",
      repickColor: "#735CDD90",
      deleteColor: "#EF476F80",
      addColor: "#56E39Faa",
      favoriteColor: "#56E39F",
      black: "#000000",
      white: "#FFFFFF",
    },
    icon: BuildingIcon,
    iconRatio: Math.round(100 * x/y)/100,
}

export default tab
import SnatchIcon from '../assets/snatch.png'
import { TabInfo } from './App'
import {
  getCityEncounter
} from "./randomizer"

const tab:TabInfo = {
    cards: {
      Encounter: {
        lists: [getCityEncounter],
        single: true
      },
    },
    theme: {
      secondaryColor: "#E0E0E0", //2F2504
      primaryColor: "#A4508B",
      repickColor: "#A19B95aa",
      black: "#000000",
      white: "#FFFFFF",
      favoriteColor: "#1C7C54",
      // unused
      deleteColor: "#EEB4B3",
      addColor: "#1C7C5477",
    },
    icon: SnatchIcon,
    iconRatio: Math.round(100 * 592/550)/100,
    name: "City\nEncounter"
}

export default tab

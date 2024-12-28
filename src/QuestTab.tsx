import { View } from 'react-native';
import QuestIcon from '../assets/quest.png';
import {TabInfo} from './App';
import {
  getQuest,
  getQuestAntagonist,
  getQuestLocation,
  getQuestReward,
  getQuestMotivation,
  getQuestType,

} from './randomizer';
import { SparkleSVG } from './SVGs';

const tab: TabInfo = {
  cards: {
    Quest: {
      lists: [getQuest],
      single: true,
    },
    "Random Quest": {
      lists: [getQuestType, getQuestMotivation, getQuestLocation, getQuestReward, getQuestAntagonist],
      labels: ["Type", "Motivation", "Location", "Reward", "Antagonist"],
      icon: SparkleSVG,
    },
  },
  theme: {
    secondaryColor: '#ADD2C2',
    primaryColor: '#FBBB72',
    favoriteColor: '#3A9F72',
    black: '#000000',
    white: '#FFFFFF',
    // unused
    repickColor: '#91B1A3',
    deleteColor: '#DB546180',
    addColor: '#3A9F7280',
  },
  icon: QuestIcon,
  iconRatio: Math.round((100 * 550) / 503) / 100,
  name: 'Quest',
  darkStatusBarText: false,
};

export default tab;
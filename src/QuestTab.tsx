import { View } from 'react-native';
import QuestIcon from '../assets/quest.png';
import {TabInfo} from './App';
import {
} from './randomizer';
import {} from './SVGs';

const tab: TabInfo = {
  cards: {
    test: {
      lists: [() => Math.random().toString()],
      icon: View
    },
  },
  theme: {
    secondaryColor: '#ADD2C2',
    primaryColor: '#FBBB72',
    repickColor: '#91B1A3',
    deleteColor: '#DB546180',
    addColor: '#3A9F7280',
    favoriteColor: '#3A9F72',
    black: '#000000',
    white: '#FFFFFF',
  },
  icon: QuestIcon,
  iconRatio: Math.round((100 * 550) / 503) / 100,
  name: 'Quest',
  darkStatusBarText: false,
};

export default tab;

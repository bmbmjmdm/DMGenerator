import React, { createContext, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import CharacterTab from './CharacterTab'
import HeadIcon from '../assets/head.png'

type Theme = {
  secondaryColor: string;
  primaryColor: string;
  repickColor: string;
  deleteColor: string;
  addColor: string;
  favoriteColor: string;
  black: string;
  white: string;

}

const CharacterTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#735CDD90",
  deleteColor: "#EF476F80",
  addColor: "#56E39F80",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const NatureEncounterTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const CityEncounterTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const DungeonRoomTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const Citytheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const QuestTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const GodTheme:Theme = {
  secondaryColor: "#735CDD",
  primaryColor: "#B6E9FF",
  repickColor: "#80735CDD",
  deleteColor: "#80EF476F",
  addColor: "#8056E39F",
  favoriteColor: "#56E39F",
  black: "#000000",
  white: "#FFFFFF",
}

const TabProps:any = {
  Character: {
    icon: HeadIcon,
    iconRatio: Math.round(100 * 592/488)/100,
    theme: CharacterTheme
  },
  NatureEncounter: null,
  CityEncounter: null,
  Quest: null,
  City: null,
  God: null,
  DungeonRoom: null,
}

export const ThemeContext = createContext(CharacterTheme)

function App(): React.JSX.Element {
  const [tab, setTab] = useState("Character")
  const theme = TabProps[tab].theme
  const icon = TabProps[tab].icon
  const iconRatio = TabProps[tab].iconRatio
  
  return (
    <ThemeContext.Provider value={CharacterTheme}>
      <SafeAreaView style={{backgroundColor: theme.secondaryColor}}>
        <StatusBar backgroundColor={theme.secondaryColor} />
          <View style={{ position: "absolute", top: -150, left: -100, borderRadius: 999, width: 600, height: 600, backgroundColor: theme.primaryColor }}>
            <Image source={icon} style={{width: 330, height: 330 * iconRatio, top: 165, left: 155}} />
          </View>
        <ScrollView alwaysBounceVertical overScrollMode={'always'} style={{height:"100%"}} contentInsetAdjustmentBehavior="automatic">
          { tab === "Character" ? <CharacterTab /> : null}
        </ScrollView>
        <View style={{ height: 100, backgroundColor: theme.secondaryColor }}>

        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  )
}



export default App;

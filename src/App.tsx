import React, { createContext, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import CharacterTab from './CharacterTab'
import CityTab from './CityTab'
import LinearGradient from 'react-native-linear-gradient';
import Tab, { CardDetails } from './Tab';

export type TabInfo = {
  cards: Record<string, CardDetails>,
  theme: Theme,
  icon: ImageSourcePropType,
  iconRatio: number
}

export type Theme = {
  secondaryColor: string;
  primaryColor: string;
  repickColor: string;
  deleteColor: string;
  addColor: string;
  favoriteColor: string;
  black: string;
  white: string;

}

export const ThemeContext = createContext(CharacterTab.theme)

function App(): React.JSX.Element {
  const [tab, setTab] = useState(CharacterTab)
  const [scrollHeight, setScrollHeight] = useState(0)
  const firstRender = useRef(true)
  const theme = tab.theme
  const icon = tab.icon
  const iconRatio = tab.iconRatio
  const cards = tab.cards

  // manually set the height of the scrollview so we have the perfect amount of space for the navbar
  const onLayout = (e:LayoutChangeEvent) => {
    if (firstRender.current) {
      firstRender.current = false
      const layout = e.nativeEvent.layout
      setScrollHeight(layout.y - layout.height)
    }
  }
  
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={{backgroundColor: theme.secondaryColor}}>
        <StatusBar backgroundColor={theme.secondaryColor} />
        <View style={{width: "100%", alignItems: "center", position: "absolute", top: -150, }}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[theme.primaryColor, theme.primaryColor, theme.white]} style={{ borderRadius: 999, width: 600, height: 600, alignItems: "center"}}>
            <Image source={icon} style={{width: 330, height: 330 * iconRatio, top: 165 * 1/iconRatio}} />
          </LinearGradient >
        </View>
        <ScrollView style={{height: scrollHeight || "100%"}} alwaysBounceVertical overScrollMode={'always'} contentInsetAdjustmentBehavior="automatic">
          <Tab cards={cards} key={tab.iconRatio} />
        </ScrollView>
        <View onLayout={onLayout} style={{
          flexDirection: 'row',
          backgroundColor: theme.secondaryColor,
          alignItems: 'center',
          padding: 20,
        }}>
          <TouchableOpacity onPress={() => setTab(CharacterTab)} >
            <Image source={CharacterTab.icon} style={{width: 50, height: 60, marginRight: 20}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab(CityTab)} >
            <Image source={CityTab.icon} style={{width: 50, height: 60}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  )
}



export default App;

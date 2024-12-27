import React, {createContext, useEffect, useRef, useState} from 'react';
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
import CharacterTab from './CharacterTab';
import MiscTab from './MiscTab';
import CityTab from './CityTab';
import CityEncounterTab from './CityEncounterTab';
import WildernessEncounterTab from './WildernessEncounterTab';
import QuestTab from './QuestTab';
import LinearGradient from 'react-native-linear-gradient';
import Tab, {CardDetails} from './Tab';
import MenuButton from './MenuButton';
import { Provider } from 'react-redux'
import { selectFavoritesOpen, setCurTab, store } from './redux';

export type TabInfo = {
  cards: Record<string, CardDetails>;
  theme: Theme;
  icon: ImageSourcePropType;
  iconRatio: number;
  name: string;
  darkStatusBarText: boolean;
};

export type Theme = {
  secondaryColor: string;
  primaryColor: string;
  repickColor: string;
  deleteColor: string;
  addColor: string;
  favoriteColor: string;
  black: string;
  white: string;
};

export const ThemeContext = createContext(CharacterTab.theme);

const tabs = [CharacterTab, CityTab, CityEncounterTab, WildernessEncounterTab, QuestTab, MiscTab];

function App(): React.JSX.Element {
  const [tab, setTab] = useState(CharacterTab);
  const [scrollHeight, setScrollHeight] = useState(0);
  const firstRender = useRef(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const theme = tab.theme;
  const icon = tab.icon;
  const darkStatusBarText = tab.darkStatusBarText;
  const iconRatio = tab.iconRatio;
  const cards = tab.cards;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newFavoritesOpen = selectFavoritesOpen(store.getState());
      if (newFavoritesOpen !== isFavoritesOpen) {
        setIsFavoritesOpen(newFavoritesOpen);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isFavoritesOpen]);

  const switchTab = (tab: TabInfo) => {
    setTab(tab);
    store.dispatch(setCurTab(tab.name))
  }

  // manually set the height of the scrollview so we have the perfect amount of space for the navbar
  const onLayout = (e: LayoutChangeEvent) => {
    if (firstRender.current) {
      firstRender.current = false;
      const layout = e.nativeEvent.layout;
      setScrollHeight(layout.y - layout.height);
    }
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <SafeAreaView style={{backgroundColor: theme.secondaryColor}}>
          <StatusBar barStyle={darkStatusBarText ? "dark-content" : "light-content"} backgroundColor={theme.secondaryColor} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              top: -150,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[theme.primaryColor, theme.primaryColor, theme.white]}
              style={{
                borderRadius: 999,
                width: 600,
                height: 600,
                alignItems: 'center',
              }}>
              <Image
                source={icon}
                style={{
                  width: 330,
                  height: 330 * iconRatio,
                  top: (165 * 1) / iconRatio,
                }}
              />
            </LinearGradient>
          </View>
          <ScrollView
            scrollEnabled={!isFavoritesOpen}
            style={{height: scrollHeight || '100%'}}
            alwaysBounceVertical
            overScrollMode={'always'}
            contentInsetAdjustmentBehavior="automatic">
            <Tab cards={cards} />
          </ScrollView>
          <View
            onLayout={onLayout}
            style={{
              boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.5)',
              flexDirection: 'row',
              backgroundColor: theme.secondaryColor,
              alignItems: 'center',
              padding: 20,
            }}>
            {tabs.map((tab, index) => (
              <MenuButton
                key={tab.name}
                tab={tab}
                first={index === 0}
                onPress={() => switchTab(tab)}
              />
            ))}
          </View>
        </SafeAreaView>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;

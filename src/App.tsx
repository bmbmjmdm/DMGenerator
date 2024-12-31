import React, {createContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
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
  deleteFavoriteColor: string;
  favoriteColor: string;
  black: string;
  white: string;
};

export const ThemeContext = createContext(CharacterTab.theme);

const tabs = [CharacterTab, CityTab, CityEncounterTab, WildernessEncounterTab, QuestTab, MiscTab];

function App(): React.JSX.Element {
  const [tab, setTab] = useState(CharacterTab);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const theme = tab.theme;
  const icon = tab.icon;
  const darkStatusBarText = tab.darkStatusBarText;
  const iconRatio = tab.iconRatio;
  const cards = tab.cards;
  const widthRatio = useRef(Dimensions.get('window').width / 432).current;
  const heightRatio = useRef(Dimensions.get('window').height / 886).current;
  const responsiveAverage = (val: number) => val * (widthRatio + heightRatio) / 2;

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

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <SafeAreaView style={{backgroundColor: theme.secondaryColor, flex:1}}>
          <StatusBar barStyle={darkStatusBarText ? "dark-content" : "light-content"} backgroundColor={theme.secondaryColor} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              top: responsiveAverage(-150),
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={[theme.primaryColor, theme.primaryColor, theme.white]}
              style={{
                borderRadius: 999,
                width: responsiveAverage(600),
                height: responsiveAverage(600),
                alignItems: 'center',
              }}>
              <Image
                source={icon}
                style={{
                  width: responsiveAverage(330),
                  height: responsiveAverage(330 * iconRatio),
                  top: responsiveAverage((165 * 1) / iconRatio),
                }}
              />
            </LinearGradient>
          </View>
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset = {Platform.OS === 'ios' ? 0 : 100}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              scrollEnabled={!isFavoritesOpen}
              style={{flex: 1}}
              alwaysBounceVertical
              overScrollMode={'always'}
              contentInsetAdjustmentBehavior="automatic">
              <Tab cards={cards} />
            </ScrollView>
          </KeyboardAvoidingView>
          <View
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

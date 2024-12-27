import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, Animated, StyleSheet, Dimensions, Easing, TouchableOpacity } from 'react-native';
import { ThemeContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectFavoritesOpen, selectState, selectTabName, setFavoritesOpen, setState } from './redux';
import { useDispatch, useSelector } from 'react-redux';

export type FavoritesRef = {
  showFavorites: () => void;
}

type StoredFavorite = {
  name: string;
  state: Record<string, string[]>;
}

const Favorites = forwardRef<FavoritesRef>((props, ref) => {
  const state = useSelector(selectState);
  const favoritesOpen = useSelector(selectFavoritesOpen);
  const dispatch = useDispatch();
  const setStateWrapper = (newState: Record<string, string[]>) => dispatch(setState(newState));
  const [favorites, setFavorites] = useState<StoredFavorite[]>([]);
  const [newFavoriteName, setNewFavoriteName] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const addColor = useContext(ThemeContext).favoriteColor;
  const closeColor = useContext(ThemeContext).primaryColor;
  const containerColor = useContext(ThemeContext).secondaryColor;
  const curTab = useSelector(selectTabName);
  const storageName = 'favorites' + curTab;

  useEffect(() => {
    AsyncStorage.getItem(storageName).then((data) => {
      if (data) {
        const storedFavorites: StoredFavorite[] = JSON.parse(data);
        setFavorites(storedFavorites);
      }
      else {
        setFavorites([]);
      }
    });
  }, [curTab])

  const showFavorites = () => {
    dispatch(setFavoritesOpen(true));
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(bottom, {
      toValue: 600,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }

  const closeFavorites = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(bottom, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      dispatch(setFavoritesOpen(false));
    });
  }

  useImperativeHandle(ref, () => ({
    showFavorites,
  }));

  const loadFavorite = (state: Record<string, string[]>) => {
    setStateWrapper(state);
    closeFavorites();
  }



  const addFavorite = () => {
    let newFavoriteNameTemp = newFavoriteName;
    if (newFavoriteNameTemp.trim()) {
      const newFavorite = {
        name: newFavoriteNameTemp,
        state: state,
      }
      setFavorites([newFavorite, ...favorites]);
      AsyncStorage.setItem(storageName, JSON.stringify([newFavorite, ...favorites]));
      setNewFavoriteName('');
    }
  };

  return (
    <Animated.View style={[
      styles.container,
      {
        opacity: opacity,
        transform: [{ translateY: bottom }],
        backgroundColor: containerColor,
      }
    ]}>
      <Button title="Close" onPress={closeFavorites} color={closeColor} />
      <TextInput
        style={styles.input}
        placeholder="Enter new favorite"
        value={newFavoriteName}
        onChangeText={setNewFavoriteName}
      />
      <Button title="Add" onPress={addFavorite} color={addColor} />
      <FlatList
        data={favorites}
        style={{ marginTop: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
          <TouchableOpacity onPress={() => loadFavorite(item.state)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
      }
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeFavorites}
        style={[
          styles.obscureBackground,
          {
            opacity: opacity,
            display: favoritesOpen ? 'flex' : 'none',
          }
        ]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 20,
    width: "100%",
    zIndex: 9999,
    top: -600,
    height: 500,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
    fontSize: 20,
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 20,
  },
  obscureBackground: {
    width: "120%",
    height: 1000,
    position: "absolute",
    top: 500,
    backgroundColor: "rgba(0,0,0,0.5)",
  }
});

export default Favorites;
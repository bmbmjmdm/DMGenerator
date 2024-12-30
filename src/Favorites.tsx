import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, Animated, StyleSheet, Dimensions, Easing, TouchableOpacity } from 'react-native';
import { ThemeContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectFavoriteID, selectFavoritesOpen, selectState, selectTabName, setFavoriteID, setFavoritesOpen, setState } from './redux';
import { useDispatch, useSelector } from 'react-redux';

export type FavoritesRef = {
  showFavorites: () => void;
}

type StoredFavorite = {
  name: string;
  state: Record<string, string[]>;
  id: number;
}

const Favorites = forwardRef<FavoritesRef>((props, ref) => {
  const state = useSelector(selectState);
  const favoritesOpen = useSelector(selectFavoritesOpen);
  const dispatch = useDispatch();
  const setStateWrapper = (newState: Record<string, string[]>) => dispatch(setState(newState));
  const setFavoriteIDWrapper = (newID: number) => dispatch(setFavoriteID(newID));
  const [favorites, setFavorites] = useState<StoredFavorite[]>([]);
  const [newFavoriteName, setNewFavoriteName] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const addColor = useContext(ThemeContext).favoriteColor;
  const closeColor = useContext(ThemeContext).primaryColor;
  const containerColor = useContext(ThemeContext).secondaryColor;
  const deleteColor = useContext(ThemeContext).deleteFavoriteColor;
  const curTab = useSelector(selectTabName);
  const storageName = 'favorites' + curTab;
  const curFavorite = useSelector(selectFavoriteID);

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

  const loadFavorite = (item:StoredFavorite) => {
    setFavoriteIDWrapper(item.id)
    setStateWrapper(item.state);
    closeFavorites();
  }



  const addFavorite = () => {
    let newFavoriteNameTemp = newFavoriteName;
    if (newFavoriteNameTemp.trim()) {
      const newFavorite = {
        name: newFavoriteNameTemp,
        state: state,
        id: Math.random(),
      }
      setFavoriteIDWrapper(newFavorite.id);
      setFavorites([newFavorite, ...favorites]);
      AsyncStorage.setItem(storageName, JSON.stringify([newFavorite, ...favorites]));
      setNewFavoriteName('');
    }
  };


  const saveFavorite = () => {
    const newFavorites = favorites.map((item) => {
      if (item.id === curFavorite) {
        return {
          name: item.name,
          state: state,
          id: item.id,
        }
      }
      return item;
    });
    AsyncStorage.setItem(storageName, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  const deleteFavorite = () => {
    const newFavorites = favorites.filter((item) => item.id !== curFavorite);
    AsyncStorage.setItem(storageName, JSON.stringify(newFavorites));
    setFavoriteIDWrapper(0);
    setFavorites(newFavorites);
  }

  const newFavoriteSection = (
    <>
      <TextInput
          style={styles.input}
          placeholder="Enter new favorite"
          value={newFavoriteName}
          onChangeText={setNewFavoriteName}
        />
      <Button title="Add" onPress={addFavorite} color={addColor} />
    </>

  )

  const existingFavoriteSection = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
      <View style={{ flex: 2 }}>
        <Button title="Save" onPress={saveFavorite} color={addColor} />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Button title="Delete" onPress={deleteFavorite} color={deleteColor} />
      </View>
    </View>

  )

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
      { curFavorite === 0 ? newFavoriteSection : existingFavoriteSection }
      <FlatList
        data={favorites}
        style={{ marginTop: 10 }}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => 
          <TouchableOpacity onPress={() => loadFavorite(item)}>
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
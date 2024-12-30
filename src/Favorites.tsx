import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, Animated, StyleSheet, Dimensions, Easing, TouchableOpacity, Platform, PermissionsAndroid, Alert } from 'react-native';
import { ThemeContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectFavoriteID, selectFavoritesOpen, selectState, selectTabName, setFavoriteID, setFavoritesOpen, setState } from './redux';
import { useDispatch, useSelector } from 'react-redux';
import { ExportSVG, StarSVG } from './SVGs';
import RNFetchBlob from 'react-native-blob-util';

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
  const theme = useContext(ThemeContext)
  const addColor = theme.favoriteColor;
  const closeColor = theme.primaryColor;
  const containerColor = theme.secondaryColor;
  const deleteColor = theme.deleteFavoriteColor;
  const curTab = useSelector(selectTabName);
  const storageName = 'favorites' + curTab;
  const curFavorite = useSelector(selectFavoriteID);
  const [exportImportOpen, setExportImportOpen] = useState(false);

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
      setExportImportOpen(false);
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

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'We need permission to save your files.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const writeFile = async (name:string, content:string) => {
    const localPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + name;
    RNFetchBlob.fs.writeFile(localPath, content, 'utf8')
    try {
      await RNFetchBlob.MediaCollection.copyToMediaStore({
        name,
        parentFolder: '',
        mimeType: 'text/plain' 
        },
        'Download', 
        localPath
      );
      Alert.alert(
        "Success",
        "Saved to Downloads as " + name,
        [],
        { cancelable: true }
      );
    } catch (error) {
      Alert.alert(
        "Failed",
        error as string,
        [],
        { cancelable: true }
      );
    }
    RNFetchBlob.fs.unlink(localPath)
  }

  const exportCurrentPage = async () => {
    const stateString = JSON.stringify(state);
    const fileName = 'SingleFavorite.txt';
    await writeFile(fileName, stateString);
  }

  const exportCurrentTab = async () => {
    const stateString = JSON.stringify(favorites);
    const fileName = curTab + 'Favorites.txt';
    await writeFile(fileName, stateString);
  }

  const exportAllTabs = async () => {
    const allFavoritesKeys = await AsyncStorage.getAllKeys();
    const allFavoritesPairs = await AsyncStorage.multiGet(allFavoritesKeys);
    const allFavorites:Record<string, StoredFavorite[]> = {};
    allFavoritesPairs.forEach((pair) => {
      allFavorites[pair[0]] = JSON.parse(pair[1] as string);
    });
    const stateString = JSON.stringify(allFavorites);
    const fileName = 'AllFavorites.txt';
    await writeFile(fileName, stateString);
  }

  const importFile = () => {
    // determine what type of import it is by the file contents:
    // string is single favorite, array is tab favorites, object is all favorites
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
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <View style={{ flex: 2 }}>
        <Button title="Save" onPress={saveFavorite} color={addColor} />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Button title="Delete" onPress={deleteFavorite} color={deleteColor} />
      </View>
    </View>
  )

  const favoritesMenu = (
    <>
      <View style={{flexDirection: 'row', width: "100%"}}>
        <View style={{flex: 1, marginRight: 20}}>
          <Button title="Close" onPress={closeFavorites} color={closeColor} />
        </View>
        <TouchableOpacity onPress={() => setExportImportOpen(true)}>
          <ExportSVG />
        </TouchableOpacity>
      </View>
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
    </>
  )

  const exportImportMenu = (
    <>
      <View style={{flexDirection: 'row', width: "100%", direction: 'rtl'}}>
        <TouchableOpacity onPress={() => setExportImportOpen(false)}>
          <StarSVG color={theme.white} width={30} />
        </TouchableOpacity>
      </View>
      <View style={{height: 40}} />
      <Button title="Export Current Page" onPress={exportCurrentPage} color={theme.primaryColor} />
      <View style={{height: 40}} />
      <Button title="Export Favorites for Current Tab" onPress={exportCurrentTab} color={darkenColor(theme.primaryColor, 0.25)} />
      <View style={{height: 40}} />
      <Button title="Export Favorites for All Tabs" onPress={exportAllTabs} color={darkenColor(theme.primaryColor, 0.5)} />
      <View style={{height: 40}} />
      <Button title="Import" onPress={importFile} color={darkenColor(theme.primaryColor, 0.75)} />
    </>
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
      {
        exportImportOpen ? exportImportMenu : favoritesMenu
      }
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

function darkenColor(hex: string, amount: number): string {
  // Ensure the amount is between 0 and 1
  amount = Math.min(Math.max(amount, 0), 1);
  // Convert hex to RGB
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  // Calculate the new RGB values
  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));
  // Convert RGB back to hex
  const newHex = (newR << 16) | (newG << 8) | newB;
  return `#${newHex.toString(16).padStart(6, '0')}`;
}

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
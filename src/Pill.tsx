import React, {createContext, useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ThemeContext} from './App';
import {ReloadSVG, StarSVG} from './SVGs';

type PillProps = {
  type: 'Reload' | 'Favorite';
  onPress: () => void;
};

function Pill({onPress, type}: PillProps): React.JSX.Element {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 30,
        backgroundColor:
          type === 'Reload' ? theme.secondaryColor : theme.favoriteColor,
        padding: 20,
        paddingHorizontal: 50,
        margin: 20,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
      }}>
      {type === 'Reload' ? (
        <ReloadSVG color="white" />
      ) : (
        <StarSVG color="white" />
      )}
    </TouchableOpacity>
  );
}

export default Pill;

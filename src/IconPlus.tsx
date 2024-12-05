
import React, { createContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  PlusSVG,
} from './SVGs'

type IconPlusProps = {
  icon: React.JSX.Element,
  onPress: () => void,
}


function IconPlus ({icon, onPress} : IconPlusProps): React.JSX.Element {
  return (
    <View style={{
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
    }}>
      { icon }
      <TouchableOpacity onPress={onPress}>
        <PlusSVG />
      </TouchableOpacity>
    </View>
  )
}



export default IconPlus;

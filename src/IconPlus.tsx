
import React, { createContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  PlusSVG,
} from './SVGs'
import { SvgProps } from 'react-native-svg';

type IconPlusProps = {
  icon: React.FC<SvgProps>,
  onPress: () => void,
  longestDescription: number,
}


function IconPlus ({icon, onPress, longestDescription} : IconPlusProps): React.JSX.Element {
  // the width should range from 25 to 75. 
  // If there's 10 characters or less, it should be 75. 
  // If theres 40 characters or more, it should be 25. 
  // And everything in between
  const width = 25 + (50 * (1 - Math.min(1, Math.max(0, longestDescription - 10) / 30)))
  const Icon = icon;
  
  return (
    <View style={{
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
    }}>
      
      <Icon style={{width: width, height: width}} />
      <TouchableOpacity onPress={onPress}>
        <PlusSVG />
      </TouchableOpacity>
    </View>
  )
}



export default IconPlus;

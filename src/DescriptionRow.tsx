
import React, { createContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  MinusSVG,
  ReloadSVG
} from './SVGs'

type DescriptionRowProps = {
  text: string,
  onDelete?: () => void,
  onRepick?: () => void,
}


function DescriptionRow ({text, onDelete, onRepick} : DescriptionRowProps): React.JSX.Element {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: "center"
    }}>
      {onRepick ?
        <TouchableOpacity hitSlop={10} style={{flex: 1}} onPress={onRepick}>
          <ReloadSVG />
        </TouchableOpacity>
        : null
      }
      <Text style={{
        margin: 10,
        fontSize: 20,
        flex: 5
      }}>{text}</Text>
      {onDelete ?
        <TouchableOpacity style={{flex: 1}}  onPress={onDelete}>
          <MinusSVG />
        </TouchableOpacity>
        : null
      }
    </View>
  )
}



export default DescriptionRow;

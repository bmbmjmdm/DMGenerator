
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
  onDelete: () => void,
  onRepick: () => void
}


function DescriptionRow ({text, onDelete, onRepick} : DescriptionRowProps): React.JSX.Element {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: "center"
    }}>
      <TouchableOpacity style={{flex: 1}} onPress={onRepick}>
        <ReloadSVG />
      </TouchableOpacity>
      <Text style={{
        margin: 10,
        fontSize: 20,
        flex: 5
      }}>{text}</Text>
      <TouchableOpacity style={{flex: 1}}  onPress={onDelete}>
        <MinusSVG />
      </TouchableOpacity>
    </View>
  )
}



export default DescriptionRow;

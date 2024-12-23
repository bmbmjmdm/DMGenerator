
import React, { createContext, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
} from 'react-native';
import {
  PlusSVG,
} from './SVGs'
import { SvgProps } from 'react-native-svg';

type IconPlusProps = {
  icon: React.FC<SvgProps>,
  onPress: () => void,
  longestDescription: number,
  name: string

}


function IconPlus ({name, icon, onPress, longestDescription} : IconPlusProps): React.JSX.Element {
  const [showName, setShowName] = useState(false)
  const animateName = () => {
    if (showName) return
    setShowName(true)
    setTimeout(() => {
      setShowName(false)
    }, 1100)
  }
  // the width should range from 25 to 75
  // inversely proportional to 100 matches the range well
  const width = Math.min(75, Math.max(25, (100 - longestDescription)))
  const Icon = icon;

  return (
    <View style={{
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
    }}>
      {showName ? <FloatingText text={name} /> : null}
      <TouchableOpacity onPress={animateName}>
        <Icon width={width} height={width} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <PlusSVG />
      </TouchableOpacity>
    </View>
  )
}


export default IconPlus;


function FloatingText({text}: {text:string}): React.JSX.Element {
  const opacity = useRef(new Animated.Value(1)).current
  const top = useRef(new Animated.Value(-50)).current
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    Animated.timing(top, {
      toValue: -100,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View style={{
      width: 110,
      position: 'absolute',
      transform: [{translateY: top}],
      opacity: opacity,
    }}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>{text}</Text>
    </Animated.View>
  )
}
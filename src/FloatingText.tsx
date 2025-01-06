import React, {useEffect, useRef} from 'react';
import {Text, Animated} from 'react-native';

type FloatingTextProps = {
  text: string;
  dynamicSize?: boolean;
  closeToTop?: boolean;
};
export default function FloatingText({
  text,
  dynamicSize,
  closeToTop,
}: FloatingTextProps): React.JSX.Element {
  
  const opacity = useRef(new Animated.Value(1)).current;
  const top = useRef(new Animated.Value(closeToTop ? 0 : -50)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(top, {
      toValue: closeToTop ? -50 : -100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const longestLine = text
    .split('\n')
    .reduce((a, b) => (a.length > b.length ? a : b)).length;

  return (
    <Animated.View
      style={{
        width: dynamicSize ? longestLine * 20 : 110,
        position: 'absolute',
        transform: [{translateY: top}],
        opacity: opacity,
      }}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>{text}</Text>
    </Animated.View>
  );
}

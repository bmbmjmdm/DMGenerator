import React, {useRef, useState} from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {TabInfo} from './App';
import FloatingText from './FloatingText';

type MenuButtonProps = {
  onPress: () => void;
  first: boolean;
  tab: TabInfo;
};

export function MenuButton({
  onPress,
  first,
  tab,
}: MenuButtonProps): React.JSX.Element {
  const [showName, setShowName] = useState(false);
  const widthRatio = useRef(Dimensions.get('window').width / 432).current;
  const responsiveWidth = (width: number) => width * widthRatio;

  const animateName = () => {
    if (showName) return;
    setShowName(true);
    setTimeout(() => {
      setShowName(false);
    }, 1100);
  };

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: first ? 0 : 20,
      }}
      onPress={() => {
        animateName();
        onPress();
      }}>
      {showName ? <FloatingText dynamicSize text={tab.name} /> : null}
      <Image source={tab.icon} style={{width: responsiveWidth(50), height: responsiveWidth(60)}} />
    </TouchableOpacity>
  );
}

export default MenuButton;

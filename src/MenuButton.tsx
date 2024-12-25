import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
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
      <Image source={tab.icon} style={{width: 50, height: 60}} />
    </TouchableOpacity>
  );
}

export default MenuButton;

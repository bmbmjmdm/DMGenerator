import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {PlusSVG} from './SVGs';
import {SvgProps} from 'react-native-svg';
import FloatingText from './FloatingText';

type IconPlusProps = {
  icon: React.FC<SvgProps>;
  onPress: () => void;
  longestDescription: number;
  name: string;
};

function IconPlus({
  name,
  icon,
  onPress,
  longestDescription,
}: IconPlusProps): React.JSX.Element {
  const [showName, setShowName] = useState(false);
  const animateName = () => {
    if (showName) return;
    setShowName(true);
    setTimeout(() => {
      setShowName(false);
    }, 1100);
  };
  // the width should range from 25 to 75
  // inversely proportional to 100 matches the range well
  const width = Math.min(75, Math.max(25, 100 - longestDescription));
  const Icon = icon;

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showName ? <FloatingText text={name} /> : null}
      <TouchableOpacity onPress={animateName}>
        <Icon width={width} height={width} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <PlusSVG />
      </TouchableOpacity>
    </View>
  );
}

export default IconPlus;

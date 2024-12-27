import React, {createContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {MinusSVG, ReloadSVG} from './SVGs';

type DescriptionRowProps = {
  text: string;
  onDelete?: () => void;
  onRepick?: () => void;
  onUpdateText: (newText: string) => void;
};

function DescriptionRow({
  text,
  onDelete,
  onRepick,
  onUpdateText
}: DescriptionRowProps): React.JSX.Element {
  const [curText, setCurText] = useState(text);
  const [cursorPosition, setCursorPosition] = useState<{start: number} | undefined>({ start: 0 });

  useEffect(() => {
    setCurText(text);
    setCursorPosition({ start: 0 })
    setTimeout(() => {
      setCursorPosition(undefined)
    }, 100)
  }, [text]);


  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {onRepick ? (
        <TouchableOpacity hitSlop={10} style={{flex: 1}} onPress={onRepick}>
          <ReloadSVG />
        </TouchableOpacity>
      ) : null}
      <TextInput
        style={{
          fontSize: 20,
          flex: 5,
          maxHeight: 400,
          color: 'black'
        }}
        multiline
        onChangeText={newText => {
          setCurText(newText)
        }}
        onBlur={() => {
          onUpdateText(curText)
        }}
        value={curText}
        selection={cursorPosition}
      />
      {onDelete ? (
        <TouchableOpacity style={{flex: 1}} onPress={onDelete}>
          <MinusSVG />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default DescriptionRow;

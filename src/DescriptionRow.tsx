import React, {createContext, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
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
  const [cursorPosition, setCursorPosition] = useState<{start: number} | undefined>(undefined);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log("resetting text")
    setCurText(text);
    if (text?.length > 550) {
      setCursorPosition({ start: 0 })
      setTimeout(() => {
        setCursorPosition(undefined)
      }, 100)
    }
  }, [text]);


  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset = {Platform.OS === 'ios' ? 0 : 100}
      behavior={'padding'}
    >
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
          ref={textInputRef}
        />
        {onDelete ? (
          <TouchableOpacity style={{flex: 1}} onPress={onDelete}>
            <MinusSVG />
          </TouchableOpacity>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

export default DescriptionRow;

import React, {createContext, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import {MinusSVG, ReloadSVG} from './SVGs';

type DescriptionRowProps = {
  text: string;
  label?: string;
  onDelete?: () => void;
  onRepick?: () => void;
  onUpdateText: (newText: string) => void;
};

function DescriptionRow({
  text,
  label,
  onDelete,
  onRepick,
  onUpdateText
}: DescriptionRowProps): React.JSX.Element {
  const [curText, setCurText] = useState(text);
  const [editable, setEditable] = useState<boolean>(true);
  const pressTime = useRef<number>(0);
  const [cursorPosition, setCursorPosition] = useState<{start: number} | undefined>(undefined);
  const textInputRef = useRef<TextInput>(null);
  const heightRatio = useRef(Dimensions.get('window').height / 886).current;
  const responsiveWHeight = (height: number) => height * heightRatio;
  //const previousText = useRef<string | undefined>(undefined);


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

  useEffect(() => {/*
    this successfully stops the useEffect from going triggered by changing
    the parents text value
    however the problem still remains (i think) that onblur will auto set a text
    field to the end of it. so i need to solve BOTH. in the meantime,
    sending the user to the top is better than sending them to the bottom
    also have to uncomment curText and previousText

    if (previousText.current === text) return
    if (text === curText) return

    previousText.current = text
    console.log("big update")
    console.log("resetting text")*/
    setCurText(text);
    if (text?.length > 550) {
      setCursorPosition({ start: 0 })
      setTimeout(() => {
        setCursorPosition(undefined)
      }, 100)
    }
  }, [text, /*curText*/]);

  return (
    <View 
      style={{
        flexDirection: 'column',
      }}
    >
      {label && <Text style={{fontSize: 16, color: 'grey'}}>{label}</Text>}
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
          editable={editable}
          style={{
            fontSize: 20,
            flex: 5,
            maxHeight: responsiveWHeight(400),
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
          onPressIn={() => {
            pressTime.current = Date.now();
          }}
          onPressOut={() => {
            // If the user is long-pressing the text input, don't give it focus
            // This allows the user to scroll long text without the keyboard popping up
            if (Date.now() - pressTime.current > 200) {
              // however if the user is already editing it, dont kick them out 
              if (!textInputRef.current?.isFocused()) {
                setEditable(false)
                setTimeout(() => setEditable(true), 100)
              }
            }
          }}
        />
        {onDelete ? (
          <TouchableOpacity style={{flex: 1}} onPress={onDelete}>
            <MinusSVG />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default DescriptionRow;


import React, { createContext, useState } from 'react';
import {
  View,
} from 'react-native';
import Card from './Card'
import DescriptionRow from './DescriptionRow'
import {BeardSVG} from './SVGs'
import IconPlus from './IconPlus'
import Pill from './Pill';

function CharacterTab(): React.JSX.Element {  
  return (
    <View> 
        <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
          <Pill type='Reload' onPress={()=>{}} />
          <Pill type='Favorite' onPress={()=>{}} />
        </View>
        <Card
          icon={
            <IconPlus 
              icon={<BeardSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={"Hello Bobsf sdfs dfsd fsd df sdfkin"} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={"Hello Bobs fsdf sdfsd fsd df sdfkin"} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={"Hello Bobs fsdf sdfsd fsd df sdfkin"} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
    </View>
  )
}



export default CharacterTab;


import React, { createContext, useEffect, useState } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
import Card from './Card'
import DescriptionRow from './DescriptionRow'
import {
  BeardSVG,
  IDSVG,
  SnapSVG,
  HeartSVG,
  BagSVG,
  SparkleSVG
} from './SVGs'
import IconPlus from './IconPlus'
import Pill from './Pill';
import {
  getRandomAbility,
  getRandomAccent,
  getRandomAppearance,
  getRandomBackground,
  getRandomEquipment,
  getRandomMotivation,
  getRandomName,
  getRandomPersonality,
  getRandomRace
} from "./randomizer"

function CharacterTab(props:any): React.JSX.Element {
  const [loaded, setLoaded] = useState(false)
  const [basics, setBasics] = useState<string[]>([])
  const [personality, setPersonality] = useState<string[]>([])
  const [equipment, setEquipment] = useState<string[]>([])
  const [motivation, setMotivation] = useState<string[]>([])
  const [appearance, setAppearance] = useState<string[]>([])
  const [abilities, setAbilities] = useState<string[]>([])
  const [freeform, setFreeform] = useState("")

  const onReload = () =>{
    setBasics([
      getRandomName(),
      getRandomRace(),
      getRandomAccent()
    ])
    setMotivation([
      getRandomMotivation(),
      getRandomBackground()
    ])
    setPersonality([
      getRandomPersonality(),
      getRandomPersonality()
    ])
    setEquipment([
      getRandomEquipment(),
      getRandomEquipment()
    ])
    setAppearance([
      getRandomAppearance(),
      getRandomAppearance()
    ])
    setAbilities([
      getRandomAbility()
    ])
  }

  useEffect(() => {
    console.log("effect")
    if (!loaded) {
      setLoaded(true)
      console.log("loading")
      if (!props.preset) {
        onReload()
        console.log("loaded")
        console.log(appearance)
      }
    }
  }, [])

  return (
    <View> 
        <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
          <Pill type='Reload' onPress={onReload} />
          <Pill type='Favorite' onPress={()=>{}} />
        </View>
        <Card
          icon={
            <IconPlus 
              icon={<IDSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={basics[0]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={basics[1]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={basics[2]} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
        
        <Card
          icon={
            <IconPlus 
              icon={<BeardSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={appearance[0]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={appearance[1]} onDelete={() => {}} onRepick={() => {}} />,
          ]}
        />
        
        <Card
          icon={
            <IconPlus 
              icon={<SnapSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={personality[0]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={personality[1]} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
        
        <Card
          icon={
            <IconPlus 
              icon={<HeartSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={motivation[0]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={motivation[1]} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
        
        <Card
          icon={
            <IconPlus 
              icon={<BagSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={equipment[0]} onDelete={() => {}} onRepick={() => {}} />,
            <DescriptionRow text={equipment[1]} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
        
        <Card
          icon={
            <IconPlus 
              icon={<SparkleSVG />}
              onPress={() => {}}
            />
          }
          rows={[
            <DescriptionRow text={abilities[0]} onDelete={() => {}} onRepick={() => {}} />
          ]}
        />
        
        <Card>
          <TextInput />
        </Card>
    </View>
  )
}



export default CharacterTab;

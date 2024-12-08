import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
import Card from './Card'
import DescriptionRow from './DescriptionRow'
import IconPlus from './IconPlus'
import Pill from './Pill';

export type CardDetails = {
  icon: React.JSX.Element,
  // a card with only 1 provided list will use that list for each entry. it will have 2 default entries
  // a card with 2+ lists will have 1 default entry for each list, and subsequent entries will pick a random list
  lists: (() => string)[],
  // a card marked large will have a small icon and only 1 default entry
  large?: boolean,
}


type TabProps = {
  cards: Record<string, CardDetails>,
}

function Tab(props:TabProps): React.JSX.Element {
  // Use a single useState to manage state for all cards
  const [state, setState] = useState<Record<string, string[]>>({});
  const [freeform, setFreeform] = useState("")

  useEffect(() => {
    onReload()
  }, [])

  const onFavorite = () => {
  }
  
  const onReload = () => {
    const newState = Object.keys(props.cards).reduce((acc, key) => {
      const card = props.cards[key]
      const lists = card.lists
      // each card is a list of texts
      acc[key] = []
      // if theres only 1 list, add 2 texts from it, unless the text is large
      if (lists.length === 1) {
        const getter = lists[0]
        acc[key].push(getter())
        if (!card.large) {
          acc[key].push(getter())
        }
      }
      // if theres more than 1 list, add 1 text from each
      else {
        for (let i = 0 ; i < lists.length ; i++) {
          const getter = lists[i]
          acc[key].push(getter())
        }
      }
      return acc;
    }, {} as Record<string, string[]>)

    setState(newState)
  }

  const onReloadSingle = (cardTitle:string, entry: number) => {
    // we need to retrieve the appropriate text getter/list
    const card = props.cards[cardTitle]
    let getter
    // try to get the same list as the entry
    if (entry < card.lists.length) getter = card.lists[entry]
    // if we've gone past the number of lists, choose one randomly
    else getter = card.lists[Math.floor(Math.random() * card.lists.length)]
    // now get a text from the list
    state[cardTitle][entry] = getter()
    setState({...state})
  }

  const onRemove = (cardTitle:string, entry: number) => {
    state[cardTitle].splice(entry, 1) 
    setState({...state})
  }

  const onAdd = (cardTitle:string) => {
    state[cardTitle].push("")
    onReloadSingle(cardTitle, state[cardTitle].length - 1)
  }

  return (
    <View> 
        <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
          <Pill type='Reload' onPress={onReload} />
          <Pill type='Favorite' onPress={onFavorite} />
        </View>

        {
          Object.keys(state).map((key:string) => {
            const list = state[key]
            const icon = props.cards[key].icon
            return (
              <Card
                icon={
                  <IconPlus 
                    icon={icon || <View />}
                    onPress={() => onAdd(key)}
                  />
                }
                rows={list.map((text, index) => (
                  <DescriptionRow text={text} onDelete={() => onRemove(key, index)} onRepick={() => onReloadSingle(key, index)} />
                ))}
              />
            )
          })
        }
        
        <Card>
          <TextInput
            style={{ width: "100%", fontSize: 20 }}
            multiline
            value={freeform}
            onChangeText={(text) => setFreeform(text)} />
        </Card>
    </View>
  )
}



export default Tab;

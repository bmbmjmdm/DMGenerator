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
  icon: React.FC,
  // a card with only 1 provided list will use that list for each entry. it will have 2 default entries
  // a card with 2+ lists will have 1 default entry for each list, and subsequent entries will pick a random list
  lists: (() => string)[],
  // a card marked single will have only 1 default entry
  single?: boolean,
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
    const newState = Object.keys(props.cards).reduce((acc, cardName) => {
      const card = props.cards[cardName]
      const lists = card.lists
      // each card is a list of texts
      acc[cardName] = []
      // if theres only 1 list, add 2 texts from it, unless the text is single
      if (lists.length === 1) {
        const getter = lists[0]
        acc[cardName].push(getter())
        if (!card.single) {
          acc[cardName].push(getter())
        }
      }
      // if theres more than 1 list, add 1 text from each
      else {
        for (let i = 0 ; i < lists.length ; i++) {
          const getter = lists[i]
          acc[cardName].push(getter())
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
          Object.keys(state).map((cardName:string) => {
            const descriptionList = state[cardName]
            const icon = props.cards[cardName].icon
            return (
              <Card
                icon={
                  <IconPlus 
                    name={cardName}
                    icon={icon || View}
                    onPress={() => onAdd(cardName)}
                    longestDescription={[...descriptionList].sort((a, b) => b.length - a.length)[0].length}
                  />
                }
                rows={descriptionList.map((text, index) => (
                  <DescriptionRow
                    text={text}
                    onDelete={() => onRemove(cardName, index)}
                    onRepick={() => onReloadSingle(cardName, index)}
                    key={text}
                  />
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

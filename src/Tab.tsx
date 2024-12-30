import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import Card from './Card';
import DescriptionRow from './DescriptionRow';
import IconPlus from './IconPlus';
import Pill from './Pill';
import Favorites, { FavoritesRef } from './Favorites';
import { useDispatch, useSelector } from 'react-redux';
import { selectState, selectTabName, setFavoriteID, setState } from './redux';
import {cloneDeep} from 'lodash';

export type CardDetails = {
  // Not including an icon also means that the user cant add/remove rows from this card
  icon?: React.FC;
  // a card with only 1 provided list will use that list for each entry. it will have 2 default entries
  // a card with 2+ lists will have 1 default entry for each list, and subsequent entries will pick a random list
  lists: (() => string)[];
  // a card marked single will have only 1 default entry
  single?: boolean;
  labels?: string[];
};

type TabProps = {
  cards: Record<string, CardDetails>;
};

function Tab({cards}: TabProps): React.JSX.Element {
  const dispatch = useDispatch();
  const state = useSelector(selectState);
  const curTab = useSelector(selectTabName);
  const setStateWrapper = (newState: Record<string, string[]>) => dispatch(setState(newState));
  const favoritesRef = React.createRef<FavoritesRef>();

  useEffect(() => {
    if (Object.keys(state).length === 0) {
      onReload();
    }
  }, [curTab]);

  const onFavorite = () => {
    favoritesRef.current?.showFavorites();
  };

  const onReload = () => {
    const newState = Object.keys(cards).reduce((acc, cardName) => {
      const card = cards[cardName];
      const lists = card.lists;
      // each card is a list of texts
      acc[cardName] = [];
      // if theres only 1 list, add 2 texts from it, unless the text is single
      if (lists.length === 1) {
        const getter = lists[0];
        acc[cardName].push(getter());
        if (!card.single) {
          acc[cardName].push(getter());
        }
      }
      // if theres more than 1 list, add 1 text from each
      else {
        for (let i = 0; i < lists.length; i++) {
          const getter = lists[i];
          acc[cardName].push(getter());
        }
      }
      return acc;
    }, {} as Record<string, string[]>);

    newState.freeform = [''];
    
    dispatch(setFavoriteID(0));
    setStateWrapper(newState);
  };

  const onReloadSingle = (cardTitle: string, entry: number, premadeNewState?: Record<string, string[]>) => {
    // we need to retrieve the appropriate text getter/list
    const card = cards[cardTitle];
    let getter;
    // try to get the same list as the entry
    if (entry < card.lists.length) getter = card.lists[entry];
    // if we've gone past the number of lists, choose one randomly
    else getter = card.lists[Math.floor(Math.random() * card.lists.length)];
    // now get a text from the list
    const newState = premadeNewState || cloneDeep(state)
    newState[cardTitle][entry] = getter();
    setStateWrapper(newState);
  };

  const onRemove = (cardTitle: string, entry: number) => {
    const newState = cloneDeep(state)
    newState[cardTitle].splice(entry, 1);
    setStateWrapper(newState);
  };

  const onAdd = (cardTitle: string) => {
    const newState = cloneDeep(state)
    newState[cardTitle].push('');
    onReloadSingle(cardTitle, newState[cardTitle].length - 1, newState);
  };

  return (
    <View>
      <Favorites ref={favoritesRef} />
      <View
        style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
        <Pill type="Reload" onPress={onReload} />
        <Pill type="Favorite" onPress={onFavorite} />
      </View>

      {Object.keys(state).map((cardName: string) => {
        if (cardName === 'freeform') return;
        if (cardName === 'favoriteID') return;
        const descriptionList = state[cardName];
        const icon = cards[cardName].icon;
        const longestDescription = descriptionList.length ? [...descriptionList].sort((a, b) => b.length - a.length)[0].length : 0
        const labels = cards[cardName].labels;
        return (
          <Card
            key={cardName}
            icon={
              icon ? (
                <IconPlus
                  name={cardName}
                  icon={icon}
                  onPress={() => onAdd(cardName)}
                  longestDescription={longestDescription}
                />
              ) : undefined
            }
            rows={descriptionList.map((text:string, index:number) => (
              <DescriptionRow
                text={text}
                onDelete={icon ? () => onRemove(cardName, index) : undefined}
                onRepick={
                  icon ? () => onReloadSingle(cardName, index) : undefined
                }
                key={text}
                onUpdateText={(newText) => {
                  const newState = cloneDeep(state);
                  newState[cardName][index] = newText;
                  setStateWrapper(newState);
                }}
                label={labels?.[index]}
              />
            ))}
          />
        );
      })}


        <Card
          rows={[
            <DescriptionRow
              text={state.freeform?.[0]}
              onUpdateText={(newText) => {
                const newState = cloneDeep(state);
                newState.freeform = [newText];
                setStateWrapper(newState);
              }}
            />
          ]}
        />
    </View>
  );
}

export default Tab;

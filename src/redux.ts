import { createSlice, configureStore } from '@reduxjs/toolkit'

type TabName = 'NPC' | 'City' | 'City\nEncounter' | 'Path\nEncounter' | 'Quest' | 'Spice Up'

type State = {
  'NPC': Record<string, string[]>,
  'City': Record<string, string[]>,
  'City\nEncounter': Record<string, string[]>,
  'Path\nEncounter': Record<string, string[]>,
  'Quest': Record<string, string[]>,
  'Spice Up': Record<string, string[]>,
  curTabName: TabName,
  favoritesOpen: boolean
  favoriteID: Record<TabName, number>
}

const tabSlice = createSlice({
  name: 'curTab',
  initialState: {
    'NPC': {},
    'City': {},
    'City\nEncounter': {},
    'Path\nEncounter': {},
    'Quest': {},
    'Spice Up': {},
    curTabName: "NPC",
    favoritesOpen: false,
    favoriteID: {
      'NPC': 0,
      'City': 0,
      'City\nEncounter': 0,
      'Path\nEncounter': 0,
      'Quest': 0,
      'Spice Up': 0,
    }
  } as State,
  reducers: {
    setState (state, action) {
      state[state.curTabName] = action.payload
    },
    setCurTab (state, action) {
      state.curTabName = action.payload
    },
    setFavoritesOpen (state, action) {
      state.favoritesOpen = action.payload
    },
    setFavoriteID (state, action) {
      state.favoriteID[state.curTabName] = action.payload
    },
  }
})

export const { setState, setCurTab, setFavoritesOpen, setFavoriteID } = tabSlice.actions

export const selectState = (state:State) => state[state.curTabName]
export const selectTabName = (state:State) => state.curTabName
export const selectFavoritesOpen = (state:State) => state.favoritesOpen
export const selectFavoriteID = (state:State) => state.favoriteID[state.curTabName]

export const store = configureStore({
  reducer: tabSlice.reducer
})

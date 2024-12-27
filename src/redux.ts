import { createSlice, configureStore } from '@reduxjs/toolkit'

type State = {
  'NPC': Record<string, string[]>,
  'City': Record<string, string[]>,
  'City\nEncounter': Record<string, string[]>,
  'Path\nEncounter': Record<string, string[]>,
  'Quest': Record<string, string[]>,
  'Spice Up': Record<string, string[]>,
  curTabName: 'NPC' | 'City' | 'City\nEncounter' | 'Path\nEncounter' | 'Quest' | 'Spice Up',
  favoritesOpen: boolean
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
    favoritesOpen: false
  } as State,
  reducers: {
    setState (state, action) {
      console.log("setting redux state")
      state[state.curTabName] = action.payload
    },
    setCurTab (state, action) {
      state.curTabName = action.payload
    },
    setFavoritesOpen (state, action) {
      state.favoritesOpen = action.payload
    }
  }
})

export const { setState, setCurTab, setFavoritesOpen } = tabSlice.actions

export const selectState = (state:State) => state[state.curTabName]
export const selectTabName = (state:State) => state.curTabName
export const selectFavoritesOpen = (state:State) => state.favoritesOpen

export const store = configureStore({
  reducer: tabSlice.reducer
})

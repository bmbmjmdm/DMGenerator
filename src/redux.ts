import { createSlice, configureStore } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  name: 'curTab',
  initialState: {
    'NPC': {} as Record<string, string[]>,
    'City': {} as Record<string, string[]>,
    'City\nEncounter': {} as Record<string, string[]>,
    'Path\nEncounter': {} as Record<string, string[]>,
    'Quest': {} as Record<string, string[]>,
    'Spice Up': {} as Record<string, string[]>,
    curTabName: "NPC" as 'NPC' | 'City' | 'City\nEncounter' | 'Path\nEncounter' | 'Quest' | 'Spice Up',
    favoritesOpen: false
  },
  reducers: {
    setState (state, action) {
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

export const selectState = (state:any) => state[state.curTabName]
export const selectTabName = (state:any) => state.curTabName
export const selectFavoritesOpen = (state:any) => state.favoritesOpen

export const store = configureStore({
  reducer: tabSlice.reducer
})

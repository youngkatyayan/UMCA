import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
          usrDetails:(state,action)=>{
            state.user=action.payload
          }
    }
})

export const { usrDetails } = counterSlice.actions
export default counterSlice.reducer;
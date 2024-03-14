const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
    name:"message",
    initialState:{
        pt:1,
    },
    reducers:{
        setMessageInfo: (state) => {
            state.pt +=1 ;
        },
    }
})

export const {setMessageInfo} = messageSlice.actions;
export const selectMessage= (state) => state.message.pt;

export default messageSlice;

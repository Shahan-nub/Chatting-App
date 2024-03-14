const { createSlice } = require("@reduxjs/toolkit");

const menuSlice = createSlice({
    name:"menu",
    initialState:{
        menu:false,
    },
    reducers:{
        setMenu: (state) => {
            state.menu = !state.menu ;
        },
    }
})

export const {setMenu} = menuSlice.actions;
export const selectMenu= (state) => state.menu.menu;

export default menuSlice;
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import channelSlice from "./features/channelSlice";
import messageSlice from "./features/messageSlice";

export const DiscordStore =  configureStore({
    reducer:{
        user:userSlice.reducer,
        channel:channelSlice.reducer,
        message:messageSlice.reducer,
    }
})
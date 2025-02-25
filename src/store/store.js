import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const toolKitStore = configureStore({
    reducer: {
        users: userSlice,
    }
})
export { toolKitStore };
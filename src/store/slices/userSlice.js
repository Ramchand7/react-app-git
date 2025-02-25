import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: ["Bertie Tucker",'ss'],
    reducers: {
        addUser: (state, action) => { 
            state.push(action.payload);            
        },
        deleteUser: (state, action) => { 
            console.log(action.payload);
            return state.filter((state,index)=>index !== action.payload);
         },
        updateUser: (state, action) => { }
    }

});
console.log(userSlice.actions);
export default userSlice.reducer;
export const { addUser, deleteUser, updateUser } = userSlice.actions;
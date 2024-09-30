import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  phoneNumber: "",
  selectedCategories: [], 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userName, email, phoneNumber } = action.payload;
      state.userName = userName;
      state.email = email;
      state.phoneNumber = phoneNumber;
    },
    clearUser: (state) => {
      state.userName = "";
      state.email = "";
      state.phoneNumber = "";
      state.selectedCategories = []
    },
    addCategory: (state, action) => {
      console.log('State before adding category:', state.selectedCategories);
      if (!state.selectedCategories) {
        console.error('selectedCategories is undefined');
      }
      
      state.selectedCategories.push(action.payload);
      console.log('newly added :',action.payload)
      console.log('State after adding category:', Array.from(state.selectedCategories));
    },
    removeCategory: (state, action) => {
      state.selectedCategories = state.selectedCategories.filter((category) => category !== action.payload); 
    },
    resetCategory:(state)=>{
      state.selectedCategories = [];
    }
  },
});

export const { setUser, clearUser, addCategory, removeCategory,resetCategory } = userSlice.actions;
export default userSlice.reducer;

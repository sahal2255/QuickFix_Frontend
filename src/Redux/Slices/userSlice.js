import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  phoneNumber: "",
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userName = "";
      state.email = "";
      state.phoneNumber = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

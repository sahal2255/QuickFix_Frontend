import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  phoneNumber: "",
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
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

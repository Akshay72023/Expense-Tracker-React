import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token'),
  email: localStorage.getItem('email') || ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      state.token = '';
      state.isLoggedIn = false;
      state.email = '';
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;





// import React, { createContext, useState } from "react";

// const AuthContext = createContext({
//     token: "",
//     isLoggedIn: false,
//     login: (token) => {},
//     logout: () => {}
// });

// export const AuthContextProvider = (props) => {
//     const initialToken = localStorage.getItem('token');
//     const [token, setToken] = useState(initialToken);
//     const userLoggedIn = !!token;

//     const loginHandler = (token,email) => {
//         localStorage.setItem("token", token);
//         localStorage.setItem('email',email);
//         setToken(token);
//     };

//     const logoutHandler = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('email');
//         setToken(null);
//     };

//     const contextValue = {
//         token: token,
//         isLoggedIn: userLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;

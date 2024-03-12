import React, { createContext, useState } from "react";

const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userLoggedIn = !!token;

    const loginHandler = (token,email) => {
        localStorage.setItem("token", token);
        localStorage.setItem('email',email);
        setToken(token);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

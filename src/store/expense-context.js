import React, { createContext, useState } from "react";

const ExpenseContext = createContext({
    expenses: [],
    addExpense:(expense)=>{},
});

export const ExpenseContextProvider = (props) => {
    const [expenses, setExpense] = useState([]);

    const addExpense = (expense) => {
        setExpense((prevExpense)=>[...prevExpense,expense]);
    };

    

    const contextValue = {
        expenses: expenses,
        addExpense: addExpense,
    };

    return (
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;

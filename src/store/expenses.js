import { createSlice } from "@reduxjs/toolkit";

const initialExpense= {total: 0};

const expenseSlice= createSlice({
    name: 'expense',
    initialState: initialExpense,
    reducers:{
        totalExpense(state,action){
            state.total=state.total+action.payload
        },
        deleteExpense(state,action){
            state.total= state.total-action.payload;
        }

    }
});
console.log(initialExpense.total);
export const expenseActions= expenseSlice.actions;
export default expenseSlice.reducer;




// import React, { createContext, useState } from "react";

// const ExpenseContext = createContext({
//     expenses: [],
//     addExpense:(expense)=>{},
// });

// export const ExpenseContextProvider = (props) => {
//     const [expenses, setExpense] = useState([]);

//     const addExpense = (expense) => {
//         setExpense((prevExpense)=>[...prevExpense,expense]);
//     };

    

//     const contextValue = {
//         expenses: expenses,
//         addExpense: addExpense,
//     };

//     return (
//         <ExpenseContext.Provider value={contextValue}>
//             {props.children}
//         </ExpenseContext.Provider>
//     );
// };
 
// export default ExpenseContext;

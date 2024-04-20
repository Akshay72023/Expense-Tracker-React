import {  configureStore } from '@reduxjs/toolkit';
//import counterReducer from './counter';
import authReducer from './auth';
import expenseReducer from './expenses';

const store= configureStore({
    reducer:{ auth:authReducer,expense:expenseReducer}
})


export default store;
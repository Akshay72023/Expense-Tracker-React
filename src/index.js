import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { ExpenseContextProvider } from './store/expense-context';
import { Provider } from 'react-redux';
import store from './store/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
                <Provider store={store}>
                <App />
                </Provider>
    </BrowserRouter>
);

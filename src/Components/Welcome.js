import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
//import AuthContext from '../store/auth-context';
import Expenses from './Expenses';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Welcome = () => {
    // const authCtx = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const verifyEmailhandler = (e) => {
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
            {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: localStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                console.log(data);
            }).catch(err => {
                alert(err.message);
            })
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        //authCtx.logout();
        localStorage.removeItem('total');
        dispatch(authActions.logout());
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid black', padding: '10px' }}>
                <p style={{ margin: '0' }}>
                    Welcome to expense tracker!!!
                </p>
                <p style={{ margin: '0', backgroundColor: '#ffc0cb63', border: '2px solid transparent', borderRadius: '2px', display: 'inline-block' }}>
                    Your profile is incomplete.
                    <Link to="/update" style={{ textDecoration: 'none' }}>
                        <span>Complete Now</span>
                    </Link>
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="info" style={{ marginRight: '20px', marginTop: '20px' }} onClick={verifyEmailhandler}>
                    Verify Email
                </Button>
                <Button variant="info" style={{ marginTop: '10px', marginRight: '5px' }} onClick={logoutHandler} >
                    Logout
                </Button>
            </div>
            <Expenses />
        </div>
    )
};

export default Welcome;

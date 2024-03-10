import React from 'react';
import { Link } from 'react-router-dom';
import {  Button } from 'react-bootstrap';

const Welcome = () => {
    const verifyEmailhandler=(e)=>{
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
        {
            method:'POST',
            body:JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:localStorage.getItem('token')
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        }).then(data=>{
            console.log(data);
        }).catch(err=>{
            alert(err.message);
        })
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
            <Button variant="info" style={{marginLeft:'20px', marginTop:'30px'}} onClick={verifyEmailhandler}>Verify Email</Button>
        </div>
    )
};

export default Welcome;

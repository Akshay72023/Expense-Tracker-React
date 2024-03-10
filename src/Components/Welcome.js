import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
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
        </div>
    )
};

export default Welcome;

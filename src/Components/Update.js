import React, { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Update = () => {
    const nameRef = useRef('');
    const photoRef = useRef('');

    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
        {
            method: 'POST',
            body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
            })
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        }).then(data=>{
            console.log(data);
            nameRef.current.value=(data.users[0].displayName || "");
            photoRef.current.value=(data.users[0].photoUrl || "");
        })
    },[]);

    const submitHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const url = photoRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    displayName: name,
                    photoUrl: url,
                    returnSecureToken: true,
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
            })
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid black', padding: '10px' }}>
                <p style={{ margin: '0' }}>
                    Winners never quits, Quitters never win!!!
                </p>
                <p style={{ margin: '0', backgroundColor: '#ffc0cb63', border: '2px solid transparent', borderRadius: '2px', display: 'inline-block' }}>
                    Your profile is 64% completed. A complete profile has higher chances of landing job.
                    <Link to="/update" style={{ textDecoration: 'none' }}>
                        <span>Complete Now</span>
                    </Link>
                </p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h3>Contact Details</h3>
                <Form onSubmit={submitHandler} style={divStyles}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" required ref={nameRef} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Photo Url</Form.Label>
                        <Form.Control type="text" required ref={photoRef} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginBottom: '10px', backgroundColor: '#590080' }}>
                        Update
                    </Button>
                </Form>
            </div>
        </div>
    )
};

const divStyles = {
    width: "400px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    margin: '0 auto',
    marginTop: '30px',
    backgroundColor: '#8e5da98f',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
};

export default Update;

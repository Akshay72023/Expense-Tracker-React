import React,{useRef,useState} from 'react';
import {Form,Button} from 'react-bootstrap';

const ForgotPassword=()=>{
    const[loader,setLoader]=useState(false);
    const emailRef=useRef('');
    const submitHandler=(e)=>{
        e.preventDefault();
        const email= emailRef.current.value;
        console.log(email);
        setLoader(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
        {
            method:'POST',
            body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email:email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>{
            if(res.ok){
                setLoader(false);
                return res.json();
            }
        }).then(data=>{
            console.log(data);
        })
    };

    const divStyles={
        width: "400px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        margin: '0 auto',
        marginTop: '50px',
        backgroundColor: '#8e5da98f',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
    };
    return(
        <div style={divStyles}>
                <Form onSubmit={submitHandler}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Forgot Password</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                    </Form.Group>
                    {!loader && <Button type='submit' style={{backgroundColor:'#590080'}}>Submit</Button>}
                    {loader && <p>Sending Request!!!</p>}
                </Form>
            </div>
    )
};

export default ForgotPassword;

import React, { useRef, useContext, useEffect,useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ExpenseContext from '../store/expense-context';

const Expenses = () => {
    const expenseCtx = useContext(ExpenseContext);
    const enameRef = useRef('');
    const epriceRef = useRef('');
    const ecategoryRef = useRef('');
    const [expenses,setExpenses]=useState([]);
   

    const submitHandler = (e) => {
        e.preventDefault();
        const ename = enameRef.current.value;
        const eprice = epriceRef.current.value;
        const ecategory = ecategoryRef.current.value;
        
        const expense = {
            ename: ename,
            eprice: eprice,
            ecategory: ecategory
        };
        fetch('https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expenses.json',
        {
            method:"POST",
            body:JSON.stringify(expense),
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
    };
    useEffect(() => {
        fetch('https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expenses.json')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                const loadedExpenses = [];
                for (const key in data) {
                    loadedExpenses.push({ id: key, ...data[key] });
                }
                setExpenses(loadedExpenses);
            });
    }, []);

    return (
        <div>
        <div style={divStyles}>
            <Form onSubmit={submitHandler}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Expense Tracker</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Expense Name</Form.Label>
                    <Form.Control type="text" placeholder="Expense Name" ref={enameRef} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Expense Price</Form.Label>
                    <Form.Control type="number" placeholder="Expense Price" ref={epriceRef} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Expense Category</Form.Label>
                    <Form.Select ref={ecategoryRef}>
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Movies">Movies</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginBottom: '10px', backgroundColor: '#590080' }}>
                    Add Expense
                </Button>
            </Form>
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {expenses.map(expense => (
                        <li key={expense.id} style={{ textAlign: 'center' }}>
                            <h4>{expense.ename} - {expense.eprice} - {expense.ecategory}</h4>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const divStyles = {
    width: "600px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    margin: '0 auto',
    marginTop: '-45px',
    backgroundColor: '#8e5da98f',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
};

export default Expenses;

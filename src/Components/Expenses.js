import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenses';

const ExpensesForm = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(() => {
    const storedTotal = localStorage.getItem('total');
    return storedTotal ? parseInt(storedTotal) : 0;
  });
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(undefined);
  const [isPremium, setIsPremium] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for theme
  const email = localStorage.getItem('email');
  const newEmail = email.replace('@',"").replace('.','');

  useEffect(() => {
    getData();
  }, []); 

  useEffect(() => {
    localStorage.setItem('total', total);
  }, [total]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://expense-tracker-7a352-default-rtdb.firebaseio.com/expense/${newEmail}.json`
      );
      console.log(res.data);
      setData(res.data || []);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };

  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const obj = { desc, amount, category };
    if (editId === undefined) {
      try {
        const res = await axios.post(
          `https://expense-tracker-7a352-default-rtdb.firebaseio.com/expense/${newEmail}.json`,
          obj
        );
        console.log(res);
        setTotal(prevTotal => prevTotal + Number(amount)); 
        getData();
      } catch (error) {
        console.log("error", error);
      }
      setDesc("");
      setAmount("");
      setCategory("");
    } else {
      try {
        const res = await axios.put(
          `https://expense-tracker-7a352-default-rtdb.firebaseio.com/expense/${newEmail}/${editId}.json`,
          obj
        );
        console.log(res);
        getData();
      } catch (error) {
        console.log("error", error);
      }
      setDesc("");
      setAmount("");
      setCategory("");
    }
  };

  const deleteExpenseHandler = async (amount,id) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-7a352-default-rtdb.firebaseio.com/expense/${newEmail}/${id}.json`
      );
      console.log(res.data);
      setTotal(prevTotal => prevTotal - amount);
      getData();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const editExpenseHandler = (d, a, c, id) => {
    setDesc(d);
    setAmount(a);
    setCategory(c);
    setEditId(id);
  };

  const premiumActivate=(e)=>{
    e.preventDefault();
    setIsPremium(!isPremium);
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "expenses.txt";
    document.body.appendChild(element); 
    element.click();
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode); 
  };

  const divStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: '-40px',
    backgroundColor: isDarkMode ? '#222' : '#8e5da98f', 
    color: isDarkMode ? 'white' : 'black', 
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    width:'300px'
  };

  return (
    <div style={{backgroundColor:isDarkMode ? '#222' : 'white', color:isDarkMode ? 'white' : 'black'}}>
      <div style={divStyles}>
        <Form>
          <h1>Day-to-day Expenses</h1>
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={desc}
              onChange={descHandler}
              type="text"
              placeholder="Enter Description of Expense"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              value={amount}
              onChange={amountHandler}
              type="number"
              placeholder="Enter Amount of Expense"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={categoryHandler}
            >
              <option>Select</option>
              <option>Food</option>
              <option>Petrol</option>
              <option>Clothes</option>
              <option>other..</option>
            </Form.Select>
          </Form.Group>

          <Button onClick={submitHandler}>Submit</Button>
        </Form>
      </div>
      <div style={{textAlign:'center',marginTop:'10px'}}>
        {Object.keys(data).map((key) => {
          const item = data[key];
          return (
            <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',}} key={key}>
              <p style={{ marginLeft: '5px' }}> Description: {item.desc}</p>
              <p style={{ marginLeft: '5px' }}> Amount: {item.amount}</p>
              <p style={{ marginLeft: '5px' }}> Category: {item.category}</p>
              <button style={{ marginLeft: '5px' }}
                onClick={() => editExpenseHandler(item.desc, item.amount, item.category, key)}
              >
                Edit
              </button >
              <button style={{ marginLeft: '5px' }}  onClick={() => deleteExpenseHandler(item.amount,key)}>Delete</button>
            </div>
          );
        })}
      </div>
      {total >= 10000 && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button onClick={premiumActivate} style={{ backgroundColor: '#b67acb', color: 'white', fontWeight: 'bold', border: 'none' }}>
            Activate Premium
          </Button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {total >= 10000 && isPremium && 
          <Button style={{ backgroundColor: '#b67acb', color: 'white', fontWeight: 'bold', border: 'none', marginRight: '10px' }} onClick={downloadFile}>
            Download Expenses
          </Button>
        }
        {total >= 10000 && isPremium && 
          <Button style={{ backgroundColor: '#b67acb', color: 'white', fontWeight: 'bold', border: 'none' }} onClick={toggleTheme}>
            Toggle theme
          </Button>
        }
      </div>
      {total>0 && <p style={{display:'inline-block',marginTop:'20px',marginLeft:'550px',border:'2px solid black', backgroundColor:'#b67acb', color: 'white', fontWeight: 'bold',padding:'5px'}} >Total Expense: {total}</p>
}
    </div>
  );
};

export default ExpensesForm;

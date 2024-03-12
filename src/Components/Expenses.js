import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const ExpensesForm = () => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(undefined);
  const email = localStorage.getItem('email');
  const newEmail = email.replace('@',"").replace('.','');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expense/${newEmail}.json`
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
          `https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expense/${newEmail}.json`,
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
    } else {
      try {
        const res = await axios.put(
          `https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expense/${newEmail}/${editId}.json`,
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

  const deleteExpenseHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://expensetracker-3c3a6-default-rtdb.firebaseio.com/expense/${newEmail}/${id}.json`
      );
      console.log(res.data);
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

  const divStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: '-40px',
    backgroundColor: '#8e5da98f',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    width:'300px'
  };

  return (
    <div>
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
              <p> Description : {item.desc}</p>
              <p> Amount : {item.amount}</p>
              <p> Category: {item.category}</p>
              <button
                onClick={() => editExpenseHandler(item.desc, item.amount, item.category, key)}
              >
                Edit
              </button>
              <button onClick={() => deleteExpenseHandler(key)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpensesForm;

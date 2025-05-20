// import React from 'react'

// import { RiDeleteBin6Line } from "react-icons/ri";

// import { useCard, useDispatchCard } from '../components/ContextReducer';





import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCard, useDispatchCard } from '../components/ContextReducer';

export default function Cart() {
  const data = useCard();
  const dispatch = useDispatchCard();
  const [orderConfirmed, setOrderConfirmed] = useState(false); // new state

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index: index });
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    const response = await fetch("http://localhost:4000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderConfirmed(true); // set order confirmed message
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  // ✅ Show order confirmation if order is placed
  if (orderConfirmed) {
    return (
      <div className='m-5 w-100 text-center fs-3 text-success'>
        ✅ Your order has been confirmed!
      </div>
    );
  }

  // ❌ Show empty message only if cart is empty and not confirmed
  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        🛒 The Cart is Empty!
      </div>
    );
  }

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={`${food.id}-${food.size}-${index}`}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <RiDeleteBin6Line onClick={() => handleRemove(index)} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

import '../styles/ReceiptScreen.css';
import React, { useEffect, useState } from 'react';
import { findOrder, getEmailParam } from '../utils';

function ReceiptScreen() {
  const [order, setOrder] = useState();

  useEffect(() => {
    const email = getEmailParam();
    const order = findOrder(email);
    setOrder(order);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="grid-container">
          <div className="grid-item-receiptscreen">
            {order && order.info ? (
              <>
              <h2>Receipt</h2>
                <p>Time: {order.info.time}</p>
                <p>Number of people: {order.info.people}</p>
                <p>Email: {order.info.email}</p>
                <ul>
                  <li>
                    {order.meal.strMeal} x {order.info.people}
                    <span>${200}</span>
                  </li>
                  <li className="total">
                    Total
                    <span>${200}</span>
                  </li>
                </ul>
              </>
            ): <p>Order not found</p>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default ReceiptScreen;
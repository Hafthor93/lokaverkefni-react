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

  const calculateOrder = () => {
    const meals = 200 * order.info.people;
    const drinks = 50 * order.info.people * order.drinks.length;
    return meals + drinks
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="grid-container">
          <div className="grid-item-receiptscreen">
            {order && order.info ? (
              <>
              <h2 className='h2-receipt'>Receipt</h2>
              <div className='p-receipt'>
                <p className=''>Time: {order.info.time}</p>
                <p>Number of people: {order.info.people}</p>
                <p>Email: {order.info.email}</p>
              </div>  
                <ul className='receipt-ul'>
                  <li className='receipt-list'>
                    Meal: {order.meal.strMeal} x {order.info.people}
                    <span> ${200}</span>
                  </li>
                  {order.drinks.map(drink => (
                    <li key={drink.id}>
                      Drinks: {drink.name} x {order.info.people}
                      <span> ${50}</span>
                    </li>
                  ))}
                  <li className="total">
                    Your Total Is
                    <span> ${calculateOrder()}</span>
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
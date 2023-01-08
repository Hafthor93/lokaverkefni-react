import React, { useEffect } from 'react';
import '../styles/OrderScreen.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import {
  getEmailParam,
  findOrder,
  createOrderWithEmail,
  updateInfo,
} from '../utils';
import 'react-calendar/dist/Calendar.css';

function OrderScreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('16:00');
  const [people, setPeople] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = getEmailParam();
    const order = findOrder(email);
    if (order.info) {
      setDate(new Date(order.info.date));
      setTime(order.info.time);
      setPeople(order.info.people);
      setEmail(order.info.email);
    } 
  }, []);

  const times = [];
  for (let i = 16; i < 23; i++) {
    for (let j = 0; j < 60; j += 30) {
      times.push(`${i}:${j === 0 ? '00' : '30'}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currEmail = getEmailParam();
    if(email && time && people && date) {
      if(currEmail && findOrder(currEmail).info) {
        updateInfo(currEmail, { date, time, people, email });
      }
      else {
        createOrderWithEmail({ date, time, people, email });
      }
      navigate('/ReceiptScreen?email=' + email);
    }
      else {
        alert("Please fill in all the fields")
      }
  }

  const tileDisabled = ({ date }) => {
    const day = date.getDay();
    return (
      new Date(date) < new Date().setHours(0, 0, 0, 0) || day === 0 || day === 6
    );
  };


  return (
    <div className="App">
      <header className="App-header">
        <div class="grid-container">
          <div class="grid-item-orderscreen">
            <Calendar
              onChange={setDate}
              value={date}
              tileDisabled={tileDisabled}
            />
            <form className="time-form" onSubmit={handleSubmit}>
              <label className="time-label">
                Time:
                <select
                  className="time-box"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <br></br>
              <label className="people-box">
                Number of people:
                <input
                  className="number-people"
                  type="number"
                  value={people}
                  onChange={(event) => setPeople(event.target.value)}
                  min="1"
                  required
                />
                <br></br>
                Email:
                <input
                  className="number-people"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <br></br>
                <button
                  className="receipt-screen-button"
                    type="submit"
                >
                  Next
                </button>
              </label>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default OrderScreen;

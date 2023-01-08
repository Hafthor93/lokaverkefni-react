import React from 'react';
import '../styles/SelectDrinks.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addDrinksToNewOrder, getEmailParam, findOrder, getCurrentOrder, updateDrinks } from '../utils';

function SelectDrinks() {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const email = getEmailParam();
    const order = findOrder(email)
     async function fetchData() {
       const response = await fetch('https://api.punkapi.com/v2/beers');
       const data = await response.json();
       setDrinks(data);
       setLoading(false);
      }
      fetchData();
    
      if(order.drinks) {
        setSelectedItems(order.drinks);
      }
    else if(getCurrentOrder()){
      setSelectedItems(getCurrentOrder().drinks);
    }
    else setSelectedItems([]);
  }, []);


  function GoToNextPage() {
    if(!Array.isArray(selectedItems) || selectedItems.length === 0) {
      alert('Please select at least one drink');
      return;
    }
    const email = getEmailParam();
    if(email) {
      updateDrinks(email, selectedItems);
      navigate('/OrderScreen?email='+email);
    }
    else {

      addDrinksToNewOrder(selectedItems);
      navigate('/OrderScreen');
    }
  }

  function handleItemSelect(item) {
    if(Array.isArray(selectedItems) && selectedItems.findIndex(val => val.id === item.id) > -1) {
      setSelectedItems(selectedItems.filter((val) => val.id !== item.id));
    }
    else {
      if(Array.isArray(selectedItems)) {
      setSelectedItems([...selectedItems, item]);
    } else setSelectedItems([item]);
    }
  }

  function checkSelected(item) {
    return Array.isArray(selectedItems) && selectedItems.findIndex(val => val.id === item.id) > -1;
  }

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="App">
      <header className="App-header">
        <div class="grid-container">
          <div class="grid-item-selectdrinks1">
            <button
              className="orderbutton-div order-screen-button"
              onClick={() => GoToNextPage()}
            >
              Next
            </button>
            <div className="cards">
              {drinks.map((drink) => (
                <div className={`card ${checkSelected(drink) ? "checked" : ''}`} key={drink.id}>
                  <label>
                    <img src={drink.image_url} alt={drink.name} />
                    <h3>{drink.name}</h3>
                    <p>{drink.description}</p>
                    <button
                      className="select-drink"
                      onClick={() => handleItemSelect(drink)}
                    >
                      {checkSelected(drink) ? "Deselect Drink" : "Select Drink"}
                    </button>
                  </label>
                  500kr
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
export default SelectDrinks;

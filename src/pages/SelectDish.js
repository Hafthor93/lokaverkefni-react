import '../styles/SelectDish.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmailParam, findOrder, createNewOrder, getCurrentOrder, updateMeal } from '../utils';

function SelectDish() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = getEmailParam();
    const order = findOrder(email)
    if(order.meal) {
      setMeal(order.meal);
      setLoading(false);
    }
    else if(getCurrentOrder()){
      setMeal(getCurrentOrder().meal);
      setLoading(false);
    }
    else {
       async function fetchData() {
        const response = await fetch('https://themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setMeal(data.meals[0]);
        setLoading(false);
      }
      fetchData(); 
    }
  }, []);

  function handleClick() {
    setLoading(true);
    fetch('https://themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
        setLoading(false);
      }); 
  }

  const GoToNextPage = () => {
    const email = getEmailParam();
    if (email && findOrder(email).info) {
      updateMeal(email, meal);
      navigate(`/SelectDrinks?email=${email}`);
    } else {
      createNewOrder(meal);
      navigate('/SelectDrinks');
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <div className="grid-container-selectdish">
        <div className="grid-item-selectdish1" key={meal.idMeal}>
          <h1 className="meal-title">{meal.strMeal} 2000kr </h1>
          <img
            className="meal-image"
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="700"
            height="500"
          />
          <p className="meal-description">{meal.strInstructions}</p>
          <ul></ul>
        </div>
        <div className="grid-item-selectdish2">
          <button className="new-mealbutton" type="button" onClick={handleClick}>
            New Meal
          </button>
          <button className="orderbutton-div drinks-button" onClick={() => GoToNextPage()}>
            Continue to Drinks
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectDish;

import '../styles/HomeScreen.css';
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from 'react-carousel-minimal';
import {  useState } from 'react';
import {findOrder} from '../utils';

function HomeScreen() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

const data = [
  {
    image: "https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-basil-plate-ingredients-cooking-pasta-dark-table-flat-lay-top-view-copy-spce_1150-45812.jpg?w=1800&t=st=1672699916~exp=1672700516~hmac=e5cccfaf0cdca336197723a85c0547ee6d430c5225ff12ded39b9a091ecc8ab6",
      caption: "Classic Italian spaghetti pasta with tomato sauce",
  },
  {
    image: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?w=1800&t=st=1672699914~exp=1672700514~hmac=da86a3bd72a65fac25b5bcc8ad84accd8bf07e2644d0750ff728a164f6e237df",
      caption: "Penne pasta in tomato sauce with chicken",
  },
  {
    image: "https://img.freepik.com/free-photo/comida-lifestyle-spaghetti-foodie-gastronomy_1350-47.jpg?w=1800&t=st=1672699971~exp=1672700571~hmac=a514d58e1921de760b4a7a4646d3bf3a500c495febe57dd112843f73cc8d26a6",
      caption: "Spaghetti",
  }
];

const captionStyle = {
  fontSize: "1em",
  fontWeight: "bold",
};

function checkForOrder(email) {
  const order = findOrder(email)
  if(order.info){
    navigate("/SelectDish?email=" + email);
  }
  else {
    alert("No order found");
  }
}


  return (
    <div className="App">
      <header className="App-header">
        <div class="grid-container">
          <div class="grid-item1">
          <Carousel
            data={data}
            automatic={true}
            time={3000}
            dots={true}
            width="100vh"
            height="auto"
            slideImageFit="cover"
            captionStyle={captionStyle}
          />
            </div>
          <div className="grid-item2">
            <div className='test'>
            <div className='order-box'>
            <h1>Order here</h1>
            <div className='orderbutton-div'>
              <Link to="/SelectDish" className="order-button">Order</Link>
            </div>
            </div>
            </div>
          </div>
          <div className="grid-item3">
            <h1 className='find-h1'>Find your order</h1>
            <div>
            <label className='email-label'>Enter your email
            <input className='email-input' onChange={(e) => setEmail(e.currentTarget.value)} value={email} placeholder='Enter Email'></input>
            </label>
            </div>
            <div className='find-button-div'>
            <button className='find-button' onClick={() => checkForOrder(email)}>Find</button>
            </div>
          </div>
          <div className="grid-item4">
            
          </div>
          </div>             
      </header>
    </div>
  );
}

export default HomeScreen;

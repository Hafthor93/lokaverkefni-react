import { Link, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import SelectDish from './pages/SelectDish';
import SelectDrinks from './pages/SelectDrinks';
import OrderScreen from './pages/OrderScreen';
import ReceiptScreen from './pages/ReceiptScreen';
import logo from './lilbits.png';
import './styles/HomeScreen.css';

function App() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <img src={logo} width="200" height="200"></img>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active-page' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/SelectDish"
              className={location.pathname === '/SelectDish' ? 'active-page' : ''}>
              Select Dish
            </Link>
          </li>
          <li>
            <Link
              to="/SelectDrinks"
              className={location.pathname === '/SelectDrinks' ? 'active-page' : ''}>
              Select Drinks
            </Link>
          </li>
          <li>
            <Link
              to="/OrderScreen"
              className={location.pathname === '/OrderScreen' ? 'active-page' : ''}>
              Order Screen
            </Link>
          </li>
          <li>
            <Link
              to="/ReceiptScreen"
              className={location.pathname === '/ReceiptScreen' ? 'active-page' : ''}>
              Receipt
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/SelectDish" element={<SelectDish />} />
        <Route path="/SelectDrinks" element={<SelectDrinks />} />
        <Route path="/OrderScreen" element={<OrderScreen />} />
        <Route path="/ReceiptScreen" element={<ReceiptScreen />} />
      </Routes>
    </>
  );
}

export default App;

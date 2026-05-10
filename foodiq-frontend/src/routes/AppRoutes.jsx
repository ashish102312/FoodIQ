import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Scanner from '../pages/Scanner';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Product from '../pages/Product';
import Sports from '../pages/Sports';
import Reports from '../pages/Reports';
import Menu from '../pages/Menu';
import OAuth2RedirectHandler from '../pages/OAuth2RedirectHandler';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let isValid = false;
  if (token) {
    try {
      // Decode the JWT payload (the second part of the token)
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if expiration time is greater than current time
      if (payload.exp * 1000 > Date.now()) {
        isValid = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      }
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
  }
  return isValid ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

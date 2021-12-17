import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes } from './constants';
import CartPage from './pages/CartPage/CartPage.lazy';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.lazy';
import HomePage from './pages/HomePage/HomePage.lazy';
import LoginPage from './pages/LoginPage/LoginPage.lazy';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={MyRoutes.HOME} element={<HomePage />} />
      <Route path={MyRoutes.LOGIN} element={<LoginPage />} />
      <Route path={MyRoutes.CART} element={<CartPage />} />
      <Route path={MyRoutes.CHECKOUT} element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;

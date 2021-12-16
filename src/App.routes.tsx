import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes } from './constants';
import CartPage from './pages/CartPage/CartPage.lazy';
import HomePage from './pages/HomePage/HomePage.lazy';
import LoginPage from './pages/LoginPage/LoginPage.lazy';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={MyRoutes.HOME} element={<HomePage />} />
      <Route path={MyRoutes.LOGIN} element={<LoginPage />} />
      <Route path={MyRoutes.CART} element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './App.routes';
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

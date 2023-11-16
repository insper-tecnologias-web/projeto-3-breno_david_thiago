
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App';
import Watchlist from './components/Watchlist/index'
import axios from 'axios'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Coin from './components/Coin/Coin'


const CoinWrapper = () => {
  const {coinKey} = useParams();
  return <Coin coinKey = {coinKey}/>;
}


const router = createBrowserRouter(
  
  [
  
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "watchlist/",
    element: <Watchlist ></Watchlist>,
  }, 
  {
    path: "coin/:coinKey",
    element: <CoinWrapper/>,
  }
  
]);

  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App';
import Watchlist from './components/Watchlist/index'
import axios from 'axios'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Coin from './components/Coin/Coin'
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import Community from './components/Community/Community';
import { Register } from './components/login/register';
import { Toaster } from './components/ui/toaster';
import SpecPost from './components/Community/SpecPost'


const CoinWrapper = () => {
  const {coinKey} = useParams();
  return <Coin coinKey = {coinKey}/>;
}

const SpecPostWrapper = () => {
  const {postId} = useParams();
  return <SpecPost postId = {postId}/>;
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
    path: "/login",
    element: <Login/>,
  }, 
  {
    path: "/register",
    element: <Register/>,
  }, 
  {
    path: "coin/:coinKey",
    element: <CoinWrapper/>,
  },
  {
    path: "/community",
    element: <Community></Community>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  },
  {
    path: "/community/:postId",
    element: <SpecPostWrapper></SpecPostWrapper>
  }
]);

  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

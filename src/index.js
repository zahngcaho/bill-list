import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sum from '@/test';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import '@/theme.css';

console.log(sum(1, 2));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';

const route = createBrowserRouter([
  { path: '/', element: <Layout />, children:[
    {index:true , element:<Home />},
  ] },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={route} />
  </React.StrictMode>
);
import React from 'react'
import ReactDOM from 'react-dom/client'
import Shop from './components/Shop/Shop'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Layout/Root'
import Home from './components/Home/Home'
import Page404 from './components/Page404/Page404'
import Review from './components/Review/Review'
import Inventory from './components/Inventory/Inventory'
import Login from './components/Login/Login'
import Checkout from './components/Checkout/Checkout'
import Register from './components/Register/Register'
import AuthProvider from './Providers/AuthProvider'
import PrivateRoute from './Routes/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/shop',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/products')
      },
      {
        path: '/review',
        element: <PrivateRoute><Review></Review></PrivateRoute>,
      },
      {
        path: '/inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)

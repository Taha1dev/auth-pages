import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './SignUp.tsx'
import Login from './Login.tsx'
const router = createBrowserRouter([
  {path:'',element:<App/>},
  {path:'login',element:<Login/>},
  {path:'signup',element:<Signup/>},
  
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

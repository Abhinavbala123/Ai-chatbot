import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './routes/homePage/homePage.jsx'
import DashBoardPage from './routes/dashBoardPage/dashBoardPage.jsx'
import ChatPage from './routes/chatPage/chatPage.jsx'
import RootLayout from './Layouts/rootLayout/rootLayout.jsx'
import DashBoardLayout from './Layouts/dashBoardLayout/dashBoardLayout.jsx'
import SignInPage from './routes/sigInPage/signInPage.jsx'
import SignUpPage from './routes/signUpPage/signUpPage.jsx'

const router = createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {
        path :"/",element:<HomePage/>
      },
      {
        path :"/sign-in/*",element:<SignInPage/>
      },
      {
        path :"/sign-up/*",element:<SignUpPage/>
      },
      {
        element:<DashBoardLayout/>,
        children:[
          {
            path:"/dashboard",element:<DashBoardPage/>
          },
          {
            path:"/dashboard/chats/:id",element:<ChatPage/>
          }
        ]
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

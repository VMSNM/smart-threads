import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { UserPageContextProvider } from './context/UserPageContext.jsx'
import { UserPostsContextProvider } from './context/UserPostsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserPageContextProvider>
          <UserPostsContextProvider>
            <App />
          </UserPostsContextProvider>
        </UserPageContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

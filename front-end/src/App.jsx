import { Routes } from 'react-router-dom'
import React from 'react'
import './App.css'

import { AuthProdiver } from './AuthContext'
import { routes, renderRoutes } from './routes'

const App = () => {
  return (
    <AuthProdiver>
        <Routes>{renderRoutes(routes)}</Routes>
    </AuthProdiver>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Context } from './store/context'
import AppRouter from './router'
import Header from './components/header'
import Footer from './components/footer'
import { productImages } from 'store/constants'
import './App.scss'

function App() {
  return (
    <Context.Provider value={productImages}>
      <BrowserRouter>
        <Header />
        <div className="app-wrapper">
          <Switch>
            <AppRouter />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
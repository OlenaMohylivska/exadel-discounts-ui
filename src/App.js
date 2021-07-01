import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Context, ContextImages } from './store/context'
import AppRouter from './router'
import Header from './components/header'
import Footer from './components/footer'
import { productImages } from 'store/constants'
import './App.scss'

function App() {

  const contextCheck = 'Context that can be passed to Login'

  return (
    <Context.Provider value={{ contextCheck: contextCheck }}>
      <ContextImages.Provider value={productImages}>
        <BrowserRouter>
          <Header />
          <Switch>
            <AppRouter />
          </Switch>
          <Footer />
        </BrowserRouter>
      </ContextImages.Provider>
  )
}

export default App
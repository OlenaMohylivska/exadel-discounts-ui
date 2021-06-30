import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Context, ContextImages } from './store/context'
import AppRouter from './router'

import Header from './components/header'
import Footer from './components/footer'

import './App.scss'



function App() {

  const contextCheck = 'Context that can be passed to Login'

  return (
    <Context.Provider value={{ contextCheck: contextCheck }}>
      <ContextImages.Consumer>
        {() => (
          <BrowserRouter>
            <Header />
            <Switch>
              <AppRouter />
            </Switch>
            <div>Version: 25.06.2021</div>
            <Footer />
          </BrowserRouter>
        )}
      </ContextImages.Consumer>
    </Context.Provider>
  )
}

export default App

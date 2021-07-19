import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import axiosInstance from "components/api"
import { Context } from "./store/context"
import AppRouter from "./router"
import Header from "./components/header"
import Footer from "./components/footer"
import { productImages } from "store/constants"

import "./App.scss"
import Breadcrumbs from "components/breadcrumbs"

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const token = localStorage.getItem("jwt") && localStorage.getItem("jwt")
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
  }, [])
  return (
    <Context.Provider
      value={{ productImages, isAuthorized, setIsAuthorized, token }}
    >
      <BrowserRouter>
        <Header />
        <div className="app-wrapper">
          <Breadcrumbs />
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

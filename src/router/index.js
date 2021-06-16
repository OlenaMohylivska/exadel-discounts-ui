import React from "react"
import { Route } from "react-router-dom"
import Admin from "../views/admin"
import DiscountPage from "../views/discount-page"
import Home from './../views/home'
import Login from './../views/login'
import Profile from './../views/profile'
import Catalog from 'views/catalog'
import FavouritePage from 'views/favourite-page'
import HistoryPage from 'views/history-page'
import AddCompany from "components/add-company"
import AddItem from "components/add-item"

function AppRouter() {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/catalog">
        <Catalog />
      </Route>

      <Route path="/history-page">
        <HistoryPage />
      </Route>

      <Route path='/favourite'>
        <FavouritePage />
      </Route>

      <Route path='/admin'>
        <Admin />
      </Route>

      <Route path='/admin/add-company'>
        <AddCompany />
      </Route>

      <Route path='/admin/add-item'>
        <AddItem />
      </Route>

      <Route path='/discount:id'>
        <DiscountPage />
      </Route>
    </>
  )
}

export default AppRouter

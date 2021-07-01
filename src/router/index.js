import React from "react"
import { Route } from "react-router-dom"
import Admin from "../views/admin"
import DiscountPage from "../views/discount-page"
import Home from "./../views/home"
import Login from "./../views/login"
import Profile from "./../views/profile"
import FavouritePage from "views/favourite-page"
import HistoryPage from "views/history-page"
import AddCompany from "components/add-company"
import AddItem from "components/add-item"
import EditCompany from "components/edit-company"
import EditItem from "components/edit-item"
import Tools from "components/tools"
import EditSlider from "components/edit-slider"
import Statistics from "components/statistics"
import Companies from "components/companies"
import Promotions from "components/promotions"
import "./styles.scss"

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
      <Route path="/history-page">
        <HistoryPage />
      </Route>

      <Route path="/favourite">
        <FavouritePage />
      </Route>

      <Route path="/admin">
        <Admin />
      </Route>

      <Route path="/admin/add-company">
        <AddCompany />
      </Route>

      <Route path="/admin/edit-company/:id">
        <EditCompany />
      </Route>

      <Route path="/admin/add-item">
        <AddItem />
      </Route>
      <Route path="/admin/edit-item/:id">
        <EditItem />
      </Route>

      <Route path="/discount/:id">
        <DiscountPage />
      </Route>

      <Route path="/admin/tools">
        <Tools />
      </Route>

      <Route path="/edit-slider/">
        <EditSlider />
      </Route>

      <Route path="/admin/statistics">
        <Statistics />
      </Route>

      <Route path="/admin/all-companies">
        <Companies />
      </Route>

      <Route path="/admin/all-promotions">
        <Promotions />
      </Route>
    </>
  )
}

export default AppRouter

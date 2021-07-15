import React from "react"
import { Route, Redirect } from "react-router-dom"
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
import ProfileUserInfo from "views/profile-userInfo"
import "./styles.scss"
import OrderConfirm from "views/order-confirmation"

function AppRouter() {
  return (
    <>
      <Route path="/">
        {!localStorage.getItem("jwt") && <Redirect to="/login" />}
      </Route>
      <Route exact path="/">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <Profile />}
      </Route>
      <Route path="/profile/info">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <ProfileUserInfo />
        )}
      </Route>
      <Route path="/profile/history">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <HistoryPage />
        )}
      </Route>
      <Route path="/profile/favourite">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <FavouritePage />
        )}
      </Route>

      <Route path="/admin">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <Admin />}
      </Route>

      <Route path="/admin/add-company">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <AddCompany />
        )}
      </Route>

      <Route path="/admin/all-companies/edit-company/:id">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <EditCompany />
        )}
      </Route>

      <Route path="/admin/add-item">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <AddItem />}
      </Route>
      <Route path="/admin/all-promotions/edit-item/:id">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <EditItem />}
      </Route>

      <Route path="/discount/:id">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <DiscountPage />
        )}
      </Route>

      <Route path="/admin/tools">
        {!localStorage.getItem("jwt") ? <Redirect to="/login" /> : <Tools />}
      </Route>

      <Route path="/edit-slider/">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <EditSlider />
        )}
      </Route>

      <Route path="/admin/statistics">
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <Statistics />
        )}
      </Route>

      <Route path="/admin/all-companies" exact>
        {!localStorage.getItem("jwt") ? (
          <Redirect to="/login" />
        ) : (
          <Companies />
        )}
      </Route>

      <Route path="/admin/all-promotions" exact>
        <Promotions />
      </Route>
      <Route path="/order-confirmation/:id">
        <OrderConfirm />
      </Route>
    </>
  )
}

export default AppRouter

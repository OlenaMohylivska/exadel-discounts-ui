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
import Statistics from "components/statistics"
import Companies from "components/companies"
import Promotions from "components/promotions"
import ProfileUserInfo from "views/profile-userInfo"
import "./styles.scss"
import OrderConfirm from "views/order-confirmation"
import NonExistentPage from "components/non-existent-page"

const userRouts = [
  { path: "/profile", component: <Profile /> },
  { path: "/profile/info", component: <ProfileUserInfo /> },
  { path: "/profile/history", component: <HistoryPage /> },
  { path: "/profile/favourite", component: <FavouritePage /> },
  { path: "/order-confirmation/:id", component: <OrderConfirm /> },
  { path: "/discount/:id", component: <DiscountPage /> }
]

const adminRouts = [
  { path: "/admin", component: <Admin /> },
  { path: "/admin/add-company", component: <AddCompany /> },
  { path: "/admin/all-companies/edit-company/:id", component: <EditCompany /> },
  { path: "/admin/add-item", component: <AddItem /> },
  { path: "/admin/all-promotions/edit-item/:id", component: <EditItem /> },
  { path: "/admin/tools", component: <Tools /> },
  { path: "/admin/statistics", component: <Statistics /> },
  { path: "/admin/all-companies", component: <Companies /> },
  { path: "/admin/all-promotions", component: <Promotions /> }
]

function AppRouter() {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/">
        {!localStorage.getItem("jwt") && <Redirect to="/login" />}
      </Route>

      <Route exact path="/">
        {localStorage.getItem('role') === "USER" ? <Home /> : <Statistics />}
      </Route>
      <Route path="/404">
        <NonExistentPage />
      </Route>

      {localStorage.getItem('role') === "USER" ?
        userRouts.map((route, index) => (
          <Route path={route.path} key={index}>{route.component}</Route>
        )) :
        adminRouts.map((route, index) => (
          <Route path={route.path} key={index}>{route.component}</Route>
        ))
      }

      <Redirect from="*" to="/404" />

    </>
  )
}

export default AppRouter

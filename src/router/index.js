import React from "react"
import { Route } from "react-router-dom"
import Admin from "../views/admin"
import Home from './../views/home'
import Login from './../views/login'
import Profile from './../views/profile'
import Catalog from 'views/catalog'
import FavouritePage from 'views/favourite-page'

function AppRouter(){
    return(
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
            <Route path='/admin'>
				<Admin />
			</Route>
            <Route path='/favourite'>
				<FavouritePage />
			</Route>
        </>
    )
}

export default AppRouter

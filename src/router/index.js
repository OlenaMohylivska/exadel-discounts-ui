import React from 'react'
import { Route } from 'react-router-dom'

import Home from './../views/home'
import Login from './../views/login'
import Profile from './../views/profile'
import Catalog from 'views/catalog'
import History from 'views/history'

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
            <Route path="/history">
                <History />
            </Route>
        </>
    )
}

export default AppRouter
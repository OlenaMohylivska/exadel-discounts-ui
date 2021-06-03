import React from 'react'
import { Route } from 'react-router-dom'

import Home from './../views/home'
import Login from './../views/login'

function AppRouter(){
    return(
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </>
    )
}

export default AppRouter
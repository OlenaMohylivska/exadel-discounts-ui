import React, { useContext } from 'react'
import Context from '../../store/context'

function Login(){

    const { contextCheck } = useContext(Context)

    return (
        <div>
            <h1>This is login</h1>
            <pre>{contextCheck}</pre>
        </div>
    )
}

export default Login
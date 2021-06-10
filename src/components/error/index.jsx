import React from 'react'
import "./styles.css"

const Error = ({ error }) => {
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default Error
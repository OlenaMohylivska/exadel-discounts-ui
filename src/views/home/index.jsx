import React from 'react'
import PrimaryButton from './../../components/buttons/primary'

function Home(){
    return (
        <div>
            <h1 style={{color: 'red'}}>This is a home component</h1>
            <PrimaryButton text='Button Text Passed through props' />
        </div>
    )
}

export default Home
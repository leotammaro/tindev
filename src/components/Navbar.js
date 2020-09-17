import React from 'react'
import './Navbar.scss'
import AuthButton from './AuthButton'

function Navbar (){
    return <nav className="navbar">
        <img src={require('../assets/tindev.png')} className="logo" alt="tindev"/>
        <AuthButton type="login">LOG IN</AuthButton>
    </nav>
}

export default Navbar
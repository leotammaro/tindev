import React,{useContext} from 'react'
import { UserContext } from '../App'
import { Redirect } from 'react-router-dom'
import FullScreenLoading from '../components/FullScreenLoading'
import LandingPage from './LandingPage'

function Main() {
    const user = useContext(UserContext)
    const token = localStorage.getItem("token")

    return (
        !token ? <LandingPage/> : 
        user.status==="loading" ? <FullScreenLoading/> : 
        user.status==="setup" ? <Redirect to="/setup"></Redirect> : <Redirect to="/app"></Redirect>
    )
}

export default Main

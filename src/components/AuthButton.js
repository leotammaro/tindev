import React,{useState} from 'react'
import './AuthButton.scss'
import Login from './Login.js'
function AuthButton({type,children}) {
    const [showLogin,setShowLogin] = useState(false)

    
    return (
        <div>
        <button className={type} onClick={()=>{
            setShowLogin(true)
            }}>
            {children}
        </button>
        {showLogin && <Login type={type}/> }
    </div>
    )
}

export default AuthButton

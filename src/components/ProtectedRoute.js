import React from 'react'
import {Redirect,Route} from "react-router-dom"
function ProtectedRoute({component:Component,...rest}) {

    return (
      <Route
          {...rest}
          render={props=>
        localStorage.getItem("token") ? (
            <Component {...props}/>
        ) : 
        <Redirect to="/"></Redirect>
    }
      
         />
      
    )
}

export default ProtectedRoute

import React,{useState} from 'react'
import './Login.scss'
import firebase from 'firebase/app';
import 'firebase/auth';
import {Redirect,withRouter} from "react-router-dom"
import { getUsernameFromEmail } from '../utils/user';


function Login({type}) {
    const [userRegistered,setUserRegistered] = useState("")
    const db=firebase.firestore()
    const [user,setUser] = useState(null)
    const [imgUser,setImgUser] = useState("")

    const logIn =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            localStorage.setItem("token",result.credential.accessToken);
            const userMail=result.user.email
            const imgUserRegister = result.user.photoURL
            setImgUser(imgUserRegister)
            const userName =getUsernameFromEmail(userMail)
            setUser(userName)
            
            var docRef = db.collection("users").doc(userName);
            docRef.get().then(function(doc){ 
               if(doc.exists){
                   setUserRegistered("registered")
               }else{
                   setUserRegistered("notRegistered")
                   
               }
            })
          }).catch(function(_) {
          });
        
    }

  
    return (
        userRegistered==="registered" ? <Redirect to="/app"></Redirect> : 
        userRegistered==="notRegistered" ? <Redirect to={{
            pathname:"/setup",
        }}></Redirect> : 

        <div className="authentication-container">
        <div className="authentication">
            <img src={require("../assets/tinder.svg")} alt="logo-authentication-tinder" className="logo-tinder"/>         
            <h2>{type==="login" ? "Log In" : "Register"}</h2>
            <p className="auth-description">By clicking Log in,you agree to our Terms . Learn how we process your data in our Privacy Policy and Cookie Policy</p>
            <button className="google-button" onClick={logIn}>
             Log In With Google
            </button>
        </div>
     
    </div> 
    )
  
}

export default withRouter(Login );





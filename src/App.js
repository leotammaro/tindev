import React,{useEffect,useState} from 'react';
import './App.scss';
import LandingPage from './views/LandingPage';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Home from "./views/Home";
import SetUpProfile from './views/SetUpProfile';
import ProtectedRoute from './components/ProtectedRoute';
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { getUsernameFromEmail } from './utils/user';
import Main from './views/Main';


const UserContext = React.createContext()

function App() {
  const db = firebase.firestore()
  const[user,setUser]=useState({status:"loading"})
  

  useEffect( ()=>{
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
     
      if(firebaseUser!==null)
      db.collection("users").doc(getUsernameFromEmail(firebaseUser.email)).get()
      .then(doc=>{
        const data = doc.data()

        setUser((data && {...data,id :getUsernameFromEmail(firebaseUser.email) })||{status :"setup",imgProfile :firebaseUser.photoURL,id : getUsernameFromEmail(firebaseUser.email), email: firebaseUser.email})
      
      });
    });
  },[]);
  
  return (
    
    <Router>
      
      <div className="App">
        <UserContext.Provider value={user,setUser}>
          <Switch>
            <ProtectedRoute path="/app" component={Home}/>
            <ProtectedRoute path="/setup" component={SetUpProfile}/>
            <Route path="/login">
              <LandingPage></LandingPage>
            </Route>
            <Route path="/messages">
              <Home></Home>
            </Route>
            <Route path="/">
            <Main></Main>
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    
    </Router>
  );
}

export default App;
export {UserContext} 

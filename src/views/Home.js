import React,{useContext,useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Home.scss'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../App';
import {Redirect,Link} from "react-router-dom"
import FullScreenLoading from '../components/FullScreenLoading';
import ProfileCardList from '../components/ProfileCardList';
import moment from 'moment'
import { getUsernameFromEmail } from '../utils/user';
import MatchCard from '../components/MatchCard';


function Home() {

    const user = useContext(UserContext);
    const [logOutUser,setLogOutUser] = useState(false);
    const db=firebase.firestore();
    const [users,setUsers] = useState([]) ;
    const [loading,setLoading] = useState(true);
    const [userMatches,setUserMatches] = useState([])
    
    useEffect(
       ()=>{
        user.gender && loadUsers(user.gender);  
       },[user])
    
    const logOut = ()=>{
        firebase.auth().signOut().then(function() {
            localStorage.removeItem("token")
            setLogOutUser(true);
          })
    }
    
    const loadUsers =(gender)=>{
        user.id && 
        db.collection("users").where("gender",gender==="female" ? ">" : "<",gender)
        .get()
        .then(queryshot=>{
            setUsers(queryshot.docs)   
            setLoading(false)
            
        })
    } 

    
    
  
    return (
        logOutUser ? <Redirect to="/login"></Redirect> :
        user.status==="loading" ? <FullScreenLoading></FullScreenLoading> : 
        user.status==="setup" ? <Redirect to="/setup"></Redirect> : 
        <div className="Home">
            <div className="left-container">
                <div className="navbar-user">
                    <div className="my-profile">
                        <Avatar alt="user-photo" src={user.imgProfile} className="photo-profile"></Avatar>
                        <span>Mi perfil</span>
                    </div>
                    <div className="log-out" onClick={logOut}>
                        <ExitToAppIcon></ExitToAppIcon>
                    </div>
                </div>
                <div >
                    <button className="options">Matches</button>
                    <button className="options" >Messages</button>
                </div>
               <div className="matchs">
                <MatchCard className="match"/>
               </div>
              
               
                
            </div>
            
            {loading ? <FullScreenLoading></FullScreenLoading> : <ProfileCardList possibleMatches={users}></ProfileCardList>}
            
        </div>
    )
}

export default Home

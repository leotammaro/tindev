import React,{useState,useContext,useEffect} from 'react'
import FullScreenLoading from './FullScreenLoading'
import { UserContext } from '../App';
import { getUsernameFromEmail } from '../utils/user';
import firebase from 'firebase/app';
import './MatchCard.scss'
import {Link} from "react-router-dom"

function MatchCard() {
    const user = useContext(UserContext);
    const [loading,setLoading] = useState(true)
    const db = firebase.firestore();
    const [usersMatch,setUsersMatch] = useState([])
    useEffect(()=>{
       
        user.email && db.collection("users").doc(user.id)
        .get()
        .then(function(doc) {
            if (doc.exists) {
                const matchsUserLoged = doc.data().matches;
                console.log(matchsUserLoged)
                matchsUserLoged.map(docs=>{
                    setUsersMatch(usersMatch=> usersMatch.concat(docs))
                })
            } 
        });
    },[user])

   
    return (
       usersMatch.map((doc,index)=>{
                 return <div key={index} className="match">
                            <Link to="/messages">
                            <img src={doc.photoMatch} alt="user-match" style={{width:"100px",height:"120px",borderRadius:"5px"}}></img>
                            </Link>
                         </div>
       })
      
       
    )
}

export default MatchCard


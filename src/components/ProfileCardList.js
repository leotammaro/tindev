import React, { useEffect, useState,useContext} from 'react'
import { UserContext } from '../App';
import TinderCard from 'react-tinder-card'
import ProfileCard from './ProfileCard'
import "./ProfileCardList.scss"
import 'firebase/auth';
import firebase from 'firebase/app';
import {getUsernameFromEmail} from '../utils/user.js'
import {Link} from 'react-router-dom'

function ProfileCardList({possibleMatches}) {
    const db =firebase.firestore()
    const [users,setUsers] = useState([])
    const userLoged = useContext(UserContext);
    const [usersLikedByUserLoged,setUsersLikedByUserLoged] = useState(null)
  
    useEffect(()=>{
        setUsers(possibleMatches)  
        db.collection("likes").doc(userLoged.id)
        .get().then(function(doc) {
          setUsersLikedByUserLoged(doc.data())
        
        })
   
    },[possibleMatches])



    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction);
    }
      
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen');
      }
    
  

    const likeToUser  = (user,like)=>{
        const userMatch = getUsernameFromEmail(user.email)
        const userRef =  db.collection("likes").doc(userLoged.id)
        userRef.get()
        .then(()=>{
           
            userRef.set({
               [userMatch]: like
              },{merge:true}
            )
            const updatedUsers = users.filter(user=> {
                    return getUsernameFromEmail(user.data().email)!==userMatch
            });
             setUsers(updatedUsers);   
        })
     
        
        if(like==="like"){
            db.collection("likes").doc(userMatch).get()
            .then(doc=>{
                if(doc.exists){
                    const infoUser = doc.data()
                    if(infoUser[userLoged.id]==="like"){
                       
                        db.collection("users").doc(userLoged.id).set({
                            matches: firebase.firestore.FieldValue.arrayUnion({
                                idMatch : userMatch ,
                                photoMatch : user.imgProfile})
                        },{merge:true})
                        db.collection("users").doc(userMatch).set({
                            matches: firebase.firestore.FieldValue.arrayUnion({
                                idMatch : userLoged.id ,
                                photoMatch : userLoged.imgProfile})
                        },{merge:true})
                        db.collection("messages").add({
                            hello : "que pasa pa"
                        })
                    }
                   
                }
            })
        }
    }

    

 
   
    return (
        <div className="container-users">
            
            {users && usersLikedByUserLoged ? users.map((userdata,index)=>{
                const user = userdata.data()
                const userId = getUsernameFromEmail(user.email)
                const isAMatch = userLoged.matches && userLoged.matches.find(match=>match.idMatch===userId) 

                return !isAMatch && usersLikedByUserLoged[`${userId}`]!=="like" && <TinderCard key={index} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} className={"tinder-card "}>
                <ProfileCard user={user}/> 
                <div className="options-swipe">
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"  className="options-swipe-buttons" 
                  onClick={()=>{
                      likeToUser(user,"unlike") 
                      
                      }}>
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" style={{color:"red"}}/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"   className="options-swipe-buttons"
                   onClick={()=>{    
                         likeToUser(user,"superLike") 
                         
                      }}> 
                      <path style={{color:"#98BCE8"}} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                 </svg>
                
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"   className="options-swipe-buttons" 
                 onClick={()=>{
                     likeToUser(user,"like")
                     
                     }}>
                     <path style={{color:"green"}} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
        
                </div>
            
            </TinderCard>
            })
            : ""
        }
            
        </div>
    )
}

export default ProfileCardList

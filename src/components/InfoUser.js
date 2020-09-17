
import React from 'react'
import "./InfoUser.scss"
import moment from 'moment'

function InfoUser({user}) {
    const year = moment([]);
    const userBirthday = user.birthday
    const yearUser = year.diff(userBirthday,"years")
    return (
        <div className="info-user">
        <img src={user.imgProfile} className="img-user" alt="user-img"></img>
        <div className="name-age-user">
        <span className="name-user">{user.name}</span>
        <span>{yearUser}</span>
        </div>
        <div className="user-city">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{width:"20px",height:"20px",marginRight:"5px"}}>
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
            <p>{user.city}</p> 
        </div>
        
        </div>
    )
}

export default InfoUser

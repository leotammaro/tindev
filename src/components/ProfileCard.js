import React,{useState} from 'react'
import './ProfileCard.scss' 
import InfoUser from './InfoUser'
function ProfileCard({user}) {
    const [showInfoUser,setInfoUser] = useState(false)
    const showInfo = ()=>{
        setInfoUser(true)
        console.log(showInfoUser)
    }
    return (
        showInfoUser? <InfoUser user={user}></InfoUser> : 
        <div style={{ backgroundImage: 'url(' + user.imgProfile + ')' }} className="profile-card" onClick={()=>{showInfo()}}>
            <span className="user-name">{user.name}</span>
        </div>
    )
}

export default ProfileCard

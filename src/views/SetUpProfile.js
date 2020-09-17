import React,{useState, useContext,useEffect} from 'react'
import "./SetUpProfile.scss"
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { Redirect} from 'react-router-dom';
import moment from 'moment'
import { useForm } from "react-hook-form";
import { UserContext } from '../App';



function SetUpProfile(props) {
    const db = firebase.firestore();
    const [userRegister,setUserRegister] = useState("infoNotSubmitedYet")
    const [redirect,setRedirect] = useState(false)
    const {register,handleSubmit,errors} = useForm();
    const user = useContext(UserContext)

    useEffect(()=>{
        if(!user.id && user.name){
            setRedirect(true)
        }    
        console.log(redirect)
    },[user])

    const submitInfo = (data) =>{
        console.log(data)
       
        const birthday = moment(data.birthday).format()
        db.collection("users").doc(user.id).set({
            name:data.name,
            city :data.city,
            gender :data.gender,
            birthday : birthday,
            imgProfile : user.imgProfile,
            email:user.email
        }) 
        
       
    }
   

   
    return (
        redirect ? <Redirect to="/app"></Redirect> :
        //userRegister==="infoSubmited" ? <Redirect to="/app"/> :
       <div className="container">
           <div className="img-form-container">
               <img src={require("../assets/people123.jpg")} alt="people" className="image-form"></img>
               <div className="form-container">
                    <form  className="form" onSubmit={handleSubmit(submitInfo)}>
                        <h2>Registration info</h2>
                        <input placeholder="name" className="info-userr" name="name"   ref={register(/*{required:true}*/)}></input>
                        {errors.name && <p>error</p>}
                        <input placeholder="Birthday" className="info-userr"  name="birthday"  type="date" ref={register(/*{required:true}*/ )}></input>
                        {errors.birthday && <p>error</p>}
                        <input placeholder="City" className="info-userr" name="city" ref={register()}></input>
                        {errors.city && <p>error</p>}
                        <select name="gender" className="info-userr"  defaultValue={"gender"} ref={register(/*{validate: value => value !== "gender"}*/)}>
                            <option value="gender" className="gender" disabled>Gender</option>
                            <option value="female" >Female</option>
                            <option value="male" >Male</option>
                        </select>
                        {errors.gender && <p>error</p>}
                        
                        <button className="submit-info" >Submit</button>
                        
                    </form>
               </div>
           </div>
       </div>
       
    )
}

export default SetUpProfile

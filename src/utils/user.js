export const getUsernameFromEmail = email=> email.substring(0,email.indexOf("@"));
/*
const generateRandomUsers = async (quantity)=>{

            
            
    for(let i=0;i<quantity;i++){
        const user =await fetch("https://randomuser.me/api/?inc=name,email,location,gender,dob,picture&nat=es")
        .then(res=>res.json())
        const infoUser = user.results[0]
         db.collection("users").doc(getUsernameFromEmail(infoUser.email)).set({
            name:`${infoUser.name.first} ${infoUser.name.last}`,
            city:infoUser.location.city,
            gender:infoUser.gender ,
            birthday :moment(infoUser.dob.date).format("DD/MM/YYYY"),
            imgProfile : infoUser.picture.large

        })
       
        
        
    }
}
*/
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Alert} from "react-native"
import { UserContext } from "../store/context/user-context";
import {useContext} from "react"

const API_KEY = "AIzaSyC9w9WRB8rFLuxU6wj70cdlvNWQC_VOP-c";
const profilePicArray = ["../assets/profile1.jpg" , "../assets/profile2.jpg" ,"../assets/profile3.jpg" ,"../assets/profile4.jpg" ,"../assets/profile5.jpg" ,"../assets/profile6.jpg" ]

async function createUser(email , password, name ) {
    const profileId = (Math.floor(Math.random()*10))%profilePicArray.length;       
    const UserData = {
        name : name,
        email : email,
        language : "",
        marks : 0,
        avatarId : profileId,
        progress : {
            // cumulative : 0,
            // learning : [0,0,0,0,0],
            // writing : [0,0,0,0,0],
            // reading : [0,0,0,0,0],
            // speaking : [0,0,0,0,0]
            
        }
    }
    
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+API_KEY,
    {
        email: email,
        password: password,
        returnSecureToken: true
    });

    (await axios.put("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+email.replaceAll(".","-")+".json",UserData)
    .then(res => console.log(res.data))
    .catch(err => console.log("Error Signing-in at Auth :( ",err)))

    return response.data.idToken;
}

async function logUser(email , password) {
    
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+API_KEY,
    {
        email: email,
        password: password,
        returnSecureToken: true
    }).catch(err => console.log("Error Authenticating user in Auth Page : ",err))
    return response.data.idToken;
}

async function updateLanguage(email , isoId) {
    axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+email.replaceAll(".","-")+".json",{language : isoId})
    .catch(err => console.log("Error updating language in the database : ", err))

    const progressData = {} ;
    progressData[isoId] = {
        cumulative : 0,
        learning : [0,0,0,0,0],
        writing : [0,0,0,0,0],
        reading : [0,0,0,0,0],
        speaking : [0,0,0,0,0]
    } 
    await axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+email.replaceAll(".","-")+"/progress.json", progressData)
    .catch(err => console.log("Error adding new progress for the language :( ",err))
}



export {createUser , logUser , updateLanguage} ;
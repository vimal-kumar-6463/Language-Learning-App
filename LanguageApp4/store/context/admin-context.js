import {createContext, useEffect} from "react";
import {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AdminContext = createContext({
    adminName : '',
    registerAdminName : (name) => {},
    email : "",
    registerEmail : (email) => {},
    profileId : "",
    registerProfileId : (Id) => {},
    token: '',
    isAuthenticated: false,
    language : '',
    languageId : '',
    registerLanguage : (language, isoId) => {},
    phoneNo : "",
    registerPhoneNo : (phoneNo) => {},
    education : "",
    registerEducation : (education) => {},
    linkedInId : "",
    registerLinkedInId : (Id) => {},
    description : "",
    registerDescription : (description) => {},
    roomId : "",
    registerRoomId : (Id) => {},
    authenticateUser: (token) => {},
    logoutUser: () => {}
})


export default function AdminContextProvider(props){
    
    const [adminName ,setAdminName] = useState();
    const [adminEmail , setadminEmail] = useState();
    const [profileId , setProfileId] = useState();
    const [authToken,setAuthToken] = useState();
    const [language , setLanguage] = useState();
    const [languageId , setLanguageId] = useState();
    const [phoneNo , setPhoneNo] = useState();
    const [education , setEducation] = useState();
    const [LinkedInId , setLinkedInId] = useState();
    const [description , setDescription] = useState();
    const [roomId , setRoomId] = useState();

    // AsyncStorage.getItem("name").then(res => setUserName(res)).catch(setUserName(""));
    // AsyncStorage.getItem("email").then(res => setUserEmail(res)).catch(setUserEmail(""));
    
    function registerUserName(name) {
        setUserName(name);
        AsyncStorage.setItem('name',name);
        console.log("UserName has been set into context successfully");
    }

    function registerEmail(email) {
        setUserEmail(email);
        AsyncStorage.setItem('email',email);
    }

    function registerProfileId(Id) {
        setProfileId(Id);
        AsyncStorage.setItem('profileId',Id);
    }

    function registerPhoneNo(phoneNo) {
        setPhoneNo(phoneNo);
        AsyncStorage.setItem('phoneNo',phoneNo);
    }

    function registerEducation(education) {
        setEducation(education);
        AsyncStorage.setItem('education',education);
    }

    function registerLinkedInId(Id) {
        setLinkedInId(Id);
        AsyncStorage.setItem("linkedInId",Id);
    }

    function registerDescription(description) {
        setDescription(description);
        AsyncStorage.setItem("description",description);
    }

    function registerRoomId(Id) {
        setRoomId(Id);
        AsyncStorage.setItem("roomId",Id);
    }

    function authenticateUser(token) {
        setAuthToken(token);
        AsyncStorage.setItem("token",token);
        console.log("Token has been set into context successfully");
    }

    function registerLanguage(language , isoId) {
        setLanguage(language);
        setLanguageId(isoId);
        AsyncStorage.setItem("language",language);
        AsyncStorage.setItem("languageId",isoId);
        console.log("Language and its Id have been set into context successfully");
    }

    function registerQuestionData(finalSet) {
        console.log("keys : ",Object.keys(finalSet));
        setQuestionData(finalSet);
        console.log("stringified finalSet : ",JSON.stringify(finalSet) );
        AsyncStorage.setItem("questionData",JSON.stringify(finalSet));
        console.log("questionData has been set into context successfully");
    }

    function logoutUser() {
        setAuthToken(null);
        AsyncStorage.removeItem("token");
        console.log("Token has been removed from context successfully");
    }

    const value = {
        userName : userName,
        registerUserName : registerUserName,
        email : userEmail,
        registerEmail : registerEmail,
        token: authToken,
        isAuthenticated: !!authToken,
        language : language,
        languageId : languageId,
        phoneNo : phoneNo,
        registerPhoneNo : registerPhoneNo,
        education : education,
        registerEducation : registerEducation,
        LinkedInId : LinkedInId,
        description : description,
        registerDescription : registerDescription,
        roomId : roomId,
        registerRoomId : registerRoomId,
        registerProfileId : registerProfileId,
        registerLanguage : registerLanguage,
        authenticateUser: authenticateUser,
        logoutUser: logoutUser,
    }

    return(<AdminContext.Provider value={value} >{props.children}</AdminContext.Provider>)
}
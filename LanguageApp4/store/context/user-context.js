import {createContext, useEffect} from "react";
import {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext({
    userName : '',
    registerUserName : (name) => {},
    email : "",
    registerEmail : (email) => {},
    profileId : "",
    registerProfileId : (Id) => {},
    token: '',
    isAuthenticated: false,
    language : '',
    languageId : '',
    questionData : {},
    registerQuestionData : (finalSet) => {},
    registerLanguage : (language, isoId) => {},
    authenticateUser: (token) => {},
    logoutUser: () => {}
})

export default function UserContextProvider(props){
    
    const [userName ,setUserName] = useState();
    const [userEmail , setUserEmail] = useState();
    const [profileId , setProfileId] = useState();
    const [authToken,setAuthToken] = useState();
    const [language , setLanguage] = useState();
    const [languageId , setLanguageId] = useState();
    const [questionData , setQuestionData] = useState();

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
        qusetionData : questionData,
        registerProfileId : registerProfileId,
        registerQuestionData : registerQuestionData,
        registerLanguage : registerLanguage,
        authenticateUser: authenticateUser,
        logoutUser: logoutUser,
    }

    return(<UserContext.Provider value={value} >{props.children}</UserContext.Provider>)
}


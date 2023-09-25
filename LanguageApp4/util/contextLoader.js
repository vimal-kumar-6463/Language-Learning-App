import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../store/context/user-context";
import { useContext } from "react";

const UserCtx = useContext(UserContext);

async function loadContext(){

    const email = await AsyncStorage.getItem("email").catch(err => console.log("Error Loading email into context", err))
    const name = await AsyncStorage.getItem("name").catch(err => console.log("Error Loading name into context",err))
    const token = await AsyncStorage.getItem("token").catch(err => console.log("Error Loading token into context",err))
    const language = await AsyncStorage.getItem("language").catch(err => console.log("Error Loading language into context",err))
    const languageId = await AsyncStorage.getItem("languageId").catch(err => console.log("Error Loading language into context",err))
    
    UserCtx.registerEmail(email);
    UserCtx.registerUserName(name);
    UserCtx.registerLanguage(language,languageId);

}

export default loadContext;
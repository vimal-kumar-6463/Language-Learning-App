import {StyleSheet , Text , View , Image , Pressable , Button , ScrollView } from "react-native";
import axios from "axios";
import {useState , useEffect , useContext} from "react";
import LoadingScreen from "./loadingScreen";
import { UserContext } from "../store/context/user-context";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profilePics = {
    '1':require("../assets/profile1.jpg"),
    '2':require("../assets/profile2.jpg"),
    '3':require("../assets/profile3.jpg"),
    '4':require("../assets/profile4.jpg"),
    '5':require("../assets/profile5.jpg"),
    '6':require("../assets/profile6.jpg"),
}

const languageDict = { "es" : "Spanish" , "ja" : "Japanese" , "en" : "English", "hi" : "Hindi" , "ta" : "Tamil" , "te" : "Telugu" , "ml" : "Malayalam" , "ka" : "Kannada" , "mr" : "Marathi" , "guj" : "Gujarati" , "de" : "German" , "ru" : "Russian" , "fra" : "French"}

export default function ProfilePage(props) {
    
    const [details , setDetails] = useState();
    const UserCtx = useContext(UserContext);
    const [token , setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("token")
        .then(res => setToken(res))
        .catch(err => console.log("Error fetching token : ",err))
    },[])

    useEffect(() => {
            axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/vimalkumar6463%40gmail-com.json")
            .then(res => setDetails(res.data))
            .catch(err => console.log("Error fetching User data : ", err))
            
    },[])

    function verifyEmailHandler(){
        if(token){
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC9w9WRB8rFLuxU6wj70cdlvNWQC_VOP-c",{
                "idToken" : token,
                "requestType" : "VERIFY_EMAIL" 
            })
            .then(res => console.log("Email sent for verification : " , res.data))
            .catch(err => console.log("Error verifying token : ", err))
        }
    }
    
    function signOutHandler() {
        UserCtx.logoutUser();
        // props.navigation.navigate("InitialLandingPage")
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'InitialLandingPage' }]
       })
    }

    function deleteAccountHandler() {
        if(token){
            signOutHandler();
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyC9w9WRB8rFLuxU6wj70cdlvNWQC_VOP-c",{
                "idToken" : token
            })
            .then(res => console.log("Accout deleted successfully : ", res.data))
            .catch(err => console.log("Error deleting account : ", err))
        }
    }


    return (
        (!details)?<LoadingScreen loadingText={"Loading Profile"}/>:
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Image style={styles.profileIMG} source={require("../assets/profile4.jpg")}/>
                <Text style={styles.name}>{UserCtx.userName}</Text>
                <Text style={styles.email}>{UserCtx.email}</Text>
            </View>
            <ScrollView style={styles.scrollview}>
                <View style={styles.detaisBox}>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Account"}</Text>
                        <Pressable onPress={() => UserCtx.logoutUser() }>
                            <Text style={{...styles.logoutBtn,backgroundColor : "#FFBB5C"}}>{"Go Premium"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Verify Email"}</Text>
                        <Pressable onPress={() => verifyEmailHandler() }>
                            <Text style={{...styles.logoutBtn,backgroundColor : "#45FFCA"}}>{"Tap to verify"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileItem}>
                    <Text style={styles.description}>{"Lang"}{"("+UserCtx.language+")"}</Text>
                        <Pressable onPress={() => {props.navigation.navigate("LanguagePage")} }>
                            <Text style={styles.logoutBtn}>{"Change"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Marks"}</Text><Text style={styles.element}>{details.marks}</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Progress"}</Text><Text style={styles.element}>{details.progress.cumulative}</Text>
                    </View>
                    <View style={styles.profileItem}>
                    <Text style={styles.description}>{"Certification"}</Text>
                        <Pressable onPress={() => {} }>
                            <Text style={styles.logoutBtn}>{"Get certficate"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Sign-out"}</Text>
                        <Pressable onPress={() => signOutHandler() }>
                            <Text style={styles.logoutBtn}>{"Sign out"}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.description}>{"Delete Account"}</Text>
                        <Pressable onPress={() => {deleteAccountHandler()} }>
                            <Text style={{...styles.logoutBtn,backgroundColor : "#FF6969"}}>{"Delete"}</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#352F44",
        display : "flex",
        justifyContent : 'flex-start',
        alignItems : "center"
    },
    topBox : {
        height : "30%",
        width : "100%",
        backgroundColor : "white",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center",
    },
    profileIMG : {
        height : 130,
        width : 130,
        borderRadius : 50,
    },
    name : {
        fontSize : 25,
        fontWeight : "bold",
        marginTop : 5,
    },
    email : {
        marginBottom : 20,
        color : "grey",
    },
    detaisBox : {
        height : "100%",
        width : "100%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        marginTop : 10,
    },
    profileItem : {
        height : 60 ,
        width : "90%",
        backgroundColor : "white",
        margin : 7.5,
        borderRadius : 10,
        display : "flex",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : "center",
        elevation : 10,
    },
    description : {
        width : "55%",
        marginLeft : 20,
        fontSize : 18,
    },
    element : {
        width : "45%",
        marginRight : 10,
        fontSize : 15,
        textAlign : "center",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    icon : {
        height : 37.5,
        width : 37.5,
        marginRight : 50
    },
    pressable : {
        margin : 10
    },
    logoutBtn : {
        backgroundColor : "#5C5470",
        padding : 10,
        color : "white",
        borderRadius : 10,
        marginRight : 20,
    },
    scrollview : {
        width : "100%",
        height : "60%",
        marginBottom : 10,
        marginTop : 10
    }
})
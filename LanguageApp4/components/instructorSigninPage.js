import {StyleSheet , View , TextInput , Text , Pressable , Image , KeyboardAvoidingView , ScrollView} from "react-native";
import { StackActions } from "@react-navigation/native";
import {useState , useContext} from "react";
import { createUser } from "../util/Auth";
import {Alert} from "react-native";
import UserContextProvider from "../store/context/user-context";
import { UserContext } from "../store/context/user-context";
import LoadingScreen from "./loadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function InstSigninPage(props) {
    
    const [email,setEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [education,setEducation] = useState("");
    const [linkedinId,setLinkedinId] = useState("");
    const [password , setPassword] = useState("");
    const [description , setDescription] = useState("");
    const [roomId , setRoomId] = useState("");
    const UserCtx = useContext(UserContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    function changeEmailHandler(event) {
      console.log("Logged : ",event.nativeEvent.text);
      setEmail(event.nativeEvent.text);
    }

    function changeUserNameHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setUserName(event.nativeEvent.text);
    }

    function changePhoneNoHandler(event){
        console.log("Logged : ",event.nativeEvent.text);
        setPhoneNo(event.nativeEvent.text);
    }

    function changeEducationHandler(event){
        console.log("Logged : ",event.nativeEvent.text);
        setEducation(event.nativeEvent.text);
    }

    function changeLinkedinIdHandler(event){
        console.log("Logged : ",event.nativeEvent.text);
        setLinkedinId(event.nativeEvent.text);
    }

    function changeDescHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setDescription(event.nativeEvent.text);
    }

    function changeRoomIdHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setRoomId(event.nativeEvent.text);
    }

    function changePasswordHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setPassword(event.nativeEvent.text);
    }
    
    function handleSubmit(email ,userName , password , phoneNo , education , linkedinId , description , roomId) {
      
      const isValidEmail = email.includes("@");
      const isValidUserName = userName !== "";
      const isValidPassword = password.length > 6;
      
      if(isValidEmail && isValidUserName && isValidPassword) {
          console.log("All credentials are valid");
          // const adminData = {
          //   name : userName,
          //   email : email,
          //   phoneNo : phoneNo,
          //   education : education,
          //   linkedInId : linkedinId,
          //   description : description,
          //   roomId : roomId,
          //   requestList : {} 
          // }
          
          (async() => {
            await axios.put("https://lingoapp-49792-default-rtdb.firebaseio.com/adminUser/"+adminEmail.replaceAll(".","-")+"/.json",{
              name : userName,
              email : email,
              phoneNo : phoneNo,
              education : education,
              linkedInId : linkedinId,
              description : description,
              roomId : roomId,
              requestList : []
            })
            .then(res => console.log(res.data))
            .catch(err => console.log("Error uploading admin data to firebase : ",err))
            console.log("AdminData uploaded into fireBase");
          })()
          
          AsyncStorage.setItem('adminName',userName);
          AsyncStorage.setItem('adminEmail',email);
          AsyncStorage.setItem('phoneNo',phoneNo);
          AsyncStorage.setItem('education',education);
          AsyncStorage.setItem("linkedInId",linkedinId);
          AsyncStorage.setItem("description",description);
          AsyncStorage.setItem("roomId",roomId);
          props.navigation.navigate("StudentRequestPage");
      }else{
          Alert.alert("Invalid Credentials","Enter valid credentials");
          return;
      }

    }
    
    return (
      <UserContextProvider>
      {!isAuthenticating ? <KeyboardAvoidingView style={styles.container}>
          <View style={styles.topPoster}>
              <Image style={styles.topImage} source={require("../assets/backPack.png")}/>
              <Text style={styles.topText}>{"Apply For Instructor"}</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.midBox}>
                <TextInput style={styles.TextInput} autoCapitalize="none" keyboardType={"email-address"} placeholder="Enter your mail ID" placeholderTextColor={"grey"} autoCorrect={false} onChange={changeEmailHandler} value={email}/>
                <TextInput style={styles.TextInput} autoCapitalize="none" placeholder="Pick an username" placeholderTextColor={"grey"} onChange={changeUserNameHandler} value={userName}/>
                <TextInput style={styles.TextInput} autoCapitalize="none"  placeholder="Phone No" placeholderTextColor={"grey"} onChange={changePhoneNoHandler} value={phoneNo}/>
                <TextInput style={styles.TextInput} autoCapitalize="none"  placeholder="Eduction Qualification" placeholderTextColor={"grey"} onChange={changeEducationHandler} value={education}/>
                <TextInput style={styles.TextInput} autoCapitalize="none"  placeholder="LinkedIn ID" placeholderTextColor={"grey"} onChange={changeLinkedinIdHandler} value={linkedinId}/>
                <TextInput style={styles.TextInputArea} autoCapitalize="none"  placeholder="A Brief description of yourself" placeholderTextColor={"grey"} numberOfLines = {4} multiline={true} textAlignVertical="top" onChange={changeDescHandler} value={description}/>
                <TextInput style={styles.TextInput} autoCapitalize="none"  placeholder="Meeting Room ID" placeholderTextColor={"grey"} onChange={changeRoomIdHandler} value={roomId}/>
                <TextInput style={styles.TextInput} autoCapitalize="none" secureTextEntry={true} placeholder="Password please ...." placeholderTextColor={"grey"} onChange={changePasswordHandler} value={password}/>
                <Pressable android_ripple={{color:"#2c3a4d"}} style={styles.button} onPress={() => handleSubmit(email ,userName , password , phoneNo , education , linkedinId , description , roomId)}>
                    <Text style={styles.btnText}>{"Apply"}</Text>
                </Pressable>
            </View>
          </ScrollView>

          <View style={styles.bottomBox}>
              <Text style={styles.bottomText}>{"Already have an account ?"}</Text>
              <Pressable style={styles.hyperLink} onPress={() => props.navigation.dispatch(StackActions.replace("InstLoginPage"))}>
                  <Text style={styles.hyperText}>{"Login"}</Text>
              </Pressable>
          </View>
      </KeyboardAvoidingView> :
      <LoadingScreen loadingText={"Signing you up..."}/>
      }
    </UserContextProvider>
    )
}


export default InstSigninPage ;


const styles = StyleSheet.create({
  container : {
    display : "flex",
    justifyContent : "space-between",
    alignItems : "center",
    flex : 1,
    width : "100%",
  } , 
  topPoster : {
    width : "100%",
    height : "30%",
    minHeight : 150,
    backgroundColor : "#1B2430",
    display : "flex",
    justifyContent : 'flex-end',
    alignItems : "flex-start",
    overflow : "hidden",
  },
  topText : {
    fontSize : 34,
    color : "white",
    fontWeight : "bold",
    width : "65%",
    margin : 25,
  },
  topImage : {
    width : 250,
    height : 250,
    position : "absolute",
    bottom : -30,
    right : 0,
  },
  midBox : {
    hight : "100%",
    width : "100%",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    // backgroundColor : "green"
  },
  TextInput : {
    width : 330,
    height : 60,
    fontSize : 20,
    backgroundColor : "white",
    borderRadius : 5,
    borderWidth : 2,
    padding : 15,
    margin : 10,
  },
  TextInputArea : {
    width : 330,
    height : 180,
    fontSize : 20,
    backgroundColor : "white",
    borderRadius : 5,
    borderWidth : 2,
    padding : 15,
    margin : 10,
  },
  button : {
    width : 330,
    height : 60, 
    backgroundColor : "#1B2430",
    borderRadius : 5,
    margin : 20,
    display : "flex",
    justifyContent :"center",
    alignItems : 'center',
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    zIndex : 999,
  },
  btnText : {
    color : "white",
    fontSize : 18,
    letterSpacing : 2,
  },
  bottomBox : {
    width : "85%",
    flex : 1,
    borderTopWidth : 2,
    borderColor : "grey",
    display : 'flex',
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "flex-start" 
 },
  bottomText : {
    fontSize : 16,
    marginTop : 25,
    color : "grey"
  },
  hyperLink : {
    display : "flex",
    justifyContent : "center",
    alignItems : "center"
  },
  hyperText : {
    fontSize : 16,
    color : "#6200EE",
    margin : 5,
    marginTop : 25,
  },
  scrollView : {
    height : "50%",
    width : "100%",
  }
})
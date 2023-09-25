import {StyleSheet , View , TextInput , Text , Pressable , Image , KeyboardAvoidingView} from "react-native";
import { StackActions } from "@react-navigation/native";
import {useState , useContext} from "react";
import { createUser } from "../util/Auth";
import {Alert} from "react-native";
import UserContextProvider from "../store/context/user-context";
import { UserContext } from "../store/context/user-context";
import LoadingScreen from "./loadingScreen";

function SigninPage(props) {
    
    const [email,setEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
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

    function changePasswordHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setPassword(event.nativeEvent.text);
    }
    
    function handleSubmit( email ,userName , password) {
      
      const isValidEmail = email.includes("@");
      const isValidUserName = userName !== "";
      const isValidPassword = password.length > 6;
      
      if(isValidEmail && isValidUserName && isValidPassword) {
        console.log("All credentials are valid");
      }else{
        Alert.alert("Invalid Credentials","Enter valid credentials");
        return;
      }

    async function authUser(email , password , name ) {
      try{
        setIsAuthenticating(true);
        const userToken = await createUser(email , password , name);
        props.navigation.navigate("LanguagePage");
        UserCtx.authenticateUser(userToken);
        UserCtx.registerUserName(name);
        UserCtx.registerEmail(email);
        setIsAuthenticating(false);
      } catch(err) {
        Alert.alert("Already a User","Already an account exists with the given email , try log-in ");
        setIsAuthenticating(false);
      }
    } 
    authUser(email , password , userName);
    }
    
    return (
      <UserContextProvider>
      {!isAuthenticating ? <KeyboardAvoidingView style={styles.container}>
          <View style={styles.topPoster}>
              <Image style={styles.topImage} source={require("../assets/backPack.png")}/>
              <Text style={styles.topText}>{"Hi user ... Welcome back"}</Text>
          </View>
          <View style={styles.midBox}>
              <TextInput style={styles.TextInput} autoCapitalize="none" keyboardType={"email-address"} placeholder="Enter your mail ID" placeholderTextColor={"grey"} autoCorrect={false} onChange={changeEmailHandler} value={email}/>
              <TextInput style={styles.TextInput} autoCapitalize="none" placeholder="Pick an username" placeholderTextColor={"grey"} onChange={changeUserNameHandler} value={userName}/>
              <TextInput style={styles.TextInput} autoCapitalize="none" secureTextEntry={true} placeholder="Password please ...." placeholderTextColor={"grey"} onChange={changePasswordHandler} value={password}/>
              <Pressable android_ripple={{color:"#2c3a4d"}} style={styles.button} onPress={() => handleSubmit(email ,userName , password)}>
                  <Text style={styles.btnText}>{"Sign in"}</Text>
              </Pressable>
          </View>
          <View style={styles.bottomBox}>
              <Text style={styles.bottomText}>{"Already have an account ?"}</Text>
              <Pressable style={styles.hyperLink} onPress={() => props.navigation.dispatch(StackActions.replace("LoginPage"))}>
                  <Text style={styles.hyperText}>{"Login"}</Text>
              </Pressable>
          </View>
      </KeyboardAvoidingView> :
      <LoadingScreen loadingText={"Signing you up..."}/>
      }
    </UserContextProvider>
    )
}


export default SigninPage ;


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
    hight : 300,
    width : "100%",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    margin : 30,
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
  }
})
import {StyleSheet , View , TextInput , Text , Pressable , Image , KeyboardAvoidingView} from "react-native";
import TextInputField from "./textInputField";
import { StackActions } from "@react-navigation/native";
import {useState , useEffect} from "react";
import { createUser , logUser} from "../util/Auth";
import {Alert} from "react-native";
import UserContextProvider from "../store/context/user-context";
import LoadingScreen from "./loadingScreen";
import { UserContext } from "../store/context/user-context";
import {useContext} from "react";
import axios from "axios";
import translate from "google-translate-api-x";
import mergeQuestions from "./mergeQuestionSet";

function LoginPage(props) {
    
    const languageDict = { "es" : "Spanish" , "ja" : "Japanese" , "en" : "English", "hi" : "Hindi" , "ta" : "Tamil" , "te" : "Telugu" , "ml" : "Malayalam" , "ka" : "Kannada" , "mr" : "Marathi" , "guj" : "Gujarati" , "de" : "German" , "ru" : "Russian" , "fra" : "French"}
    const [userName , setUserName] = useState('Vimal Kumar') ;
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const UserCtx = useContext(UserContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
//     const [translatedNumbers , setTranslatedNumbers]  = useState([]);
//     const [translatedFood_Data , setTranslatedFood_Data] = useState([]);
//     const [translatedColors_Data , setTranslatedColors_Data] = useState([]);
//     const [translatedBasic_Words , setTranslatedBasic_Words] = useState([]);
//     const [translatedAnimals_Data , setTranslatedAnimals_Data] = useState([]);
//     const [delimiter , setDelimiter] = useState('');

//     const questions = { 
//       Numbers: ["One ", "Two" , "Zero ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten " ],
//       Food_Data: ["Milk ", "Egg ", "Rice ", "Fish ", "Pizza ", "Biryani ", "Coffee ", "Water ", "Chicken ", "Wine "], 
//       Colors_Data: ["Red ", "Yellow ", "Blue ", "Pink ", "White ", "Orange ", "Green ", "Purple ", "Lavender ", "Black "], 
//       Basic_Words : ["work " , "book " , 'clock ' , "school " , "ball " , "house " , "vehicle " , "bulb " , "basket " , "board "], 
//       Animals_Data: ["lion ", "tiger ", "zebra ", "monkey ", "panda ", "dog ", "cat ", "snake ", "duck ", "penguin "]
//   }

//   async function getTranslatedQuestionSet(to) {

//     translate(',',{from : 'en' , to : to , forceBatch : true})
//     .then(res => {
//         setDelimiter(res.text);
//         console.log("Delimiter : ",res.text)
//     })
//     .catch(err => console.log(err))  

//     const setArray = [["Numbers",setTranslatedNumbers], ["Food_Data",setTranslatedFood_Data], ["Colors_Data",setTranslatedColors_Data], ["Basic_Words",setTranslatedBasic_Words], ["Animals_Data",setTranslatedAnimals_Data] ]
    
//     setArray.forEach(async([key , setFunction]) => {
//         Promise.resolve(translate(questions[key].toString(),{from : 'en' , to : to , forceBatch : true})
//         .then(res => {
//             setFunction(res.text.split(' '));
//             console.log(key + " : ",res.text.split(' '));
//         })
//         .catch(err => console.log(err)))
//     })
    
  
//     await sleep(2000);
  

//     const translatedQuestionSet = {
//         Numbers: translatedNumbers,
//         Food_Data: translatedFood_Data, 
//         Colors_Data: translatedColors_Data, 
//         Basic_Words: translatedBasic_Words, 
//         Animals_Data: translatedAnimals_Data
//     }
    
//     const finalSet = await mergeQuestions(questions , translatedQuestionSet);
//     console.log("Translated Object : ", finalSet);
//     return finalSet
// }


    function changeEmailHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setEmail(event.nativeEvent.text);
    }

    function changePasswordHandler(event){
      console.log("Logged : ",event.nativeEvent.text);
      setPassword(event.nativeEvent.text);
    }

    function handleSubmit(email , password) {
      
      const isValidEmail = email.includes("@");
      const isValidPassword = password !== "";

      if(isValidEmail && isValidPassword) {
        console.log("All the information are valid");
      } else {
        Alert.alert("Invalid Credentials","Enter valid credentials");
        return;
      }
      
      async function authUser(email , password){
        try {
          setIsAuthenticating(true);
          const userToken = await logUser(email , password);
          const res = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+email.replaceAll(".","-")+"/.json")
          UserCtx.registerLanguage(languageDict[res.data.language] , res.data.language)  // convert the ISO code to actual language 
          UserCtx.authenticateUser(userToken)
          UserCtx.registerUserName(res.data.name)
          UserCtx.registerEmail(email)
          // getTranslatedQuestionSet(res.data.language)
          // .then(res => {
          //     UserCtx.registerQuestionData(res);
          //     return res
          // })
          // .then(res => {
          //     console.log("QuestionData : ", res)
          // })
          // .then(res => console.log(console.log("User selected "+language+" as his language")))
          // .catch(err => console.log(err))
          props.navigation.navigate("LanguageLoadPage")
          setIsAuthenticating(false)
        } catch(err) {
          Alert.alert("Authentication failed!","Could not log you in or Try again later ");
          setIsAuthenticating(false);
        }         
      }
      authUser(email,password);
    }

    return (
    <UserContextProvider>
    {!isAuthenticating ? <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topPoster}>
            <Image style={styles.topImage} source={require("../assets/backPack.png")}/>
            <Text style={styles.topText}>{"Hi user ... Welcome back"}</Text>
        </View>
        <View style={styles.midBox}>
            <TextInput style={styles.TextInput} autoCapitalize="none" placeholder="Email" onChange={changeEmailHandler} placeholderTextColor={"grey"} value={email}/>
            <TextInput style={styles.TextInput} autoCapitalize="none" placeholder="Password" onChange={changePasswordHandler} placeholderTextColor={"grey"} value={password} secureTextEntry={true}/>
            <Pressable style={styles.button} onPress={() => handleSubmit(email,password)} android_ripple={{color:"#2c3a4d"}}>
                <Text style={styles.btnText}>{"Log in"}</Text>
            </Pressable>
        </View>
        <View style={styles.bottomBox}>
            <Text style={styles.bottomText}>{"Don't have an account ?"}</Text>
            <Pressable style={styles.hyperLink} onPress={() => props.navigation.dispatch(StackActions.replace("SigninPage"))}>
                <Text style={styles.hyperText}>{"Register"}</Text>
            </Pressable>
        </View>
    </KeyboardAvoidingView> : 
    <LoadingScreen loadingText={"Logging you in..."}/>
    }
    </UserContextProvider>
    )
}

export default LoginPage ;

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
    height : 300,
    width : "100%",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    margin : 40
  },
  TextInput : {
    width : 330,
    height : 60,
    fontSize : 20,
    backgroundColor : "white",
    borderRadius : 5,
    borderWidth : 2,
    padding : 15,
    margin : 20,
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
    elevation: 13,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
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
import {StyleSheet , View , Text , ScrollView , FlatView , Image , Pressable} from "react-native";
import { UserContext } from "../store/context/user-context";
import { useContext , useState, useEffect , useRef} from "react";
import { updateLanguage } from "../util/Auth";
import {translate} from "google-translate-api-x";
import mergeQuestions from "./mergeQuestionSet";
import sleep from "./sleep";
import LoadingScreen from "./loadingScreen";
import axios from "axios";

const languages = [{language : "Spanish",isoId : "es"} , {language : "Hindi",isoId : "hi"} ,{language : "Tamil",isoId : "ta"} , {language : "Telugu",isoId : "te"} , {language : "Malayalam",isoId : "ml"} , {language : "Kannada",isoId : "ka"} , {language : "Marathi",isoId : "mr"} , {language : "Gujarati",isoId : "gu"} ,  {language : "Italian",isoId : "it"} , {language : "German",isoId : "de"} , {language : "Russian",isoId : "ru"} ,{language : "French",isoId : "fr"}]


function LanguageSelectionPage(props) {
    
    const [questions,setQuestions] = useState(); 
    const UserCtx = useContext(UserContext);
    const [isLoading , setIsLoading] = useState(false);
    const [isRetriving , setIsRetriving] = useState(false);
    const [translatedNumbers , setTranslatedNumbers]  = useState([]);
    const [translatedFood_Data , setTranslatedFood_Data] = useState([]);
    const [translatedColors_Data , setTranslatedColors_Data] = useState([]);
    const [translatedBasic_Words , setTranslatedBasic_Words] = useState([]);
    const [translatedAnimals_Data , setTranslatedAnimals_Data] = useState([]);
    const [translatedGree4tings , setTranslatedGreetings] = useState([]);
    const [delimiter , setDelimiter] = useState('');

    const childRef = useRef();

    useEffect(() => {
        (async() => {
            setIsRetriving(true);
            const preTookData = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/questionData.json")
            console.log("Data took from database as questions : ",preTookData.data);
            console.log(Object.keys(preTookData.data));
            setQuestions(preTookData.data);
            setIsRetriving(false);
        })()
    },[])
    
    async function getTranslatedQuestionSet(to) {

        translate(',',{from : 'en' , to : to , forceBatch : true})
        .then(res => {
            setDelimiter(res.text);
            console.log("Delimiter : ",res.text)
        })
        .catch(err => console.log(err))  

        const setArray = [["Numbers",setTranslatedNumbers], 
        ["Food_Data",setTranslatedFood_Data], ["Colors_Data",setTranslatedColors_Data], ["Basic_Words",setTranslatedBasic_Words], ["Animals_Data",setTranslatedAnimals_Data] ]
        
        setArray.forEach(async([key , setFunction]) => {
            Promise.resolve(translate(questions[key].toString(),{from : 'en' , to : to , forceBatch : true})
            .then(res => {
                setFunction(res.text.split(' '));
                console.log(key + " : ",res.text.split(' '));
            })
            .catch(err => console.log("Error translating questions" , err)))
        })
        
        setIsLoading(true);
        await sleep(2000);
        setIsLoading(false);

        const translatedQuestionSet = {
            Numbers: translatedNumbers,
            Food_Data: translatedFood_Data, 
            Colors_Data: translatedColors_Data, 
            Basic_Words: translatedBasic_Words, 
            Animals_Data: translatedAnimals_Data
        }
        
        const finalSet = mergeQuestions(questions , translatedQuestionSet);
        console.log("Translated Object : ", finalSet);
        return finalSet
    }
    
    async function languagePressHandler(language, isoId){
            UserCtx.registerLanguage(language , isoId);
            getTranslatedQuestionSet(isoId)
            .then(res => {
                UserCtx.registerQuestionData(res);
                return res
            })
            .then(res => {
                console.log("QuestionData : ", res)
            })
            .then(res => console.log(console.log("User selected "+language+" as his language")))
            .catch(err => console.log(err))
            

    }

    function loadLanguageHandler(language ,isoId) {
        UserCtx.registerLanguage(language , isoId);
        getTranslatedQuestionSet(isoId)
        .then(res => {
            UserCtx.registerQuestionData(res);
            return res
        })
        .then(res => {
            console.log("QuestionData : ", res)
        })
        .then(res => console.log(console.log("User selected "+language+" as his language")))
        .catch(err => console.log(err))
        props.navigation.navigate("Dashboard");
        updateLanguage(UserCtx.email , isoId)
    }


    return (
        (!(isLoading && isRetriving)) ?
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Select Language"}</Text>
                <Image style={styles.topImage} source={require("../assets/backPack.png")}/>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.languageContainer} >
                    {languages.map((item , i)=><Pressable android_ripple={{color:"#2c3a4d"}} style={styles.languageList} key={i} onPress={() => {languagePressHandler(item.language , item.isoId)}}><Text style={styles.languageText}>{item.language}</Text></Pressable> )}
                </View>
            </ScrollView>
            <Pressable style={styles.loadBtn} onPress={() => loadLanguageHandler(UserCtx.language, UserCtx.languageId)}>
                <Text style={styles.loadBtnText}>{"Let's Start!"}</Text>
            </Pressable>
        </View> : <LoadingScreen loadingText={"Loading Language"}/>
    )
}

export default LanguageSelectionPage;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        width : "100%",
        borderRadius : 50,
        justifyContent : "center",
        alignItems : "center",
    },
    topBox : {
        width : "100%",
        height : "25%",
        backgroundColor : "#1B2430",
        overflow : "hidden",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "flex-start"
    },
    topText : {
        fontSize : 34,
        color : "white",
        fontWeight : "bold",
        width : "65%",
        margin : 30,
        zIndex : 999.
    },
    scrollView :{
        margin : 10,
    },
    topImage : {
        width : 200,
        height : 200,
        position : "absolute",
        bottom : -30,
        right : 0,
      },
    languageList : {
        width : 330,
        height : 70,
        backgroundColor : "#1B2430",
        textAlign : "center",
        margin : 5,
        display : 'flex',
        justifyContent : "center",
        alignItem : "center",
        borderRadius : 5,
    },
    languageText : {
        textAlign : "center",
        fontSize : 20,
        fontWeight : "bold",
        color : "white"
    },
    languageContainer : {
        flex : 1,
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "center"
    },
    loadBtn : {
        width : 200,
        height : 50,
        borderWidth : 3,
        margin : 5,
        marginBottom : 20,
        borderRadius : 10,
        justifyContent : "center",
        alignItems : "center"
    },
    loadBtnText : {
        color : "black",
        fontSize : 20,
        fontWeight : "bold",
    }
})
import {StyleSheet , Pressable , View , Image , Text , TextInput} from "react-native";
import * as Speech from "expo-speech";
import { useContext, useEffect, useState , useRef} from 'react';
import Voice from '@react-native-voice/voice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {translate} from "google-translate-api-x";
import LanguageData from "./languages";
import { UserContext } from "../store/context/user-context";
import WritingPad from "./writingPad";
import axios from "axios";


export default function WritePracticePage(props) {
     
    
    let [started, setStarted] = useState(false);
    let [results, setResults] = useState([]);
    const moduleName = props.route.params.module;
    const moduleIndex = {Numbers : 0 , Food_Data : 1 , Colors_Data : 2 , Basic_Words : 3 , Animals_Data : 4}
    const [isCorrect , setIsCorrect] = useState();
    const [questions, setQuestions] = useState(["Hello" , "Welcome" , "Thank you" , "Farewell" , "Have a good day"])
    const [questionNumber, setQuestionNumber] = useState(0);
    const UserCtx = useContext(UserContext);

    const childRef = useRef();
    
    useEffect(() => {
        async function dummy() {
           await AsyncStorage.getItem('questionData')
           .then(res => setQuestions(JSON.parse(res)[props.route.params.module]))
        }
        dummy();
    },[])

    console.log(UserCtx.languageId)  ; 

    // const listAllVoiceOptions = async () => {
    //     let voices = await Speech.getAvailableVoicesAsync();
    //     console.log("Available Voices : " , voices);
    //   };
    
    // useEffect(listAllVoiceOptions);


    function nextBtnHandler() {
        if(questionNumber + 1 >= questions.length){
            (async() => {
                const existProgress = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/progress/"+UserCtx.languageId+".json")
                const progressUpdateData = {};
                progressUpdateData[moduleIndex[moduleName]] = existProgress.data.writing[moduleIndex[moduleName]] + 20/5 ;
                console.log("progressUpdateData : ", progressUpdateData);
                await axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/progress/"+UserCtx.languageId+"/writing/.json",progressUpdateData)
            })()
            props.navigation.pop();
        }
        setQuestionNumber((questionNumber + 1)%questions.length);
        setResults([]);
    }
     

    function clearScribble() {
        childRef.current.clear();
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Image source={require("../assets/shapes.png")} style={styles.image}/>
                <Text style={styles.progressText}>{"Words "+(questionNumber + 1)+" of "+questions.length}</Text>
                <Text style={styles.question}>{questions[questionNumber][1]}</Text>
                <Text style={styles.questionEnglish}>{questions[questionNumber][0].charAt(0).toUpperCase() + questions[questionNumber][0].slice(1)}</Text>
            </View>
            <View style={styles.questionBox}>
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>{questions[questionNumber][1].replaceAll(","," ")}</Text>
                </View>
                <View style={styles.translatedTextBox}>
                    {[results].map((result, index) => <Text style={(result.toString().toLowerCase()+"," == questions[questionNumber][1].toString())?{...styles.translatedText,color : "#1FFF86"}:{...styles.translatedText,color : "#FF616B"}} key={index}>{result}</Text>)} 
                </View>
                <View style={styles.audioBox}>
                    <View style={styles.writeWrap}>
                        <WritingPad ref={childRef}/>
                    </View>
                </View>
                <View style={styles.hideView}></View>
                <View style={styles.btnWrap}>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnPressable} android_ripple={{color:"black"}} onPress={nextBtnHandler}>
                            <Text style={styles.btnText}>{"Next"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
    },
    topBox : {
        width : "100%",
        height : "40%",
        backgroundColor : "#1B2430",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "flex-start"
    },
    progressText : {
        fontSize : 16,
        fontWeight : "bold",
        padding : 10,
        margin : 10,
        color : "white"
    },
    question : {
        fontSize : 35,
        fontWeight : "bold",
        padding : 10,
        margin : 10,
        marginBottom : 0,
        color : "white"
    },
    questionEnglish : {
        fontSize : 25,
        fontWeight : "bold",
        padding : 10,
        paddingTop : 0,
        color : "grey",
        marginLeft : 10, 
    },
    questionBox : {
        width : "100%",
        height : "75%",
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "center",
        gap : 10,
    },
    audioBox : {
        display : "flex",
        height : "65%",
        width : "100%",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    translatedTextBox : {
        height : "1%",
        width : "100%",
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    translatedText: {
        fontSize : 35,
        fontWeight : "bold",
        marginTop : 20,
        color : "grey",
    },
    hideView : {
        height : 60,
        width : 250,
        backgroundColor : "#B4B4B3",
        position : "absolute",
        bottom : 185,
        right : 0,
    },
    overlay : {
        height : 220,
        width : 360,
        backgroundColor : "white",
        position : "absolute",
        bottom : 300,
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    overlayText : {
        fontSize : 50,
        letterSpacing : 5,
        color : "black",
        textAlign : "center"

    },
    questionContainer : {
        width : "75%",
        height : "10%",
        borderWidth : 2,
        borderRadius : 5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        position : "relative"
    },
    questionPressable : {
        flex : 1,
        width : "100%",
        height : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : 'center',

    },
    questionText : {
        fontSize : 20,
        fontWeight : "bold",
        marginLeft : 15,
        marginRight : 15,
        textAlign : "left"
    },
    speakerBtn : {
        borderWidth : 3,
        borderColor : "white",
        borderRadius : 10,
        margin : 10,
        backgroundColor : "#AED2FF"
    },
    speakerPressable : {
        padding : 10,
    },
    speakerIcon : {
        height : 60,
        width : 60,
    },
    btnWrap : {
        width : "75%",
        height : "10%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        marginTop : 20
    },
    btnContainer : {
        width : "45%",
        height : "90%",
        borderRadius : 5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#1B2430",
        overflow : 'hidden',
    },
    btnPressable : {
        flex : 1,
        width : "100%",
        height : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : 'center',
    },
    btnText : {
        color : "#1FFF86",
        fontSize : 20,
        fontWeight : "bold",
        marginLeft : 15,
        marginRight : 15,
        textAlign : "center"
    },
    image : {
        height : 150,
        width : 150,
        position : "absolute",
        top : 90,
        right : 40,
        opacity : 0.3
    },
    writeWrap : {
        flex : 1,
        opacity : 0.5
    }
})
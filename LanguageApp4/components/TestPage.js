import {StyleSheet , Text , View , Image , Pressable} from "react-native";
import {useState , useRef , useEffect , useContext} from 'react';
import { UserContext } from "../store/context/user-context";
import OptionItem from "./optionItem";
import {shuffle , getRandomizedValue} from "../util/shuffle";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./loadingScreen";
import axios from "axios";

function TestPage(props) {
    
    const UserCtx = useContext(UserContext);
    const moduleName = props.route.params.module;
    const moduleIndex = {Numbers : 0 , Food_Data : 1 , Colors_Data : 2 , Basic_Words : 3 , Animals_Data : 4}
    const question = { 
        Numbers: ["One ", "Two" , "Zero ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten " ],
        Food_Data: ["Milk ", "Egg ", "Rice ", "Fish ", "Pizza ", "Biryani ", "Coffee ", "Water ", "Chicken ", "Wine "], 
        Colors_Data: ["Red ", "Yellow ", "Blue ", "Pink ", "White ", "Orange ", "Green ", "Purple ", "Lavender ", "Black "], 
        // Basic_Words: ["abandon ", "ability ", "artist ", "answer ", "about ", "bite ", "basket ", "describe ", "empty ", "description "],
        Basic_Words : ["work " , "book " , 'laptop ' , "bottle " , "ball " , "ground " , "bike " , "watch " , "basket " , "dustbin "], 
        Animals_Data: ["lion ", "tiger ", "zebra ", "monkey ", "panda ", "dog ", "cat ", "snake ", "duck ", "penguin "]
    }
    
    const [marks , setMarks] = useState(0);
    const [questionNumber , setQuestionNumber] = useState(0);
    const [questions , setQuestions] = useState(question);
    const [isLoading , setIsLoading] = useState(false);
    const [userLanguage , setUserLanguage] = useState('');

    const noOfQuestions = 10;

    const childRef1 = useRef();
    const childRef2 = useRef();
    const childRef3 = useRef();
    const childRef4 = useRef();
    
    useEffect(() => {
        setIsLoading(true);

        AsyncStorage.getItem('questionData')
        .then(res => setQuestions(JSON.parse(res)))
        .catch(err => console.log(err))

        AsyncStorage.getItem("language")
        .then(res => setUserLanguage(res))
        .catch(err => console.log(err)) 

        setIsLoading(false);
    },[])

    function resetFillColorHandler() {
        childRef1.current.resetFillColor();
        childRef2.current.resetFillColor();
        childRef3.current.resetFillColor();
        childRef4.current.resetFillColor();
    }

    function nextButtonHandler() {
        if (childRef1.current.isAnswered || childRef2.current.isAnswered || childRef3.current.isAnswered || childRef4.current.isAnswered){
            setQuestionNumber(questionNumber + 1);
            resetFillColorHandler();
            if(childRef1.current.isCorrect){
                // Mark logics
                if(questionNumber >= noOfQuestions - 1 ){
                    async function updateMarks(marks) {
                        const currentMark = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/marks.json");
                        await axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+".json",{marks : currentMark.data + marks});
                        const existProgress = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/progress/"+UserCtx.languageId+".json")
                        const progressUpdateData = {};
                        progressUpdateData[moduleIndex[moduleName]] = existProgress.data.reading[moduleIndex[moduleName]] + 20/5 ;
                        console.log("progressUpdateData : ", progressUpdateData);
                        await axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/progress/"+UserCtx.languageId+"/reading/.json",progressUpdateData)
                    }
                    updateMarks(marks + 2);
                    props.navigation.navigate("MarksPage",{mark : marks + 2});
                }
                setMarks((prev) => prev + 1);
                console.log("Current marks : " + marks);
            }
            // if (childRef1.current.isCorrect || childRef2.current.isCorrect || childRef3.current.isCorrect || childRef4.current.isCorrect){
            //     marks++;
            //     console.log("Current marks : " + marks);
            // }
        } else {
            Alert.alert("Answer cannot be blank","Select any one of the answers");
        }
    }

    const Q = shuffle(questions[moduleName])[(questionNumber+1)%10];
    const language = userLanguage;
    const ansList = shuffle(questions[moduleName]);
    const optionSet = shuffle([...ansList.slice(0,3),Q])
    const questionSet = {
        question : "What is ' "+Q[0]+"' in "+language +" ?",
        correctAnswer : Q,
        optionSet : optionSet
    } 

    return (
        (!isLoading)?<View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.progressText}>{"Question "+((questionNumber+1)%noOfQuestions === 0 ? noOfQuestions : (questionNumber+1)%noOfQuestions) +" of "+noOfQuestions}</Text>
                <Text style={styles.question}>{questionSet.question}</Text>
                <Image source={require("../assets/abstract-shape1.png")} style={styles.image}/>
            </View>
            <View style={styles.questionBox}>
                <OptionItem optionIndex={"A."} option={questionSet.optionSet[0]} isCorrect={questionSet.optionSet[0] === Q} ref={childRef1}/>
                <OptionItem optionIndex={"B."} option={questionSet.optionSet[1]} isCorrect={questionSet.optionSet[1] === Q} ref={childRef2}/>
                <OptionItem optionIndex={"C."} option={questionSet.optionSet[2]} isCorrect={questionSet.optionSet[2] === Q} ref={childRef3}/>
                <OptionItem optionIndex={"D."} option={questionSet.optionSet[3]} isCorrect={questionSet.optionSet[3] === Q} ref={childRef4}/>
                <View style={styles.btnWrap}>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnPressable} android_ripple={{color:"black"}} onPress={nextButtonHandler}>
                            <Text style={styles.btnText}>{"Next"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>:
        <LoadingScreen/>
    )
}

export default TestPage;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
    },
    topBox : {
        width : "100%",
        height : "30%",
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
        fontSize : 25,
        fontWeight : "bold",
        padding : 10,
        margin : 10,
        color : "white"
    },
    questionBox : {
        width : "100%",
        height : "75%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        gap : 10,
    },
    questionContainer : {
        width : "75%",
        height : "10%",
        borderWidth : 2,
        borderRadius : 5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
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
    btnWrap : {
        width : "75%",
        height : "10%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        marginTop : "20%",
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
        height : 120,
        width : 120,
        position : "absolute",
        top : 40,
        right : 30,
        opacity : 0.3
    }
})
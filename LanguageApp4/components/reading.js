import {StyleSheet , Text , View , Image , Pressable} from "react-native";
import {useEffect , useState , useContext} from "react";
import { UserContext } from "../store/context/user-context";
import axios from "axios";

function ReadingPage(props) {


    const UserCtx = useContext(UserContext);
    const syllabus = ["Vocabulary" , "Phase and Expressions" , "Grammar" , "Dialogues and Conversations" , "Culturals Insights"  ]
    const [progress , setProgress] = useState();

    function sum(arr) {
        var sum = 0;
        for(let i = 0 ; i < arr.length ; i++){
            sum = sum + arr[i];
        }
        return sum;
    }

    useEffect(() => {
        (async() => {
            axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+UserCtx.email.replaceAll(".","-")+"/progress/"+UserCtx.languageId+".json")
            .then(res => setProgress(sum(res.data.reading)))
            .catch(err => console.log("Error fetching progress data : " , err))
        })()
    },[])
   
    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Reading"}</Text>
                <Image style={styles.topImage} source={require("../assets/backPack.png")}/>
            </View>
            <View style={styles.taskList}>
                {syllabus.map((item , index) =>                 
                    <Pressable style={styles.taskItem} android_ripple={{color:"#2c3a4d"}} key={index} onPress={() => props.navigation.navigate("PdfPage")} >
                        <Image style={!(progress >= (index) * 20)?styles.lock:{...styles.lock,display : "none"}} source={require("../assets/lock.png")}/>
                        <Text style={styles.taskText}>{item}</Text>
                    </Pressable>)}
            </View>
        </View>

        
    )
}

export default ReadingPage ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        width : "100%",
        backgroundColor : '#B9B4C7'
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
    taskList : {
        flex : 1,
        width : "100%",
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
        gap : 20,
    },
    taskItem : {
        width : "80%",
        height : "10%",
        backgroundColor : "#1B2430",
        borderRadius : 10,
        borderWidth : 2,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    taskText : {
        color : "white",
        fontSize : 20,
        fontWeight : "bold",
    },
    lock : {
        height : 25 ,
        width : 25 ,
        position : 'absolute',
        top : -10,
        left : -10,
    }
})
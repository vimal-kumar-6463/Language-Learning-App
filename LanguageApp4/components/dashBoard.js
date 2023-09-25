import {StyleSheet , Text , View , Image , ImageBackground ,Pressable } from "react-native";
import GridItemTile from "./gridItemTile";
import NavItem from "./navItem";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons';
import { UserContext } from "../store/context/user-context";
import { useContext , useEffect , useState} from "react";
import axios from "axios";
import PdfPage from "./pdfPage";
import CircularProgress from "circular-progress-rn";
import ProgressBar from "./progressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./loadingScreen";



function DashBoard(props) {

    
    useEffect(() => {
        async function loadContext(){

            const email = await AsyncStorage.getItem("email").catch(err => console.log("Error Loading email into context", err))
            const name = await AsyncStorage.getItem("name").catch(err => console.log("Error Loading name into context",err))
            const token = await AsyncStorage.getItem("token").catch(err => console.log("Error Loading token into context",err))
            const language = await AsyncStorage.getItem("language").catch(err => console.log("Error Loading language into context",err))
            const languageId = await AsyncStorage.getItem("languageId").catch(err => console.log("Error Loading language into context",err))
            UserCtx.registerEmail(email);
            UserCtx.registerUserName(name);
            UserCtx.registerLanguage(language,languageId);
            UserCtx.registerProfileId((Math.floor(Math.random()*10))%profilePicArray.length);

            console.log("UserContext has been loaded successfully");
        }loadContext();
    },[])
    
    const UserCtx = useContext(UserContext);
    const [loading , setLoading] = useState(false);
    const [progress , setProgress] = useState();
    const [listening , setListening] = useState(0);
    const [reading , setReading] = useState(0);
    const [writing , setWriting] = useState(0);
    const [speaking , setSpeaking] = useState(0);
    const [cumulative , setCumulative] = useState(0);
    

    useEffect(() => {
        (async() => {
            const email = await AsyncStorage.getItem("email");
            const languageId = await AsyncStorage.getItem("languageId")
            await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User/"+email.replaceAll(".","-")+"/progress/"+languageId+".json")
            .then(res => {
                // setProgress(res.data);
                setListening(sum(res.data.learning));
                setReading(sum(res.data.reading));
                console.log("Reading sum : ", sum(res.data.reading));
                setSpeaking(sum(res.data.speaking));
                setWriting(sum(res.data.writing));
                setCumulative((sum(res.data.learning) + sum(res.data.reading) + sum(res.data.speaking) + sum(res.data.writing)) / 5);

                console.log("progress from inside useEffect: ", res.data);
            })
            .catch(err => console.log("Error fetching progress : ",err))
        })()

    },[])

    function sum(arr) {
        var sum = 0;
        for(let i = 0 ; i < arr.length ; i++){
            sum = sum + arr[i];
        }
        return sum;
    }

    function homePagePressHandler() {

    }

    function writingPagePressHandler() {

    }

    function settingsPagePressHandler() {

    }

    console.log("Progress : ",progress)
    
    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <View>
                    <Text style={styles.helloText}>{"Hello "+UserCtx.userName}</Text>
                    <Text style={styles.continueText}>{"Continue "}</Text>
                    <Text style={styles.continueText}>{UserCtx.language}</Text>
                </View>
                <ProgressBar
                radius={70}
                value={cumulative}
                activeStrokeColor={"#2ecc71"}
                inActiveStrokeColor={"#ffffff"}
                strokeWidth={10}
                fontColor={"white"}
                /> 
                {/* <CircularProgress 
                    style={styles.progress}
                    radius={60}
                    progress={progress.cumulative}
                    strokeWidth={10}
                    backgroundTrackColor="#222"
                    trackColor="#2ecc71"
                    /> */}
            </View>
            <View style={styles.midBox}>
                <GridItemTile title={"Reading"} progress={reading} icon={require("../assets/book.png")} onPress={() => props.navigation.navigate("ReadingPage")}/>
                <GridItemTile title={"Writing"} progress={writing} icon={require("../assets/pencil.png")} onPress={() => props.navigation.navigate("WritingPage")}/>
                <GridItemTile title={"Listening"} progress={listening} icon={require("../assets/headphone.png")} onPress={() => props.navigation.navigate("PodCastPage")}/>
                <GridItemTile title={"speaking"} progress={speaking} icon={require("../assets/mic.png")} onPress={() => props.navigation.navigate("SpeakingPage")}/>
            </View>
            <View style={styles.navBox}>
                <NavItem icon={require("../assets/home.png")} state={false} navigation={props.navigation} />
                <NavItem icon={require("../assets/translation.png")} state={false} navigation={props.navigation} navigateTo={"TranslatePage"}/>
                <NavItem icon={require("../assets/award.png")} state={false} navigation={props.navigation} navigateTo={"ScoreBoardPage"}/>
                <NavItem icon={require("../assets/chat.png")} state={false} navigation={props.navigation} navigateTo={"ChatRoom"}/>
                <NavItem icon={require("../assets/teacher.png")} state={false} navigation={props.navigation} navigateTo={"FindTutorPage"}/>
            </View>
        </View>
    )
}

export default DashBoard ;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#1B2430",
        display: "flex",
        justifyContent : "space-around",
        alignItems : 'center',
    },
    helloText : {
        fontSize : 20,
        color : "white",
        fontWeight : "bold",
        padding : 10,
        margin : 10,
        marginBottom : 0,
        marginTop : 20,
    },
    progressText : {
        color : "white",
    },
    continueText : {
        color : "white",
        fontSize : 40,
        fontWeight : "bold",
        paddingLeft : 10,
        marginLeft : 10
    },
    topBox : {
        width : "100%",
        height : "20%",
        margin : 10,
        marginTop : 20,
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
    },
    progress : {
        margin : 20,
    },
    midBox : {
        width : "100%",
        height : "60%",
        margin : 10,
        display :"flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        flexWrap : "wrap",
    },
    navBox : {
        width : "95%",
        height : "8%",
        backgroundColor : "white",
        margin : 10,
        borderRadius : 10,
        display : 'flex',
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
    }
})
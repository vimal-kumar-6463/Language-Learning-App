import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet , View , Text , Image , Pressable , ScrollView} from "react-native";
import {useState , useEffect } from "react";
import axios from "axios";

// const studentData = [
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
//     {
//         name : "Vimal Kumar",
//         email : "vimalkumar6463@gmail.com"
//     },
// ]

export default function StudentRequestPage(props) {
    
    const [adminEmail,setAdminEmail] = useState("");
    const [adminName,setAdminName] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [education,setEducation] = useState("");
    const [linkedinId,setLinkedinId] = useState("");
    const [password , setPassword] = useState("");
    const [description , setDescription] = useState("");
    const [roomId , setRoomId] = useState("");
    const [studentData , setStudentData] = useState([]);

    useEffect(() => {
        (async() => {
            await AsyncStorage.getItem("adminName")
            .then(res => setAdminName(res))
            .catch("Error Fetching adminName from AsyncStorage : ",err)
            await AsyncStorage.getItem("adminEmail")
            .then(res => setAdminEmail(res))
            .catch("Error Fetching adminEmail from AsyncStorage : ",err)
            await AsyncStorage.getItem("phoneNo")
            .then(res => setPhoneNo(res))
            .catch("Error Fetching PhoneNo from AsyncStorage : ",err)
            await AsyncStorage.getItem("education")
            .then(res => setEducation(res))
            .catch("Error Fetching education from AsyncStorage : ",err)
            await AsyncStorage.getItem("linkedInId")
            .then(res => setLinkedinId(res))
            .catch("Error Fetching linkedInId from AsyncStorage : ",err)
            await AsyncStorage.getItem("description")
            .then(res => setDescription(res))
            .catch("Error Fetching description from AsyncStorage : ",err)
            await AsyncStorage.getItem("roomId")
            .then(res => setRoomId(res))
            .catch("Error Fetching roomId from AsyncStorage : ",err)
        })()
    },[])

    useEffect(() => {
        (async() => {
            await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/adminUser/"+adminEmail.replace(".","-")+".json")
            .then(res => {
                console.log("requested students : ", res.data)
            })
        })()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Hello"}</Text>
                <Text style={styles.topText}>{adminName}</Text>
            </View>
            <View style={styles.sampleTextWrap}>
                <Text style={styles.sampleText}>{"Requested students "}</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.bottomBox}>
                    <View style={styles.studentList}>
                        {studentData.map((item ,index) => 
                        <View style={styles.stdListItem}>
                            <Image source={require("../assets/profile1.jpg")} style={styles.profileIMG}/>
                            <View style={styles.details}> 
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>
                            <View style={styles.resposnse}>
                                <Pressable android_ripple={{color : "#1FFF86"}} style={styles.resPressable}>
                                    <Text style={styles.responseText}>{"Accept"}</Text>
                                </Pressable>
                                <View style={styles.line}></View>
                                <Pressable android_ripple={{color : "#FF616B"}} style={styles.resPressable}>
                                    <Text style={styles.responseText}>{"Reject"}</Text>
                                </Pressable>
                            </View>
                        </View>)}
                        
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#1B2430",
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : "center"
    },
    topBox : {
        height : "25%",
        width : "100%",
        backgroundColor : "#1B2430",
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'flex-start'
    },
    scrollView : {
        flex : 1,
        width : "100%",
    },
    topText : {
        fontSize : 40,
        fontWeight : "bold",
        marginLeft : 20,
        color : "white"
    },
    bottomBox : {
        flex : 1,
        width : "95%",
        margin : 10,
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
    },
    sampleTextWrap : {
        display : 'flex',
        width : "100%",
        justifyContent : 'center',
        alignItems : 'flex-start',
        marginBottom : 15,  
        marginLeft : 15
    },
    sampleText : {
        color : "white",
        marginLeft : 10,
        fontSize : 15,
    },
    studentList : {
        flex : 1,
        height : "95%",
        width : "100%",
        margin : 5,
        marginTop : 0,
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    stdListItem : {
        height : 90,
        width : "95%",
        backgroundColor : "#1FFF86",
        margin : 5,
        display : "flex",
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : "center",
        borderRadius : 5,
    },
    profileIMG : {
        height : 75,
        width : 75,
        margin : 5,
        borderRadius : 10
    },
    details : {
        height : 85,
        flex : 5,
        backgroundColor : "#1FFF86",
        display : "flex",
        justifyContent : "center",
        alignItems : "flex-start"
    },
    resposnse : {
        height : 85,
        flex : 3,
        backgroundColor : "#1B2430",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        margin : 5,
        borderRadius : 5,
        
    },
    line : {
        height : 2,
        width :"90%",
        backgroundColor : "#1FFF86"
    },
    name : {
        fontSize : 18,
        fontWeight : "bold",
        color : 'black',
        marginLeft : 5
    },
    email : {
        fontSize : 10,
        color : '#413543',
        margin : 5
    },
    responseText : {
        fontSize : 15,
        margin : 7.5,
        marginBottom : 10,
        color : 'white',
        width : 70,
        textAlign : 'center',
        borderRadius : 10
    },
    resPressable : {
       
    }
})
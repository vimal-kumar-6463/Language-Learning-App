import {StyleSheet , View , Text , Image , Pressable , ScrollView} from "react-native";
import {useState , useEffect} from "react";
import axios from "axios";

const studentData = [
    {
        name : "Vimal Kumar",
        lang : "Tamil"
    },
    {
        name : "Alexander ",
        lang : "German"
    },
    {
        name : "Anil Kumar",
        lang : "kannada"
    },
    {
        name : "Muiler",
        lang : "Spanish"
    },
    {
        name : "Rupaj Patel",
        lang : "Gujarathi"
    },
    {
        name : "Ravi Shastri",
        lang : "Hindi"
    },
    {
        name : "Kalyan Naidu",
        lang : "Telugu"
    },
    {
        name : "Sean",
        lang : "French"
    },
]

export default function FindTutorPage(props) {

    const [tutors , setTutors] = useState([]);
    const [roomLink , setRoomLink] = useState("");

    useEffect(() => {
        (async() => {
            const res = await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/adminUser.json")
            console.log(res.data);
            const tutorsArray = [];
            for(const key in res.data){
                tutorsArray.push(res.data[key]);
            }
            setTutors(tutorsArray);
            setRoomLink(tutorsArray.roomLink);
            console.log("Tutors Array : ", tutorsArray)

        })()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Let's find"}</Text>
                <Text style={styles.topText}>{"You a tutor"}</Text>
            </View>
            <Image style={styles.topIMG} source={require("../assets/virtual-class.png")}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.bottomBox}>
                    <View style={styles.studentList}>
                        {tutors.map((item ,index) => 
                        <Pressable onPress={() => {props.navigation.navigate("TutorDetailsPage" , {name : item.name , email : item.email, roomLink : item.roomId , tutorData : item})}} key={index}>
                            <View style={styles.stdListItem}>
                                <Image source={require("../assets/profile4.jpg")} style={styles.profileIMG}/>
                                <View style={styles.details}> 
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.email}>{"Tamil"}</Text>
                                </View>
                                <View style={styles.resposnse}>
                                    <View style={styles.starContainer}>
                                        <Image source={require("../assets/starFilled.png")} style={styles.starIcon}/>
                                        <Text style={styles.ratingText}>{"4.5"}</Text>
                                    </View>
                                    <View style={styles.availableBox}>
                                        <Text style={styles.availableText}>{"Slot Availability"}</Text> 
                                        <Text style={styles.slotText}>{"09:30 AM:12:00 PM"}</Text>              
                                    </View>
                                </View>
                            </View>
                        </Pressable>)}
                        
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
        alignItems : 'flex-start',
        marginTop : 10
    },
    topIMG : {
        height : 120,
        width : 120,
        position : "absolute",
        top : 30,
        right : 20
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
        flex : 4,
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
        fontSize : 20,
        fontWeight : "bold",
        color : 'black',
        marginLeft : 5
    },
    email : {
        fontSize : 18,
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
       
    },
    starContainer : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "center"
    },
    starIcon : {
        height : 25,
        width : 25,
        margin : 2
    },
    ratingText : {
        fontSize : 15,
        fontWeight : "bold",
        margin : 5
    },
    availableText : {
        fontSize : 10,
        color : "black",
        marginBottom : 5,
        textAlign : "center"
    },
    slotText : {
        fontSize : 10,
        backgroundColor : "white",
        fontWeight : 'bold',
        padding : 2,
        borderRadius : 5,
        marginBottom : 5
    }
})

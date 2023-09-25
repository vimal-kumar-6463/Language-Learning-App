import {StyleSheet , View , Text , Pressable , Image} from "react-native";
import {useState , useEffect} from "react"; 
import axios from "axios";
import { openURL } from "expo-linking";

export default function TutorDetails(props) {
    
    const roomLink = props.route.params.roomLink;
    const email = props.route.params.email;
    const name = props.route.params.name;
    const description = props.route.params.tutorData.description
    const tutorData = props.route.params.tutorData;
    console.log("RoomLink : ", roomLink);
    console.log("name : ", name);
    console.log("name : ", email); 
    console.log("Description : ",description);
    console.log("")

    function handleCallBtnPress() {
        (async () => {
            await axios.patch("https://lingoapp-49792-default-rtdb.firebaseio.com/adminUser/"+email.replaceAll(".","-")+".json",
            {
                studentName : name,
                email : email
            })
            .then(res => console.log("Request sent successfully : ", res.data))
            .catch(err => console.log("Error sending request to the tutor : ",err))
        })()
        
        console.log("Tutor call got pressed ");
        openURL("https://"+roomLink.toString());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.topBox}>
                <Image source={require("../assets/profile4.jpg")} style={styles.profileIMG}/>
                <View style={styles.acheivementContainer}>
                    <View style={styles.achItem}>
                        <Image style={styles.achIcon} source={require("../assets/star.png")}/>
                        <Text style={styles.achText}>{"4.5"}</Text>
                    </View>
                    <View style={styles.achItem}>
                        <Image style={styles.achIcon} source={require("../assets/medal.png")}/>
                        <Text style={styles.achText}>{"656 Ratings"}</Text>
                    </View>
                    <View style={styles.achItem}>
                        <Image style={styles.achIcon} source={require("../assets/people.png")}/>
                        <Text style={styles.achText}>{"325 students"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomBox}>
                <Text style={styles.title}>{"Description"}</Text>
                <Text style={styles.description}>{
                    description.toString()
                }</Text>
            </View>
            <View style={styles.btnWrap}> 
                <Pressable android_ripple={{color : "green"}} onPress={handleCallBtnPress}>
                    <View style={styles.callBtn}>
                        <Image style={styles.callIcon} source={require("../assets/phone-call.png")}/>
                        <Text style={styles.callText}>{"Join"}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white",
        display : "flex",
        justifyContent : 'center',
        alignItems : "center"
    },
    topBox : {
        height : "30%",
        width : "90%",
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    acheivementContainer : {
        display : "flex",
        height : 150,
        width : 180,
        margin : 10
    },
    profileIMG : {
        height : 150,
        width : 150,
        borderRadius : 100,
    },
    achItem : {
        flexDirection : "row",
        margin : 10
        
    },
    achIcon : {
        height : 30,
        width : 30,
    },
    achText : {
        fontSize : 18,
        marginLeft : 20,
    },
    title : {
        fontSize : 30,
        fontWeight : 'bold',
        margin : 20,
        marginBottom : 0

    },
    description : {
        fontSize : 18,
        margin : 20
    },
    btnWrap : {
        marginTop : 20,
        zIndex : 888,
        overflow : "hidden",
        borderRadius : 10
    },
    callBtn : {
        backgroundColor : "#1FFF86",
        flexDirection : "row",
        borderRadius : 10,
        width : 150,
        justifyContent : 'center',
        alignItems : 'center',
    },
    callText : {
        fontSize : 30,
        fontWeight : "bold",
        margin : 10
    },
    callIcon : {
        height  : 50,
        width : 50,
        margin : 10,
        marginRight : 0
    }
})
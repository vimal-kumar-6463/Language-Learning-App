import {View , StyleSheet , Image , Text , Pressable , TextInput , ScrollView , TouchableHighlight ,Modal} from "react-native";
import { useState , useContext } from "react";
import { UserContext } from "../store/context/user-context";
import axios from "axios";

const profilePics = {
    '1':require("../assets/profile1.jpg"),
    '2':require("../assets/profile2.jpg"),
    '3':require("../assets/profile3.jpg"),
    '4':require("../assets/profile4.jpg"),
    '5':require("../assets/profile5.jpg"),
    '6':require("../assets/profile6.jpg"),
}

export function MessageUser(props) {

    const [modalVisibility , setModalVisibility] = useState(false);
    const UserCtx = useContext(UserContext);

    async function deleteMsg() {
        axios.delete("https://lingoapp-49792-default-rtdb.firebaseio.com/chatRoom/"+props.msgId+".json")
        .then(res => console.log("Message deleted successfully"))
        .catch(err => console.log("Error deleting message from database ", err))    
    }

    function okHandler() {
        deleteMsg();
        setModalVisibility(false);
    }
    
    // console.log("time : ",new Date(props.time).toLocaleTimeString("en-IN"));

    return (
        <View>
        <Modal visible={modalVisibility} transparent={true} animationType="slide">
            <View style={styles.deletePrompt}>
                <Text style={styles.modlaTitle}>{"Delete message"}</Text>
                <Text style={styles.promptText}>{"Are you sure you want to delete this message"}</Text>
                <View style={styles.btnWrap}>
                    <Pressable onPress={() => setModalVisibility(false)}><Text style={styles.btnText}>{"Cancel"}</Text></Pressable>
                    <Pressable onPress={() => okHandler()}><Text style={styles.btnText}>{"Ok"}</Text></Pressable>
                </View>
            </View>
        </Modal>
        <TouchableHighlight onLongPress={() => setModalVisibility(true)} underlayColor="#CAEDFF">
            <View style={{...styles.container , justifyContent : 'flex-end'}}>
                <View style={styles.textWrap}>
                    <Text style={styles.userName}>{props.name}</Text>
                    <Text style={{...styles.messageText,backgroundColor : "#793FDF" , color : "white"}}>{props.msg}</Text>
                    <Text style={styles.time}>{new Date(props.time).toLocaleTimeString().slice(0,-6) +" "+ new Date(props.time).toLocaleTimeString().slice(-2,-1)+"m"}</Text>
                </View>
                <Image style={styles.profile} source={require("../assets/profile4.jpg")}/>
            </View>
        </TouchableHighlight>
        </View>

    )
} 

export function MessageRecepient(props) {

    return (
        <TouchableHighlight onLongPress={() => {}} underlayColor="#CAEDFF" >
            <View style={{...styles.container , justifyContent : 'flex-start'}}>
                <Image style={styles.profile} source={require("../assets/profile2.jpg")}/>
                <View style={styles.textWrap}>
                    <Text style={{...styles.userName,color : "#7091F5"}}>{props.name}</Text>
                    <Text style={styles.messageText}>{props.msg}</Text>
                    <Text style={styles.time}>{new Date(props.time).toLocaleTimeString().slice(0,-6) +" "+ new Date(props.time).toLocaleTimeString().slice(-2,-1)+"m"}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
} 

const styles = StyleSheet.create({
    container : {
        height : "auto",
        width : "100%",
        padding : 5,
        display : "flex",
        flexDirection : "row",
        alignItems : "flex-start",
    },
    messageText : {
        backgroundColor : "white",
        width : 180,
        padding : 10,
        borderRadius : 10,
        // elevation : 10,
    },
    profile : {
        height : 35,
        width : 35,
        marginRight : 7.5,
        marginLeft : 7.5,
        borderRadius : 10,
    },
    time : {
        fontSize : 10,
        width : 70,
        position : "absolute",
        bottom : 0,
        right : 0,
        textAlign : "right",
        color : "grey"
    },
    userName : {
        textAlign :"left",
        color : "#9400FF",
        fontWeight : "bold",
    },
    textWrap : {
        width : 180,
        justifyContent : "center",
        alignItems : "right",
        paddingBottom : 17.5,   
    },
    deletePrompt : {
        height : 150,
        width : 250,
        backgroundColor : '#F5F5F5',
        position : "absolute",
        top : "50%",
        left : "50%",
        transform: [{translateX: -125 },{ translateY : -75}],
        borderRadius : 15,
        justifyContent : "center",
        alignItems : 'flex-start',
    },
    modlaTitle : {
        color : 'grey',
        fontSize : 18,
        padding : 5,
        margin : 5
    },
    promptText : { 
        color : "#9BA4B5",
        padding : 5,
        margin : 5,
        marginLeft : 10,
        marginRight : 10
    },
    btnWrap : { 
        width : "100%",
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : 'center',
        gap : 10,
   },
   btnText : {
        color :  "#30A2FF",
        marginBottom : 5,
        marginRight : 10,
        paddingRight : 10,
        paddingBottom : 5,
    }
})
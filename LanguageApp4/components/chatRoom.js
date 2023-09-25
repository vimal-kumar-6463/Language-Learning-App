import {View , StyleSheet , Image , Text , Pressable , TextInput , ScrollView} from "react-native";
import { useState , useContext ,useEffect} from "react";
import {MessageUser , MessageRecepient} from "./messageComp";
import axios from "axios";
import { UserContext } from "../store/context/user-context";
import LoadingScreen from "./loadingScreen";

export default function ChatRoom(props) {
    
    const profilePics = {
        '1':require("../assets/profile1.jpg"),
        '2':require("../assets/profile2.jpg"),
        '3':require("../assets/profile3.jpg"),
        '4':require("../assets/profile4.jpg"),
        '5':require("../assets/profile5.jpg"),
        '6':require("../assets/profile6.jpg"),
    }

    const UserCtx = useContext(UserContext);
    const [message , setMessage] = useState("");
    const [chats , setChats] = useState([]);
    const [avatarId , setAvatarId] = useState();

    useEffect(() => {
        axios.get("")
    },[])
    
    async function updateChat() {
        axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/chatRoom.json")
        .then(res => {
            const temp = [];
            for(const key in res.data){
                // setChats([key,res.data[key].sender,res.data[key].receiver,res.data[key].message, res.data[key].time])
                temp.push([key,res.data[key]])
            }
            setChats(temp);
        })
        .catch(err => console.log(err))
    }updateChat();


    function updateTextHandler(event) {
        setMessage(event.nativeEvent.text);
        console.log("Message Text : ", event.nativeEvent.text);
    }
    

    function submitmsg() {
 
        console.log("msg data : ", {
            "name" : UserCtx.userName,
            "avatarId" : UserCtx.profileId,
            "receiver" : "",
            "sender" : UserCtx.email,
            "message" : message ,
            "time" : new Date()
        })

        axios.post("https://lingoapp-49792-default-rtdb.firebaseio.com/chatRoom.json",{
            "name" : UserCtx.userName,
            "avatarId" : UserCtx.profileId,
            "sender" : UserCtx.email,
            "receiver" : "",
            "message" : message ,
            "time" : new Date()
        })
        .catch(err => console.log("Error uploading message to data base : ", err))
        setMessage("");
    } 

    const [arr, setArr] = useState([[1,"Hi"] , [2,"hello"] , [1,"Iam Vimal"], [2,"I am mark zuckerberg"],[1,"hi bibin"],[2,"hello"]]);

    return (
        (!chats)?<LoadingScreen/>:
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <ScrollView style={{width : "100%"}}>
                    <View style={styles.chatBox}>
                        {chats.map((item , index) => (item[1].sender === UserCtx.email)?<MessageUser msg={item[1].message} key={index} msgId={item[0]} time={item[1].time} name={item[1].name} avatarId={item[1].avatarId}/>:<MessageRecepient msg={item[1].message} key={index} msgId={item[0]} time={item[1].time} name={item[1].name} avatarId={item[1].avatarId}/>)}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.textInputWrap}>
                <TextInput  style={styles.textInput}
                            value={message}
                            onChange={updateTextHandler}
                            placeholder="Type something..."
                            placeholderTextColor={"#B9B4C7"}/>
                <Pressable style={styles.pressable} onPress={() => submitmsg()}>
                    <Image style={styles.image} source={require("../assets/send.png")}/>
                </Pressable>            
                
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor : "#CAEDFF",
    },
    title : {
        color : "white",
        fontSize : 25,
        fontWeight : "bold",
        textAlign : "center",
        padding : 10
    },
    chatContainer : {
        flex : 1,
        width : "100%",
        // backgroundColor : "grey",
    },
    textInputWrap : {
        height : 65,
        width : "100%",
        display : "flex",
        flexDirection : 'row',
        justifyContent : "space-around",
        alignItems : "center"
    },
    textInput : {
        height : "auto",
        minHeight : 40,
        paddingLeft : 10,
        width : "80%",
        backgroundColor : "white",
        borderRadius : 10,
        marginLeft : 5,
        elevation : 10,
    },
    pressable : {
        height : 42.5,
        width : 42.5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "white",
        borderRadius : 20,
        marginRight : 5,
        elevation : 10,
    },
    image : {
        height : 25,
        width : 25,
        backgroundColor : "white",
   
       },
    chatBox : {
        width : "100%",
        marginTop : 20,
        marginBottom : 20,
    }   
})


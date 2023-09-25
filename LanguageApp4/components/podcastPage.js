import {StyleSheet , Text , View , Image , Pressable , button, Button , ScrollView} from "react-native";
import { openURL } from "expo-linking";
import LanguageData from "./languages";
import { UserContext } from "../store/context/user-context";
import { useContext } from "react"; 


// const podCastList = [
//     "https://open.spotify.com/track/1bEnIDpwKsyhDauHVoMz6t?si=e323abb242e049ad",
//     "https://open.spotify.com/track/7LHAKF7pBqHch8o6Yo0ad5?si=4397592d070e419e",
//     "https://open.spotify.com/track/0952Tny0pwn1vEFTbRdjKY?si=36ca3d6c198548a0",
//     "https://open.spotify.com/track/3khEEPRyBeOUabbmOPJzAG?si=1e661ae2421e4f36",
//     "https://open.spotify.com/track/06XQvnJb53SUYmlWIhUXUi?si=b2adde3b673b4513",
//     "https://open.spotify.com/track/0OGw7V8wAI6OsZIQ12JkTP?si=e268388e11ea452e",
//     "https://open.spotify.com/show/3QiX0ZkjILyGWmpemackWB?si=c95992824b3a40a7"
// ]

export default function PodcastPage(props) {
        
    const UserCtx = useContext(UserContext);

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Listen to podcast"}</Text>
                <Image source={require("../assets/abstract-shape1.png")} style={styles.image}/>
            </View>
            <ScrollView style={styles.scrollview}> 
            <View style={styles.detaisBox}>
                {LanguageData[UserCtx.languageId].podcasts.map((item , index) =>          
                <View style={styles.profileItem} key={index}>
                    <View style={styles.descriptionBox}>
                        <Image style={styles.icon} source={require("../assets/spotify.png")}/>
                        <Text style={styles.description} >{"Session #00"+(index+1)}</Text>
                    </View>
                    <Pressable style={styles.element} onPress={() => {openURL(item)}}><Text style={styles.linkText}>{"Listen Now"}</Text></Pressable>
                </View>)}
            </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : "100%",
        height : "100%",
        backgroundColor : "white",
        display : "flex",
        justifyContent : 'center',
        alignItems : "center"
    },
    topBox : {
        height : "25%",
        width : "100%",
        backgroundColor : "#1B2430",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "flex-startr",
    },
    topText :  {
        color : "white",
        fontSize : 30,
        fontWeight : "bold",
        padding : 10,
        margin : 10,
    },
    profileIMG : {
        height : 130,
        width : 130,
        borderRadius : 50,
    },
    name : {
        fontSize : 25,
        fontWeight : "bold",
        marginBottom : 5,
        marginTop : 10,
    },
    email : {
        marginBottom : 20,
        color : "grey",
    },
    detaisBox : {
        flex : 1,
        width : "100%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        marginTop : 20,
        marginBottom : 20,
    },
    profileItem : {
        height : 80 ,
        width : "90%",
        backgroundColor : "white",
        margin : 5,
        borderRadius : 10,
        display : "flex",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : "center",
        elevation : 10,
    },
    descriptionBox : {
        width : "60%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems :  "center",
        marginLeft : 10,
        gap : 10,
    },
    description : {
        fontSize : 20,
        
    },
    element : {
        marginRight : 20,
        fontSize : 15,
        textAlign : "center",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
    },
    icon : {
        height : 35,
        width : 35,
    },
    pressable : {
        margin : 10
    },
    linkText : {
        color : "#1DB954",
        fontSize : 16,
    },
    scrollview : {
        width : "100%",
        height : "70%"
    },
    image : {
        height : 100,
        width : 100,
        position : "absolute",
        top : 20,
        right : 40,
        opacity : 0.3
    }
})
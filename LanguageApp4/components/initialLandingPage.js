import {StyleSheet , View , Text , Image , ImageBackground , TextInput , Pressable } from "react-native";



function InitialLandingPage(props) {

    return (
        <View style={styles.container}>
            <View style={styles.topBubble}></View>
            <Text style={styles.welcomeText}>{"To have another language is to possess a second soul"}</Text>
            <Text style={styles.welcomeSubText}>{"世界をリードするオンライン言語チュートリアル センターを試してください"}</Text>
            <Pressable android_ripple={{color:"#2c3a4d"}} style={styles.button} onPress={() => props.navigation.navigate("SecondLandingPage")}>
                <Text style={styles.buttonText}>{"Next"}</Text>
            </Pressable>
        </View>
        
    )
}


export default InitialLandingPage;



const styles = StyleSheet.create({
    container : {
        display : "flex",
        justifyContent : "center",
        alignItems : "flex-start",
        flex : 1,
        width : "100%",
        height : "100%"
    },
    topBubble : {
        height : 200,
        width : 200,
        backgroundColor : "#1FFF86",
        borderRadius : 100,
        position : "absolute",
        top : -70,
        right : -70,
    },
    welcomeText : {
        width : "75%",
        padding : 10,
        textAlign : "left",
        fontSize : 35,
        fontWeight : "bold",
        textTransform : "uppercase",
        margin : 10,
        marginLeft : 30,
    },
    welcomeSubText : {
        width : "80%",
        padding : 10,
        marginLeft : 30,
        textTransform : "uppercase",
        fontSize : 18,
    },
    button : {
        width : 157,
        height : 57,
        backgroundColor : "#1B2430",
        borderRadius : 6,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        position : "absolute",
        bottom : 30,
        right : 30,
    },
    buttonText : {
        color : "white",
        textAlign : "center"
    }
    
})
import {StyleSheet , View , Text , Pressable , Image} from "react-native";
import {useState , useEffect} from "react";

export default function UserOrAdminPage(props) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={() => {props.navigation.navigate("LoginPage")}}>
                <View style={{...styles.choiseContainer,backgroundColor : "#AED2FF"}}>
                    <Image style={styles.icon} source={require("../assets/student.png")}/>
                    <Text style={styles.text}>{"Student"}</Text>
                </View>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => {props.navigation.navigate("InstructorSignInPage")}}>
            <View style={styles.choiseContainer}>
                <Text style={styles.text}>{"Instructor"}</Text>
                <Image style={styles.icon} source={require("../assets/tutor.png")}/>
            </View>
        </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#1B2430",
        justifyContent : "center",
        alignItems : 'center',
        gap : 10
    },
    choiseContainer : {
        height : 150,
        width : 300,
        backgroundColor : "violet",
        borderRadius : 10,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    icon : {
        height : 100,
        width : 100,
        borderRadius : 10,
        backgroundColor : "white"
    },
    text : {
        fontSize : 25,
        fontWeight : 'bold',
    }
})
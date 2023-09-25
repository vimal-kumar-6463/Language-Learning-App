import {StyleSheet , View , Text , ImageBackground , Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomButton(props) {
    
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => (props.onPress)?props.onPress():navigation.navigate("SettingsPage")}>
            <ImageBackground style={styles.logoutIMG} source={props.icon}></ImageBackground>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    container : {
        height : 25,
        width : 25,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
    },
    logoutIMG : {
        width : 25,
        height : 25,
    }
})
import {StyleSheet , SafeAreaView , View , Text , Pressable} from "react-native";
import Pdf from "react-native-pdf";
import { UserContext } from "../store/context/user-context";
import {useContext , useEffect , useState} from "react";
import LanguageData from "./languages";
import axios from "axios";
import LoadingScreen from "./loadingScreen";

export default function PdfPage(props) {
    
    
    const UserCtx = useContext(UserContext);
    const source = {uri : LanguageData[UserCtx.languageId].pdfURL}

    return (
        (!LanguageData)?<LoadingScreen/>:
        <View style={styles.container}>
            <Text style={styles.title}>{UserCtx.language.toUpperCase()}</Text>
            <Pdf style={styles.pdf} source={source} trustAllCerts={false} onLoadComplete={(numberOfPages , filePath) => {
                console.log("No of Pages : ", numberOfPages)
              }}/>
              <View style={styles.btnWrap}>
                <View style={styles.btnContainer}>
                    <Pressable style={styles.btnPressable} android_ripple={{color:"black"}} onPress={() => {props.navigation.navigate("ModulePage",{navigateTo : "TestPage"})}}>
                        <Text style={styles.btnText}>{"Next"}</Text>
                    </Pressable>
                </View>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : "flex",
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : "#E4E4D0",
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        margin : 10,
    },
    pdf : {
        height : "80%",
        width : "95%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    btnWrap : {
        width : "75%",
        height : 60,
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        margin : 10
    },
    btnContainer : {
        width : "45%",
        height : "90%",
        borderRadius : 5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#1B2430",
        overflow : 'hidden',
    },
    btnPressable : {
        flex : 1,
        width : "100%",
        height : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems : 'center',
    },
    btnText : {
        color : "#1FFF86",
        fontSize : 20,
        fontWeight : "bold",
        marginLeft : 15,
        marginRight : 15,
        textAlign : "center"
    }
})
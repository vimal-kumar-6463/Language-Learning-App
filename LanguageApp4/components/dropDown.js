import {Text , StyleSheet , View , ScrollView , Image , Modal , Pressable} from "react-native";
import {useState} from "react";


export default function DropDownSelect(props) {

    const languages = [{language : "English",isoId : "en"} , {language : "Spanish",isoId : "es"} , {language : "Hindi",isoId : "hi"} ,{language : "Tamil",isoId : "ta"} , {language : "Telugu",isoId : "te"} , {language : "Malayalam",isoId : "ml"} , {language : "Kannada",isoId : "ka"} , {language : "Marathi",isoId : "mr"} , {language : "Gujarati",isoId : "gu"} ,  {language : "Italian",isoId : "it"} , {language : "German",isoId : "de"} , {language : "Russian",isoId : "ru"} ,{language : "French",isoId : "fr"}]
    const sample = ['tamil' , 'telugu' , 'kannada' , 'malayalam' ]

    const [modalVisibility , setModalVisibility] = useState(false);
    const [txt , setTxt] = useState("Select Language");
    const [language , setLanguage] = useState("");

    function LanguagePressHandler(languageData) {
        console.log("Selected Language" , languageData);
        setTxt("Selected");
        setLanguage(languageData.language + "");
        console.log("language state : " , language);
        props.setLang(languageData);
        setModalVisibility(false);
    }

    return (
        <View style={styles.container}>
            <Modal visible={modalVisibility} animationType="slide" transparent={true}>
                <View style={styles.listWrap}>
                    <View style={styles.scrollWrap}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.list}>
                                {languages.map((item , index) =>                                 
                                    <Pressable onPress={ () => {LanguagePressHandler(item)}} key={index} android_ripple={{color : "white"}}>
                                        <Text style={styles.listIndexText}>{item.language}</Text>
                                    </Pressable>)}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View style={styles.selectBar}>
                <Text style={styles.text}>{txt} {language}</Text>
                <Pressable onPress={() => {setModalVisibility(true)}}>
                    <Image style={styles.icon} source={require("../assets/down-arrow.png")}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 40,
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
    selectBar : {
        height : 40,
        width : "90%",
        backgroundColor : "#AED2FF",
        justifyContent : "space-around",
        alignItems : "center",
        flexDirection : 'row',
        borderRadius : 5
    },
    icon :{
        height : 25,
        width : 25,
    },
    text : {
        fontSize : 18,
        fontWeight : 'bold',
    },
    listWrap : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    list : {
        backgroundColor : '#EDE4FF',
        borderRadius : 5,
    },
    listIndexText : {
        textAlign : "center",
        fontSize : 20,
        borderColor : "white",
        borderBottomWidth : 1,
        padding : 10
    },
    scrollView : {
        height : 300
    },
    scrollWrap : {
        heigth : 300,
        width : "70%",
    }

})
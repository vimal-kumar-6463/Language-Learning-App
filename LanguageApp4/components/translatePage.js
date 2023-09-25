import {StyleSheet , View , Image , Text , TextInput , Pressable , KeyboardAvoidingView , ScrollView} from "react-native";
import {useState  ,useEffect} from "react";
import translate from "google-translate-api-x";
import Voice from '@react-native-voice/voice';
import * as Speech from "expo-speech";
import LanguageData from "./languages";
import { SelectList , MultipleSelectList} from "react-native-dropdown-select-list";
import DropDownSelect from "./dropDown";

export default function TranslatePage(props) {

    const [text , setText] = useState("");
    const [translatedText , setTranslatedText] = useState("");
    const [selected , setSelected] = useState([]);
    const [fromLang , setFromLang] = useState();
    const [toLang , setToLang] = useState();
    const [started , setStarted] = useState("");
    const [results , setResults] = useState("");
    
    // Text to Speech part

    function fromSpeakBtnPressHandler(){
        if(fromLang){
            Speech.speak(text,{voice : LanguageData[fromLang.isoId].voiceID, language: LanguageData[fromLang.isoId].localeID});  
        }
    }

    function toSpeakBtnPressHandler(){
        if(toLang){
            Speech.speak(translatedText,{voice : LanguageData[toLang.isoId].voiceID, language: LanguageData[toLang.isoId].localeID});  
        }   
    }
    
    // Speech to Text Part

    useEffect(() => {
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
    
        return () => {
          Voice.destroy().then(Voice.removeAllListeners())
          .catch(err => console.log(err));
        }
      }, []);
    
      const startSpeechToText = async () => {
        if(fromLang){
            await Voice.start(LanguageData[fromLang.isoId].localeID)
            .then(res => setResults([]))
            .catch(err => console.log(err)); 
        }
        setStarted(true);
      };
    
      const stopSpeechToText = async () => {
        await Voice.stop()
        .catch(err => console.log(err));
        setStarted(false);
      };
    
      const onSpeechResults = (result) => {
        setResults(result.value[0]);
        setText(result.value[0]);
        console.log(result.value[0]);
      };
    
      const onSpeechError = (error) => {
        console.log(error);
      };


    function onChangeText(event) {
        setText(event.nativeEvent.text);
        console.log(event.nativeEvent.text);
    }

    async function translateHandler(){
         await translate(text , {from : fromLang.isoId , to : toLang.isoId})
         .then(res => setTranslatedText(res.text))
         .catch(err => console.log("Error translating text : ", err));
         console.log("Selected language : ",selected);
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.title}>{"Translate Made Easy"}</Text>
                <Text style={styles.description}>{"Translate any type of language to any language you want "}</Text>
                <Image source={require("../assets/translate.png")} style={styles.topImage}/>
            </View>
            <KeyboardAvoidingView style={styles.translationContainer}>
                <View style={styles.fromContainer}>
                    <View style={styles.langSelection}>
                    <DropDownSelect setLang={setFromLang}/>
                    </View>
                    <View style={styles.langInput}>
                        <Text style={styles.normText}>{"Enter a text to be translated"}</Text>
                        <TextInput style={styles.textInput} numberOfLines = {4} multiline={true} textAlignVertical="top" placeholder="Type something..."
                                   placeholderTextColor="grey" onChange={onChangeText} value={text} />
                    </View>
                    <Pressable style={styles.pressable} onPress={() => {translateHandler()}} android_ripple={{color : "white"}}>
                        <Image style={styles.icon} source={require("../assets/translation.png")}/>
                    </Pressable>
                    <Pressable style={styles.speakerPressable} android_ripple={{color : "white"}} onPress={fromSpeakBtnPressHandler}>
                        <Image style={styles.icon} source={require("../assets/speaker.png")}/>
                    </Pressable>
                    <Pressable style={{...styles.speakerPressable , left : 90}} android_ripple={{color : "white"}} onPress={(!started)?startSpeechToText:stopSpeechToText}>
                        <Image style={styles.icon} source={require("../assets/microphone.png")}/>
                    </Pressable>
                </View>
                <View style={styles.toContainer}>
                    <View style={styles.langSelection}>
                    <DropDownSelect setLang={setToLang}/>
                    </View>
                    <View style={styles.langInput}>
                        <Text style={styles.normText}>{"Translated Text"}</Text>
                        <Text style={styles.textOutput}>{translatedText}</Text>
                        <Pressable style={{...styles.speakerPressable , left : 20}} onPress={toSpeakBtnPressHandler} android_ripple={{color : "white"}}>
                            <Image style={styles.icon} source={require("../assets/speaker.png")}/>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white",
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    topBox : {
        height : "25%",
        width : '100%',
        backgroundColor : "#1B2430",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : 'flex-start',
    },
    topImage : {
        height : 60,
        width : 60,
        position : "absolute",
        top : 15,
        right : 15,
        opacity : 0.4
    },
    title : {
        color : "white",
        fontSize : 30,
        fontWeight : "bold",
        padding : 10,
        margin : 10,
    },
    description : {
        color : "#1FFF86",
        margin : 10,
        padding : 10,
        marginTop : 0,
        paddingTop : 0,
    },
    translationContainer : {
        height : '70%',
        minHeight : 500,
        width : "100%",
        marginTop : 10,
        marginBottom : 10,
    },
    fromContainer : {
        flex : 1.15,
        width : "100%",
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
        // backgroundColor : "red",
    },
    toContainer : {
        flex : 1,
        width : "100%",
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
        // backgroundColor : "blue",
    },
    langSelection : {
        height : 40,
        width : "90%",
        margin : 5,
        position : "absolute",
        zIndex : 999,
        top : 0,
        backgroundColor : "white"

    },
    langInput : {
        flex : 1,
        width : "90%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        // backgroundColor : "green",
        margin : 5
    }, 
    normText : {
        width : "100%",
        fontWeight : "bold",
        padding : 5,
        paddingTop : 0,
        paddingBottom : 2,
        marginTop : 50,
        },
    textInput : {
        flex : 1,
        width : "97.5%",
        backgroundColor : "#FFEEF4",
        margin : 5,
        // borderWidth : 2,
        borderRadius : 5,
        padding : 15,
        fontSize : 18,
    },
    textOutput : {
        flex : 1,
        width : "97.5%",
        backgroundColor : "#E8FFCE",
        margin: 5,
        // borderWidth : 2,
        borderRadius : 5,
        padding : 15,
        fontSize : 18,
    },
    icon : {
        height : 35,
        width : 35,
        padding : 10
    },
    pressable : {
        position : "absolute",
        bottom : 20,
        right : 35,
    },
    speakerPressable : {
        position : "absolute",
        bottom : 20,
        left : 40,
    }
})
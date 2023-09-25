import {StyleSheet , View , Image , Pressable} from "react-native";

export default function TextRecognition () {
    
    const text = extractTextFromImage("../assets/textfile.jpg");

    return (<Text>{text}</Text>)

}
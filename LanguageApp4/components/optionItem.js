import { StyleSheet , Text, View , Pressable } from "react-native";
import {useState , forwardRef ,useImperativeHandle} from "react";
import { Alert } from "react-native";

const OptionItem = forwardRef((props , ref) =>  {
    
    useImperativeHandle(ref , () => {
        return {
            resetFillColor : resetFillColor,
            isAnswered : isPressed,
            isCorrect : props.isCorrect == isPressed
        }
    })

    const [isPressed , setIsPressed] = useState(props.initialState);

    function resetFillColor() {
        setIsPressed(false);
    }

    function optionPressHandler() {
        if(!props.isCorrect){
            if(!isPressed) {
                // Alert.alert("OOPS !","Wrong Answer");
            }
            setIsPressed(false);
        }
        setIsPressed(!isPressed);
    }
    return (
    <View style={(isPressed)?{...styles.questionContainer,backgroundColor:(props.isCorrect?"#1FFF86":"#FF616B")}:styles.questionContainer}>
        <Pressable style={styles.questionPressable} onPress={optionPressHandler}>
            <Text style={styles.questionText}>{props.optionIndex}</Text>
            <Text style={styles.questionText} >{props.option[1]}</Text>
        </Pressable>
    </View>
    )
})

export default OptionItem ;

const styles = StyleSheet.create({
    questionContainer : {
        width : "75%",
        height : "10%",
        borderWidth : 2,
        borderRadius : 5,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        
    },
    questionPressable : {
        flex : 1,
        width : "100%",
        height : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : 'center',

    },
    questionText : {
        fontSize : 20,
        fontWeight : "bold",
        marginLeft : 15,
        marginRight : 15,
        textAlign : "left"
    },
})
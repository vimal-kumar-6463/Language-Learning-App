import {StyleSheet , SafeAreaView , View , Text} from "react-native";
import CircularProgress from "circular-progress-rn";

export default function ProgressBar(props) {

    const source = {uri : "https://studytamil.files.wordpress.com/2011/10/easy-tamil1.pdf"}

    return (
        <View style={styles.container}>
            <Text style={{...styles.text , color: props.fontColor}}>{props.value}{"%"}</Text>
            <CircularProgress 
            style={styles.progress}
            radius={props.radius}
            progress={props.value}
            strokeWidth={props.strokeWidth}
            backgroundTrackColor={props.inActiveStrokeColor}
            trackColor={props.activeStrokeColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
        position : 'relative',
        marign : 10,
    },
    progress : {
        position : 'relative'
    },
    text : {
        fontSize : 30,
        fontWeight : "bold",
        position : "absolute",
    }
})
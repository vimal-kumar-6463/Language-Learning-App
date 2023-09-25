import {StyleSheet , View , Text , ActivityIndicator} from "react-native";


function LoadingScreen(props){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.loadingText}</Text>
            <ActivityIndicator size={"large"}/>
        </View>
    )
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width : "100%",
        height : "100%",
        backgroundColor : "#1B2430",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    text : {
        fontSize : 25,
        fontWeight : "bold",
        color : "white",
        padding : 10,
        margin : 10,
    },

})
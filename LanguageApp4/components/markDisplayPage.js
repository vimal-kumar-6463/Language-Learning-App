import { StyleSheet , View , Text , Pressable , Image } from "react-native";

export default function MarkDisplayPage(props) {
    
    function closehandler(){
        props.navigation.pop();
        props.navigation.pop();
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/mark.gif")}/>
            <Text style={styles.markText}>Your Mark</Text>
            <View style={styles.markContainer}>
                <Text style={styles.markText}>{props.route.params.mark} / 10</Text>
            </View>
            <View style={styles.closeBtnWrap}>
                <Pressable style={styles.closeBtn} onPress={() => closehandler()}>
                    <Text style={styles.closeBtnText}>{"Close"}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        flex : 1,
        width : "100%",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        gap : 20
    },
    image : {
        width : 200,
        height : 200,
        padding : 10,
        margin : 10,
    },
    markContainer : {
        width : 200,
        height : 200,
        backgroundColor : "#DFCCFB",
        borderRadius : 10,
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
        margin : 10
    },
    markText : {
        fontSize : 40,
        fontWeight : "bold",
    },
    closeBtnWrap : {
        width : 100,
        height : 50,
        backgroundColor : '#279EFF',
        borderRadius : 10,
        display : "flex",
        justifyContent : "center",
        alignItems : 'center',
        overflow : 'hidden'
    },
    closeBtn : {
        flex : 1,
        display : "flex",
        justifyContent : 'center',
        alignItems : "center",
    },
    closeBtnText : {
        fontSize : 18 ,
        fontWeight : "bold",
    }

})
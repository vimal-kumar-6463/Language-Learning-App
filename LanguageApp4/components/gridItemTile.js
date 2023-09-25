import {StyleSheet , Text , View , Image , ImageBackground ,Pressable } from "react-native";

function GridItemTile(props) {
    return (
        <View style={styles.container} >
            <Pressable onPress={props.onPress} style={styles.innerContainer} android_ripple={{color : "#D8D9DA"}}> 
                <Image style={styles.image} source={props.icon}/>
                <Text style={styles.text}>{props.title}</Text>
                <View style={styles.linearProgress}><View style={{...styles.progressFill,width : props.progress + "%"}}></View></View>
            </Pressable>
        </View>
    )
}

export default GridItemTile ;

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        width : "42.5%",
        height :"42.5%",
        display : "flex",
        justifyContent : "center",
        alignItems: "center",
        borderRadius : 15,
        margin : 10,
        overflow : "hidden",
    },
    innerContainer : {
        flex : 1,
        width : "100%",
        height : "100%",
        display : "flex",
        justifyContent : "center",
        alignItems: "center",
        borderRadius : 15,
    },
    image : {
        width : 120,
        height : 120,
        margin : 10,
    },
    text : {
        fontSize : 18,
        fontWeight : "bold",
    },
    progress : {
        backgroundColor : "green",
        borderRadius : 50,
        textAlign : "center",
        color : "white",
        position : "absolute",
        top : 4,
        left : 4,
        padding : 5,
        fontSize : 12,
        fontWeight : "bold"
    },
    linearProgress : {
        height : 5 ,
        width : "85%",
        backgroundColor : "#B9B4C7",
        borderRadius : 10,
        margin : 5
    }, 
    progressFill : {
        height : "100%",
        backgroundColor : '#7091F5',
        borderRadius : 10,
    }
})
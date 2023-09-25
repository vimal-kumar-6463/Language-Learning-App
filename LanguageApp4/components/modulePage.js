import {StyleSheet , Text , View , Image , Pressable} from "react-native";

function ModulePage(props) {
    
    console.log(props.route.params.navigateTo);
    const modules = ["Numbers","Food_Data","Colors_Data","Animals_Data","Basic_Words"]

    function modulePressHandler(module) {
        props.navigation.navigate(props.route.params.navigateTo,{module : module})
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.topText}>{"Modules"}</Text>
                <Image style={styles.topImage} source={require("../assets/abstract.png")}/>
            </View>
            <View style={styles.taskList}>
                {modules.map((item ,i) => <Pressable key={i} style={styles.taskItem} android_ripple={{color:"#2c3a4d"}} onPress={() => modulePressHandler(item) } >
                    <Text style={styles.taskText}>{item.split("_")[0]}</Text>
                </Pressable>)}
            </View>
        </View>

        
    )
}

export default ModulePage ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        width : "100%",
        borderRadius : 50,
        gap : 50
    },
    topBox : {
        width : "100%",
        height : "25%",
        backgroundColor : "#1B2430",
        overflow : "hidden",
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "flex-start"
    },
    topText : {
        fontSize : 34,
        color : "white",
        fontWeight : "bold",
        width : "65%",
        margin : 30,
        zIndex : 999.
    },
    scrollView :{
        margin : 10,
    },
    topImage : {
        width : 150,
        height : 150,
        position : "absolute",
        bottom : 20,
        right : 10,
        opacity : 0.4
    },
    taskList : {
        flex : 1,
        width : "100%",
        display : 'flex',
        flexDirection : 'row',
        justifyContent : "center",
        alignItems : "center",
        gap : 10,
        flexWrap : "wrap",
    },
    taskItem : {
        width : "40%",
        height : "20%",
        backgroundColor : "#1B2430",
        borderRadius : 10,
        borderWidth : 2,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin : 10,
    },
    taskText : {
        color : "white",
        fontSize : 20,
        fontWeight : "bold",
    }
})
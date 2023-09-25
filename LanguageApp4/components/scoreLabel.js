import { StyleSheet , View , Image , Pressable , Text} from "react-native";

export default function Scorelabel(props){
    return (
        <View style={styles.scoreLabel} key={props.index}>
        <Image style={styles.profilePic} source={props.icon}/>
        <View style={styles.sideBox}>
            <View style={styles.detailsBox}>
                <Text style={styles.profileName}>{props.name}</Text>
                <Text style={styles.profileEmail}>{props.email}</Text>
                <Text style={styles.profileRank}>{"Rank : "+(props.index+1)}</Text>
            </View>
            <Image style={styles.medalIcon} source={props.medalIcon}/>
        </View>
    </View> 
    )
}

const styles={
    scoreLabel : {
        backgroundColor : "white",
        width : "90%",
        height : 100,
        borderRadius : 10,
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center",
        elevation : 10,
        overflow : "hidden",
        margin : 5,
    },
    profilePic : {
        height : 90,
        width : 90,
    },
    sideBox : {
        flex : 1,
        height : "100%",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    detailsBox : {
        width : "65%",
        justifyContent : "space-around",
        alignItems : 'flex-start',
        marginLeft : 10
    },
    profileName : {
        fontSize : 18,
        fontWeight : 'bold'
    },
    profileEmail : {
        fontSize : 12,
        color : "grey"
    },
    profileRank : {
        fontSize : 20,
        color : "black"
    },
    medalIcon : {
        height : 80,
        width : 60,
        margin : 10
    }

}
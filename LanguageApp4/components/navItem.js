import {StyleSheet , Text , View , Image , ImageBackground ,Pressable } from "react-native";
import {useState} from "react";

function NavItem(props) {
     
    const [isActivated , setIsActivated] = useState(props.state);
    function navItemPressHandler(){
        setIsActivated(!isActivated);
        console.log("navItem got clicked");
        props.navigation.navigate(props.navigateTo);
    }

    return (
        <Pressable style={styles.container} onPress={(props.navigateTo)?navItemPressHandler:() => {}} >
            <Image style={styles.image} source={props.icon}/>
        </Pressable>
    )
}

export default NavItem;

const styles = StyleSheet.create({
    container : {
        width : 70,
        height : 70,
        borderRadius : 10,
        display : "flex",
        justifyContent : 'center',
        alignItems : "center",
    },
    image : {
        height : 37.5,
        width : 37.5,
    }
})
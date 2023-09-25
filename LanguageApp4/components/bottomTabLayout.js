import {StyleSheet , Text , View , Image , ImageBackground ,Pressable } from "react-native";
import GridItemTile from "./gridItemTile";
import NavItem from "./navItem";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashBoard from "./dashBoard";

function BottomTabLayout(props) {
    
    const Tab = createBottomTabNavigator();
    return(
        // <Text>Hello vimal</Text>
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName={"Dashboard"}
            screenOptions={({route}) => {
                tabBarIcon: ({focused , color , size}) => {
                    let iconName ;
                    let rn = route.name;

                    if( rn === "DashBoard"){
                        iconName = focused ? "home" : "home-outline";
                    } else if (rn === "WritingPad") {
                        iconName = focused ? "details" : "details-outline";
                    } else {
                        iconName = focused ? "settings" : "settings-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                }}}
                tabBarOptions={{
                    activeTintColor : 'black',
                    inactiveTintColor : 'grey',
                    labelStyle: {paddingBottom : 10, fontSize: 10},
                    style:{padding : 10 , height : 200}
                }}>
                <Tab.Screen name={"DashBoard"} component={DashBoard}/>    
                <Tab.Screen name={"Writing Pad"} component={DashBoard}/> 
                <Tab.Screen name={"Setting"} component={DashBoard}/> 
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabLayout;

const styles = StyleSheet.create({

})
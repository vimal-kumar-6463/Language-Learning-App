import "react-native-reanimated";
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";

const Drawer = createDrawerNavigator();

export default function StackNavigator() {
  return (
      <Drawer.Navigator initialRouteName="Screen3" options={{headerShown : true}}>
        <Drawer.Screen name="Screen2" component={Screen2}/>
        <Drawer.Screen name="Screen3" component={Screen3}/>
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
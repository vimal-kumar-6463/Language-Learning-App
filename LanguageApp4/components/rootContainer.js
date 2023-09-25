import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView, Image } from 'react-native';
import {useContext} from "react";
import InitialLandingPage from './components/initialLandingPage';
import SecondLandingPage from './components/secondLandingPage';
import LoginPage from './components/loginPage';
import SigninPage from './components/signinPage';
import LanguageSelectionPage from './components/languageSelectionPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContextProvider from "./store/context/user-context";
import { UserContext } from './store/context/user-context';
import LogoutButton from './components/logoutButton';

const Stack = createNativeStackNavigator();

export default function Root() {
  
  const UserCtx = useContext(UserContext);
  const isUserLoggedIn = UserCtx.isAuthenticated;
  console.log("Is user authenticated : ", UserCtx.token)

  return (
      <NavigationContainer style={{zIndex : 9999 , flex : 1} }>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName={isUserLoggedIn ? "LanguagePage" : "InitialLandingPage"} >
          <Stack.Screen name="InitialLandingPage" component={InitialLandingPage} options={{title:"Welcome"}}/>
          <Stack.Screen name="SecondLandingPage" component={SecondLandingPage} options={{title:"Welcome"}} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{title:"Login to get started"}}/>
          <Stack.Screen name="SigninPage" component={SigninPage} options={{title:"Signin to get started"}}/>
          <Stack.Screen name="LanguagePage" component={LanguageSelectionPage}
                        options={{
                          title:"Languages",
                          headerRight : ({tintColor}) => <LogoutButton onPress={UserCtx.logoutUser}/>
                        }}
                        />
        </Stack.Navigator>
      </NavigationContainer>  
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

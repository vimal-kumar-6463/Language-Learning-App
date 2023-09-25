import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView, Image , LogBox } from 'react-native';
import {useContext , useEffect , useState} from "react";
import InitialLandingPage from './components/initialLandingPage';
import SecondLandingPage from './components/secondLandingPage';
import LoginPage from './components/loginPage';
import SigninPage from './components/signinPage';
import LanguageSelectionPage from './components/languageSelectionPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContextProvider from "./store/context/user-context";
import { UserContext } from './store/context/user-context';
import CustomButton from './components/customButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './components/loadingScreen';
import DashBoard from './components/dashBoard';
import BottomTabLayout from './components/bottomTabLayout';
import ReadingPage from './components/reading';
import TestPage from './components/TestPage';
import Translator from './components/sampleTranslate';
import ModulePage from './components/modulePage';
import MarkDisplayPage from './components/markDisplayPage';
import WritingPad from './components/writingPad';
import TextToSpeechPage from './components/textToSpeechPage';
import ProgressBar from './components/progressBar';
import ScoreBoardPage from './components/scoreBoardPage';
import ProfilePage from './components/profilePage';
import PodcastPage from './components/podcastPage';
import PdfPage from './components/pdfPage';
import SpeakingPage from './components/speaking';
import LanguageLoadingPage from './components/languageLoadingPage';
import ChatRoom from './components/chatRoom';
import TranslatePage from './components/translatePage';
// import TextRecognitionPage from './components/textRecognitionPage';
import DropDownSelect from './components/dropDown';
import WritePracticePage from './components/writePractice';
import WritingPage from './components/writing';
import InstSigninPage from './components/instructorSigninPage';
import StudentRequestPage from './components/studentRequestPage';
import FindTutorPage from './components/findTutorPage';
import TutorDetails from './components/tutorDetailsPage';
import UserOrAdminPage from './components/userOrAdminPage';
import AdminContextProvider from './store/context/admin-context';
import InstLoginPage from './components/instLoginPage';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  LogBox.ignoreAllLogs();

  function Root() {
        const UserCtx = useContext(UserContext);;
        const [isAuthChecking , setIsAuthChecking] = useState(false);
        useEffect(() => {
          async function fetchToken(){
              setIsAuthChecking(true);
              const storedToken = await AsyncStorage.getItem("token");
              if (storedToken) {
                  console.log("stored Token : ", storedToken);
                  UserCtx.authenticateUser(storedToken);
                  console.log("AuthToken state has been updated successfully");
              }
              setIsAuthChecking(false);
          }
          fetchToken();
        },[])
      
        var isUserLoggedIn = UserCtx.isAuthenticated;
        console.log("Is user authenticated : ", isUserLoggedIn);
        
        // return <ProfilePage/>
        // return <TextRecognitionPage/>
        // return <InstSigninPage/>
        // return <FindTutorPage/>
        return(
          !isAuthChecking ? <NavigationContainer style={{zIndex : 9999 , flex : 1} }>
            <StatusBar style="dark" />
            <Stack.Navigator initialRouteName={isUserLoggedIn ? "Dashboard" : "InitialLandingPage"} >
              <Stack.Screen name="InitialLandingPage" component={InitialLandingPage} options={{title:"Welcome"}}/>
              <Stack.Screen name="SecondLandingPage" component={SecondLandingPage} options={{title:"Welcome"}} />
              <Stack.Screen name="LoginPage" component={LoginPage} options={{title:"Login to get started"}}/>
              <Stack.Screen name="SigninPage" component={SigninPage} options={{title:"Signin to get started"}}/>
              <Stack.Screen name="LanguagePage" component={LanguageSelectionPage}
                            options={{
                              title:"Languages",
                              headerRight : ({tintColor}) => <CustomButton onPress={UserCtx.logoutUser} icon={require("./assets/logout.png")}/>
                            }}
                            />
              <Stack.Screen name="Dashboard" component={DashBoard}
                            options={{
                            title:"Dashboard",
                            headerShown : true,
                            headerRight : ({tintColor}) => <CustomButton icon={require("./assets/setting.png")}/>
                            }}
                            />
              {/* <Stack.Screen name={"WritingPad"} component={WritingPad}/> */}
              <Stack.Screen name="ReadingPage" component={ReadingPage}/>
              <Stack.Screen name="TestPage" component={TestPage}/>
              <Stack.Screen name="ModulePage" component={ModulePage}/>
              <Stack.Screen name="MarksPage" component={MarkDisplayPage}/>
              <Stack.Screen name="WritingPadPage" component={WritingPad} options={{title:"Writing Page"}}/>
              <Stack.Screen name="LearnWords" component={TextToSpeechPage} options={{title:"Speaking Practice"}}/>
              <Stack.Screen name="SettingsPage" component={ProfilePage} options={{title:"Profile"}}/>
              <Stack.Screen name="ScoreBoardPage" component={ScoreBoardPage} options={{title:"Leader Board"}}/>
              <Stack.Screen name="PodCastPage" component={PodcastPage} options={{title:"Listening"}}/>
              <Stack.Screen name="PdfPage" component={PdfPage} options={{title:"Documentation"}} />
              <Stack.Screen name="SpeakingPage" component={SpeakingPage} options={{title : "Speak"}}/>
              <Stack.Screen name="ChatRoom" component={ChatRoom} options={{title : "Chat Room"}}/>
              <Stack.Screen name="LanguageLoadPage" component={LanguageLoadingPage} options={{title : "Load Language"}}/>
              <Stack.Screen name="TranslatePage" component={TranslatePage} options={{title : "Translate"}}/>
              <Stack.Screen name="WritingPage" component={WritingPage} options={{title : "Writing"}}/>
              <Stack.Screen name="WritePracticePage" component={WritePracticePage} options={{title : "WritePracticePage"}}/>
              <Stack.Screen name="FindTutorPage" component={FindTutorPage} options={{title : "Find Tutor"}}/>
              <Stack.Screen name="TutorDetailsPage" component={TutorDetails} options={{title : "Tutor Details"}}/>
              <Stack.Screen name="UserOrAdminPage" component={UserOrAdminPage} options={{title : "Select your Profile"}}/>
              <Stack.Screen name="InstructorSignInPage" component={InstSigninPage} options={{title : "Apply for instructor"}}/>
              <Stack.Screen name="StudentRequestPage" component={StudentRequestPage} options={{title : " Requests"}}/>
              <Stack.Screen name="InstLoginPage" component={InstLoginPage} options={{title : 'Login Page'}}/>
            </Stack.Navigator>
        </NavigationContainer> : <LoadingScreen loadingtext="Checking Authentication..."/>
        )
  }

return (
  
    <UserContextProvider>
      
        <Root/>
      
    </UserContextProvider>   
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

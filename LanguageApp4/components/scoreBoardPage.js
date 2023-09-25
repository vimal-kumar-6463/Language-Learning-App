import {View , StyleSheet , ScrollView , Text , Image , Pressable} from "react-native";
import {useEffect , useState} from "react"; 
import axios from "axios";
import Scorelabel from "./scoreLabel";

export default function ScoreBoardPage() {
    
    const [users , setUsers] = useState([]);

    const profilePics = {
        '1':require("../assets/profile1.jpg"),
        '2':require("../assets/profile2.jpg"),
        '3':require("../assets/profile3.jpg"),
        '4':require("../assets/profile4.jpg"),
        '5':require("../assets/profile5.jpg"),
        '6':require("../assets/profile6.jpg"),
    }

    const medalIcons = {
        1:require("../assets/medals_gold.jpg"),
        2:require("../assets/medals_silver.jpg"),
        3:require("../assets/medals_bronze.jpg")

    }

    useEffect(() => {
        async function sample () {
            await axios.get("https://lingoapp-49792-default-rtdb.firebaseio.com/User.json")
            .then(res => {
                setUsers(Object.values(res.data).sort((a, b) => b.marks - a.marks))
            })
    }
    sample();
    },[])

    const profilePicArray = ["profile1.jpg" , "profile2.jpg" ,"profile3.jpg" ,"profile4.jpg" ,"profile5.jpg" ,"profile6.jpg" ]
    console.log(users);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.scoreDisplayBox}>
                    {users.map((item ,index) => <Scorelabel name={item.name}
                                                            email={item.email} 
                                                            index={index} 
                                                            icon={profilePics[item.avatarId+1]}
                                                            key={index}
                                                            medalIcon={(index < 3)?medalIcons[index+1]:require("../assets/medal.png")}/>)}

                </View>
            </ScrollView>

        </View>
    )
} 

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : "#FAF1E4",
    },
    scoreDisplayBox : {
        width : "100%",
        height : "95%",
        display : "flex",
        justifyContent : "center",
        alignItems : 'center',
        marginTop : 20,
        marginBottom : 25,
    },
    scrollView : {
        flex : 1,
        width : "100%",
        height : "100%",
        marginTop : 20,
    }

})
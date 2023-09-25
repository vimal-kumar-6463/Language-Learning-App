import { useState , useEffect} from 'react';
import { StyleSheet , View, TextInput, Button, Text } from 'react-native';
import { translate } from 'google-translate-api-x';

function Translator () {

    var translatedWord ;

    translate("thanks for helping me",{from: "en" , to: "ta" , forceBatch: true})
    .then(res => {
        translatedWord = res.text;
        console.log(res.text);
    })
    .catch(err => console.log(err))
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{translatedWord}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : "flex",
        justifyContent : 'center',
        alignItems : 'center'
    },
    text : {
        fontSize : 20,
        letterSpacing : 2,
        fontWeight : 'bold',
    }
})

export default Translator;






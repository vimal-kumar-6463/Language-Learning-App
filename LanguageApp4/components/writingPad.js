import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useRef , forwardRef , useImperativeHandle} from 'react';
import SignatureScreen from "react-native-signature-canvas";

const Sign = forwardRef((props , ref1) => {

  useImperativeHandle(ref1 ,() => {
    return {
      clearScribble : sample
    }
  })

  const ref = useRef();
  

  function sample() {
    console.log("This is inside Sign and sample got called")
  }
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {

    console.log(data);
  };

  return (
    <SignatureScreen
      style={styles.pad}
      ref={ref}
      onEmpty={handleEmpty}
      onClear={handleClear}
      onGetData={handleData}
      autoClear={false}
      descriptionText={props.text}
    />
  );
});

const WritingPad = forwardRef((props , ref) => {

  function clearScribble() {
      childRef.current.clearScribble();
  }

  useImperativeHandle(ref , () => {
    return {
      clear : clearScribble
    }
  })
  
  const childRef = useRef();

  return (
    <View style={styles.container}>
      <Sign ref1={childRef}/>
    </View>
  );
})

export default WritingPad ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'black',
    gap : 20
  },
  topBox : {
    width : "100%",
    height : "50%",
    display : "flex",
    justifyContent : 'center',
    alignItems : 'center'
  },
  pad : {
      flex : 1 
  },
  text : {
    color : 'white',
    fontSize : 25,
    fontWeight : 'bold'
  }
});

// import React, { useRef } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import SignatureScreen from 'react-native-signature-canvas';

// const WritingPad = () => {
//   const signatureRef = useRef();

//   const handleGetData = (signature) => {
//     console.log('Signature Data:', signature); // Check the signature data in the console
//   };

//   return (
//     <View style={styles.container}>
//       <SignatureScreen
//         ref={signatureRef}
//         onGetData={handleGetData}
//         onEmpty={() => console.log('Empty')}
//       />
//       <Button title="Save Signature" onPress={handleSave} />
//     </View>
//   );
// };

// export default WritingPad;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


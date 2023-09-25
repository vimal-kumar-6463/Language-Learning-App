// import { useState, useEffect } from 'react';
// import { Button, Image, View, Platform , Text} from 'react-native';
// import TextRecognition from "@react-native-ml-kit/text-recognition";

// export default function ImagePickerExample() {
//   const [text, setText] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     // let result = await ImagePicker.launchImageLibraryAsync({
//     //   mediaTypes: ImagePicker.MediaTypeOptions.All,
//     //   allowsEditing: true,
//     //   aspect: [4, 3],
//     //   quality: 1,
//     // });

//     const result = await TextRecognition.recognize("../assets/textfile.png");
//     console.log("Text : ", result);
//     setText(result)


//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       <Text>{text}</Text>
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform , Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';
import MlkitOcr from 'react-native-mlkit-ocr';
import TesseractOcr from '@devinikhiya/react-native-tesseractocr';

export default function TextRecognitionPage() {
  const [image, setImage] = useState(null);
  const [text , setText] = useState();
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    (
      async() => {
        if(image){
          // const textData = await TextRecognition.recognize(image , "tam");
          // console.log(textData["blocks"].map(item => item.text))
          // const textData = await MlkitOcr.detectFromFile(image);
          // console.log(textData.map(item => item.text));
          // setText(textData.map(item => item.text));
          // var textString = "";
          // textData["blocks"].forEach(i => {
          //     textString = textString + " " + i.text;
          // })
          // console.log("textString : ", textString);
          // setText(textString);

          const textString = await TesseractOcr.recognize(image , "tam" , {})
          console.log(textString)

        }
      }
    )()
  },[image])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{text}</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
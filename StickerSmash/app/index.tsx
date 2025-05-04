import { Button, PermissionsAndroid, Platform, Text, View } from "react-native";
import {
  checkIfHasSMSPermission,
  // requestReadSMSPermission,
  startReadSMS,
 } from '@maniac-tech/react-native-expo-read-sms';
import { useState } from "react";

export async function requestReadSMSPermission() {
  console.log('ooooo');
  if (Platform.OS === "android") {
    debugger;
    try {
      const hasPermission = await checkIfHasSMSPermission();
      if (hasPermission.hasReadSmsPermission && hasPermission.hasReceiveSmsPermission) {
        return true;
      }

      const status = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        // PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ]);

      console.log('+++++++++++++++', status);
      // if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
      // if (status === PermissionsAndroid.RESULTS.DENIED) {
      //   console.log("Read Sms permission denied by user.", status);
      // } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      //   console.log("Read Sms permission revoked by user.", status);
      // }

      return false;
    } catch (error) {
      console.error("Error requesting SMS permissions", error);
      return false;
    }
  }
  return true;
}

export default function Index() {
  const [isListening, setIsListening] = useState(false);

  const smsReceived = (data: any) => {
    console.log(data);
  }

  const startReadingSMS = async () => {
    console.log('requesting');
    const hasPermission = await checkIfHasSMSPermission();

    if(hasPermission.hasReadSmsPermission && hasPermission.hasReceiveSmsPermission) {
      setIsListening(true)
      startReadSMS(smsReceived);
    } else {
      setIsListening(false);
      // console.log(requestReadSMSPermission);
      debugger; // requesting
      const result = await requestReadSMSPermission();
      debugger; // result
      console.log('----', result);
    }
  }

  // startReadingSMS().then(() => console.log('listening'));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPress={startReadingSMS} title="Request perms"></Button>
      <Text>{isListening ? 'listening' : 'omg not listening'}</Text>
    </View>
  );
}

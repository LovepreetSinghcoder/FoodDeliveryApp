// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext, { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';


// import LoginScreen from './src/Screens/LoginScreen';
// import AuthStack from './src/Navigation/AuthStack';
// import BottomBar from './src/Components/BottomBar';

export default function App() {
  // const sharedData = 'This is the shared data';

  // useEffect(() => {
  //   // const messaging = firebase.messaging();
  //   (async () => {
  //     console.log('trigerere12')
  //     try {
  //       await messaging.requestPermission();
  //       console.log('dekhhhh')
  //     } catch (error) {
  //       console.error('Error requesting permission:', error);
  //     }
  //   })();
  // }, []);

  // const getDeviceTokan = async () => {
  //   console.log(' 1')
  //   try {
  //     console.log(' 2')

  //     const token = await messaging.getToken();
  //     console.log('FCM token:', token);
  //   } catch (error) {
  //     console.log(' 3')

  //     console.error('Error retrieving token:', error);
  //   }
  // }

  // useEffect(() => {
  //   // const messaging = firebase.messaging();
  //   getDeviceTokan()
  // }, []);


  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     if (status !== 'granted') {
  //       await Notifications.requestPermissionsAsync();
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log('FCM token:', token);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <AuthProvider>

        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <AppNav />
        {/* <StatusBar style="auto" /> */}
        {/* <LoginScreen /> */}
        {/* <AuthStack/> */}
        {/* <BottomBar/> */}
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

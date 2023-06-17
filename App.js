// import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import AuthContext, { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
// import messaging from '@react-native-firebase/messaging';

// import * as Notifications from 'expo-notifications';


// import LoginScreen from './src/Screens/LoginScreen';
// import AuthStack from './src/Navigation/AuthStack';
// import BottomBar from './src/Components/BottomBar';

const CustomNotification = () => {
  return (
    <View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
};

export default function App() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    try {
      messaging()
        .getToken()
        .then((token) => {
          console.log('FCM token:', token);
          // Use the token as needed (e.g., store it in your database or send it to your server)
        })
        .catch((error) => {
          console.log('Error getting FCM token:', error);
        });
    } catch (error) {
      console.log('try block is throw error', error);

    }
  }, [])
  useEffect(() => {

    console.log('dekh1')
    // if (requestUserPermission()) {
    console.log('dekh2')





    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   // Alert.alert('A new FCM message arrived!', remoteMessage);
    //   const formattedMessage = JSON.stringify(remoteMessage, null, 2);
    //   Alert.alert('A new FCM message arrived!', formattedMessage);
    //   console.log(formattedMessage.body)
    // });

    // return unsubscribe;

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { notification } = remoteMessage;
      const title = notification?.title;
      const body = notification?.body;

    
      Alert.alert( title, body , [{ text: 'OK', onPress: () => {} }]);
    
      console.log(title);
    });
    
    return unsubscribe;

  }, [])




  

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

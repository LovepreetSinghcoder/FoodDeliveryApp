import { Alert, StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native';
import AuthContext, { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
import { useContext, useEffect, useState } from 'react'
// import messaging from '@react-native-firebase/messaging';
import { firebase } from './src/Firebase/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomNotification = ({ imageUrl, title, body }) => (
  <View>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
    <Text style={styles.title}>{title}</Text>
    <Text>{body}</Text>
  </View>
);

const App = () => {
  // const [userloggeduid, setUserloggeduid] = useState('');

  // const checkIsLogged = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('userloggeduid');
  //     if (value !== null) {
  //       setUserloggeduid(value);
  //     } else {
  //       console.log('User logged UID not found in AsyncStorage');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving userloggeduid:', error);
  //   }
  // };

  // const registerTokenRefresh = () => {
  //   return () => {
  //     messaging().onTokenRefresh(null);
  //   };
  // };





  //Ye wala kra bhai Comment

  // const requestUserPermission = async () => {
  //   try {
  //     const authStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  //     // const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     const { notification } = remoteMessage;
  //     const title = notification?.title;
  //     const body = notification?.body;

  //     Alert.alert(title, body, [{ text: 'OK', onPress: () => {} }]);
  //   });

  //   return unsubscribe;
  // }, []);




  // // useEffect(() => {
  // //   checkIsLogged();
  // // }, []);

  // // useEffect(() => {
  // //   registerTokenRefresh();
  // // }, [userloggeduid]);

  // // useEffect(() => {
  // //   requestUserPermission();
  // // }, []);

  // const requestNotificationPermission = async () => {
  //   // setLoading(true);
  //   console.log('render 1');

  //   try {
  //     const { status } = await new Promise(async (resolve) => {
  //       const result = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //       );
  //       resolve(result);
  //     });

  //     console.log('render 2');

  //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Permission granted, you can proceed with your logic here
  //       console.log('render 3');
  //       // setNotificationEnabled(true);
  //     } else {
  //       // Handle the case where the user denied permission
  //       console.log('render 4');
  //       // setNotificationEnabled(false);
  //     }
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //     console.log('render 5');
  //     // setNotificationEnabled(false);
  //   }
  //   // finally {
  //   //   setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   requestNotificationPermission();
  // }, []);



  // YHA TKK 
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;



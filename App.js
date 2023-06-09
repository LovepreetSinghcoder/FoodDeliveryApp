// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext, { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
// import LoginScreen from './src/Screens/LoginScreen';
// import AuthStack from './src/Navigation/AuthStack';
// import BottomBar from './src/Components/BottomBar';

export default function App() {
  // const sharedData = 'This is the shared data';
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

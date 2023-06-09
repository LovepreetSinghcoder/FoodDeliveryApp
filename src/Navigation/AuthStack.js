import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}}/>
                {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
                {/* <Stack.Screen name="Profile" component={Profile} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
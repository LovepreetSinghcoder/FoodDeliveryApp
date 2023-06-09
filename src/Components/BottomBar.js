import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../MainScreens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
    return (
        <NavigationContainer>


            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomBar

const styles = StyleSheet.create({})
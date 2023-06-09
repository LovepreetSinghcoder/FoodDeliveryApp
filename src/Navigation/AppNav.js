import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStack from './AppStack'
import AuthStack from './AuthStack'


const AppNav = () => {
    return (
        <View style={styles.container}>
            <AppStack />
            {/* <AuthStack /> */}
        </View>
    )
}

export default AppNav

const styles = StyleSheet.create({
    container :{
        flex: 1,
    }

})
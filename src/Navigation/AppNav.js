import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { AuthContext } from '../Context/AuthContext'


const AppNav = () => {
    const { userloggeduid, checkIsLogged , loading} = useContext(AuthContext);
    useEffect(() => {
        checkIsLogged();
    }, [])

    console.log('dekh bro', userloggeduid)
    return (
        // <View style={styles.container}>



        //     {userloggeduid !== null ? <AppStack /> : <AuthStack />}


        // </View>
        <View style={styles.container}>
            {loading ? null : userloggeduid !== null ? <AppStack /> : <AuthStack />}
        </View>

    )
}

export default AppNav

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
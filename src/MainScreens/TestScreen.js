import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'

const TestScreen = () => {

    const userloggeduid = '7q1DhO9rIMgy1gYP0sV5YqkVa1A3'

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('userData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                // setUserdata(doc.data());
                console.log('dekh veer', doc.data())
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserdata();
    }, []);
    return (
        <View>
            <Text>TestScreen</Text>
        </View>
    )
}

export default TestScreen

const styles = StyleSheet.create({})
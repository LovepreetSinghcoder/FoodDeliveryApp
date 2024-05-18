import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import { Entypo } from '@expo/vector-icons';
import { colors } from '../Global/styles';


const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        setIsLoading(true)
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                setResetSent(true);

                // Provide feedback to the user, e.g., "Password reset email sent!"
            })
            .catch((error) => {
                // Handle error, e.g., email not found in the database
                console.error('Error sending reset email:', error.message);
                alert("Error sending reset email!")
            })
        setIsLoading(false)
    };

    return (
        <>
            {/* <View style={styles.container}>
                <StatusBar
                    backgroundColor={'#4E4E4E'}
                />
                <Text>Enter your email to reset your password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                {resetSent && <Text>Password reset email sent!</Text>}
            </View> */}


            <View style={styles.container}>
                <StatusBar backgroundColor={colors.text1} />
                <View style={styles.container_Head} >
                    <Text style={styles.container_Head_txt}>shovii</Text>
                </View>
                <View style={styles.container_main}>
                    <View style={styles.container_main_in1}>
                        <View style={styles.container_main_in1_1}>
                            <Text style={styles.container_main_in1_1_txt}>Recover Credentials</Text>
                        </View>


                    </View>
                    <View style={styles.container_main_in2}>
                        <Entypo name="email" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 3 }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>


                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </TouchableOpacity>

                    }
                    {resetSent &&
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                            <Text >Password reset email sent!</Text>
                        </View>}


                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }} onPress={() => navigation.navigate('login')}>

                        <Text style={{ color: 'red' }}>Login with Credentials?</Text>


                    </TouchableOpacity>
                </View>

            </View>
        </>
    )

}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        // backgroundColor: 'white'
        // backgroundColor: '#ebebeb'
    },
    container_Head: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60
    },
    container_Head_txt: {
        fontSize: 50,
        fontWeight: '900',
        color: colors.text1,
        fontStyle: 'italic'
    },
    container_main: {
        // borderTopWidth: 1,
        borderRadius: 14,
        elevation: 5,
        backgroundColor: colors.col1,
        borderColor: colors.text1
    },
    container_main_in1: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10
    },
    container_main_in2: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 10,
        marginHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
    },
    container_main_in1_1: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    },
    container_main_in1_1_txt: {
        fontSize: 25,
        fontWeight: '600',
        color: colors.text1,
    },
    container_main_in1_2: {
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 11
    },
    container_main_in1_2_txt: {
        color: 'grey'
    },
    input: {
        paddingLeft: 10,
        width: '90%',
    },
    button: {
        // backgroundColor: '#4E4E4E',
        backgroundColor: colors.text1,
        marginHorizontal: 10,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        // color: 'white',
        fontSize: 16,
        fontWeight: '600',
        color: colors.col1,
    },
    signupButton: {
        // backgroundColor: '#4E4E4E',
        backgroundColor: colors.text1,

        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 8,
    },
    signupButtonText: {
        // color: '#FFFFFF',
        // fontWeight: '700',
        // textAlign: 'center',
        // color: 'white',
        fontSize: 15,
        fontWeight: '600',
        color: '#474747',
        color: colors.col1,


        // textShadowColor: 'grey',
    },
});
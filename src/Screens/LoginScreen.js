import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, StatusBar, ActivityIndicator } from 'react-native';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const { LoginHandler, UserLoggedHandler } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);




    const handleLogin = async () => {
        // Perform login logic here using email and password values
        console.log('bhai 1');
        // console.log('Password:', password);
        setIsLoading(true);
        // LoginHandler(email, password);
        if (email !== '' && password !== '') {
            console.log('bhai 2');

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in 
                        var user = userCredential.user.uid;
                        // console.log(user);
                        // ...
                        console.log('bhai 3');

                        // setUserloggeduid(user);
                        UserLoggedHandler(user);
                        console.log('bhai 4');

                        // navigation.navigate('welcomepage');
                    })

                    .catch((error) => {
                        console.log('bhai 5');

                        var errorMessage = error.message;
                        console.log(errorMessage);
                        if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                        ) {
                            // setcustomError('Please enter a valid email address')
                            console.log('error1')
                            alert('Please enter valid credentials!')
                            console.log('bhai 6');

                        }
                        else {
                            // setcustomError('Incorrect email or password')
                            alert('Please enter valid credentials!')
                            console.log('error2')
                            console.log('bhai 7');


                        }
                    })
            } catch (error) {
                console.log('dekh veer', error)
                setIsLoading(false);

            }

        }
        else {
            console.log('bhai 8');

            alert('Please enter valid credentials!')
        }
        console.log('bhai 9');


        setIsLoading(false);
    };


    return (
        <View style={styles.container}>
         <StatusBar
        backgroundColor={colors.col2}
        barStyle="dark-content"
      />
            <View style={styles.container_Head} >
                <Text style={styles.container_Head_txt}>shovii</Text>
            </View>
            <View style={styles.container_main}>
                <View style={styles.container_main_in1}>
                    <View style={styles.container_main_in1_1}>
                        <Text style={styles.container_main_in1_1_txt}>Sign In</Text>
                    </View>

                    <View style={styles.container_main_in1_2}>

                        <TouchableOpacity style={styles.container_main_in1_2_btn} onPress={() => navigation.navigate('Signup')}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: '#fca78b',
                            }}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={styles.container_main_in1_2_txt} >Create your Account!</Text>
                    </View>
                </View>
                <View style={styles.container_main_in2}>
                    {/* <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} /> */}
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
                <View style={styles.container_main_in2}>
                    <FontAwesome5 name="lock" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {isLoading ?

                    <TouchableOpacity style={styles.button} >
                        <ActivityIndicator size="small" color="#fff" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                }

                <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }} onPress={() => navigation.navigate('ResetPassword')}>
               
                    <Text style={{ color: 'red' }}>Forget Password?</Text>


                </TouchableOpacity>
            </View>

        </View>
    );
};

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
        borderRadius: 15,
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
        borderRadius: 15,
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

export default LoginScreen;

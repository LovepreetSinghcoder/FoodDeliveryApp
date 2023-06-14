import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, StatusBar, ActivityIndicator } from 'react-native';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'

const LoginScreen = ({ navigation }) => {
    const { LoginHandler, UserLoggedHandler } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async () => {
        // Perform login logic here using email and password values
        // console.log('Email:', email);
        // console.log('Password:', password);
        setIsLoading(true);
        // LoginHandler(email, password);
        if (email !== '' && password !== '') {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user.uid;
                    // console.log(user);
                    // ...
                    // setUserloggeduid(user);
                    UserLoggedHandler(user);
                    // navigation.navigate('welcomepage');
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                    ) {
                        // setcustomError('Please enter a valid email address')
                        console.log('error1')
                        alert('Please enter valid credentials!')
                    }
                    else {
                        // setcustomError('Incorrect email or password')
                        alert('Please enter valid credentials!')
                        console.log('error2')

                    }
                })
        }
        else {
            alert('Please enter valid credentials!')
        }

        setIsLoading(false);
    };


    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.text1}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isLoading ?

                <TouchableOpacity style={styles.button} >
                    <ActivityIndicator size="small" color="#fff" />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

            }

            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>

                    <Text style={styles.signupButtonText}>SIGN UP</Text>


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
        // backgroundColor: '#ebebeb'
    },
    input: {
        marginBottom: 12,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
    },
    button: {
        // backgroundColor: '#4E4E4E',
        backgroundColor: colors.text1,

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

export default LoginScreen;

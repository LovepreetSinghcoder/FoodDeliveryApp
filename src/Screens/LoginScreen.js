import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text,StatusBar } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here using email and password values
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <StatusBar 
            backgroundColor={'#4E4E4E'}
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' ,marginTop: 12, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
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
        backgroundColor: '#4E4E4E',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    signupButton: {
        backgroundColor: '#4E4E4E',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 8,
    },
    signupButtonText: {
        // color: '#FFFFFF',
        // fontWeight: '700',
        // textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '600',


        // textShadowColor: 'grey',
    },
});

export default LoginScreen;

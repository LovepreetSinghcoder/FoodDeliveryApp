import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';

const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Perform signup logic here using form values
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Address:', address);
        console.log('Phone:', phone);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
             <StatusBar 
            backgroundColor={'#4E4E4E'}
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
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
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' ,marginTop: 12, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.signupButtonText}>LOGIN</Text>
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
    }
    ,
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

export default SignUpScreen;

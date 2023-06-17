import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'

const SignUpScreen = ({ navigation }) => {
    const { SignUpHandler, UserLoggedHandler } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fcmToken, setFcmToken] = useState('')
    useEffect(() => {
        try {
          messaging()
            .getToken()
            .then((token) => {
              console.log('FCM token:', token);
              setFcmToken(token)
              // Use the token as needed (e.g., store it in your database or send it to your server)
            })
            .catch((error) => {
              console.log('Error getting FCM token:', error);
            });
        } catch (error) {
          console.log('try block is throw error', error);
    
        }
      }, [])


    const handleSignup = async () => {


        setIsLoading(true);
        if (name === '') {
            alert("Fill the Name field!");
            // setCustomError("Password doesn't match");
            setIsLoading(false);

            return;
        }

        else if (password != cpassword) {
            alert("Password doesn't match");
            // setCustomError("Password doesn't match");
            setIsLoading(false);

            return;
        }
        else if (phone.length != 10) {
            alert("Phone number should be 10 digit");
            setIsLoading(false);

            // setCustomError("Phone number should be 10 digit");
            return;
        }
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredentials) => {
                    const uid = userCredentials?.user.uid;
                    // console.log(userCredentials?.user.uid);
                    console.log('user created')
                    // setSuccessmsg('User created successfully')
                    if (userCredentials?.user.uid != null) {
                        const userRef = firebase.firestore().collection('UserData').doc(uid)
                        userRef.set(
                            {
                                email: email,
                                password: password,
                                // cpassword: cpassword,
                                phone: phone,
                                name: name,
                                address: address,
                                uid: uid,
                                fcmToken: fcmToken,
                            }
                        ).then(() => {
                            console.log('data added to firestore')
                            // setUserloggeduid(userCredentials?.user?.uid);
                            UserLoggedHandler(userCredentials?.user?.uid);

                            // setSuccessmsg('User created successfully')
                        }).catch((error) => {
                            console.log('firestore error ', error)
                        }

                        )
                    }


                })
                .catch((error) => {
                    console.log('sign up firebase error ', error.message)
                    if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                        // setCustomError('Email already exists')
                        alert("Email already exists");

                    }
                    else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                        // setCustomError('Invalid Email')
                        alert("Invalid Email");

                    }
                    else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                        // setCustomError('Password should be at least 6 characters')
                        alert("Password should be at least 6 characters");

                    }
                    else {
                        // setCustomError(error.message)
                        console.log(error.message)
                    }
                })
            setIsLoading(false);
        }
        catch (error) {
            console.log('sign up system error ', error.message)
            setIsLoading(false);
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={cpassword}
                onChangeText={setCPassword}
                secureTextEntry
            />


            {isLoading ?

                <TouchableOpacity style={styles.button} >
                    <ActivityIndicator size="small" color="#fff" />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>

            }

            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
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
        color: '#474747',
        color: colors.col1,

    }
    ,
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

export default SignUpScreen;

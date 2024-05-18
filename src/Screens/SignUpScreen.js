import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import messaging from '@react-native-firebase/messaging';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const SignUpScreen = ({ navigation }) => {
    const { SignUpHandler, UserLoggedHandler } = useContext(AuthContext);

    const [userloggeduid, setUserloggeduid] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fcmToken, setFcmToken] = useState('')
    const [showMainContainer, setShowMainContainer] = useState(true);
    const [showOTPContainer, setShowOTPContainer] = useState(false);
    const [showNameContainer, setShowNameContainer] = useState(false);
    const [showAddressContainer, setShowAddressContainer] = useState(false);
    const [showPhoneContainer, setShowPhoneContainer] = useState(false);








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




    function isValidEmail(email) {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    }
    const handleSignup = async () => {


        setIsLoading(true);

        if (!email || !password || !cpassword) {
            alert('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address!');
            setIsLoading(false);
            return;
        }

        if (password !== cpassword) {
            alert("Password and Confirm Password don't match!");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            setIsLoading(false);
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
                                uid: uid,
                                fcmToken: fcmToken,
                            }
                        ).then(() => {
                            console.log('data added to firestore')
                            // setUserloggeduid(userCredentials?.user?.uid);
                            // UserLoggedHandler(userCredentials?.user?.uid);
                            setUserloggeduid(userCredentials?.user?.uid)
                            setShowMainContainer(false)
                            setShowNameContainer(true)

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
            // setIsLoading(false);
        }
        catch (error) {
            console.log('sign up system error ', error.message)
            // setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleProfileName = () => {
        // Logic to save profile changes
        setIsLoading(true)
        if (name === '' || name.length < 3) {
            alert("Fill the valid Name!");
            setIsLoading(false);
            return;
        }
        else {
            setShowNameContainer(false)
            setShowAddressContainer(true)
        }

        setIsLoading(false)
    };

    const handleProfileAddress = async () => {
        // Logic to save profile changes
        setIsLoading(true)
        if (address === '' || address.length < 3) {
            alert("Fill the valid Address!");
            setIsLoading(false);

            return;
        }
        else {
            setShowAddressContainer(false)
            setShowPhoneContainer(true)
        }

        setIsLoading(false)
    };

    const handleProfileData = async () => {
        // Logic to save profile changes
        setIsLoading(true)
        if (phone.length != 10) {
            alert("Phone number should be 10 digit");
            setIsLoading(false);
            return;
        }

        // setAddressError(false);

        try {
            await firebase.firestore().collection('UserData').doc(userloggeduid).update({
                name: name,
                phone: phone,
                address: address,
            });
            console.log('Data updated successfully');
            setShowPhoneContainer(false)

            UserLoggedHandler(userloggeduid);


        } catch (error) {
            console.log('Error updating Data:', error);
            alert("There is somthing error!");

        }
        setIsLoading(false)
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.text1}
            />
            <View style={styles.container_Head} >
                <Text style={styles.container_Head_txt}>shovii</Text>
            </View>

            {showMainContainer && (
                <View style={styles.container_main}>
                    <View style={styles.container_main_in1}>
                        <View style={styles.container_main_in1_1}>
                            <Text style={styles.container_main_in1_1_txt}>Sign Up</Text>
                        </View>
                        <View style={styles.container_main_in1_2}>
                            <TouchableOpacity style={styles.container_main_in1_2_btn} onPress={() => navigation.navigate('login')}>
                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: '600',
                                    color: '#fca78b',
                                }}>Sign In</Text>
                            </TouchableOpacity>
                            <Text style={styles.container_main_in1_2_txt} >Already have an Account?</Text>

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
                    <View style={styles.container_main_in2}>
                        <FontAwesome5 name="lock" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={cpassword}
                            onChangeText={setCPassword}
                            secureTextEntry
                        />
                    </View>


                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>

                    }

                    {/* <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                        <Text>Already have an account?</Text>
                     
                    </View> */}

                </View>
            )
            }


            {showOTPContainer && (
                <View style={styles.container_main1}>
                    {/* <View style={styles.container_main_in1}>
                        <View style={styles.container_main_in1_1}>
                            <Text style={styles.container_main_in1_1_txt}>Sign Up</Text>
                        </View>

                        <TouchableOpacity style={styles.container_main_in1_1} onPress={() => navigation.navigate('login')}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: '#fca78b',
                            }}>Sign In</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.container_main_in2}>
                        <FontAwesome5 name="user-check" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} />

                        <TextInput
                            style={styles.input}
                            placeholder="OTP"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>


                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>VERIFY</Text>
                        </TouchableOpacity>

                    }



                </View>

            )}


            {showNameContainer && (
                <View style={styles.container_main1}>
                    {/* <View style={styles.container_main_in1}>
                    <View style={styles.container_main_in1_1}>
                        <Text style={styles.container_main_in1_1_txt}>Sign Up</Text>
                    </View>

                    <TouchableOpacity style={styles.container_main_in1_1} onPress={() => navigation.navigate('login')}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: '600',
                            color: '#fca78b',
                        }}>Sign In</Text>
                    </TouchableOpacity>
                </View> */}

                    <View style={styles.container_main_in2}>
                        <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>


                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleProfileName}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>

                    }



                </View>
            )}


            {showAddressContainer && (
                <View style={styles.container_main1}>
                    {/* <View style={styles.container_main_in1}>
                        <View style={styles.container_main_in1_1}>
                            <Text style={styles.container_main_in1_1_txt}>Sign Up</Text>
                        </View>

                        <TouchableOpacity style={styles.container_main_in1_1} onPress={() => navigation.navigate('login')}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: '#fca78b',
                            }}>Sign In</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.container_main_in2}>
                        <Entypo name="address" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 3 }} />

                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={setAddress}
                        />

                    </View>


                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleProfileAddress}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>

                    }

                </View>
            )}


            {showPhoneContainer && (



                <View style={styles.container_main1}>
                    {/* <View style={styles.container_main_in1}>
                    <View style={styles.container_main_in1_1}>
                        <Text style={styles.container_main_in1_1_txt}>Sign Up</Text>
                    </View>

                    <TouchableOpacity style={styles.container_main_in1_1} onPress={() => navigation.navigate('login')}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: '600',
                            color: '#fca78b',
                        }}>Sign In</Text>
                    </TouchableOpacity>
                </View> */}

                    <View style={styles.container_main_in2}>


                        <FontAwesome5 name="phone" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 2 }} />


                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />


                    </View>

                    {isLoading ?

                        <TouchableOpacity style={styles.button} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={handleProfileData}>
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>

                    }

                </View>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
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
        borderColor: colors.text1,
        paddingBottom: 20
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
    container_main1: {
        borderRadius: 14,
        elevation: 5,
        backgroundColor: colors.col1,
        borderColor: colors.text1,
        paddingVertical: 10
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

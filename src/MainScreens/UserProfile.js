import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors } from '../Global/styles';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import LineWithText from '../Components/LineWithText';
import Restaurants from '../Components/Restaurants';
import { FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';

const UserProfile = ({ navigation }) => {
  const { userloggeduid, userDataHandler } = useContext(AuthContext);
  const { logout, userdata } = useContext(AuthContext);
  const initial = userdata?.name ? userdata.name.charAt(0).toUpperCase() : 'U';
  // const [userdata, setUserdata] = useState(null);
  const [otpSlider, setOTPSlider] = useState(false)
  const [otpEmail, setOTPEmail] = useState('')

  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const [otpSentLoading, setOTPSentLoading] = useState(false)
  const [emailOTPInput, setEmailOTPInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEditProfile = () => {
    navigation.navigate('Editprofile')
  };

  const sendEmailOtp = async (email) => {
    console.log('Otp sent')
    setOTPSentLoading(true)
    // const response =
    await axios.post('https://shoviiserver.onrender.com/send-otp', { email })
      .then(response => {
        alert('Otp sent on your email!');
        setOTPSlider(true)
        setOTPEmail(response.data.otp)
        console.log('this is the data from server', response.data)
      })
      .catch(error => {
        console.error(error);
      });
    setOTPSentLoading(false)
    // console.log('this is the data', response)


  }
  const handleEmailVerify = async () => {
    setIsLoading(true)
    // navigation.navigate('Editprofile')
    console.log('Otp verification sent')
    if (otpEmail === emailOTPInput) {
      try {
        await firebase.firestore().collection('UserData').doc(userloggeduid).update({
          isVerifiedEmail: true,
        });
        console.log('Email verified successfully');
        alert('Email verified successfully.');
        setOTPSlider(false)
        navigation.navigate('Profile')
      } catch (error) {
        console.log('Error updating address:', error);
        alert('Error, Try again.');


      }
    }
    else {
      alert('Wrong OTP!')
    }
    setIsLoading(false)
  };



  const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        userDataHandler(doc.data())
      })
    }
    else {
      console.log('no user data');
    }
  }

  useEffect(() => {

    getuserdata();
  }, [userloggeduid]);


  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('triggered')
  //   }, [])
  // );

  // console.log('this is the isVerifiedEmail:', userdata.isVerifiedEmail)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
      }} onPress={() => { navigation.navigate('AccountSettingsScreen') }} >
        <FontAwesome6 name="arrow-left" size={20} color="black" />
        <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Profile</Text>
      </TouchableOpacity>

      <View style={styles.containerIn}>
        <TouchableOpacity style={styles.cardLogo} >
          <Text style={styles.cardLogoText}>{initial}</Text>
        </TouchableOpacity>



        <View style={styles.container_input}>
          <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{
            paddingLeft: 5,
            // paddingTop: 7 
          }
          } />

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={userdata ? userdata.name || '' : ''}
            onChangeText={setFullName}
            editable={false}
          />
        </View>
        <View style={[styles.container_input, {}]}>
          <Entypo name="email" size={21} color="#ccc" style={{
            paddingLeft: 3,
          }} />

          <TextInput
            style={[styles.input, { width: '76%', backgroundColor: 'greeen' }]}
            placeholder="Email"
            value={userdata ? userdata.email || '' : ''}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false}
          />
          {!userdata.isVerifiedEmail ?
            <TouchableOpacity style={{ borderLeftWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 14 }} onPress={() => sendEmailOtp(userdata.email)}>
              {otpSentLoading ?
                <ActivityIndicator size="small" color={colors.text1} />
                :
                <Text style={{ color: colors.text1, fontSize: 15 }}>Verify</Text>
              }
            </TouchableOpacity>
            :
            <View style={{ borderLeftWidth: 1, borderColor: '#ccc', paddingHorizontal: 7, paddingVertical: 14 }} >

              <Text style={{ color: colors.text1, fontSize: 13 }}>Verified</Text>

            </View>
          }
        </View>
        {otpSlider && <View style={[styles.container_input, { flexDirection: 'column', height: 120 }]}>
          <TextInput
            style={[styles.input, { margin: 'auto', alignSelf: 'center' }]}
            placeholder="OTP"
            value={emailOTPInput}
            onChangeText={setEmailOTPInput}
            keyboardType="default"
          // editable={false}
          />
          <TouchableOpacity style={[styles.editButton, { width: '100%' }]} onPress={handleEmailVerify}>
            {
              isLoading ?
                <ActivityIndicator size="small" color='#fff' />
                :

                <Text style={styles.editButtonText}>Verify</Text>
            }
          </TouchableOpacity>
        </View>}
        <View style={styles.container_input}>
          <Entypo name="address" size={21} color="#ccc" style={{
            paddingLeft: 3,
            //  paddingTop: 7 
          }} />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={userdata ? userdata.address || '' : ''}
            // onChangeText={setEmail}
            keyboardType="default"
            editable={false}
          />
        </View>
        <View style={styles.container_input}>
          <FontAwesome5 name="phone" size={20} color="#ccc" style={{
            paddingLeft: 5,
          }} />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={userdata ? userdata.phone || '' : ''}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={false}
          />
        </View>

        <View style={styles.container_input}>
          <FontAwesome5 name="birthday-cake" size={20} color="#ccc" style={{
            paddingLeft: 5,
          }} />

          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={userdata ? userdata.DOB || '' : ''}
            onChangeText={setPhoneNumber}
            // keyboardType="phone-pad"
            editable={false}
          />
        </View>

        <View style={styles.container_input}>
          <FontAwesome5 name="transgender" size={20} color="#ccc" style={{
            paddingLeft: 5,
          }} />

          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={userdata ? userdata.gender || '' : ''}
            onChangeText={setPhoneNumber}
            // keyboardType="phone-pad"
            editable={false}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Update Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor: '#fff',
    backgroundColor: '#f5f6fb',

  },
  containerIn: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 80,
    backgroundColor: colors.col2,
    // backgroundColor: 'red',
    borderRadius: 15
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
    // justifyContent: 'center',
    // margin: 'auto',
    // alignContent: 'center'
    // , alignSelf: 'center'
  },
  cardLogo: {
    backgroundColor: '#dce8ff',
    padding: 0,
    margin: 20,
    marginTop: -60,
    borderRadius: 50, // Ensures the button is round
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100
    , alignSelf: 'center'

  },
  cardLogoText: {
    color: '#2d6edb',
    fontSize: 40,
    fontWeight: '600',
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 16,
    paddingLeft: 5
  },
  container_input: {
    flexDirection: 'row',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignContent: 'center'
    , alignItems: 'center'
  },
  input: {
    paddingLeft: 7
  },
  editButton: {
    // backgroundColor: '#4E4E4E',
    backgroundColor: colors.text1,
    margin: 15,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },

  // Test Button Check map 

  editButton_test: {

    backgroundColor: colors.text1,

    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    // color: '#474747',
    color: colors.col1,


    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 20,
    height: 20,
  }
});

export default UserProfile;

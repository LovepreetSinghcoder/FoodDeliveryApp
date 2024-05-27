import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors } from '../Global/styles';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import LineWithText from '../Components/LineWithText';
import Restaurants from '../Components/Restaurants';
import { FontAwesome6 } from '@expo/vector-icons';


const UserProfile = ({ navigation }) => {
  const { userloggeduid,userDataHandler } = useContext(AuthContext);
  const { logout, userdata } = useContext(AuthContext);
  const initial = userdata?.name ? userdata.name.charAt(0).toUpperCase() : 'U';
  // const [userdata, setUserdata] = useState(null);

  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const handleEditProfile = () => {
    navigation.navigate('Editprofile')
  };


  const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        // setUserdata(doc.data());
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


  useFocusEffect(
    React.useCallback(() => {
      // getuserdata();
      console.log('triggered')
    }, [])
  );
  // console.log('dekh veere',userdata )

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
        <View style={styles.container_input}>
          <Entypo name="email" size={21} color="#ccc" style={{
            paddingLeft: 3,
            // paddingTop: 7 
          }} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userdata ? userdata.email || '' : ''}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false}
          />
        </View>
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

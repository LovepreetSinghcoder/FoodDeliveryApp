import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors } from '../Global/styles';
import { useFocusEffect } from '@react-navigation/native';

const UserProfile = ({ navigation }) => {
  const { userloggeduid, } = useContext(AuthContext);
  const [userdata, setUserdata] = useState(null);

  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const handleEditProfile = () => {
    // Logic to save profile changes
    // This is just a placeholder function
    // console.log('Profile changes saved!');
    navigation.navigate('Editprofile')
  };


  const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
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
      getuserdata();
      console.log('triggered')
    }, [])
  );
  // console.log('dekh veere',userdata )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userdata ? userdata.name || '' : ''}
        onChangeText={setFullName}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userdata ? userdata.email || '' : ''}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userdata ? userdata.address || '' : ''}
        // onChangeText={setEmail}
        keyboardType="default"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userdata ? userdata.phone || '' : ''}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        editable={false}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  editButton: {
    // backgroundColor: '#4E4E4E',
    backgroundColor: colors.text1,

    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    // color: '#474747',
    color: colors.col1,


    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;

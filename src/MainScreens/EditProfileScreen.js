import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';


const EditProfileScreen = ({ navigation }) => {
  const { userloggeduid } = useContext(AuthContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false)
  const [addressError, setAddressError] = useState(false);


  const handleSaveProfile = async () => {
    // Logic to save profile changes
    setLoading(true)
    if (address.length >= 3) {
      setAddressError(false);

      try {
        await firebase.firestore().collection('UserData').doc(userloggeduid).update({
          address: address,
        });
        console.log('Address updated successfully');
        navigation.navigate('Profile')
      } catch (error) {
        console.log('Error updating address:', error);
      }
    } else {
      setAddressError(true);

      console.log('Please enter valid Address');
    }
    setLoading(false)

    // console.log('Profile changes saved!');
  };

  const inputStyle = [styles.input];
  const inputStylet = [{ margin: 0, color: 'white', marginTop: -20 }];

  if (addressError) {
    inputStyle.push(styles.invalidInput);
    inputStylet.push({ marginBottom: 10, marginTop: -13, color: 'red', paddingHorizontal: 10 })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      /> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      /> */}
      <TextInput
        style={inputStyle}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      // keyboardType="phone-pad"
      />
      <Text style={inputStylet}>Please enter valid address!</Text>


      {loading ?

        <TouchableOpacity style={styles.saveButton} >
          <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

      }
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
  invalidInput: {
    borderColor: 'red',
    borderBottomWidth: 2,
  },
  saveButton: {
    // backgroundColor: '#4E4E4E' ,
    backgroundColor: '#2EEAB1',


    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    color: '#474747',

    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;

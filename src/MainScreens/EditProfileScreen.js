import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { colors } from '../Global/styles';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';



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

      <TouchableOpacity style={{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
      }} onPress={() => { navigation.navigate('AccountSettingsScreen') }} >
        <FontAwesome6 name="arrow-left" size={20} color="black" />
        <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Update Profile</Text>
      </TouchableOpacity>


      <View style={inputStyle}>
        <Entypo name="address" size={21} color="#ccc" style={{ paddingLeft: 3,}} />
        <TextInput
          // style={inputStyle}
          style={styles.input_in}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        // keyboardType="phone-pad"
        />
      </View>
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
    // padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container_input: {

  },
  input: {
    flexDirection: 'row',
    // paddingLeft: 5,
    margin: 10,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 16
    ,alignItems: 'center'
  },
  invalidInput: {
    borderColor: 'red',
    borderBottomWidth: 2,
  },

  input_in: {
    paddingLeft: 4,
    width: '90%',
  },
  saveButton: {
    // backgroundColor: '#4E4E4E' ,
    backgroundColor: colors.text1,


    borderRadius: 15,
    margin: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    // color: '#474747',
    color: colors.col1,

    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;

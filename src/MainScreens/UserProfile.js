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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        <Text style={styles.heading}>My Profile</Text>
        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', height: 30, width: 70, paddingVertical: 4, borderRadius: 25, paddingHorizontal: 4, }}>
          <Text style={{ paddingHorizontal: 5, fontSize: 16, minWidth: '10%', }}>{userdata ? userdata.totalCoin || '0' : '0'}</Text>
          <Image source={require('../Images/coin.png')} style={styles.image} />

        </View>

      </View>

      <View style={styles.container_input}>
        <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 7 }} />

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={userdata ? userdata.name || '' : ''}
          onChangeText={setFullName}
          editable={false}
        />
      </View>
      <View style={styles.container_input}>
        <Entypo name="email" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 7 }} />

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
        <Entypo name="address" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 7 }} />

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
        <FontAwesome5 name="phone" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 7 }} />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={userdata ? userdata.phone || '' : ''}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          editable={false}
        />
      </View>


      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* <Restaurants navigation={navigation} title={'RESTAURANTS & CLOUD KITCHENS'}/> */}

    
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
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 16,
    paddingLeft: 5
  },
  container_input: {
    flexDirection: 'row',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  input: {
    paddingLeft: 7
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
  image: {
    width: 20,
    height: 20,
  }
});

export default UserProfile;

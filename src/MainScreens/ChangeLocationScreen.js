import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../Global/styles'
import { AuthContext } from '../Context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ChangeLocationScreen = ({ navigation }) => {
  const { SetLocationName } = useContext(AuthContext);
  const [newlocation, setNewLocation] = useState('');

  const NewLocationhandler = () => {
    if (newlocation.trim() === '' || newlocation.trim().length <= 3) {
      alert('Please enter a valid location!');
      return;
    }
    // console.log('triggere')
    SetLocationName(newlocation)
    navigation.navigate('HomeScreen')
  }
  return (
    <View style={styles.Maincontainer}>
      <StatusBar
        backgroundColor={colors.text1}
      />
      <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
        <View style={styles.location_container}>
          <Ionicons name="ios-location" size={28} color={colors.text1} style={{ paddingLeft: 3, paddingTop: 3 }} />

          <TextInput
            style={styles.locationinput}
            placeholder="Set your location"
            value={newlocation}
            onChangeText={(text) => setNewLocation(text)}

            autoCapitalize="none"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity style={styles.locationbutton}
          onPress={() => { NewLocationhandler() }}
        >
          <Text style={styles.lbuttonText}>Set Location</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20, paddingHorizontal: 35, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ textAlign: 'center' }}>We are currently focused on serving our valued customers in Desu Jodha, Phullo, Haibunana, Mangeana, Jogewala, Panniwala Moreka & Sekhu. However, we understand that there is demand for our services in other areas as well, and we are working diligently to expand our reach to other locations. We appreciate your interest in our services, and we hope to be able to offer them to you in the near future. Stay tuned for updates on our expansion efforts!</Text>
      </View>


    </View>
  )
}

export default ChangeLocationScreen

const styles = StyleSheet.create({
  Maincontainer: {
    // backgroundColor: 'green',
    flex: 1,
    height: '100%'

  },
  location_container: {

    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
  },

  locationinput: {
    paddingLeft: 5,
    width: '90%',
    
  },
  locationbutton: {
    backgroundColor: colors.text1,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
  },
  lbuttonText: {
    color: 'white',
    color: '#474747',
    color: colors.col1,
    fontSize: 16,
    fontWeight: '600'
  },
})
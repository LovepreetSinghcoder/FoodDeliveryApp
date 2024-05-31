import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../Global/styles'
import { AuthContext } from '../Context/AuthContext';
import { FontAwesome6 } from '@expo/vector-icons';

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
      <View style={{ paddingVertical: 10, paddingHorizontal: 16, marginTop: 10, }}>
        <View style={styles.location_container}>
          <FontAwesome6 name="location-dot" size={28} color={colors.text1} style={{ paddingVertical: 6 }} />
          {/* <Ionicons name="ios-location" size={28} color={colors.text1} style={{ paddingLeft: 3, paddingTop: 3 }} /> */}

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
      <View style={styles.container}>
        <Text></Text>
        <Text style={styles.text}>
          We are currently focused on serving our valued customers in select areas. However, we understand that there is demand for our services in other regions as well, and we are working diligently to expand our reach.
        </Text>
        <Text style={styles.text}>
          If you are a restaurant owner, feel free to apply on our platform. This free platform allows you to easily set your area name. Once registered, your restaurant will go live in that location, making it accessible to all users in the area.
        </Text>

        <Text style={styles.text}>
          We appreciate your interest in our services and hope to offer them in more locations soon. Stay tuned for updates on our expansion efforts!
        </Text>
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
    paddingVertical: 5,
    marginHorizontal: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
  },

  locationinput: {
    paddingLeft: 5,
    width: '90%',
    fontSize: 15

  },
  locationbutton: {
    // backgroundColor: colors.text1,
    // borderRadius: 15,
    // padding: 10,
    // alignItems: 'center',

    backgroundColor: colors.text1
    ,
    // backgroundColor: 'red',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  lbuttonText: {
    color: 'white',
    color: '#474747',
    color: colors.col1,
    fontSize: 16,
    fontWeight: '600'
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 10,
    textAlign: 'justify',
    textTransform: 'none', // Change this to 'uppercase', 'lowercase', or 'capitalize' if needed
  },
})
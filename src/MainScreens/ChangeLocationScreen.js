import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../Global/styles'
import { AuthContext } from '../Context/AuthContext';

const ChangeLocationScreen = ({navigation}) => {
  const { SetLocationName} = useContext(AuthContext);
  const [newlocation, setNewLocation] = useState('');

const NewLocationhandler = () => {
    console.log('triggere')
    SetLocationName(newlocation)
    navigation.navigate('HomeScreen')
}
  return (
    <View style={styles.Maincontainer}>
    <StatusBar
      backgroundColor={colors.text1}
    />
    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
      <TextInput
        style={styles.locationinput}
        placeholder="Set your location"
        value={newlocation}
        onChangeText={(text) => setNewLocation(text)}
        keyboardType="text"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.locationbutton}
       onPress={() =>{NewLocationhandler()}}
      >
        <Text style={styles.lbuttonText}>Set Location</Text>
      </TouchableOpacity>
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
    
      locationinput: {
        marginBottom: 12,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
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

        fontSize: 16,
        fontWeight: '600'
      },
})
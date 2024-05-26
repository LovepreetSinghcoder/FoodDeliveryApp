import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';

import { FontAwesome6 } from '@expo/vector-icons';

const HeaderBar = ({ title, onButtonPress, navigation }) => {
  const { locationName, userdata } = useContext(AuthContext);
  const initial = userdata?.name ? userdata.name.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.container}>


      <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => { navigation.navigate('Changeloction') }}>
        {/* <Ionicons name="ios-location" size={28} color={colors.text1} style={{ paddingVertical: 6 }} /> */}
        <FontAwesome6 name="location-dot" size={28} color={colors.text1} style={{ paddingVertical: 6 }} />
        <View style={{ paddingHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', }}>

            <Text style={{ paddingRight: 3, fontWeight: '700', fontSize: 16 }}>Location</Text>

            <AntDesign name="caretdown" size={12} color="black" style={{ paddingTop: 4 }} />
          </View>


          <Text>{locationName ? locationName.toLowerCase() : 'Select your location'}</Text>


        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/shoviiofficial/') }} style={{ paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, }}>
        <Ionicons name="logo-instagram" size={28} color={colors.text1} />
      </TouchableOpacity> */}

      <TouchableOpacity style={{
        backgroundColor: '#dce8ff',
        padding: 0,
        margin: 10,
        borderRadius: 50, // Ensures the button is round
        justifyContent: 'center',
        alignItems: 'center',
        width: 40, // Ensures the button is circular (width and height are equal)
        height: 40
      }} onPress={() => { navigation.navigate('AccountSettingsScreen') }}>
        <Text style={{
          color: '#2d6edb',
          fontSize: 20,
          fontWeight: 'bold',
        }}>{initial}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#2EEAB1",
  },
});

export default HeaderBar;

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';

import { FontAwesome6 } from '@expo/vector-icons';


const HeaderBarMaps = ({navigation}) => {
  const { locationName, userdata } = useContext(AuthContext);

  return (
    <View style={styles.container}>


    <TouchableOpacity style={{ flexDirection: 'row', }} >
      <FontAwesome6 name="location-dot" size={28} color={colors.text1} style={{ paddingVertical: 6 }} />
      <View style={{ paddingHorizontal: 5 }}>
        <View style={{ flexDirection: 'row', }}>

          <Text style={{ paddingRight: 3, fontWeight: '700', fontSize: 16 }}>Location</Text>

          <AntDesign name="caretdown" size={12} color="black" style={{ paddingTop: 4 }} />
        </View>


        <Text>{locationName ? locationName.toLowerCase() : 'Select your location'}</Text>


      </View>
    </TouchableOpacity>
    </View>
  )
}

export default HeaderBarMaps

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
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { FontAwesome6 } from '@expo/vector-icons';

const ChangeLocationScreen = ({ navigation }) => {
  const { SetLocationName } = useContext(AuthContext);
  const [newLocation, setNewLocation] = useState('');

  const handleNewLocation = () => {
    if (newLocation.trim() === '' || newLocation.trim().length <= 3) {
      alert('Please enter a valid location!');
      return;
    }
    SetLocationName(newLocation);
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.locationContainer}>
          <FontAwesome6 name="location-dot" size={28} color={colors.text1} style={styles.locationIcon} />
          <TextInput
            style={styles.locationInput}
            placeholder="Set your location"
            value={newLocation}
            onChangeText={setNewLocation}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <TouchableOpacity style={styles.locationButton} onPress={handleNewLocation}>
          <Text style={styles.buttonText}>Set Location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
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
  );
};

export default ChangeLocationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
  },
  locationIcon: {
    paddingVertical: 6,
  },
  locationInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: colors.text1,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.col1,
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 10,
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

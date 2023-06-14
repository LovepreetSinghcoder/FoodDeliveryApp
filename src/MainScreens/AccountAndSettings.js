import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { colors } from '../Global/styles';

const AccountSettingsScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Logic for handling logout
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account and Settings</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText} >Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Editprofile')}>
        <Text style={styles.buttonText} >Edit Profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Notification Settings</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    height: 48,
    // backgroundColor: '#4E4E4E',
    backgroundColor: colors.text1,


    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    // color: '#fff',
    // fontSize: 16,
    // fontWeight: 'bold',
    color: colors.col1,

    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 'auto',
  },
  logoutButtonText: {
    color: '#4E4E4E',

    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountSettingsScreen;

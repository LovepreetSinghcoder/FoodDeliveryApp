import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { colors } from '../Global/styles';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-elements/dist/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const AccountSettingsScreen = ({ navigation }) => {

  const { logout, userdata } = useContext(AuthContext);
  const initial = userdata?.name ? userdata.name.charAt(0).toUpperCase() : 'U';
  const firstName = userdata?.name ? userdata.name.split(" ")[0] : 'User';
  const userEmail = userdata?.email ? userdata.email : '.....loading';

  const handleLogout = () => {
    // Logic for handling logout
    logout();
  };






  return (
    <View style={styles.container}>


      <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: colors.col2, padding: 15 }} onPress={() => { navigation.navigate('HomeScreen') }} >
        <FontAwesome6 name="arrow-left" size={24} color="black" />

      </TouchableOpacity>

      {/* Card to display User logo, First name and Email */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
        <TouchableOpacity style={styles.cardLogo} >
          <Text style={styles.cardLogoText}>{initial}</Text>
        </TouchableOpacity>

        <View style={styles.cardText}>
          <Text style={styles.cardTextFirstName}>{firstName}</Text>
          <Text style={styles.cardTextUserEmail}>{userEmail}</Text>
          <Text style={styles.cardTextActivity}>View Activity {'>'}</Text>
        </View>
      </TouchableOpacity>


      {/* Scroll View Start for Entire content */}
      <ScrollView>

        {/* Button for Check Update of the App */}
        <TouchableOpacity style={styles.acbutton} onPress={() => { Linking.openURL('https://play.google.com/store/apps/details?id=com.shovii.india.shovii') }}>
          <View style={styles.acbuttonView} >


            <View style={styles.acbuttonViewCont}>
              <SimpleLineIcons name="refresh" size={15} color="#c9c9c9" />
              {/* <FontAwesome5 name="user" size={15} color="#c9c9c9" /> */}
            </View>
            <Text style={styles.acbuttonViewText}>App update available</Text>
          </View>
          <Text style={styles.acbuttonLastText}>{'>'}</Text>
        </TouchableOpacity>


        {/* Button for View UserProfile */}
        <TouchableOpacity style={styles.acbutton} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.acbuttonView} >


            <View style={styles.acbuttonViewCont}>

              <FontAwesome5 name="user" size={15} color="#c9c9c9" />
            </View>
            <Text style={styles.acbuttonViewText}>Your profile</Text>
          </View>
          <Text style={styles.acbuttonLastText}>{'>'}</Text>
        </TouchableOpacity>

        {/* Button for edit the address of the user  */}
        <TouchableOpacity style={styles.acbutton} onPress={() => navigation.navigate('Editprofile')}>
          <View style={styles.acbuttonView} >


            <View style={styles.acbuttonViewCont}>

              <FontAwesome5 name="user" size={15} color="#c9c9c9" />
            </View>
            <Text style={styles.acbuttonViewText}>Edit address</Text>
          </View>
          <Text style={styles.acbuttonLastText}>{'>'}</Text>
        </TouchableOpacity>


        <View style={styles.buttonSection}>

          <View style={styles.buttonSectionHeading}>
            <Text style={styles.buttonSectionHeadingText}>Food Orders</Text>
          </View>


          <TouchableOpacity style={styles.buttonSectionBtn} onPress={() => { navigation.navigate('Track Orders') }} >
            <View style={{
              backgroundColor: '#f5f6fb',
              padding: 0,
              margin: 0,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30
            }}>

              <MaterialCommunityIcons name="food-takeout-box" size={15} color="#c9c9c9" />
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderBottomWidth: 1.5, borderColor: '#ebebeb' }} >
              <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '500' }}>Your orders</Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 20, fontWeight: '400' }}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', paddingVertical: 15, marginHorizontal: 15, marginBottom: 15, borderRadius: 15, }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderLeftWidth: 3,
            // borderLeftColor: 'red',
            borderLeftColor: colors.text1,

            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>More</Text>
          </View>


          <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            // paddingVertical: 5, 
            marginHorizontal: 15,
            // marginBottom: 15, 
            borderRadius: 15,
            alignItems: 'center',
          }} onPress={() => { navigation.navigate('AboutScreen') }} >
            <View style={{
              backgroundColor: '#f5f6fb',
              padding: 0,
              margin: 0,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30
            }}>
              <AntDesign name="infocirlceo" size={15} color="#c9c9c9" />
              {/* <MaterialCommunityIcons name="food-takeout-box" size={15} color="#c9c9c9" /> */}
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderBottomWidth: 1.5, borderColor: '#ebebeb' }} >
              <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '500' }}>About</Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 20, fontWeight: '400' }}>{'>'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row', backgroundColor: '#ffffff',
            // paddingVertical: 5,
            marginHorizontal: 15,
            // marginBottom: 15, 
            borderRadius: 15, alignItems: 'center',
          }} onPress={() => { navigation.navigate('AppSettings') }} >
            <View style={{
              backgroundColor: '#f5f6fb',
              padding: 0,
              margin: 0,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30
            }}>
              <MaterialIcons name="settings" size={15} color="#c9c9c9" />
              {/* <MaterialCommunityIcons name="food-takeout-box" size={15} color="#c9c9c9" /> */}
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderBottomWidth: 1.5, borderColor: '#ebebeb' }} >
              <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '500' }}>Settings</Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 20, fontWeight: '400' }}>{'>'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row', backgroundColor: '#ffffff',
            //  paddingVertical: 5,
            marginHorizontal: 15,
            // marginBottom: 15,
            borderRadius: 15,
            alignItems: 'center',
          }} onPress={handleLogout} >
            <View style={{
              backgroundColor: '#f5f6fb',
              padding: 0,
              margin: 0,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30
            }}>
              <MaterialIcons name="power-settings-new" size={15} color="#c9c9c9" />
              {/* <MaterialCommunityIcons name="food-takeout-box" size={15} color="#c9c9c9" /> */}
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderBottomWidth: 1.5, borderColor: '#ebebeb' }} >
              <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '500' }}>Logout</Text>
              <Text style={{ paddingHorizontal: 10, fontSize: 20, fontWeight: '400' }}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* <View style={{ paddingHorizontal: 16 }}>


          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor: '#fff',
    backgroundColor: '#f5f6fb',

    // justifyContent: 'center',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  cardLogo: {
    backgroundColor: '#dce8ff',
    padding: 0,
    margin: 0,
    borderRadius: 50, // Ensures the button is round
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70
  },
  cardLogoText: {
    color: '#2d6edb',
    fontSize: 30,
    fontWeight: '600',
  },
  cardText: { paddingHorizontal: 10 },
  cardTextFirstName: {
    fontSize: 30,
    fontWeight: '500',
  },
  cardTextUserEmail: {
    fontWeight: '500',
    paddingVertical: 5
  },
  cardTextActivity: {
    color: 'red',
    color: colors.text1,

  },
  acbutton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  acbuttonView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  acbuttonViewCont: {
    backgroundColor: '#f5f6fb',
    padding: 0,
    margin: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  },
  acbuttonViewText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  acbuttonLastText: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: '400'
  },
  buttonSection: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  buttonSectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 3,
    // borderLeftColor: 'red',
    borderLeftColor: colors.text1,

    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonSectionHeadingText: { fontSize: 18, fontWeight: '600' },
  buttonSectionBtn: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
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

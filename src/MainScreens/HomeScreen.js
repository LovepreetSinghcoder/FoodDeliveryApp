import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, FlatList, ScrollView, TextInput, ActivityIndicator, Linking, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from '../Components/HeaderBar'
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors, veg, nonveg } from '../Global/styles'
import OfferSlider from '../Components/OfferSlider';
import Cardslider from '../Components/Cardslider';
import Categories from '../Components/Categories';
import { AuthContext } from '../Context/AuthContext';
import * as Location from 'expo-location';

import axios from 'axios';
const Version = '1.0.0';

const HomeScreen = ({ navigation }) => {
  const { userloggeduid, checkIsLogged, SetLocationName, locationName } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed');
  };

  const [appdata, setAppdata] = useState(null);

  const AppData = async () => {
    const docRef = firebase.firestore().collection('AppData')
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setAppdata(doc.data());
      })
    }
    else {
      console.log('no user data');
    }
  }
  // console.log('dekh veer',appdata.CurrentVersion )
  useEffect(() => {

    AppData();
  }, []);

  const [animation] = useState(new Animated.Value(0));

  const [orderData, setOrderData] = useState([]);



  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const foodRef = firebase.firestore().collection('UserOrders');

      foodRef.onSnapshot(snapshot => {
        setOrderData(snapshot.docs.map(doc => doc.data()))
      }
      )
    };

    fetchData();
  }, []);

  const [foodData, setFoodData] = useState([]);
  const [VegData, setVegData] = useState([]);
  const [NonVegData, setNonVegData] = useState([]);


  const foodRef = firebase.firestore().collection('foodData');

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    }
    )
  }, [])

  useEffect(() => {
    setVegData(foodData.filter((item) => item.foodType == 'Veg' & item.stock === 'in'))
    setNonVegData(foodData.filter((item) => item.foodType == 'Non-Veg' & item.stock === 'in'))
  }, [foodData])



  const requestLocationPermission = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      setLocation(false);
      setLoading(false);

      return;
    }
    // Permission granted, continue with obtaining the location
    getLocation();
    setLoading(false);

  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // console.log('Latitude:', latitude);
      // console.log('Longitude:', longitude);
      getLocationName(latitude, longitude);
      // Do something with the latitude and longitude values
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  // Function to perform reverse geocoding
  // const reverseGeocode = async (latitude, longitude) => {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  //   try {
  //     const response = await axios.get(url);
  //     const data = response.data;
  //     const readableLocation = data.display_name;
  //     console.log('Readable Location:', data);
  //     // Do something with the readable location
  //   } catch (error) {
  //     console.log('Error reverse geocoding:', error);
  //   }
  // };


  const getLocationName = async (latitude, longitude) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (geocode.length > 0) {
        const { city, country } = geocode[0];
        const locationName = `${city}, ${country}`;
        // console.log('dekh veere', city)
        // setLocationName(city);
        SetLocationName(city);
        setLocation(true)
        return locationName;
      }
    } catch (error) {
      console.log('Error fetching location name:', error);
    }

    return null;
  };


  useEffect(() => {
    requestLocationPermission()
  }, [])

  const handleInstagramLink = () => {
    Linking.openURL('https://www.instagram.com/shoviiofficial/');
  };

  // console.log('dekh', locationName)

  const [location, setLocation] = useState(true)

  if (loading) {
    return (
      <View style={styles.Maincontainer}>
        <StatusBar
          backgroundColor={colors.text1}
        />
        <View style={{ backgroundColor: colors.text1, height: 50, alignContent: 'center' }}>
          <Text style={{ paddingVertical: 10, paddingHorizontal: 20, fontSize: 20, }}>...</Text>
        </View>
        <Text style={{ width: '10%', alignSelf: 'center', paddingTop: 10 }}>
          <ActivityIndicator size="large" color={colors.text1} style={{ justifyContent: 'center', }} />;
        </Text>
      </View>
    )
  }


  else if (location === false) {
    return (
      <View style={styles.Maincontainer}>
        <StatusBar
          backgroundColor={colors.text1}
        />
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <TextInput
            style={styles.locationinput}
            placeholder="Set your location"
            value={location}
            onChangeText={setLocation}
            keyboardType="text"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.locationbutton}
          //  onPress={() =>{setLocation()}}
          >
            <Text style={styles.lbuttonText}>Set Location</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const locationArrays = ['desu jodha', 'mangeana']

  if (!locationArrays.includes(locationName)) {
    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <StatusBar backgroundColor={colors.text1} />
        <HeaderBar title="Home" onButtonPress={handleButtonPress} navigation={navigation} />

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}>Food Delivery App is not available in this location.</Text>
          <Text style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 10,
          }}>
            We apologize for the inconvenience. Our services are currently not available in your area.
          </Text>
          <Text style={{
            fontSize: 14,
            textAlign: 'center',
          }}>
            Please check back later or try a different location.
          </Text>
          <Text style={{
            fontSize: 14,
            color: 'blue',
            textDecorationLine: 'underline',
          }} onPress={handleInstagramLink}>
            Follow us on Instagram for updates: @shoviiofficial
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.Maincontainer}>
      <StatusBar
        backgroundColor={colors.text1}
      />
      <HeaderBar title="Home" onButtonPress={handleButtonPress} navigation={navigation} />



      {/* <OrderManagementScreen /> */}



      <ScrollView>

        <TouchableOpacity style={styles.searchbox} onPress={() => { navigation.navigate('Searchpage') }}>
          <AntDesign name="search1" size={24} color="black" style={
            styles.searchicon
          } />
          {/* <TextInput  placeholder="Search"  /> */}
          <Text style={styles.input}>Search</Text>

        </TouchableOpacity>
        {appdata && appdata.CurrentVersion !== Version ?
          <View style={{ backgroundColor: 'white', marginHorizontal: 15, marginBottom: 10, alignSelf: 'center', width: '95%', borderRadius: 20, elevation: 4 }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>

              <View style={{ flexDirection: 'row', }}>
                <View style={{ elevation: 3, width: '15%', paddingHorizontal: 6, paddingVertical: 4 }}>
                  {/* <Text>AppIcon</Text> */}
                  <Image source={{
                    uri: appdata.AppIcon
                  }} style={{ width: 40, height: 40, borderRadius: 10, }} />
                </View>
                <View style={{ width: '82%', paddingHorizontal: 10, paddingVertical: 0, }}>
                  <Text style={{ fontWeight: '600' }}>Get more with new update</Text>
                  <Text>We've enhanced the app, and added some new and exciting features!</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 4, paddingTop: 7 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://play.google.com/store/apps/details?id=com.shovii.india.shovii') }} style={{ backgroundColor: colors.text1, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, elevation: 2 }}>
                  <Text style={{ fontWeight: '600', fontSize: 12, color: colors.col1 }}>DOWNLOAD</Text>

                </TouchableOpacity>
              </View>
            </View>
          </View>
          :
          null

        }

        <Categories navigation={navigation} />
        <OfferSlider navigation={navigation} />
        {/* <Text>HomeScreen</Text> */}


        {foodData.length === 0 ? null : <Cardslider title={"Today's Special"} data={foodData} navigation={navigation} />}

        {VegData.length === 0 ? null : <Cardslider title={"Veg"} data={VegData} navigation={navigation} />}

        {NonVegData.length === 0 ? null : <Cardslider title={"Non-Veg"} data={NonVegData} navigation={navigation} />}

      </ScrollView>
    </View>
  )
}

export default HomeScreen

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
    fontSize: 16,
    fontWeight: '600'
  },
  container: {

    padding: 16,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 170,
    // marginTop: 15,
    // height: 5000,
    // backgroundColor: 'red',

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
    marginVertical: 20,
    paddingTop: 30
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#4E4E4E',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsout: {
    backgroundColor: 'green',
    width: 350,
    height: 100
  },




  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '92%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    marginVertical: 20,
    alignSelf: 'center',
    elevation: 2,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 16,
    color: '#c4c4c4',
  },
  searchicon: {
    color: colors.text1,
  },
  seacrhresultsouter: {
    width: '100%',
    marginHorizontal: 30,
    height: '100%',
    backgroundColor: colors.col1,
  },
  searchresultsinner: {
    width: '100%',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
})
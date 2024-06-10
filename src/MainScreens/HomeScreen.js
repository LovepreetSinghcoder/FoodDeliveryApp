import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, FlatList, ScrollView, TextInput, ActivityIndicator, Linking, Image, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import HeaderBar from '../Components/HeaderBar'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors } from '../Global/styles'
import OfferSlider from '../Components/OfferSlider';
import Cardslider from '../Components/Cardslider';
import Categories from '../Components/Categories';
import { AuthContext } from '../Context/AuthContext';
import * as Location from 'expo-location';
import messaging from '@react-native-firebase/messaging';
import LineWithText from '../Components/LineWithText';
import Restaurants from '../Components/Restaurants';
import UserCartsScreen from './UserCartsScreen';

//Also update the version of the About Screen(Build gradle, Home, About)
const Version = '3.7.10';

const HomeScreen = ({ navigation }) => {
  const { userloggeduid, checkIsLogged, SetLocationName, locationName, userDataHandler, userdata, setUserLongitude, setUserLatitude, hasItems, getcartdata } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const childRef = useRef();

  const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        userDataHandler(doc.data());
      })
    }
    else {
      console.log('no user data');
    }
  }

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);




  // Function to handle refresh token and save it to the server
  const handleTokenRefresh = async () => {
    try {
      const refreshedToken = await messaging().getToken();
      if (refreshedToken) {
        try {
          await firebase.firestore().collection('UserData').doc(userloggeduid).update({
            fcmToken: refreshedToken,
          });
          console.log('Address updated successfully');
          // navigation.navigate('Profile')
        } catch (error) {
          console.log('Error updating address:', error);
        }

        console.log('FCM Token refreshed:', refreshedToken);
      }
    } catch (error) {
      console.error('Error refreshing FCM token:', error);
    }
  };

  useEffect(() => {
    // Optionally, you can also call handleTokenRefresh once during app initialization
    handleTokenRefresh();
  }, [])
  // Hide for Expo Start End


  const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed');
  };

  const [appdata, setAppdata] = useState(null);
  const [appNoticeData, setAppNoticeData] = useState(null);


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
  const AppNoticeData = async () => {
    const docRef = firebase.firestore().collection('AppNotice')
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setAppNoticeData(doc.data());
      })
    }
    else {
      console.log('no data');
    }
  }
  // console.log('dekh veer',appdata.CurrentVersion )
  useEffect(() => {

    AppData();
    AppNoticeData();
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
  const [TodaySpecialFoodData, setTodaySpecialFoodData] = useState([]);

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
    setTodaySpecialFoodData(foodData.filter((item) =>

      item.foodType === 'Veg' &&
      item.stock === 'in' &&
      item.foodPrice > 50
      // &&
      // item.rating >= 4.5


    ))
    setVegData(foodData.filter((item) => item.foodType == 'Veg' && item.stock === 'in'))
    setNonVegData(foodData.filter((item) => item.foodType == 'Non-Veg' && item.stock === 'in'))
  }, [foodData])


  // console.log('This is the data of todayspecialfood', TodaySpecialFoodData)

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
    await getLocation();
    setLoading(false);

  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // console.log('Latitude:', latitude);
      // console.log('Longitude:', longitude);
      setUserLatitude(latitude)
      setUserLongitude(longitude)
      // console.log('this is latitude', latitude)
      getLocationName(latitude, longitude);
      // Do something with the latitude and longitude values
    } catch (error) {
      console.log('Error getting location12:', error);
    }
  };




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
  const [newlocation, setNewLocation] = useState('');

  const NewLocationhandler = () => {
    if (newlocation.trim() === '' || newlocation.trim().length <= 3) {
      alert('Please enter a valid location!');
      return;
    }
    // console.log('triggere')
    SetLocationName(newlocation)
  }

  const [location, setLocation] = useState(true)


  const [hasContent, setHasContent] = useState(true); // Initially assuming it has content


  const locationArrays = ['desu jodha', 'mangiana', 'phullo', 'sekhu', 'joge wala', 'jogewala', 'mangeana', 'habuana', 'haibuana', 'panniwala moreka', 'delhi', 'sirsa', 'dabwali']

  if (loading) {
    return (
      <View style={styles.Maincontainer}>
        <StatusBar
          backgroundColor={colors.col2}
          barStyle="dark-content"
        />
        <TouchableOpacity onPress={() => { navigation.navigate('Changeloction') }}>


          <View style={{
            backgroundColor: colors.col2,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8, // Adding some border radius for better look
            margin: 10
          }}>
            <Text style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 25,
              color: '#ccc',
              fontWeight: '800',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              shovii
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ width: '10%', alignSelf: 'center', paddingTop: 10 }}>
          <ActivityIndicator size="large" color={colors.text1} style={{ justifyContent: 'center', }} />
        </Text>

        <View style={[styles.loadingCont,]} >
        </View>

        <View style={{
          elevation: 0, paddingVertical: 5, marginHorizontal: 16, borderRadius: 15, flexDirection: 'row'
        }} >
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 40,
            width: 80,
            marginBottom: 15,
            padding: 10,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 40,
            width: 80,
            marginBottom: 15,
            padding: 10,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 40,
            width: 80,
            marginBottom: 15,
            padding: 10,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 40,
            width: 80,
            marginBottom: 15,
            padding: 10,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
        </View>

        <View style={[styles.loadingCont, { backgroundColor: colors.col2, elevation: 0, height: 80, borderRadius: 15 }]} >
        </View>
        <View style={{
          elevation: 0, paddingVertical: 5, marginHorizontal: 16, borderRadius: 15, flexDirection: 'row'
        }} >
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 80,
            width: 90,
            marginBottom: 15,
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 80,
            width: 90,
            marginBottom: 15,
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 80,
            width: 90,
            marginBottom: 15,
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>
          <View style={{
            backgroundColor: colors.col2,
            marginLeft: 10,
            height: 80,
            width: 90,
            marginBottom: 15,
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}  >
          </View>


        </View>

        <View style={[styles.loadingCont, { height: 200 }]} >
        </View>
        <View style={[styles.loadingCont, { height: 200 }]} >
        </View>
      </View>
    )
  }


  else if (location === false && locationName === null) {
    // else if (location === true ) {


    return (
      <View style={styles.Maincontainer}>
        <StatusBar
          backgroundColor={colors.col2}
          barStyle="dark-content"
        />
        <View style={{ paddingVertical: 10, paddingHorizontal: 16, marginTop: 10, }}>
          <View style={styles.location_container}>
            <FontAwesome6 name="location-dot" size={28} color={colors.text1} style={{ paddingVertical: 6 }} />
            <TextInput
              style={styles.locationinput}
              placeholder="Set your location"
              value={location}
              onChangeText={(text) => setNewLocation(text)}
              keyboardType="text"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.locationbutton}
            onPress={() => { NewLocationhandler() }}
          >
            <Text style={styles.lbuttonText}>Set Location</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  if (!locationName) {

    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <StatusBar
          backgroundColor={colors.col2}
          barStyle="dark-content"
        />
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
          }}>Shovii is not available in your location.</Text>
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
        backgroundColor={colors.col2}
        barStyle="dark-content"
      />
      <HeaderBar title="Home" onButtonPress={handleButtonPress} navigation={navigation} />
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
        {appNoticeData && appNoticeData.showNotice === 'true' ?
          <View style={{ backgroundColor: 'white', marginHorizontal: 15, marginBottom: 10, alignSelf: 'center', width: '95%', borderRadius: 20, elevation: 4 }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>

              <View style={{ flexDirection: 'row', }}>
                <View style={{ elevation: 3, width: '15%', paddingHorizontal: 6, paddingVertical: 2 }}>
                  {/* <Text>AppIcon</Text> */}
                  <Image source={{
                    uri: appNoticeData.AppIcon
                  }} style={{ width: 40, height: 40, borderRadius: 10, }} />
                </View>
                <View style={{ width: '84%', paddingHorizontal: 10, paddingVertical: 0, }}>
                  <Text style={{ fontWeight: '600' }}>{appNoticeData.noticeTitle}</Text>
                  <Text style={{ textAlign: 'justify' }}>{appNoticeData.noticeDisc}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 4, paddingTop: 1 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/shoviiofficial/') }} style={{ backgroundColor: colors.text1, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, elevation: 2 }}>
                  <Text style={{ fontWeight: '600', fontSize: 12, color: colors.col1 }}>Instagram</Text>

                </TouchableOpacity>
              </View>
            </View>
          </View>
          :
          null

        }
    
        <LineWithText navigation={navigation} heading={'CATEGORIES'} />
        <Categories navigation={navigation} />
        <LineWithText navigation={navigation} heading={'OFFERS & DEALS'} />
        <OfferSlider navigation={navigation} />
        <Restaurants navigation={navigation} title={'RESTAURANTS & CLOUD KITCHENS'} data={VegData} />

        {/* {TodaySpecialFoodData.length === 0 ? null : <Cardslider title={"TODAY'S FOOD"} data={TodaySpecialFoodData} navigation={navigation} />} */}

        {/* {VegData.length === 0 ? null : <Cardslider title={"VEG"} data={VegData} navigation={navigation} />} */}

        {/* {NonVegData.length === 0 ? null : <Cardslider title={"NON-VEG"} data={NonVegData} navigation={navigation} />} */}

      </ScrollView>
     
      {
         hasItems && (
          <View style={{
            height: 85,
            zIndex: 100,
          }}>
            <UserCartsScreen optimize={true} navigation={navigation} bgcolor={'#d6d6d6'} />
          </View>
        )
      }

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  Maincontainer: {
    backgroundColor: colors.col1,
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
    backgroundColor: colors.text1,
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 170,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
  loadingCont: {
    flexDirection: 'row',
    width: '92%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: colors.col2,
    height: 50
  },

  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    height: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '92%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
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
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
})
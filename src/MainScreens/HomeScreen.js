import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from '../Components/HeaderBar'
// import OrderCart from '../Components/OrderCart';
// import OrderManagementScreen from '../Components/OrderManagementScreen';
// import firebase from 'firebase/compat';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'

const userloggedeuid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2';
import { colors, veg, nonveg } from '../Global/styles'
import OfferSlider from '../Components/OfferSlider';
import Cardslider from '../Components/Cardslider';
import Categories from '../Components/Categories';

const HomeScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    // Handle button press logic here
    console.log('Button pressed');
  };


  const [animation] = useState(new Animated.Value(0));

  const [orderData, setOrderData] = useState([]);
  const [search, setSearch] = useState('')


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




  const [location, setLocation] = useState(null)

  // console.log('ye dekh bhai 23', NonVegData)








  // SECOND ANIMATION 


  if (location === null) {
    return (
      <View style={styles.Maincontainer}>
        <StatusBar
          backgroundColor={colors.text1}
        />
        <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
          <TextInput
            style={styles.locationinput}
            placeholder="Set yous location"
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


  return (
    <View style={styles.Maincontainer}>
      <StatusBar
        backgroundColor={colors.text1}
      />
      <HeaderBar title="Home" onButtonPress={handleButtonPress} />



      {/* <OrderManagementScreen /> */}



      <ScrollView>
        <View style={styles.searchbox}>
          <AntDesign name="search1" size={24} color="black" style={
            styles.searchicon
          } />
          <TextInput style={styles.input} placeholder="Search" onChangeText={(e) => {
            setSearch(e)
          }} />

        </View>
        {search != '' && <View style={styles.seacrhresultsouter}>
          <FlatList style={styles.searchresultsinner} data={foodData} renderItem={
            ({ item }) => {
              if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <View style={styles.searchresult}>
                    <AntDesign name="arrowright" size={24} color="black" />
                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                  </View>
                )
              }
            }
          } />
        </View>}
        <Categories />
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
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1,
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
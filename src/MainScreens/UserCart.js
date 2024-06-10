import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons, FontAwesome6, Fontisto, Octicons, MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditProductSlider from '../Components/EditProductSlider';
import * as Location from 'expo-location';

const UserCart = ({ navigation, route }) => {

    const data_shopId = route.params;

    const { userloggeduid, checkIsLogged, locationName, calculateDistance, userdata } = useContext(AuthContext);

    // console.log('ye ha loation NAM3E', locationName)
    const [cartdata, setCartdata] = useState(null);
    const [cartAllData, setCartAllData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState(false);
    const [userLatitude, setUserLatitude] = useState(null)
    const [userLongitude, setUserLongitude] = useState(null)
    const [userDistance, setUserDistance] = useState(null)
    const [deliveryCharges, setDeliveryCharges] = useState(null)
    const [notdeliverable, setNotdeliverable] = useState(false);
    const [itemCost, setItemCost] = useState('0');
    const [totalCost, setTotalCost] = useState('0');
    const [isUseCoins, setIsUseCoins] = useState(false);
    const [quantity, setquantity] = useState('1');
    const [userLocationName, setUserLocationName] = useState('')

    const UseCoinButton = ({ isUseCoins, onPress }) => (
        <View
            style={{
                backgroundColor: 'white',
                borderColor: 'grey',
                borderRadius: 15,
                width: '95%',
                alignSelf: 'center',
                marginVertical: 5,
                paddingVertical: 10,
                elevation: 3,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                    alignSelf: 'center',
                    paddingLeft: 2,
                }}
            >
                <Text style={{ fontWeight: '600', alignItems: 'center', alignContent: 'center', marginTop: 2 }}>
                    Use Coin:
                </Text>
                <TouchableOpacity onPress={onPress}>
                    {isUseCoins ? (
                        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color={colors.text1} />
                    ) : (
                        <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={colors.text1} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );


    const increaseQuantity = () => {
        setquantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setquantity((parseInt(quantity) - 1).toString())
        }
    }






    const getSpecificArray = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();

                if (data && data.hasOwnProperty(data_shopId)) {
                    const specificArray = data[data_shopId];
                    // console.log(`Array "${data_shopId}" data:`, specificArray);
                    setCartAllData(specificArray)

                    return specificArray;
                } else {
                    console.log(`Array "${data_shopId}" does not exist in the document.`);
                    return null;
                }
            } else {
                console.log(`Document for user ${userloggeduid} does not exist.`);
                return null;
            }
        } catch (error) {
            console.error('Error getting specific array:', error);
            return null;
        }
    };
    useEffect(() => {

        // getcartdata();
        getSpecificArray()
    }, [])

    // console.log('This is the data of the cart that is in the state', cartAllData)

    const increaseQuantityHandler = (item_id) => {
        // Find the index of the item in the cartAllData array
        const index = cartAllData.findIndex(item => item.item_id === item_id);

        // Check if the item was found
        if (index !== -1) {
            const updatedData = cartAllData.map(item =>
                item.item_id === item_id ? { ...item, foodquantity: item.foodquantity + 1 } : item
            );

            // Update the state with the new array
            setCartAllData(updatedData);
        } else {
            console.log('Item not found with item_id:', item_id);
        }

    }

    // console.log('This is total food cost after upfdating,,::', totalCost)


    useEffect(() => {
        try {
            // const doc = await docRef.get();

            // const data = doc.data();
            const keys = Object.keys(cartdata);

            // console.log('This is the Keys:', ...keys)
            if (keys.length > 0) {
                const firstKey = keys[1];
                const firstData = cartdata[firstKey];

                // console.log("First array name (shopId):", firstKey);
                // console.log("First array data:", firstData);
            } else {
                console.log("The document has no data.");
            }
        }
        catch (error) {
            console.error('Error:', error);
        }

    }, [cartdata])
    // console.log('This is the data We want', cartdata)


    useFocusEffect(
        React.useCallback(() => {
            // getcartdata();
            getSpecificArray()
            console.log('triggered cart')
        }, [])
    );



    const [user, setUser] = useState([]);

    const getuserData = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUser(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserData();
    }, [userloggeduid]);


    const [foodDataAll, setFoodDataAll] = useState([]);


    // UseEffect to get all data of all Foods 

    useEffect(() => {

        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('foodData');

            foodRef.onSnapshot(snapshot => {
                setFoodDataAll(snapshot.docs.map(doc => doc.data()))
            }
            )
        };

        fetchData();
    }, [cartdata]);



    const [allData, setAllData] = useState([]);
    const [shopInfo, setShopInfo] = useState([]);


    // useEffect to get all data of ShopInfo 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('shopInfo');
            const doc = await docRef.get();
            doc.forEach((doc) => {
                setShopInfo(doc.data());
            })
        };

        fetchData();
    }, []);

    const [platformDeliveryCharges, setPlatformDeliveryCharges] = useState([]);


    // useEffect to get all data of ShopInfo 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('PlatformDeliveryPartnerManagement');
            const doc = await docRef.get();
            doc.forEach((doc) => {
                setPlatformDeliveryCharges(doc.data());
            })
        };

        fetchData();
    }, []);

    const [restaurantsData, setRestaurantsData] = useState([]);
    // useEffect to get all data of Restaurant Data 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('RestaurantData').where('shopId', '==', data_shopId)




            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setRestaurantsData(doc.data());
                })
            }
            else {
                console.log('No Restaurant Data Found!');
            }
        };

        fetchData();
    }, []);


    const GetRestaurantDataHandler = (id) => {

        if (!restaurantsData) {
            console.log('Restaurant data is not loaded')
            return;
        }
        const data = restaurantsData.filter((item) => item.shopId == id)

        return data;

    }


    //New Approach
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const [closedRestaurants, setClosedRestaurants] = useState([]);
    const [restaurantName, setRestaurantName] = useState([]);



    const checkShopOpen = () => {
        if (cartdata !== null && Object.keys(cartdata).length !== 0) {

            //old code
            // let cartArrayNames = [];
            // const checkData = cartdata.cartItems;
            // checkData.forEach((item) => {

            //     // const cartArrayNames = item.
            //     cartArrayNames.push(item.shop_id)
            // });
            // setRestaurantName(cartArrayNames);

            // New Code
            const uniqueShopIds = new Set();

            // Iterate through cart items and add unique shop IDs to the Set
            cartdata.cartItems.forEach((item) => {
                uniqueShopIds.add(item.shop_id);
            });

            // Convert the Set back to an array
            const cartArrayNames = Array.from(uniqueShopIds);

            // Set the unique shop IDs as the restaurant names
            setRestaurantName(cartArrayNames);


            // const cartArrayNames = Object.keys(cartdata);
            // console.log('dekh veere', cartArrayNames)

            // console.log('dekhi bro 1', cartArrayNames);
            // let checkStockV = false;
            setClosedRestaurants([]); // Clear the array before adding new items
            for (let i = 0; i < cartArrayNames.length; i++) {
                // console.log('dekhi bro 2');
                const matchingUserId = userdata.find((user) => user.uid === cartArrayNames[i]);

                // console.log('dekhi bro 4', matchingUserId);
                // console.log('dekhi bro 4');

                if (matchingUserId) {
                    // console.log('dekhi bro 5');
                    if (matchingUserId.isShop === 'Close') {
                        // console.log('dekhi bro 7');
                        setIsRestaurantOpen(false);
                        setClosedRestaurants((prevClosedRestaurants) => [...prevClosedRestaurants, matchingUserId.restaurantName]);
                        // console.log('Dekhi bro nhi haiga');
                    } else {
                        setIsRestaurantOpen(true);

                        // console.log('dekhi bro 8');
                    }
                }
            }
        } else {
            console.log('Empty array or null cartdata');
        }
    };





    //Check Stock of Each Item

    const [inStock, setInStock] = useState(true);
    const [outStock, setOutStock] = useState([]);



    const requestLocationPermission = async () => {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            setLoading(false);
            return false; // Return false if permission is not granted
        }
        // Permission granted, continue with obtaining the location
        await getLocation();
        setLoading(false);
        return true; // Return true if permission is granted
    };

    const [userCoords, setUserCoords] = useState({})

    useEffect(() => {
        requestLocationPermission()
    }, [])


    const getLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Set the state with the obtained latitude and longitude
            setUserLatitude(latitude);
            setUserLongitude(longitude);

            // Obtain and set the location name
            await getLocationName(latitude, longitude);

            console.log("Coordinates obtained: ", latitude, longitude);
            return { latitude, longitude }; // Return coordinates for further use if needed
        } catch (error) {
            console.log('Error getting location:', error);
            return null;
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
                const locationCity = `${city}`;

                // console.log('dekh veere', city)
                // setLocationName(city);
                // SetLocationName(city);
                // setLocation(true)
                setUserLocationName(locationCity)
                // console.log("this is the the calue of the location Name", locationName)

                return locationName;
            }
        } catch (error) {
            console.log('Error fetching location name:', error);
        }

        return null;
    };



    const haversineDistance = (coords1, coords2) => {
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        const lat1 = coords1.latitude;
        const lon1 = coords1.longitude;
        const lat2 = coords2.latitude;
        const lon2 = coords2.longitude;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };

    const [distancebtwCustomerRestaurant, setDistancebtwCustomerRestaurant] = useState(null)



    useEffect(() => {
        if (restaurantsData && restaurantsData.location && restaurantsData.location.geolocation) {
            const restaurantLatitude = restaurantsData.location.geolocation.latitude;
            const restaurantLongitude = restaurantsData.location.geolocation.longitude;

            const coords1 = { latitude: restaurantLatitude, longitude: restaurantLongitude };
            const coords2 = { latitude: userLatitude, longitude: userLongitude };

            const calculatedDistance = haversineDistance(coords1, coords2);
            setDistancebtwCustomerRestaurant(calculatedDistance);
        } else {
            console.warn('restaurantData or its location/geolocation properties are not available.');
        }
    }, [restaurantsData, userLatitude, userLongitude]);



    const handleIsCoinSelected = (value) => {
        setIsUseCoins(value)
        GetTotalPrice();

    }

    const setuserDistance = () => {
        if (locationName === 'mangiana' || locationName === 'mangeana') {
            setUserDistance(6)
        }
        else if (locationName === 'desu jodha') {
            setUserDistance(1)
        }
        else if (locationName === 'phullo') {
            setUserDistance(4)

        }
        else if (locationName === 'joge wala' || locationName === 'jogewala') {
            setUserDistance(8)


        }
        else if (locationName === 'habuana' || locationName === 'haibuana') {
            setUserDistance(4)


        }
        else if (locationName === 'panniwala moreka') {
            setUserDistance(3)


        }
        else if (locationName === 'sekhu') {
            setUserDistance(6)

        }
        else {
            setUserDistance(10)
        }
    }

    useEffect(() => {
        setuserDistance();
    }, [locationName])

    const getTotalDeliveryCharges = () => {
        if (distancebtwCustomerRestaurant >= 0) {
            const deliveryCharges = platformDeliveryCharges.deliveryCharges * distancebtwCustomerRestaurant;
            setDeliveryCharges(deliveryCharges)

            return deliveryCharges
        }



    }

    useEffect(() => {
        getTotalDeliveryCharges()
    }, [distancebtwCustomerRestaurant, platformDeliveryCharges])


    const GetTotalPrice = () => {
        if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {
            console.log('Trigered 1')

            // const cart23 = cartdata;
            let totalfoodprice = 0;
            // const foodprice = cart23.cartItems;
            const foodprice = cartAllData;
            console.log('Trigered 2')

            foodprice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice)) +
                    (parseInt(item.totalAddOnPrice));
            });
            console.log('Trigered 3', totalfoodprice)

            setItemCost(totalfoodprice.toString());


            // setTotalCost(totalfoodprice.toString());

            console.log(deliveryCharges, 'This is the Grand Total Price :', totalfoodprice.toString())

            // setIsLoading(false);
            const totalDeliveryCharges = getTotalDeliveryCharges()
            const GSTnRestaurantCharges = restaurantsData.GSTnRestaurantCharges ?? 0;
            let finalPrice = totalfoodprice + totalDeliveryCharges + ((totalfoodprice * GSTnRestaurantCharges) / 100);
            // setTotalCost(finalPrice.toString());
            setTotalCost(finalPrice.toFixed(2));

        }
        else {
            setTotalCost('0');
        }
    }


    // useEffect to trigger fn which finds total Price 

    useEffect(() => {
        GetTotalPrice();
    }, [cartAllData, distancebtwCustomerRestaurant, platformDeliveryCharges]);



    const deleteItem = async (item) => {
        setLoading(true)
        setProcess(true)
        console.log('delete trigerr')
        // setIsLoading(true);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docRef.get();
        const cartData = docSnapshot.data();

        if (cartData && cartData.cartItems && cartData.cartItems.length === 1) {
            // Delete the cart property
            await docRef.update({
                cartItems: firebase.firestore.FieldValue.delete()
            });
        } else {
            // Remove the item from the cart array
            await docRef.update({
                cartItems: firebase.firestore.FieldValue.arrayRemove(item)
            });
        }
        getcartdata();
        GetTotalPrice();
        checkShopOpen();
        setProcess(false)
        setLoading(false)
    }




    const GoToPaymentPage = () => {
        if (deliveryCharges > platformDeliveryCharges.maxDeliveryCharges && deliveryCharges > 300) {
            alert('We regret to inform you that delivery from this restaurant is not available in your location. Would you like to choose another restaurant?');


            return;
        }
        const GSTnRestaurantCharges = restaurantsData.GSTnRestaurantCharges ?? 0;
        if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {
            // if (user.totalCoin < -10) {
            //     alert("Unable to place the order due to insufficient coins!");
            // }
            // else
            if (notdeliverable) {
                alert("This item is not available in your location.");

            }

            else if (inStock === false) {
                alert(`The following item is Out of Stock : ${outStock}`)

            }

            else if (parseInt(totalCost) < parseInt(shopInfo.minpriceorder) || parseInt(totalCost) > parseInt(shopInfo.maxpriceorder)) {
                alert(`Order value must lie within: ${shopInfo.minpriceorder} - ${shopInfo.maxpriceorder}`);
            }


            else {
                navigation.navigate('PaymentNdetail', {
                    restaurantData: restaurantsData,
                    restaurantName: restaurantsData.restaurant_name,
                    shopId: data_shopId,
                    deliveryAdress: userdata.address,
                    cartAllData: cartAllData,
                    totalCost: totalCost,
                    itemCost: itemCost,
                    deliveryCharges: deliveryCharges,
                    GSTnCharger: GSTnRestaurantCharges
                })
            }

        }
        else {
            alert('Cart is Empty!')
        }

    }


    const [selectedProduct, setSelectedProduct] = useState(null);

    const openEditProductHandler = (item_id, qty) => {
        setSelectedProduct({ item_id, qty });
        // console.log('This is openEditProductHandler Data ::', item_id, qty)
    };

    const closeEditProductHandler = () => {
        setSelectedProduct(null);
        getSpecificArray()
        GetTotalPrice()
    }


    if (totalCost === '0') {

        return (

            <View style={[styles.containerout,]}>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    padding: 15,
                    alignItems: 'center'
                }} onPress={() => { navigation.navigate('HomeScreen') }} >
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Cart</Text>
                </TouchableOpacity>

                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="fast-food" size={250} color="#dedede" />
                    <Text style={{ color: '#dedede', fontSize: 25, fontWeight: '600' }}>Cart is Empty!</Text>
                </View>





            </View>
        )



    }

    if (loading) {
        return (

            <View style={styles.containerout}>


                <TouchableOpacity style={{
                    flexDirection: 'row',
                    padding: 15,
                    alignItems: 'center'
                }} onPress={() => { navigation.navigate('HomeScreen') }} >
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Cart</Text>
                </TouchableOpacity>


                <View style={{ paddingVertical: 20 }}>

                    <ActivityIndicator size="large" color={colors.text1} />
                </View>

            </View>
        )
    }

    // else {
    return (

        <View style={styles.containerout}>


            <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center'
            }} onPress={() => { navigation.navigate('HomeScreen') }} >
                <FontAwesome6 name="arrow-left" size={20} color="black" />
                {/* <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Cart</Text> */}
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10, color: 'grey' }}>{restaurantsData.restaurant_name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>Delivery at Home  <Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10, color: 'grey' }}>{userdata.address.substring(0, 18)}...</Text></Text>
                </View>
            </TouchableOpacity>


            <ScrollView style={[styles.container, selectedProduct ? {
                // backgroundColor: '#c4c4c4',
                // backgroundColor: '#fff',

            } : null]}>
                <View style={[styles.cartout, selectedProduct ? {
                    // backgroundColor: '#e0e0e0',
                } : {
                    backgroundColor: '#ffffff',
                }]}>

                    {/* {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? */}
                    {cartAllData == null ?

                        <Text style={styles.head2}>Your Cart is Empty</Text>
                        :
                        // <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart} renderItem={
                        <FlatList style={[styles.cardlist, selectedProduct ? {
                            // backgroundColor: '#e0e0e0',
                            borderRadius: 15
                        } : null]} data={cartAllData} renderItem={

                            ({ item }) => {

                                const nData = foodDataAll.filter((items) => items.id === item.item_id)
                                // console.log('ye hai aa ka result',nData[0].foodImageUrl)
                                return (
                                    <View style={styles.cartcard}>
                                        {/* <Image source={{ uri: nData[0].foodImageUrl }} style={styles.cartimg} /> */}
                                        <View style={styles.cartcardin}>


                                            <View style={styles.c1}>


                                                <View>
                                                    {nData[0].foodType == 'Veg' ?
                                                        <Image
                                                            source={require('../Images/VegPng.png')}
                                                            style={{ width: 15, height: 15, marginHorizontal: 5, marginVertical: 5 }}
                                                        />
                                                        :
                                                        <Image
                                                            source={require('../Images/NonVeg.png')}
                                                            style={{ width: 15, height: 15, marginHorizontal: 5, marginVertical: 5 }}
                                                        />
                                                    }

                                                </View>
                                                <View style={{ paddingHorizontal: 4 }}>

                                                    <Text style={[styles.txt1,]}>{nData[0].foodName}</Text>

                                                    <Text style={styles.txt2}>₹{nData[0].foodPrice}</Text>
                                                    <Text style={styles.txt2}></Text>

                                                    {/* <Text>Quantity: {item.foodquantity}*{nData[0].foodunitType}</Text> */}
                                                </View>
                                            </View>

                                            <View >
                                                <View style={[styles.outOfStockContainer, {
                                                    backfaceVisibility: 'hidden',
                                                    borderColor: 'red',
                                                    borderWidth: 1,
                                                    zIndex: 1,
                                                    borderRadius: 10,
                                                    paddingVertical: 5,
                                                    paddingHorizontal: 5,
                                                    backgroundColor: '#fff6f7',
                                                    flexDirection: 'row',
                                                    width: 90,
                                                    justifyContent: 'center'
                                                }]}>
                                                    <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 18, fontWeight: '600', }} onPress={() => openEditProductHandler(item.item_id, item.foodquantity)}>-</Text></TouchableOpacity>
                                                    <Text style={{ fontSize: 18, fontWeight: '400' }} onPress={() => openEditProductHandler(item.item_id, item.foodquantity)}> {item.foodquantity} </Text>
                                                    <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 18, fontWeight: '600' }} onPress={() => openEditProductHandler(item.item_id, item.foodquantity)}>+</Text></TouchableOpacity>

                                                </View>
                                                {/* <TouchableOpacity style={btn2}>
                                                    <Text style={styles.btntxt} onPress={() => openEditProductHandler(item.item_id, item.foodquantity)}>Open Slider</Text>
                                                </TouchableOpacity> */}
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5, paddingTop: 5 }}>

                                                    <Text style={[styles.txt2, { fontWeight: '500' }]}>₹{(item.foodquantity) * (nData[0].foodPrice)}</Text>

                                                </View>
                                            </View>

                                        </View>


                                    </View>
                                )
                            }
                        }
                            scrollEnabled={false} />}
                </View>

                <View style={[styles.cartout, selectedProduct ? {
                    // backgroundColor: '#e0e0e0',
                } : { backgroundColor: '#ffffff' }]}>
                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <View style={{ backgroundColor: colors.col2, padding: 10, borderRadius: 15 }}>
                                <Fontisto name="stopwatch" size={15} color="black" />
                            </View>
                            <Text style={styles.boxInText}>Delivery in <Text style={{ fontWeight: '500' }}>28 mins</Text></Text>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>

                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <View style={{ backgroundColor: colors.col2, padding: 10, borderRadius: 15 }}>
                                <Octicons name="home" size={15} color="black" />
                            </View>
                            <View>

                                <Text style={styles.boxInText}>Delivery at <Text style={{ fontWeight: '500' }}>Home</Text></Text>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Editprofile')}>

                                    <Text style={[styles.boxInText, { fontWeight: '400', color: 'grey' }]}>{userdata.address.substring(0, 15)}...</Text>
                                    <Text style={[styles.boxInText, { fontWeight: '400', color: colors.text1 }]}>Change Address {'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>

                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <View style={{ backgroundColor: colors.col2, padding: 10, borderRadius: 15 }}>
                                <Ionicons name="call-outline" size={15} color="black" />
                            </View>
                            <View>

                                <Text style={styles.boxInText}>{userdata.name}, <Text style={{ fontWeight: '500' }}>{userdata.phone}</Text></Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>

                    <View style={[styles.box, { borderBottomWidth: 0 }]}>

                        <View style={styles.boxIn}>
                            <View style={{ backgroundColor: colors.col2, padding: 10, borderRadius: 15 }}>
                                <MaterialIcons name="notes" size={15} color="black" />
                            </View>
                            <View>

                                <Text style={styles.boxInText}>Total Bill <Text style={{ fontWeight: '500' }}>₹{totalCost}</Text></Text>
                                <Text style={[styles.boxInText, { fontWeight: '400', color: 'grey' }]}>Incl. taxes and charges</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>
                </View>

                {totalCost && totalCost !== '0' ?
                    <>
                        <View style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderColor: 'grey',
                            borderRadius: 15,
                            // width: '95%',
                            alignSelf: 'center',
                            marginVertical: 5,
                            paddingVertical: 10,
                            padding: 10
                        }}>

                            <View style={{
                                backgroundColor: 'white',
                                borderColor: 'grey',
                                borderRadius: 15,
                                // width: '95%',
                                alignSelf: 'center',
                                // marginVertical: 5,
                                // paddingVertical: 10,
                                padding: 10
                                // elevation: 3
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', paddingBottom: 5 }}>
                                    <Text style={{ fontWeight: '600' }}>Item total:</Text>
                                    <Text style={{ fontWeight: '600' }}>{itemCost}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', paddingVertical: 5, }}>
                                    <Text style={{
                                        fontWeight: '400', borderBottomWidth: 1,
                                        borderStyle: 'dotted',
                                        borderBottomColor: 'grey'
                                    }}>GST & restaurant charges:</Text>
                                    <Text>{(itemCost * (restaurantsData.GSTnRestaurantCharges ?? 0)) / 100}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', paddingVertical: 5 }}>
                                    <Text style={{
                                        fontWeight: '400', borderBottomWidth: 1,
                                        borderStyle: 'dotted',
                                        borderBottomColor: 'grey'
                                    }}>Delivery partner fee:</Text>
                                    <Text>{deliveryCharges.toFixed(2)}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', paddingVertical: 5 }}>
                                    <Text style={{
                                        fontWeight: '400', borderBottomWidth: 1,
                                        borderStyle: 'dotted',
                                        borderBottomColor: 'grey'
                                    }}>Platform fee:</Text>
                                    <Text>0₹</Text>
                                </View>
                                {isUseCoins === true ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', paddingVertical: 5 }}>
                                        <Text style={{ fontWeight: '400' }}>Discount:</Text>
                                        <Text>-10₹</Text>
                                    </View>
                                    :
                                    null}

                            </View>
                            <View style={[styles.box, { borderBottomWidth: 0, borderTopWidth: 1, borderColor: '#cccccc' }]}>

                                <View style={styles.boxIn}>
                                    {/* <Fontisto name="stopwatch" size={15} color="black" /> */}
                                    <View>

                                        <Text style={[styles.boxInText, { fontWeight: '500' }]}>To Pay</Text>
                                    </View>
                                </View>
                                <View>
                                    {/* <Text style={styles.boxInText}>{totalCost}₹</Text> */}
                                    <Text style={[styles.boxInText, { fontWeight: '500' }]}>{totalCost}₹</Text>

                                </View>
                            </View>

                        </View>
                        <View style={styles.btncont}>
                            <View style={styles.c3}>
                                <Text style={styles.txt6}>₹{totalCost}</Text>
                                <Text style={styles.txt5}>Grand total bill</Text>
                            </View>
                            <TouchableOpacity style={btn2}>
                                <Text style={styles.btntxt} onPress={() => GoToPaymentPage()}>Proceed Order</Text>
                            </TouchableOpacity>


                        </View>

                    </>
                    :
                    null

                }

            </ScrollView>
            {/* {selectedProduct && (
                <View style={{
                    backgroundColor: 'rgba(237, 245, 255, 0.4)',
                // backgroundColor: 'red',
                 height: 200}}></View>
            )} */}

            {selectedProduct && (
                <View style={{
                    backgroundColor: colors.text1,
                    // backgroundColor: 'rgba(237, 245, 255, 0.4)',
                    height: 440, zIndex: 100,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 15,
                    // paddingVertical: 10
                    // marginTop: -20
                }}>

                    <TouchableOpacity style={{ backgroundColor: '#a1a1a1', borderRadius: 50, width: 50, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginBottom: 15, marginTop: -65 }} onPress={() => closeEditProductHandler()}><Text style={{ fontSize: 18, fontWeight: '600' }}>X</Text></TouchableOpacity>
                    <EditProductSlider
                        restaurantsData={restaurantsData}
                        item_id={selectedProduct.item_id}
                        qty={selectedProduct.qty}
                        callFn={getuserData}
                        closeFn={closeEditProductHandler}
                    />
                </View>
            )}
        </View >
    )
    // }


}

export default UserCart

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        width: '100%',
        backgroundColor: "#f5f6fb"

    },
    container: {
        flex: 1,
        // backgroundColor: colors.col2,
        // backgroundColor: '#edeef0',

        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
        // backgroundColor: 'grey'
    },

    CartContainer: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    CartContainerRestaurant: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5

    },
    CartContainerRestaurantLogo: {

        // backgroundColor: 'cyan',
        borderRadius: 50,
        alignContent: 'center'
    },
    LogoImg: {
        width: 40, // Adjust as needed
        height: 40
    },
    CartContainerRestaurantText: {
        // backgroundColor: 'yellow',
        paddingHorizontal: 5
    },
    CartContainerRestaurantText1: {

        fontSize: 15,
        fontWeight: '600'
    },
    CartContainerRestaurantText2: {

        fontSize: 15,
        fontWeight: '400'
    },

    head1: {
        fontSize: 20,
        // textAlign: 'center',
        fontWeight: '500',
        marginVertical: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: colors.text3,

    },
    head2: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: colors.col1,
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
    },
    cartcard: {
        flexDirection: 'row',
        // backgroundColor: colors.col1,
        // backgroundColor: 'white',
        marginVertical: 5,
        // borderRadius: 15,
        width: '100%',
        alignSelf: 'center',
        // elevation: 2,
        paddingHorizontal: 5,
        paddingVertical: 5,

        alignItems: 'center',
    },
    cartimg: {
        width: 100,
        height: '100%',
        // borderRadius: 10,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    cartcardin: {
        flexDirection: 'row',
        // margin: 5,
        width: '75%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // backgroundColor: 'red',

    },
    cardlist: {
        width: '100%',
        alignSelf: 'center',
        // backgroundColor: 'red'
    },
    cartout: {
        flex: 1,
        // width: '100%',
        // backgroundColor: 'white',
        // backgroundColor: 'green',

        borderRadius: 15,
        // padding: 10,
        margin: 10
    },
    btntxt: {
        backgroundColor: colors.text1,
        // color: colors.col1,


        paddingHorizontal: 10,
        paddingVertical: 5,
        // fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
        // color: '#474747',
        color: colors.col1,

        fontSize: 16,
        fontWeight: 'bold',

    },
    btncont: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: colors.text3,
        paddingHorizontal: 10,
        // borderTopWidth: 0.2,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    c1: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: colors.col1,
        borderRadius: 10,
        // paddingHorizontal: 3,
        // paddingVertical: 2
    },
    txt1: {
        fontSize: 15,
        color: colors.text3,
        // width: '75%',
        fontWeight: '500',
        marginBottom: 3
        // paddingTop: 4
    },
    txt2: {
        fontSize: 13,
        color: colors.text3,
        fontWeight: '600',
        marginBottom: 2

    },
    c2: {
        backgroundColor: colors.text1,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row',
    },
    txt3: {
        fontSize: 15,
        color: colors.col1,
    },
    txt5: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.text1,
        marginHorizontal: 5,
    },
    txt6: {
        fontSize: 20,
        color: colors.text3,
        marginHorizontal: 5,
        fontWeight: '600',
        // paddingLeft: 5
    },
    c3: {
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingLeft: 5
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'center',
        // width: '100%',
        // alignItems: 'flex-end',
        width: 100,
        borderRadius: 20,
        borderColor: colors.text3,
        backgroundColor: '#edeef0',
        // borderWidth: 1,
        marginVertical: 5,
        padding: 5,
        elevation: 2
    },
    del: {
        color: colors.text3,
        paddingLeft: 5
    },
    box: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        borderBottomColor: 'grey'
    }
    ,
    boxIn: { flexDirection: 'row', alignContent: 'center', alignItems: 'center', }
    ,
    boxInText:
    {
        fontSize: 15,
        color: colors.text3,
        fontWeight: '500',
        marginBottom: 3,
        fontWeight: '400',
        paddingLeft: 5,
        paddingTop: 4
    }
})
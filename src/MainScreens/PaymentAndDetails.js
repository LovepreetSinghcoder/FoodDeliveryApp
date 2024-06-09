import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image, Alert, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import axios from 'axios';
import { AntDesign, Ionicons, FontAwesome6, Fontisto, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';



const PaymentAndDetails = ({ navigation, route }) => {

    const { userloggeduid, checkIsLogged } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    // const { cartdata } = route.params;
    // const route = useRoute();

    // Access the passed values from route.params
    const deliveryAdress = route.params.deliveryAdress;
    const restaurantData = route.params.restaurantData;

    const restaurantName = route.params.restaurantName;
    const _shopId = route.params.shopId;
    const GSTnCharger = route.params.GSTnCharger;



    // const cartdata = route.params.cartdata;
    const cartAllData = route.params.cartAllData;

    const finalCost = route.params.totalCost;
    const itemCost = route.params.itemCost;
    const deliveryCharges = route.params.deliveryCharges;


    // console.log('dekh bro total code', _shopId)

    // useEffect(() => {
    //     // setOrderdata(JSON.parse(cartdata));
    //     // setOrderdata(cartdata);
    //     setOrderdata(cartdata[...cartAllData]);


    // }, [cartAllData])

    // useEffect(() => {
    //     // Create a new array named cartdata with all elements from cartAllData
    //     const cartdata = [...cartAllData];
    //     setOrderdata(cartdata);
    // }, [cartAllData]);




    useEffect(() => {
        if (Array.isArray(cartAllData)) {
            // let cartItems = [cartItems: [...cartAllData]];
            let cartItems = { cartItems: [...cartAllData] };
            // console.log("this is new cartData", cartItems);
            setOrderdata(cartItems);
        } else {
            setOrderdata([]); // Handle case where cartAllData is not an array
        }
    }, [cartAllData]);

    // console.log("this is new orderdata :: ", orderdata)

    const [userdata, setUserdata] = useState([]);

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('UserData');

            foodRef.onSnapshot(snapshot => {
                setUserdata(snapshot.docs.map(doc => doc.data()))
            }
            )
        };

        fetchData();
    }, [cartAllData]);



    const [shopTokens, setShopTokens] = useState([]);


    // useEffect to get shoptokens 

    useEffect(() => {
        const getShopToken = () => {
            if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {
                let cartArrayNames = [];
                // const checkData = cartdata.cartItems;
                const checkData = cartAllData;

                checkData.forEach((item) => {
                    cartArrayNames.push(item.shop_id);
                });

                const tokens = []; // Create an array to store the fcmTokens

                for (let i = 0; i < cartArrayNames.length; i++) {
                    const matchingUserId = userdata.find((user) => user.uid === cartArrayNames[i]);
                    if (matchingUserId) {
                        tokens.push(matchingUserId.fcmToken); // Save the fcmToken to the tokens array
                    }
                }

                setShopTokens(tokens); // Update the shopTokens state with the tokens array
            } else {
                console.log('Empty array or null cartdata');
            }
        };

        getShopToken();
    }, [cartAllData, userdata]);


    useEffect(() => {

        if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {


            // const cart23 = cartdata;
            let totalfoodprice = 0;
            // const foodprice = cart23.cartItems;
            const foodprice = cartAllData;


            foodprice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice)) +
                    (parseInt(item.totalAddOnPrice));
            });
            setTotalCost(totalfoodprice.toString());
            // setIsLoading(false);
        }
        else {
            setTotalCost('0');
        }
    }, [cartAllData]);

    const deleteCart = async () => {
        // console.log('delete trigger');
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            await docRef.delete();
            console.log('Document successfully deleted.');
        } else {
            console.log('Document does not exist.');
        }
    };

    const deleteShopIdArray = async () => {

        setLoading(true)
        // setProcess(true)
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);


        try {
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();

                if (data && data.hasOwnProperty(_shopId)) {
                    // Remove the shopId key from the document
                    await docRef.update({
                        [_shopId]: firebase.firestore.FieldValue.delete()
                    });

                    console.log(`Deleted shopId: ${_shopId}`);
                } else {
                    console.log(`shopId: ${_shopId} does not exist in the document.`);
                }
            } else {
                console.log(`Document for user ${userloggeduid} does not exist.`);
            }
        } catch (error) {
            console.error('Error deleting shopId array:', error);
        }

        // getcartdata();
        // GetTotalPrice();
        // checkShopOpen();
        // setProcess(false)
        setLoading(false)
    };


    // const sendPushNotification = async (fcmTokens, title, message) => {
    //     try {
    //         const config = {
    //             method: 'post',
    //             url: 'https://fcm.googleapis.com/fcm/send',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer AAAALDQPvlg:APA91bH3XMSBJiuy7dpj5LRf1OiB1Ncpwvk3nc-1qffGN3EzBrhLeDu0uG0t3tp7PkC9lVrsTGtTPreXVzAB_1VHsaMU-6MCSCiugZ95yFBAIsWhdhJew3_HKmlwVdUhIlzELhTtoUTo', // Replace with your server key from Firebase Console
    //             },
    //             data: {
    //                 registration_ids: fcmTokens,
    //                 notification: {
    //                     title,
    //                     body: message,
    //                 },
    //             },
    //         };

    //         const response = await axios.request(config);

    //         console.log('Notification sent successfully:', response.data);
    //     } catch (error) {
    //         console.log('Error sending notification:', error);
    //     }
    // };

    // Usage example
    //   const fcmTokens = ['FCM_TOKEN_1', 'FCM_TOKEN_2', 'FCM_TOKEN_3'];
    //   sendPushNotification(fcmTokens, 'Hello', 'This is a test notification');
    // const shopTokens = 'cE13la2-TaK1HWiJ1_JEee:APA91bGlIZxF-gZ7fzLaJKG577cPR_ZVhVOystTY65LSeNFZ2dPqo-mtVIgvCyvsbVStxq6udghfkxLT59X4_mmRWDHQckLQcJph9UYgv6R31T13ez-AOAslUCwAyDcLIpvDWoosiCHM'
    //   sendPushNotification(shopTokens, 'New Order Received', 'mujhe nhi ptaaa ' + orderby);

    // console.log('dekh veere', totalCost)
    const fcmServerKey = 'AAAALDQPvlg:APA91bH3XMSBJiuy7dpj5LRf1OiB1Ncpwvk3nc-1qffGN3EzBrhLeDu0uG0t3tp7PkC9lVrsTGtTPreXVzAB_1VHsaMU-6MCSCiugZ95yFBAIsWhdhJew3_HKmlwVdUhIlzELhTtoUTo'; // Replace with your FCM server key
    const axiosInstance = axios.create({
        baseURL: 'https://fcm.googleapis.com/fcm/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${fcmServerKey}`,
        },
    });

    const sendNotification = async (deviceToken, title, body) => {
        try {
            const response = await axiosInstance.post('/send', {
                registration_ids: deviceToken,
                notification: {
                    title,
                    body,
                },
                data: {}, // Optional payload data
            });

            console.log('Notification sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };


    const [locationPermission, setLoactionPermission] = useState(false)

    // const requestLocationPermission = async () => {
    //     setLoading(true);
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         console.log('Permission to access location was denied');
    //         setLoactionPermission(false);
    //         setLoading(false);


    //         return;
    //     }
    //     setLoactionPermission(true)
    //     // Permission granted, continue with obtaining the location
    //     getLocation();
    //     setLoading(false);

    // };

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

    // const getLocation = async () => {
    //     try {
    //         const location = await Location.getCurrentPositionAsync({});
    //         const { latitude, longitude } = location.coords;
    //         // console.log('Latitude:', latitude);
    //         // console.log('Longitude:', longitude);
    //         setUserLatitude(latitude)
    //         setUserLongitude(longitude)
    //         // setUserCoords(latitude, longitude)
    //         await getLocationName(latitude, longitude);
    //         console.log("this is the the calue of the location Name", latitude, longitude)
    //         return true
    //         // Do something with the latitude and longitude values
    //     } catch (error) {
    //         console.log('Error getting location:', error);
    //         return false
    //     }
    // };

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



    const [userLatitude, setUserLatitude] = useState('')
    const [userLongitude, setUserLongitude] = useState('')
    const [userLocationName, setUserLocationName] = useState('')

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


    // console.log('This is the value of the coords', userLatitude, userLongitude)
    // console.log('This is the value of the city', userLocationName)
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

    const [distancebtwCustomerRestaurant, setDistancebtwCustomerRestaurant] = useState('')



    useEffect(() => {
        if (restaurantData && restaurantData.location && restaurantData.location.geolocation) {
            const restaurantLatitude = restaurantData.location.geolocation.latitude;
            const restaurantLongitude = restaurantData.location.geolocation.longitude;

            const coords1 = { latitude: restaurantLatitude, longitude: restaurantLongitude };
            const coords2 = { latitude: userLatitude, longitude: userLongitude };

            const calculatedDistance = haversineDistance(coords1, coords2);
            setDistancebtwCustomerRestaurant(calculatedDistance);
        } else {
            console.warn('restaurantData or its location/geolocation properties are not available.');
        }
    }, [restaurantData, userLatitude, userLongitude]);


    const updateUserLocation = async (userId, locationName, userLatitude, userLongitude) => {
        try {
            const usersRef = firebase.firestore().collection('UserData').doc(userId);
            await usersRef.update({
                'location.address.city': locationName,
                'location.geolocation.latitude': userLatitude,
                'location.geolocation.longitude': userLongitude,
            });
            console.log('User location updated successfully');
        } catch (error) {
            console.log('Error updating user location:', error);
        }
    };

    // console.log('this is the console value of the ,', distancebtwCustomerRestaurant)
    const OrderPlaceHandler = async () => {

        // if (!userdata.emailVerified) {
        //     alert('Please verify your email')
        //     return;
        // }

        // Verify if the location permission is allowed
        // if the location permision is not allowerd then show the popup to allow notification, 
        // if (!requestLocationPermission) {
        //     alert('Location permission is compulsary to place order!')
        //     // if the user not allowed the location then send the user back to the screen
        //     return;
        // }

        const permissionGranted = await requestLocationPermission(); // Call and await the function
        // if (!permissionGranted) {
        //     alert('Location permission is compulsory to place order!');
        //     // If the user does not allow the location, send the user back to the screen
        //     return;
        // }

        if (!permissionGranted) {
            Alert.alert(
                'Location Permission Required',
                'Location permission is compulsory to place order. Please enable location permission in settings.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Allow',
                        onPress: () => Linking.openSettings(), // Navigate to the app's settings screen
                    },
                ],
            );
            return;
        }
        // if the user allowed the location then update the loction coords

        // check if the user location shortest distance align with the restaurant redius

        // if (distancebtwCustomerRestaurant > restaurantData.Availablilty_Radius) {
        //     alert('This restaurant service is not available in your location! Update your location')
        //     return;
        // }

        // Alert.alert('Confirmation', 'Click ok to place order!', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     { text: 'OK', onPress: async () => await OrderPlacementHandler() },
        //   ]);


        // const location = await getLocation();
        // if (!location) {
        //     alert('Failed to get location');
        //     return;
        // }

        // const locationName = await getLocationName(location.latitude, location.longitude);
        // if (!locationName) {
        //     alert('Failed to get location name');
        //     return;
        // }
        const location = await getLocation();
        if (!location) {
            alert('Failed to get location');
            return;
        }

        const { latitude, longitude } = location;

        const locationName = await getLocationName(latitude, longitude);
        if (!locationName) {
            alert('Failed to get location name');
            return;
        }
    
        // Update the user's location in Firestore
        const userId = userloggeduid; // Replace this with the appropriate user ID
        await updateUserLocation(userId, locationName, latitude, longitude);

        if (restaurantData && restaurantData.location && restaurantData.location.geolocation) {
            const restaurantLatitude = restaurantData.location.geolocation.latitude;
            const restaurantLongitude = restaurantData.location.geolocation.longitude;
            const coords1 = { latitude: restaurantLatitude, longitude: restaurantLongitude };
            const coords2 = { latitude: location.latitude, longitude: location.longitude };
            const calculatedDistance = haversineDistance(coords1, coords2);

            if (calculatedDistance > restaurantData.Availablilty_Radius) {
                alert('This restaurant service is not available in your location! Update your location');
                return;
            }

            setDistancebtwCustomerRestaurant(calculatedDistance);

            Alert.alert('Confirmation', 'Click OK to place order!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: async () => await OrderPlacementHandler() },
            ]);
        } else {
            console.warn('restaurantData or its location/geolocation properties are not available.');
        }

        //if all set then triger addingSomeData and show the confirmation message to place the order

        // then place the order
    }
    const [updatedCartData, setUpdatedCartData] = useState(null);
    // const addingSomedata = async (docid, date) => {



    //     if (cartAllData !== null) {
    //         console.log('dekh 1');
    //         const updatedData = { ...orderdata };
    //         updatedData.cartItems.forEach((item) => {
    //             item.orderId = docid;
    //             item.orderDate = date;
    //         });
    //         await setUpdatedCartData(updatedData);
    //     }

    // }

    const addingSomedata = async (docid, date) => {
        if (cartAllData !== null) {
            console.log('dekh 1');
            const updatedData = { ...orderdata };
            updatedData.cartItems.forEach((item) => {
                item.orderId = docid;
                item.orderDate = date;
            });
            return updatedData;
        }
        return null;
    };



    const OrderPlacementHandler = async () => {
        setLoading(true);
        const currentDate = new Date().getTime().toString()
        const base36Timestamp = currentDate.toString(36);
        const hash = userloggeduid.split('').reduce((hash, char) => {
            setLoading(false);
            return hash + char.charCodeAt(0);
        }, 0);

        // Convert the hash to a base36 string
        const base36Hash = hash.toString(36);
        const randomString = Math.random().toString(36).substring(2, 18)
        const combinedString = base36Timestamp + base36Hash + randomString;
        const docid = combinedString.substring(0, 18);


        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid);
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid);
        const orderpaymentdoc = firebase.firestore().collection('OrderPayments').doc();
        const usersRef = firebase.firestore().collection('UserData').doc(userloggeduid);


        // await addingSomedata(docid, currentDate);
        const updatedData = await addingSomedata(docid, currentDate);

        if (updatedData !== null) {
            try {
                await orderitemstabledoc.set({ ...updatedData });
                console.log("Dekh A")
                await orderdatadoc.set({
                    orderid: docid,
                    orderStatus: 'Pending',
                    ordercost: totalCost,
                    orderdate: new Date().getTime().toString(),
                    userid: userloggeduid,
                    orderpayment: 'COD',
                    paymenttotal: finalCost,
                    shopId: _shopId,
                    itemcost: itemCost,
                    GSTnCharger: GSTnCharger,
                    deliverycharges: deliveryCharges
                });

                await orderpaymentdoc.set({
                    transactionid: orderpaymentdoc.id,
                    orderid: docid,
                    orderdate: new Date().getTime().toString(),
                    orderpayment: 'COD',
                    paymenttotal: finalCost,
                    shopId: _shopId,
                    itemcost: itemCost,
                    deliverycharges: deliveryCharges,
                    paymentstatus: "Pending",
                    paymentdate: "",
                    creationDate: currentDate,
                    GSTnCharger: GSTnCharger,

                })
              
                console.log("Dekh B")

                // await deleteCart();
                await deleteShopIdArray();

                console.log("Dekh C")

                const currentTime = new Date().toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                console.log("Dekh D")
                const notificationRef = firebase.firestore().collection('AllNotificationData').doc();
                const notificationDocId = notificationRef.id;

                // Data for the notification
                const notificationData = {
                    notificationId: notificationDocId,
                    orderId: docid,
                    restaurantId: _shopId,
                    time: currentTime,
                    title: `New Order Received`,
                    body: `Time: + ${currentTime}`
                };

                // Set the notification data
                await notificationRef.set(notificationData);

                await sendNotification(shopTokens, 'New Order Received', 'Time: ' + currentTime);
                console.log('New Order Received 45', shopTokens);
                navigation.navigate('HomeScreen');
                alert('Order Placed Successfully');
            } catch (error) {
                console.log('Error placing order:', error);
                alert('Error placing order. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        setLoading(false);

    };


    return (
        <>

            <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center',
                backgroundColor: '#ffffff'
            }} onPress={() => { navigation.navigate('HomeScreen') }} >
                <FontAwesome6 name="arrow-left" size={20} color="black" />
                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Payment Options</Text>
            </TouchableOpacity>

            <View style={styles.box}>

                <View style={styles.boxIn}>
                    <View>
                        <Image
                            source={require('../Images/Frame8.png')}
                            style={{ width: 15, height: 50, marginHorizontal: 5, marginVertical: 5 }}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 0, paddingBottom: 7 }}>{restaurantName} |<Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10, color: 'grey' }}> 50 min</Text></Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 0, paddingTop: 6, paddingBottom: 1 }}>Home |<Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10, color: 'grey' }}> {userLocationName ? userLocationName : deliveryAdress}</Text></Text>

                    </View>
                </View>
            </View>

            <View style={styles.container}>


                <View>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Pay on Delivery</Text>

                    <View style={[styles.box, { borderTopWidth: 0, borderRadius: 15, marginVertical: 10 }]}>

                        <View style={[styles.boxIn, {}]}>
                            {/* <Fontisto name="stopwatch" size={15} color="black" /> */}
                            <View style={{ backgroundColor: colors.col2, padding: 10, borderRadius: 15 }}>

                                <FontAwesome name="rupee" size={15} color="black" />
                            </View>
                            <View>

                                <Text style={[styles.boxInText, { paddingLeft: 5, fontSize: 17 }]}>Pay on Delivery <Text style={{ fontWeight: '500' }}>{'(Cash/UPI)'}</Text></Text>
                                {/* <View style={{ flexDirection: 'row' }} >

                                    <Text style={[styles.boxInText, { fontWeight: '400', color: 'grey' }]}>{userdata.address}</Text>
                                    
                                </View> */}
                            </View>
                        </View>
                        {/* <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View> */}
                    </View>

                    {/* <TouchableOpacity style={styles.editButton}
                        onPress={() => { alert('Selected') }}
                    >
                        <Text style={styles.editButtonText}>Cash on Delivery</Text>
                    </TouchableOpacity> */}
                </View>

                {/* <View style={{ paddingBottom: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Delivery Location</Text>

                    <TouchableOpacity style={[styles.editButton, { marginBottom: 10 }]}
                        onPress={() => { alert('Selected') }}

                    >
                        <Text style={styles.editButtonText}>Current Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}
                        onPress={() => navigation.navigate('Editprofile')}
                    >
                        <Text style={styles.editButtonText}>Change Delivery Location</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>


                    {loading ?

                        <TouchableOpacity style={styles.editButton} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.editButton}
                            // onPress={() => OrderPlacementHandler()}

                            onPress={() => OrderPlaceHandler()}

                        // onPress={() => navigation.navigate('Placeorder', { cartdata })}
                        >
                            <Text style={styles.editButtonText}>Place Order</Text>
                        </TouchableOpacity>

                    }
                </View>
            </View>
        </>
    )
}

export default PaymentAndDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#fff',
        backgroundColor: "#f5f6fb"

    },
    editButton: {
        backgroundColor: colors.text1
        ,
        borderRadius: 15,
        paddingVertical: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        // color: '#474747',
        color: colors.col1,

        fontSize: 16,
        fontWeight: 'bold',
    },
    box: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#cccccc'
    }
    ,
    boxIn: { flexDirection: 'row', alignContent: 'center', alignItems: 'center', paddingHorizontal: 10 }
    ,
})
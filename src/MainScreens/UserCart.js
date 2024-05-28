import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import { Switch } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons, FontAwesome6, Fontisto } from '@expo/vector-icons';

import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Cart from '../Components/Cart';

// import BottomNav from '../components/BottomNav';

// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const UserCart = ({ navigation, route }) => {

    const data_shopId = route.params;

    const { userloggeduid, checkIsLogged, locationName, calculateDistance, userdata } = useContext(AuthContext);

    // console.log('ye ha loation NAM3E', locationName)
    const [cartdata, setCartdata] = useState(null);
    const [cartAllData, setCartAllData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState(false);
    const [restaurantLatitude, setRestaurantLatitude] = useState(null)
    const [restaurantLongitude, setRestaurantLongitude] = useState(null)
    const [userLatitude, setUserLatitude] = useState(null)
    const [userLongitude, setUserLongitude] = useState(null)
    const [userDistance, setUserDistance] = useState(null)
    const [deliveryCharges, setDeliveryCharges] = useState(null)
    const [notdeliverable, setNotdeliverable] = useState(false);
    const [itemCost, setItemCost] = useState('0');
    const [totalCost, setTotalCost] = useState('0');
    const [isUseCoins, setIsUseCoins] = useState(false);


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





    const getcartdata = async () => {
        setLoading(true);
        // const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
        const docRef = firebase.firestore().collection('UserCart').doc('ULzOMM6qS3PuERvrNmyf4SYu3KF3');


        try {
            await docRef.get().then((doc) => {
                if (doc.exists) {
                    // const data = JSON.stringify(doc.data());
                    // setCartdata(data)
                    // setCartdata(doc.data())
                    // console.log("This is the data of the your Cart :", doc.data())
                    // setCartAllData(doc.data().cartItems)
                    // console.log("This is the data of the your Cart Test12:", doc.data().cartItems)


                } else {
                    console.log('No such document!');
                }
            })
        } catch (error) {
            console.log('Error', error);

        }
        setLoading(false)
    }



    const getSpecificArray = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();

                if (data && data.hasOwnProperty(data_shopId)) {
                    const specificArray = data[data_shopId];
                    console.log(`Array "${data_shopId}" data:`, specificArray);
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
            getcartdata();
            console.log('triggered cart')
        }, [])
    );

    // useEffect(() => {
    //     if (cartdata != null) {
    //         const foodprice = JSON.parse(cartdata).cart;
    //         let totalfoodprice = 0;
    //         foodprice.map((item) => {
    //             // console.log(item.data.foodPrice)
    //             totalfoodprice = (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
    //                 (parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
    //         })
    //         // console.log(totalfoodprice)
    //         setTotalCost(JSON.stringify(totalfoodprice))
    //     }
    // }, [cartdata])
    // console.log(cartdata)

    // console.log(JSON.parse(cartdata).cart[0].data);


    // const [userdata, setUserdata] = useState([]);


    // useEffect(() => {
    //     // Fetch data from Firebase
    //     const fetchData = async () => {
    //         const foodRef = firebase.firestore().collection('UserData');

    //         foodRef.onSnapshot(snapshot => {
    //             setUserdata(snapshot.docs.map(doc => doc.data()))
    //         }
    //         )
    //     };

    //     fetchData();
    // }, [cartdata]);

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


            // foodRef.onSnapshot(snapshot => {
            //     setFoodDataAll(snapshot.docs.map(doc => doc.data()))
            // }

            const doc = await docRef.get();
            doc.forEach((doc) => {
                setShopInfo(doc.data());
            })
        };

        fetchData();
    }, []);
    // console.log('This is the data of the Shop Data', shopInfo)


    const [restaurantsData, setRestaurantsData] = useState([]);


    // useEffect to get all data of Restaurant Data 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('RestaurantData').where('shopId', '==', data_shopId)



            // const doc = await docRef.get();
            // doc.forEach((doc) => {
            //     setRestaurantsData(doc.data());
            // })

            // docRef.onSnapshot(snapshot => {
            //     setRestaurantsData(snapshot.docs.map(doc => doc.data()))
            // }
            // )
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

    // console.log('No Restaurant Data Found!',restaurantsData);




    // console.log('This is the data of the Restaurants Data', restaurantsData)
    const GetRestaurantDataHandler = (id) => {

        if (!restaurantsData) {
            console.log('Restaurant data is not loaded')
            return;
        }
        // const data = restaurantsData.filter((item) => item.shopId == 'U08laKOtyLZWlAXzRFLVYi8ReeK2')
        const data = restaurantsData.filter((item) => item.shopId == id)


        // console.log('This the data we want::', data[0])
        // return data[0];
        return data;

    }

    // useEffect(() => {

    //     GetRestaurantDataHandler()
    // },[restaurantsData])

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


    // useEffect to triger checkShopOpen Fn 
    // useEffect(() => {
    //     checkShopOpen();
    // }, [cartdata, userdata]);


    //Check Stock of Each Item

    const [inStock, setInStock] = useState(true);
    const [outStock, setOutStock] = useState([]);


    // useEffect to check Stock of the Foods 
    // useEffect(() => {
    //     const checkStock = () => {
    //         if (cartdata !== null && Object.keys(cartdata).length !== 0) {

    //             //NEW CODE
    //             let itemIDs = [];
    //             const checkData = cartdata.cartItems;
    //             checkData.forEach((item) => {

    //                 // const cartArrayNames = item.
    //                 itemIDs.push(item.item_id)
    //             });
    //             // const cartArrayNames = Object.keys(cartdata);
    //             // console.log('dekh veere', itemIDs)


    //             // let checkStockV = false;
    //             setOutStock([]); // Clear the array before adding new items
    //             for (let i = 0; i < itemIDs.length; i++) {
    //                 // console.log('dekhi bro 2');
    //                 const matchingItemId = foodDataAll.find((item) => item.id === itemIDs[i]);

    //                 // console.log('dekhi bro 4', matchingUserId);
    //                 // console.log('dekhi bro 4');

    //                 if (matchingItemId) {
    //                     // console.log('dekhi bro 5');
    //                     setRestaurantLatitude(parseFloat(matchingItemId.RestaurantCords.Lat))
    //                     setRestaurantLongitude(parseFloat(matchingItemId.RestaurantCords.Long))

    //                     if (matchingItemId.stock === 'out') {
    //                         // console.log('dekhi bro 7');
    //                         setInStock(false);
    //                         setOutStock((prevStock) => [...prevStock, matchingItemId.foodName]);
    //                         // console.log('Dekhi bro nhi haiga');
    //                     } else {
    //                         setInStock(true);

    //                         // console.log('dekhi bro 8');
    //                     }
    //                 }
    //             }
    //         } else {
    //             console.log('Empty array or null cartdata');
    //         }
    //     };

    //     checkStock();
    // }, [cartdata, foodDataAll]);



    // console.log('dekh coreds', restaurantLatitude, restaurantLongitude)
    // const getCoordinatesFromLocationName = async (locationName) => {
    //     try {
    //         const encodedLocationName = encodeURIComponent(locationName);
    //         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocationName}`);

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch coordinates');
    //         }

    //         const data = await response.json();

    //         if (data.length > 0) {
    //             const { lat, lon } = data[0];
    //             console.log('dekh veere location coords 34', parseFloat(lat), parseFloat(lon))
    //             setUserLatitude(parseFloat(lat))
    //             setUserLongitude(parseFloat(lon))
    //             // return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    //         } else {
    //             throw new Error('Location not found');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching coordinates 001:', error);
    //         return null;
    //     }
    // };

    // useEffect(() => {
    //     getCoordinatesFromLocationName(locationName)
    // }, [locationName])

    // useEffect(() => {
    //     const distance = calculateDistance(userLatitude, userLongitude, restaurantLatitude, restaurantLongitude)
    //     console.log('this is th distance in km 88888', (distance))
    //     const roundValue = Math.round(distance)
    //     setUserDistance(roundValue)

    // }, [restaurantLatitude])

    // useEffect(() => {
    //     if (userDistance > 9) {
    //         setNotdeliverable(true)
    //     }
    //     else {
    //         setNotdeliverable(false)

    //     }
    // }, [userDistance])

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
        if (userDistance >= 0) {
            const deliveryCharges = 10 * userDistance;
            setDeliveryCharges(deliveryCharges)
        }

    }

    useEffect(() => {
        getTotalDeliveryCharges()
    }, userDistance)


    const GetTotalPrice = () => {
        if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {


            // const cart23 = cartdata;
            let totalfoodprice = 0;
            // const foodprice = cart23.cartItems;
            const foodprice = cartAllData;

            foodprice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice)) +
                    (parseInt(item.totalAddOnPrice));
            });
            setItemCost(totalfoodprice.toString());


            // setTotalCost(totalfoodprice.toString());

            console.log('This is the Grand Total Price :', totalfoodprice.toString())
            // setIsLoading(false);
            let finalPrice = totalfoodprice + deliveryCharges + ((totalfoodprice * 12) / 100);
            setTotalCost(finalPrice.toString());
        }
        else {
            setTotalCost('0');
        }
    }


    // useEffect to trigger fn which finds total Price 

    useEffect(() => {
        GetTotalPrice();
    }, [cartAllData]);



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
        // setIsLoading(false);
    }



    const GoToPaymentPage = () => {
        if (cartAllData !== null && Object.keys(cartAllData).length !== 0) {
            // if (user.totalCoin < -10) {
            //     alert("Unable to place the order due to insufficient coins!");
            // }
            // else
             if (notdeliverable) {
                alert("This item is not available in your location.");

            }
            // else if (restaurantName.length != 1) {
            //     alert("Only one restaurant order is accepted at a time.");

            // }
            // else if (shopInfo.shopIs === 'Close') {
            //     alert("Technical Issue!");

            // }
            // else if (isRestaurantOpen === false) {
            //     alert(`The following restaurant is closed : ${closedRestaurants}`)
            // }
            else if (inStock === false) {
                alert(`The following item is Out of Stock : ${outStock}`)

            }

            else if (parseInt(totalCost) < parseInt(shopInfo.minpriceorder) || parseInt(totalCost) > parseInt(shopInfo.maxpriceorder)) {
                alert(`Order value must lie within: ${shopInfo.minpriceorder} - ${shopInfo.maxpriceorder}`);
            }


            else {
                navigation.navigate('PaymentNdetail', {
                    // cartdata , totalCost
                    cartdata: cartdata, // Replace with your cart data
                    totalCost: totalCost // Replace with your total cost value
                })
            }

        }
        else {
            alert('Cart is Empty!')
        }

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
                    <Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10 ,color: 'grey'}}>{restaurantsData.restaurant_name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10 }}>Delivery at Home  <Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10 ,color: 'grey'}}>{userdata.address}</Text></Text>
                </View>
            </TouchableOpacity>


            <ScrollView style={styles.container}>
                <View style={styles.cartout}>
                    {/* {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? */}
                    {cartAllData == null ?

                        <Text style={styles.head2}>Your Cart is Empty</Text>
                        :
                        // <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart} renderItem={
                        <FlatList style={styles.cardlist} data={cartAllData} renderItem={

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
                                                    // borderRadius: 12,
                                                    zIndex: 1,
                                                    borderRadius: 10,
                                                    paddingVertical: 5,
                                                    paddingHorizontal: 5,
                                                    backgroundColor: '#fff6f7',
                                                    flexDirection: 'row'
                                                }]}>
                                                    <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 16, fontWeight: '600' }}>-</Text></TouchableOpacity>
                                                    <Text style={{ fontSize: 16, fontWeight: '400' }}> {item.foodquantity} </Text>
                                                    <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 16, fontWeight: '600' }}>+</Text></TouchableOpacity>

                                                </View>
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

                <View style={[styles.cartout, { backgroundColor: '#ffffff', paddingHorizontal: 10 }]}>
                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <Fontisto name="stopwatch" size={15} color="black" />

                            <Text style={styles.boxInText}>Delivery in <Text style={{ fontWeight: '500' }}>28 mins</Text></Text>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>

                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <Fontisto name="stopwatch" size={15} color="black" />
                            <View>

                                <Text style={styles.boxInText}>Delivery at <Text style={{ fontWeight: '500' }}>Home</Text></Text>
                                <Text style={[styles.boxInText, { fontWeight: '400', color: 'grey' }]}>{userdata.address}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.boxInText}>{'>'}</Text>
                        </View>
                    </View>

                    <View style={styles.box}>

                        <View style={styles.boxIn}>
                            <Fontisto name="stopwatch" size={15} color="black" />
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
                            <Fontisto name="stopwatch" size={15} color="black" />
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
                            marginTop: 10
                        }}>

                            <View style={{
                                backgroundColor: 'white',
                                borderColor: 'grey',
                                borderRadius: 15,
                                width: '95%',
                                alignSelf: 'center',
                                marginVertical: 5,
                                paddingVertical: 10,
                                padding: 10
                                // elevation: 3
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '600' }}>Item total:</Text>
                                    <Text style={{ fontWeight: '600' }}>{itemCost}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '400' }}>GST & restaurant Charges:</Text>
                                    <Text>{(itemCost * 12) / 100}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '400' }}>Delivery partner fee:</Text>
                                    <Text>{deliveryCharges}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '400' }}>Platform fee:</Text>
                                    <Text>0₹</Text>
                                </View>
                                {isUseCoins === true ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: '400' }}>Discount:</Text>
                                        <Text>-10₹</Text>
                                    </View>
                                    :
                                    null}

                            </View>

                        </View>
                        <View style={styles.btncont}>
                            <View style={styles.c3}>
                                <Text style={styles.txt5}>Total</Text>
                                <Text style={styles.txt6}>₹{totalCost}</Text>
                            </View>
                            <TouchableOpacity style={btn2}>
                                <Text style={styles.btntxt} onPress={() => GoToPaymentPage()}>Place Order</Text>
                            </TouchableOpacity>


                        </View>
                    </>
                    :
                    null

                }

            </ScrollView>
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
        alignSelf: 'center'
    },
    cartout: {
        flex: 1,
        // width: '100%',
        backgroundColor: 'white',
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
        fontSize: 20,
        color: colors.text3,
        marginHorizontal: 5,
    },
    txt6: {
        fontSize: 25,
        color: colors.text3,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
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
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import { Switch } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import BottomNav from '../components/BottomNav';

// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const UserCart = ({ navigation }) => {
    const { userloggeduid, checkIsLogged, locationName, calculateDistance } = useContext(AuthContext);

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
        // const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            await docRef.get().then((doc) => {
                if (doc.exists) {
                    // const data = JSON.stringify(doc.data());
                    // setCartdata(data)
                    setCartdata(doc.data())
                    setCartAllData(doc.data().cartItems)
                    // console.log('ye rha updated data', doc.data().cartItems)
                } else {
                    console.log('No such document!');
                }
            })
        } catch (error) {
            console.log('Error', error);

        }
        setLoading(false)
    }

    useEffect(() => {

        getcartdata();
    }, [])

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
    }, [cartdata]);

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

    // console.log('user is ', user.totalCoin)
    useEffect(() => {

        getuserData();
    }, [userloggeduid]);

    // console.log('coins', user.totalCoin)

    const [foodDataAll, setFoodDataAll] = useState([]);

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('foodData');

            foodRef.onSnapshot(snapshot => {
                setFoodDataAll(snapshot.docs.map(doc => doc.data()))
            }
            )
        };

        fetchData();
    }, [cartdata]);

    // console.log('dekh bro', foodDataAll)


    const [allData, setAllData] = useState([]);
    const [shopInfo, setShopInfo] = useState([]);



    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('shopInfo');

            // foodRef.onSnapshot(snapshot => {
            //     setFoodDataAll(snapshot.docs.map(doc => doc.data()))
            // }
            const doc = await docRef.get();
            // if (!doc.empty) {
            doc.forEach((doc) => {
                setShopInfo(doc.data());
            })
            // )
        };

        fetchData();
    }, []);
    // console.log('dekkkkk',typeof parseInt(shopInfo.minpriceorder))

    //New Approach
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const [closedRestaurants, setClosedRestaurants] = useState([]);
    const [restaurantName, setRestaurantName] = useState([]);
    // console.log('dejhhi', restaurantName.length)
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
    useEffect(() => {


        checkShopOpen();
    }, [cartdata, userdata]);


    //Check Stock of Each Item

    const [inStock, setInStock] = useState(true);
    const [outStock, setOutStock] = useState([]);

    useEffect(() => {
        const checkStock = () => {
            if (cartdata !== null && Object.keys(cartdata).length !== 0) {

                //NEW CODE
                let itemIDs = [];
                const checkData = cartdata.cartItems;
                checkData.forEach((item) => {

                    // const cartArrayNames = item.
                    itemIDs.push(item.item_id)
                });
                // const cartArrayNames = Object.keys(cartdata);
                // console.log('dekh veere', itemIDs)


                // let checkStockV = false;
                setOutStock([]); // Clear the array before adding new items
                for (let i = 0; i < itemIDs.length; i++) {
                    // console.log('dekhi bro 2');
                    const matchingItemId = foodDataAll.find((item) => item.id === itemIDs[i]);

                    // console.log('dekhi bro 4', matchingUserId);
                    // console.log('dekhi bro 4');

                    if (matchingItemId) {
                        // console.log('dekhi bro 5');
                        setRestaurantLatitude(parseFloat(matchingItemId.RestaurantCords.Lat))
                        setRestaurantLongitude(parseFloat(matchingItemId.RestaurantCords.Long))

                        if (matchingItemId.stock === 'out') {
                            // console.log('dekhi bro 7');
                            setInStock(false);
                            setOutStock((prevStock) => [...prevStock, matchingItemId.foodName]);
                            // console.log('Dekhi bro nhi haiga');
                        } else {
                            setInStock(true);

                            // console.log('dekhi bro 8');
                        }
                    }
                }
            } else {
                console.log('Empty array or null cartdata');
            }
        };

        checkStock();
    }, [cartdata, foodDataAll]);



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

    // console.log('dekh bro delivery charges', deliveryCharges, 'And distance', userDistance)
    // console.log('dekjdfdsf', isUseCoins)
    const GetTotalPrice = () => {
        // setIsLoading(true);

        // if (Object.keys(cartdata).length !== 0) {
        // if (cartdata !== null) {
        if (cartdata !== null && Object.keys(cartdata).length !== 0) {


            const cart23 = cartdata;
            let totalfoodprice = 0;
            const foodprice = cart23.cartItems;
            foodprice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice)) +
                    (parseInt(item.totalAddOnPrice));
            });
            setItemCost(totalfoodprice.toString());
            if (isUseCoins === true) {
                let finalPrice = totalfoodprice + deliveryCharges - 10;
                setTotalCost(finalPrice.toString());
                console.log('Now coin is true', isUseCoins)
            }
            if (isUseCoins === false) {

                let finalPrice = totalfoodprice + deliveryCharges;
                setTotalCost(finalPrice.toString());
                console.log('Now coin is false', isUseCoins)
            }



            // setIsLoading(false);
        }
        else {
            setTotalCost('0');
        }
    }

    useEffect(() => {
        GetTotalPrice();
    }, [cartdata]);



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

    // console.log(typeof (cartdata))
    // console.log(restaurantName, '44545545')
    // console.log(parseInt(totalCost) < parseInt(shopInfo.minpriceorder) || parseInt(totalCost) > parseInt(shopInfo.maxpriceorder));

    const GoToPaymentPage = () => {
        if (cartdata !== null && Object.keys(cartdata).length !== 0) {
            if (user.totalCoin < -10) {
                alert("Unable to place the order due to insufficient coins!");
            }
            else if (notdeliverable) {
                alert("This item is not available in your location.");

            }
            else if (restaurantName.length != 1) {
                alert("Only one restaurant order is accepted at a time.");

            }
            else if (shopInfo.shopIs === 'Close') {
                alert("Technical Issue!");

            }
            else if (isRestaurantOpen === false) {
                alert(`The following restaurant is closed : ${closedRestaurants}`)
            }
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
                <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                        <Text style={{ fontSize: 16, color: colors.col1 }}>Close</Text>

                    </TouchableOpacity>
                </View>
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


                <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                        <Text style={{ fontSize: 16, color: colors.col1 }}>Close</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 20 }}>

                    <ActivityIndicator size="large" color={colors.text1} />
                </View>

            </View>
        )
    }

    // else {
    return (

        <View style={styles.containerout}>


            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                    <Text style={{ fontSize: 16, color: colors.col1 }}>Close</Text>

                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                <Text style={styles.head1}>My Cart</Text>
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
                                        <Image source={{ uri: nData[0].foodImageUrl }} style={styles.cartimg} />
                                        <View style={styles.cartcardin}>
                                            <View style={{
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                // backgroundColor: colors.col1,
                                                // borderRadius: 10,
                                                paddingHorizontal: 3,
                                                paddingVertical: 2,
                                                borderBottomWidth: 1,
                                            }}>
                                                <Text style={{ color: 'black' }}>{nData[0].restaurantName}</Text>
                                            </View>
                                            <View style={styles.c1}>
                                                {/* <Text style={styles.txt1}>{item.foodquantity}&nbsp;
                                                    {nData[0].foodName}
                                                </Text>
                                                <Text style={styles.txt2}>₹{nData[0].foodPrice}/each</Text> */}


                                                <Text style={[styles.txt1, { textTransform: 'uppercase' }]}>{nData[0].foodName}</Text>

                                                <Text style={styles.txt2}>{nData[0].foodPrice}₹ for one {nData[0].foodunitType}</Text>
                                                <Text>Quantity: {item.foodquantity}*{nData[0].foodunitType}</Text>
                                            </View>
                                            {item.addonquantity > 0 &&
                                                <View style={styles.c2}>
                                                    <Text style={styles.txt3}>{item.Addonquantity}&nbsp;
                                                        {nData[0].foodAddon}
                                                    </Text>
                                                    <Text style={styles.txt3}>₹{nData[0].foodAddonPrice}/each</Text>
                                                </View>
                                            }



                                            {/* {process ? */}

                                            {/* <TouchableOpacity style={styles.c4} >
                                                    <ActivityIndicator size="small" color="black" />
                                                </TouchableOpacity> */}
                                            {/* // : */}
                                            <TouchableOpacity style={styles.c4} onPress={() => deleteItem(item, nData[0].shopId)}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <AntDesign name="delete" size={22} color="black" style={styles.del} />
                                            </TouchableOpacity>

                                            {/* } */}
                                        </View>

                                    </View>
                                )
                            }
                        }
                            scrollEnabled={false} />}
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
                                paddingVertical: 5,
                                elevation: 3
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '600' }}>Item Cost:</Text>
                                    <Text style={{ fontWeight: '600' }}>{itemCost}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '600' }}>Delivery Charges:</Text>
                                    <Text>{deliveryCharges}₹</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: '500' }}>Service Charges:</Text>
                                    <Text>0₹</Text>
                                </View>
                                {isUseCoins === true ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: '500' }}>Discount:</Text>
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

    },
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        backgroundColor: '#edeef0',

        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
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
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        elevation: 2,
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
        flexDirection: 'column',
        margin: 5,
        width: '69%',
        alignItems: 'flex-end',
        // justifyContent: 'center',
        // backgroundColor: 'green',

    },
    cardlist: {
        width: '100%',
        alignSelf: 'center'
    },
    cartout: {
        flex: 1,
        width: '100%',
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 2
    },
    txt1: {
        fontSize: 16,
        color: colors.text3,
        // width: '75%',
        fontWeight: 'bold',
        marginBottom: 3
        // paddingTop: 4
    },
    txt2: {
        fontSize: 14,
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
    }
})
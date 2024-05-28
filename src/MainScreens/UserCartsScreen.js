import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import { Switch } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cart from '../Components/Cart';

const UserCartsScreen = ({ navigation }) => {

    const { userloggeduid, checkIsLogged, locationName, calculateDistance } = useContext(AuthContext);
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

    const getcartdata = async () => {
        setLoading(true);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            await docRef.get().then((doc) => {
                if (doc.exists) {
                    // const data = JSON.stringify(doc.data());
                    // setCartdata(data)
                    setCartdata(doc.data())
                    // console.log("This is the data of the your Cart :", doc.data().[0])
                    // setCartAllData(doc.data().cartItems)

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


    const [restaurantsData, setRestaurantsData] = useState([]);


    // useEffect to get all data of Restaurant Data 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('RestaurantData');



            // const doc = await docRef.get();
            // doc.forEach((doc) => {
            //     setRestaurantsData(doc.data());
            // })

            docRef.onSnapshot(snapshot => {
                setRestaurantsData(snapshot.docs.map(doc => doc.data()))
            }
            )
        };

        fetchData();
    }, []);


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
        // checkShopOpen();
        setProcess(false)
        setLoading(false)
        // setIsLoading(false);
    }

    const deleteShopIdArray = async (shopId) => {

        setLoading(true)
        setProcess(true)
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);


        try {
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();

                if (data && data.hasOwnProperty(shopId)) {
                    // Remove the shopId key from the document
                    await docRef.update({
                        [shopId]: firebase.firestore.FieldValue.delete()
                    });

                    console.log(`Deleted shopId: ${shopId}`);
                } else {
                    console.log(`shopId: ${shopId} does not exist in the document.`);
                }
            } else {
                console.log(`Document for user ${userLoggedUid} does not exist.`);
            }
        } catch (error) {
            console.error('Error deleting shopId array:', error);
        }

        getcartdata();
        GetTotalPrice();
        // checkShopOpen();
        setProcess(false)
        setLoading(false)
    };

    const openUserCartScreen = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('Usercart', item)
    }


    if (!cartdata) {
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




                {/* <Text style={{ width: '10%', alignSelf: 'center', paddingTop: 10 }}>
                    <ActivityIndicator size="large" color={colors.text1} style={{ justifyContent: 'center', }} />
                </Text> */}
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="fast-food" size={250} color="#dedede" />
                    <Text style={{ color: '#dedede', fontSize: 25, fontWeight: '600' }}>Cart is Empty!</Text>
                </View>
            </View>
        );
    }
    const dataArray = Object.keys(cartdata).map(key => ({
        shopId: key,
        transactions: cartdata[key]
    }));

    // console.log('This is the data of the array::', dataArray)


    if (!dataArray || dataArray.length === 0) {
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

                {/* <Text style={{ width: '10%', alignSelf: 'center', paddingTop: 10 }}>
                    <ActivityIndicator size="large" color={colors.text1} style={{ justifyContent: 'center', }} />
                </Text> */}
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="fast-food" size={250} color="#dedede" />
                    <Text style={{ color: '#dedede', fontSize: 25, fontWeight: '600' }}>Cart is Empty!</Text>
                </View>
            </View>
        );
    }


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
            {/* {process ?

                <View><Text>...</Text></View>

                :
                null} */}

            <FlatList
                data={dataArray}
                keyExtractor={item => item.shopId}
                renderItem={({ item }) => {
                    const restaurantData = GetRestaurantDataHandler(item.shopId);

                    // Assuming restaurantData is an array and you want the first match
                    const restaurant = restaurantData.length > 0 ? restaurantData[0] : {};
                    // console.log('This is the console Data::OO::', restaurant.restaurant_name)

                    return (
                        <View style={styles.CartContainer}>
                            <View style={styles.CartContainerRestaurant}>
                                <View style={styles.CartContainerRestaurantLogo}>
                                    <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />

                                </View>
                                <View style={styles.CartContainerRestaurantText}>

                                    <Text style={styles.CartContainerRestaurantText1}>{restaurant.restaurant_name ? restaurant.restaurant_name : 'N/A'}</Text>

                                    <Text style={styles.CartContainerRestaurantText2}>{
                                        (item.transactions).length > 1 ?
                                            <Text>{(item.transactions).length} items</Text> : <Text>{(item.transactions).length} item</Text>

                                    } </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { openUserCartScreen(item.shopId) }}>


                                    <Cart title={'ok12'} data={item.transactions} navigation={navigation} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.CartContRemove} onPress={() => deleteShopIdArray(item.shopId)}>
                                    <Text style={styles.CartContRemoveText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />



        </View>
    )
}

export default UserCartsScreen

const styles = StyleSheet.create({


    containerout: {
        flex: 1,
        width: '100%',

    },
    container: {
        flex: 1,
        backgroundColor: colors.col2,
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
    CartContRemove: {
        backgroundColor: '#fff1ed',

        borderRadius: 15,
        // marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,


        justifyContent: 'center'
    },

    CartContRemoveText: {
        fontSize: 15,
        // fontWeight: '600',
        color: colors.text1,
        alignSelf: 'center'
    }
})
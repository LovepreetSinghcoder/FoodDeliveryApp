import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator,useImperativeHandle, forwardRef  } from 'react-native'
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
import CartsComponent from '../Components/CartsComponent';

const UserCartsScreen = ({ navigation, optimize = false, transparency = 100, bgcolor = '#edf5ff', onContentCheck = () => console.log("Default function called"), cartsVisibilityHandler = () => console.log("Default function called") }) => {

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
    const [hasContent, setHasContent] = useState(true);


    // const hasContent = true;

    const getcartdata = async () => {
        setLoading(true);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            await docRef.get().then((doc) => {
                if (doc.exists) {
                    setCartdata(doc.data())
                    
                // setHasContent(true)

                } else {
                    console.log('No such document!');
                // setHasContent(false)

                }
            })
        } catch (error) {
            console.log('Error UserCartScreen', error);

        }
        setLoading(false)
    }

    useEffect(() => {

        getcartdata();
    }, [])

    useEffect(() => {
        try {
            const keys = Object.keys(cartdata);
            if (keys.length > 0) {
                const firstKey = keys[1];
                const firstData = cartdata[firstKey];
                console.log("The document has data.");


            } else {
                console.log("The document has no data.");
            }
        }
        catch (error) {
            console.error('Error: UserCartScreen', error);
        }

    }, [cartdata])

    // console.log('This is the value of the hascontent', hasContent)
    // console.log('This is the value of the cartdata', cartdata)


    useFocusEffect(
        React.useCallback(() => {
            getcartdata();
            console.log('triggered cart')
        }, [])
    );

    // React.useEffect(() => {
    //     if (onContentCheck) {
    //       onContentCheck(hasContent);
    //     }
    //   }, [hasContent, onContentCheck]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         onContentCheck(hasContent);
    //         console.log('hasContent cart')
    //     }, [hasContent])
    // );



    // const childFunction = () => {
    //     console.log("Child function triggered");
    //     // Add any logic you want to handle in the child
    //   };
    
    //   // Expose the childFunction to the parent using useImperativeHandle
    //   useImperativeHandle(ref, () => ({
    //     childFunction
    //   }));


    useEffect(() => {
        // console.log("Cart Data:", cartdata); // Debug log to see the structure of cartdata
    
        if (cartdata === null || Object.keys(cartdata).length === 0) {
          onContentCheck(false);
        } else {
          onContentCheck(true);
        }
      }, [cartdata, onContentCheck]);


    const [restaurantsData, setRestaurantsData] = useState([]);


    // useEffect to get all data of Restaurant Data 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('RestaurantData');

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
        const data = restaurantsData.filter((item) => item.shopId == id)
        return data;

    }


    const GetTotalPrice = () => {
        setLoading(true);
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



            setLoading(false);
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
                console.log(`Document for user ${userloggeduid} does not exist.`);
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

    useEffect(() => {
        if (!cartdata || !dataArray || dataArray.length === 0) {

            cartsVisibilityHandler(false)
        }
        else {
            cartsVisibilityHandler(true)

        }
    }, [dataArray, cartdata])


    const EmptyCartMessage = () => (
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
    );


    // if (!cartdata) {
    //     return (
    //         <View style={[styles.containerout,]}>

    //             <TouchableOpacity style={{
    //                 flexDirection: 'row',
    //                 padding: 15,
    //                 alignItems: 'center'
    //             }} onPress={() => { navigation.navigate('HomeScreen') }} >
    //                 <FontAwesome6 name="arrow-left" size={20} color="black" />
    //                 <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Cart</Text>
    //             </TouchableOpacity>
    //             <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
    //                 <Ionicons name="fast-food" size={250} color="#dedede" />
    //                 <Text style={{ color: '#dedede', fontSize: 25, fontWeight: '600' }}>Cart is Empty!</Text>
    //             </View>
    //         </View>
    //     );
    // }

    if (cartdata === null || Object.keys(cartdata).length === 0) {
        // return null; // or some placeholder
        if (!optimize) {
            return <EmptyCartMessage />;
        } else {
            return null;
        }
    }

    if (!cartdata) {
        if (!optimize) {
            return <EmptyCartMessage />;
        } else {
            return null;
        }
    }
    // const dataArray = Object.keys(cartdata).map(key => ({
    //     shopId: key,
    //     // transactions: cartdata[key]
    //     transactions: cartdata[key].filter(transaction => transaction && Object.keys(transaction).length > 0)
    // }));

    const dataArray = Object.keys(cartdata)
        .filter(key => cartdata[key].some(transaction => transaction && Object.keys(transaction).length > 0))
        .map(key => ({
            shopId: key,
            transactions: cartdata[key].filter(transaction => transaction && Object.keys(transaction).length > 0)
        }));

    // console.log('This is the data of the array::', dataArray)


    if (!dataArray || dataArray.length === 0) {
        if (!optimize) {
            return <EmptyCartMessage />;
            // return null;

        } else {
            return null;
        }
    }

    // console.log('This is the usercartScreen',optimize)
    return (
        <View style={[styles.containerout, {
            // backgroundColor: `rgba(237, 245, 255, ${transparency})`,
            backgroundColor: bgcolor

        }]}>

            {!optimize ?
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    padding: 15,
                    alignItems: 'center'
                }} onPress={() => { navigation.navigate('HomeScreen') }} >
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Cart</Text>
                </TouchableOpacity>

                :
                null}
            {/* <FlatList
                data={dataArray}
                keyExtractor={item => item.shopId}
                renderItem={({ item }) => {
                    const restaurantData = GetRestaurantDataHandler(item.shopId);

                    const restaurant = restaurantData.length > 0 ? restaurantData[0] : {};

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
            /> */}


            {/* <Text>Ok dekhne ka akaka</Text> */}
            <CartsComponent navigation={navigation} dataArray={dataArray} restaurantsData={restaurantsData} userloggeduid={userloggeduid} getcartdata={getcartdata} GetTotalPrice={GetTotalPrice} optimize={optimize} />
        </View>
    )
}

export default UserCartsScreen

const styles = StyleSheet.create({


    containerout: {
        flex: 1,
        width: '100%',

    },
    container_cart: {
        flex: 1,
        // backgroundColor: colors.col2,
        backgroundColor: '#edf5ff',

        width: '100%',
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
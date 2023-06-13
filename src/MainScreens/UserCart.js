import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

// import BottomNav from '../components/BottomNav';

// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const UserCart = ({ navigation }) => {
    const { userloggeduid, checkIsLogged } = useContext(AuthContext);

    const [cartdata, setCartdata] = useState(null);
    const [cartAllData, setCartAllData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState(false);


    const [totalCost, setTotalCost] = useState('0');

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
    // useEffect(() => {
    //     if (cartdata != null) {

    //         console.log('Dekh bro 2')

    //         const cart23 = cartdata;
    //         const cartArrayNames = Object.keys(cart23);



    //         console.log('dekhi bro 3', cartArrayNames.length);
    //         let newData = [];
    //         console.log('Dekh bro 4')

    //         for (let i = 0; i < cartArrayNames.length; i++) {
    //             console.log('Dekh bro 5')

    //             const foodData = cart23[cartArrayNames[i]];
    //             console.log('Dekh bro 6')


    //             foodData.forEach((item) => {

    //                 // newData(push.item)
    //                 newData.push(item)
    //             });


    //         }
    //         setAllData(newData)

    //     }
    // }, [cartdata]);

    // console.log('ho yd', allData)

    // const [totalcost, setTotalCost] = useState(null);

    //CODE FOR TOTAL FOOD PRICE
    // useEffect(() => {
    //     // setIsLoading(true);
    //     console.log('Dekh bro 1')

    //     if (cartdata != null) {
    //         // const cart23 = JSON.parse(cartdata);
    //         // const cartArrayNames = Object.keys(cart23);
    //         console.log('Dekh bro 2')

    //         const cart23 = cartdata;
    //         const cartArrayNames = Object.keys(cart23);



    //         console.log('dekhi bro 3', cartArrayNames.length);
    //         let totalfoodprice = 0;
    //         console.log('Dekh bro 4')

    //         for (let i = 0; i < cartArrayNames.length; i++) {
    //             console.log('Dekh bro 5')

    //             const foodprice = cart23[cartArrayNames[i]];
    //             console.log('Dekh bro 6')

    //             //OLD CODE

    //             // foodprice.forEach((item) => {
    //             //     totalfoodprice += (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
    //             //         (parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity));
    //             // });

    //             //NEW CODE
    //             foodprice.forEach((item) => {
    //                 totalfoodprice += (parseInt(item.TotalFoodPrice)) +
    //                     (parseInt(item.TotalAddOnPrice));
    //             });


    //         }

    //         setTotalCost(totalfoodprice.toString());
    //         // setIsLoading(false);
    //     }
    // }, [cartdata]);

    // console.log('dekh bro ho gya ', totalCost)



    //New Approach
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const [closedRestaurants, setClosedRestaurants] = useState([]);

    useEffect(() => {
        const checkShopOpen = () => {
            if (cartdata !== null && Object.keys(cartdata).length !== 0) {

                //NEW CODE
                let cartArrayNames = [];
                const checkData = cartdata.cartItems;
                checkData.forEach((item) => {

                    // const cartArrayNames = item.
                    cartArrayNames.push(item.shop_id)
                });
                // const cartArrayNames = Object.keys(cartdata);
                // console.log('dekh veere', cartArrayNames)

                // console.log('dekhi bro 1', cartArrayNames);
                // let checkStockV = false;
                setClosedRestaurants([]); // Clear the array before adding new items
                for (let i = 0; i < cartArrayNames.length; i++) {
                    console.log('dekhi bro 2');
                    const matchingUserId = userdata.find((user) => user.uid === cartArrayNames[i]);

                    // console.log('dekhi bro 4', matchingUserId);
                    console.log('dekhi bro 4');

                    if (matchingUserId) {
                        console.log('dekhi bro 5');
                        if (matchingUserId.isShop === 'Close') {
                            console.log('dekhi bro 7');
                            setIsRestaurantOpen(false);
                            setClosedRestaurants((prevClosedRestaurants) => [...prevClosedRestaurants, matchingUserId.restaurantName]);
                            console.log('Dekhi bro nhi haiga');
                        } else {
                            setIsRestaurantOpen(true);

                            console.log('dekhi bro 8');
                        }
                    }
                }
            } else {
                console.log('Empty array or null cartdata');
            }
        };

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
                console.log('dekh veere', itemIDs)


                // let checkStockV = false;
                setOutStock([]); // Clear the array before adding new items
                for (let i = 0; i < itemIDs.length; i++) {
                    console.log('dekhi bro 2');
                    const matchingItemId = foodDataAll.find((item) => item.id === itemIDs[i]);

                    // console.log('dekhi bro 4', matchingUserId);
                    console.log('dekhi bro 4');

                    if (matchingItemId) {
                        console.log('dekhi bro 5');
                        if (matchingItemId.stock === 'out') {
                            console.log('dekhi bro 7');
                            setInStock(false);
                            setOutStock((prevStock) => [...prevStock, matchingItemId.foodName]);
                            console.log('Dekhi bro nhi haiga');
                        } else {
                            setInStock(true);

                            console.log('dekhi bro 8');
                        }
                    }
                }
            } else {
                console.log('Empty array or null cartdata');
            }
        };

        checkStock();
    }, [cartdata, foodDataAll]);

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
            setTotalCost(totalfoodprice.toString());
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
        setProcess(false)
        // setIsLoading(false);
    }

    // console.log(typeof (cartdata))
    // console.log(totalCost.type)
    // console.log(typeof totalCost);

    const GoToPaymentPage = () => {
        if (cartdata !== null && Object.keys(cartdata).length !== 0) {
            if (isRestaurantOpen === false) {
                alert(`The following restaurant is closed : ${closedRestaurants}`)
            }
            else if (inStock === false) {
                alert(`The following item is Out of Stock : ${outStock}`)

            }
            else {
                navigation.navigate('PaymentNdetail', { cartdata })
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

                        <Text style={{ fontSize: 16 }}>Close</Text>
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

                        <Text style={{ fontSize: 16 }}>Close</Text>
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

                    <Text style={{ fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                <Text style={styles.head1}>Cart Items</Text>
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

                                           

                                            {process ?

                                                <TouchableOpacity style={styles.c4} >
                                                    <ActivityIndicator size="small" color="black" />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={styles.c4} onPress={() => deleteItem(item, nData[0].shopId)}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <AntDesign name="delete" size={24} color="black" style={styles.del} />
                                            </TouchableOpacity>

                                            }
                                        </View>

                                    </View>
                                )
                            }
                        }
                            scrollEnabled={false} />}
                </View>
                {totalCost && totalCost !== '0' ?
                    <View style={styles.btncont}>
                        <View style={styles.c3}>
                            <Text style={styles.txt5}>Total</Text>
                            <Text style={styles.txt6}>₹{totalCost}</Text>
                        </View>
                        <TouchableOpacity style={btn2}>
                            <Text style={styles.btntxt} onPress={() => GoToPaymentPage()}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null

                }

            </ScrollView>
        </View>
    )
    // }


}

export default UserCart

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        // backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        // height: '100%',

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
        fontSize: 25,
        // textAlign: 'center',
        fontWeight: '600',
        marginVertical: 10,
        paddingHorizontal: 10,
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
        backgroundColor: colors.col1,
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
        width: '58%',
        alignItems: 'flex-end',
        // justifyContent: 'center',
        // backgroundColor: colors.text1,

    },
    cardlist: {
        width: '100%',
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
        color: '#474747',

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
        borderTopWidth: 0.2,
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
        backgroundColor: colors.col1,
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
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: colors.text3,
    }
})
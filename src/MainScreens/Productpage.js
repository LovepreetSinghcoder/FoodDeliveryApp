import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { btn1, productbtn2, colors, hr80, navbtn, navbtnin, navbtnout, nonveg, veg, incdecbtn, incdecinput, incdecout } from '../Global/styles';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';


// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'
const Productpage = ({ navigation, route }) => {
    const { userloggeduid, checkIsLogged } = useContext(AuthContext);

    const data = route.params;
    const [ischecked, setischecked] = useState(false);
    const [quantity, setquantity] = useState('1');
    const [addonquantity, setaddonquantity] = useState('0');
    const [loading, setLoading] = useState(false);

    // console.log("This is the data from product page : shopID : ", data.shopId);
    if (route.params === undefined) {
        navigation.navigate('HomeScreen')
    }

    const [restaurantsData, setRestaurantsData] = useState([]);


    // useEffect to get all data of Restaurant Data 
    useEffect(() => {
        const fetchData = async () => {
            const docRef = firebase.firestore().collection('RestaurantData').doc(data.shopId);



            try {
                const doc = await docRef.get();

                if (doc.exists) {
                    setRestaurantsData(doc.data())

                }
                else {
                    console.log('Error : Rstaurant data does not exist!')

                }
            }
            catch {
                console.log('Error while loading restaurant data!')
            }
        };







        fetchData();
    }, []);

    // console.log('Data of the restaurant ::', restaurantsData.restaurant_name)

    // OLD APPROACH
    // const addTocart = async () => {
    //     if (data.stock === 'in') {
    //         if (data.stockamount > 5) {


    //             const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
    //             const data1 = {
    //                 item_id: data.id,
    //                 shop_id: data.shopId,
    //                 addonquantity: parseInt(addonquantity, 10),
    //                 foodquantity: parseInt(quantity, 10),
    //                 totalAddOnPrice: parseInt(addonquantity) * parseInt(data.foodAddonPrice),
    //                 totalFoodPrice: parseInt(data.foodPrice) * parseInt(quantity),
    //                 // orderStatus: 'Pending'
    //             };


    //             console.log('dekh 1');

    //             try {
    //                 await docRef.get().then((doc) => {
    //                     console.log('dekh 2');

    //                     if (doc.exists) {
    //                         console.log('dekh 3');

    //                         const cartItems = doc.data()[0];
    //                         // const cartItems = doc.data();

    //                         console.log('dekh 4');

    //                         if (Array.isArray(cartItems)) {
    //                             console.log('dekh 5');

    //                             const existingItemIndex = cartItems.length > 0 ? cartItems.findIndex((item) => item.dataid === data.id) : -1;
    //                             // console.log('dekh 6', cartItems);

    //                             if (existingItemIndex !== -1) {
    //                                 console.log('dekh 7');

    //                                 const existingItem = cartItems[existingItemIndex];
    //                                 console.log('dekh 8');


    //                                 const updatedItem = {
    //                                     ...existingItem,
    //                                     Foodquantity: existingItem.Foodquantity + parseInt(quantity, 10),
    //                                     TotalFoodPrice: existingItem.TotalFoodPrice + (parseInt(data.foodPrice) * parseInt(quantity))
    //                                 };
    //                                 cartItems[existingItemIndex] = updatedItem;

    //                                 docRef.update({
    //                                     // [data.shopId]: cartItems
    //                                     ...cartItems
    //                                 });

    //                                 console.log('Updated');
    //                             } else {
    //                                 docRef.update({
    //                                     ...firebase.firestore.FieldValue.arrayUnion(data1)
    //                                 });

    //                                 console.log('Added');
    //                             }
    //                         } else {
    //                             docRef.set({
    //                                 // [data.shopId]: [data1]
    //                             ...data1

    //                             });

    //                             console.log('Added');
    //                         }
    //                     } else {
    //                         docRef.set({
    //                             // [data.shopId]: [data1]
    //                             ...data1
    //                         });

    //                         console.log('Added');
    //                     }

    //                     alert('Added to cart');
    //                 });
    //             } catch (error) {
    //                 console.error('Error:', error);
    //             }
    //         }
    //         else {
    //             alert('Item is Out of Stock!');
    //             // setIsLoading(false);
    //         }
    //     }
    //     else {
    //         alert('Item is Out of Stock!');
    //         // setIsLoading(false);
    //     }
    // };


    // NEW APPROACH (Stable Version - with adding food Data to the Cart with CartItems Array)

    // const addTocart = async () => {
    //     setLoading(true);
    //     const date = new Date().getTime().toString() 
    //     if (data.stock === 'in') {
    //         if (data.stockamount > 5) {
    //             const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
    //             const data1 = {
    //                 item_id: data.id,
    //                 shop_id: data.shopId,
    //                 addonquantity: parseInt(addonquantity, 10),
    //                 foodquantity: parseInt(quantity, 10),
    //                 totalAddOnPrice: parseInt(addonquantity) * parseInt(data.foodAddonPrice),
    //                 totalFoodPrice: parseInt(data.foodPrice) * parseInt(quantity),
    //                 orderStatus: 'Pending',
    //                 userid: userloggeduid,
    //                 date: date,
    //                 cartItemId: date+userloggeduid
    //             };

    //             try {
    //                 const doc = await docRef.get();

    //                 if (doc.exists) {
    //                     const cartItems = doc.data().cartItems;

    //                     if (Array.isArray(cartItems)) {
    //                         const existingItemIndex = cartItems.findIndex((item) => item.item_id === data.id);

    //                         if (existingItemIndex !== -1) {
    //                             const existingItem = cartItems[existingItemIndex];
    //                             const updatedItem = {
    //                                 ...existingItem,
    //                                 foodquantity: existingItem.foodquantity + parseInt(quantity, 10),
    //                                 totalFoodPrice: existingItem.totalFoodPrice + (parseInt(data.foodPrice) * parseInt(quantity)),
    //                             };
    //                             cartItems[existingItemIndex] = updatedItem;

    //                             docRef.update({
    //                                 cartItems: cartItems,
    //                             });

    //                             console.log('Updated');
    //                         } else {
    //                             docRef.update({
    //                                 cartItems: firebase.firestore.FieldValue.arrayUnion(data1),
    //                             });

    //                             console.log('Added');
    //                         }
    //                     } else {
    //                         docRef.set({
    //                             cartItems: [data1],
    //                         });

    //                         console.log('Added');
    //                     }
    //                 } else {
    //                     docRef.set({
    //                         cartItems: [data1],
    //                     });

    //                     console.log('Added');
    //                 }

    //                 alert('Added to cart');
    //             } catch (error) {
    //                 console.error('Error:', error);
    //             }
    //         } else {
    //             alert('Item is Out of Stock!');
    //         }
    //     } else {
    //         alert('Item is Out of Stock!');
    //     }
    //     setLoading(false);

    // };


    // NEW APPROACH
    // const addTocart = async () => {
    //   if (data.stock === 'in') {
    //     if (data.stockamount > 5) {
    //       const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
    //       const data1 = {
    //         item_id: data.id,
    //         shop_id: data.shopId,
    //         addonquantity: parseInt(addonquantity, 10),
    //         foodquantity: parseInt(quantity, 10),
    //         totalAddOnPrice: parseInt(addonquantity) * parseInt(data.foodAddonPrice),
    //         totalFoodPrice: parseInt(data.foodPrice) * parseInt(quantity),
    //       };

    //       try {
    //         const doc = await docRef.get();

    //         if (doc.exists) {
    //           const existingItems = doc.data();

    //           if (Array.isArray(existingItems)) {
    //             const existingItemIndex = existingItems.findIndex((item) => item.dataid === data.id);

    //             if (existingItemIndex !== -1) {
    //               const existingItem = existingItems[existingItemIndex];
    //               const updatedItem = {
    //                 ...existingItem,
    //                 Foodquantity: existingItem.Foodquantity + parseInt(quantity, 10),
    //                 TotalFoodPrice: existingItem.TotalFoodPrice + (parseInt(data.foodPrice) * parseInt(quantity)),
    //               };
    //               existingItems[existingItemIndex] = updatedItem;

    //               docRef.update(existingItems);

    //               console.log('Updated');
    //             } else {
    //               existingItems.push(data1);

    //               docRef.update(existingItems);

    //               console.log('Added');
    //             }
    //           } else {
    //             docRef.set([data1]);

    //             console.log('Added');
    //           }
    //         } else {
    //           docRef.set([data1]);

    //           console.log('Added');
    //         }

    //         alert('Added to cart');
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //     } else {
    //       alert('Item is Out of Stock!');
    //     }
    //   } else {
    //     alert('Item is Out of Stock!');
    //   }
    // };

    // NEW APPROACH (Add Food Data Accoring to Restaurant Id)

    const addTocart = async () => {
        setLoading(true);
        const date = new Date().getTime().toString()
        if (data.stock === 'in') {
            if (data.stockamount > 5) {
                const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
                const data1 = {
                    item_id: data.id,
                    shop_id: data.shopId,
                    addonquantity: parseInt(addonquantity, 10),
                    foodquantity: parseInt(quantity, 10),
                    totalAddOnPrice: parseInt(addonquantity) * parseInt(data.foodAddonPrice),
                    totalFoodPrice: parseInt(data.foodPrice) * parseInt(quantity),
                    orderStatus: 'Pending',
                    userid: userloggeduid,
                    date: date,
                    cartItemId: date + userloggeduid
                };

                try {
                    const doc = await docRef.get();


                    if (doc.exists) {
                        // const currentShopID = data.shopId;
                        // const cartItems = doc.data().cartItems;
                        // const cartItems = doc.data().[data.shopId]
                        const cartItems = doc.data()[data.shopId];



                        if (Array.isArray(cartItems)) {
                            const existingItemIndex = cartItems.findIndex((item) => item.item_id === data.id);

                            if (existingItemIndex !== -1) {
                                const existingItem = cartItems[existingItemIndex];
                                const updatedItem = {
                                    ...existingItem,
                                    foodquantity: existingItem.foodquantity + parseInt(quantity, 10),
                                    totalFoodPrice: existingItem.totalFoodPrice + (parseInt(data.foodPrice) * parseInt(quantity)),
                                };
                                cartItems[existingItemIndex] = updatedItem;

                                docRef.update({
                                    // cartItems: cartItems,
                                    [data.shopId]: cartItems,

                                });

                                console.log('Updated');
                            } else {
                                docRef.update({
                                    // cartItems: firebase.firestore.FieldValue.arrayUnion(data1),
                                    [data.shopId]: firebase.firestore.FieldValue.arrayUnion(data1),

                                });

                                console.log('Added');
                            }
                        } else {
                            docRef.set({
                                // cartItems: [data1],
                                [data.shopId]: [data1],

                            },
                                { merge: true } // New Added to by Chat GPT
                            );

                            console.log('Added');
                        }
                    } else {
                        docRef.set({
                            // cartItems: [data1],
                            [data.shopId]: [data1],

                        });

                        console.log('Added');
                    }

                    alert('Added to cart');
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                alert('Item is Out of Stock!');
            }
        } else {
            alert('Item is Out of Stock!');
        }
        setLoading(false);

    };




    const increaseQuantity = () => {
        setquantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setquantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseAddonQuantity = () => {
        setaddonquantity((parseInt(addonquantity) + 1).toString())
    }
    const decreaseAddonQuantity = () => {
        if (parseInt(addonquantity) > 0) {
            setaddonquantity((parseInt(addonquantity) - 1).toString())
        }
    }

    // const cartdata = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });
    // console.log(typeof (cartdata))
    // console.log(cartdata)

    return (
        <ScrollView style={styles.container}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={25} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity> */}

            <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center',
                backgroundColor: colors.col2
            }} onPress={() => { navigation.navigate('HomeScreen') }} >
                <FontAwesome6 name="arrow-left" size={20} color="black" />
                <TouchableOpacity onPress={() => navigation.navigate('RestaurantScreen', { id: data.shopId })}>

                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>{restaurantsData ? restaurantsData.restaurant_name : null}</Text>
                </TouchableOpacity>
            </TouchableOpacity>


            {/* <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                    <Text style={{ fontSize: 16, color: colors.col1 }}>Close</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.container1}>
                <View style={styles.s1}>
                    {/* <View> */}

                    <Image source={{
                        uri: data.foodImageUrl
                    }} style={styles.cardimgin} />
                    {/* </View> */}

                    <View style={styles.s3in}>
                        <View>

                            {data.foodType == 'Veg' ?
                                <Image
                                    source={require('../Images/VegPng.png')}
                                    style={{ width: 20, height: 20, marginHorizontal: 5, marginVertical: 5 }}
                                />
                                :
                                <Image
                                    source={require('../Images/NonVeg.png')}
                                    style={{ width: 20, height: 20, marginHorizontal: 5, marginVertical: 5 }}
                                />
                            }
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('RestaurantScreen', { id: data.shopId })}>

                            <Text style={{ fontSize: 16 }}>{restaurantsData ? restaurantsData.restaurant_name : null}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.s2in}>
                        <Text style={styles.head1}>{data.foodName}</Text>
                    </View>
                    {/* <View style={styles.s3}>
                        <Text style={styles.head4}>{data.foodDescription}</Text>

                    </View> */}
                    <View style={styles.s2in}>
                        <Text style={[styles.head1, { paddingTop: 5, color: 'grey' }]}>₹{data.foodPrice}</Text>

                    </View>
                </View>


                <View style={styles.s2}>
                    {/* <View style={styles.s2in}>
                        <Text style={styles.head1}>{data.foodName}</Text>
                        <Text style={styles.head2}>₹{data.foodPrice}/-</Text>
                    </View> */}
                    {/* <View style={styles.s3}>
                        <Text style={styles.head3}>About Food</Text>
                        <Text style={styles.head4}>{data.foodDescription}</Text>
                        <View style={styles.s3in}>
                            {data.foodType == 'Veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                            <Text style={styles.head5}>{data.foodType}</Text>
                        </View>
                    </View> */}




                    {/* {data.restaurantName === undefined ? null : (
                        <View style={styles.container2}>
                            <Text style={styles.txt1}>Restaurant</Text>
                            {data.restaurantName !== undefined ? (
                                <Text style={styles.txt2}>{data.restaurantName}</Text>
                            ) : null}
                            <View style={styles.container2in}>
                                <Text style={styles.txt3}>
                                    {data.restrauntAddressBuilding && data.restrauntAddressBuilding.length !== 0
                                        ? data.restrauntAddressBuilding
                                        : null}
                                </Text>
                                <Text style={styles.txt3}>{data.restrauntAddressStreet}</Text>
                                <Text style={styles.txt3}>{data.restrauntAddressCity}</Text>
                            </View>
                        </View>
                    )} */}


                    {data.foodAddonPrice !== '0' ?
                        <View style={styles.container3}>
                            <View style={hr80}></View>

                            <Text style={styles.txt3}>Add Extra </Text>
                            <View style={styles.c3in}>
                                <Text style={styles.text4}>{data.foodAddon}</Text>
                                <Text style={styles.text4}>₹{data.foodAddonPrice}/-</Text>
                            </View>

                            <View style={incdecout}>

                                <Text onPress={() => decreaseAddonQuantity()} style={incdecbtn}>-</Text>
                                <TextInput value={addonquantity} style={incdecinput} />
                                <Text onPress={() => increaseAddonQuantity()} style={incdecbtn}>+</Text>

                            </View>
                            {/* <View style={hr80}></View> */}

                        </View>
                        :
                        null}

                    <View style={styles.container3}>
                        {/* <View style={hr80}></View> */}

                        <Text style={styles.txt3}>Food Quantity</Text>
                        <View style={[incdecout, {
                            borderColor: 'red',
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            backgroundColor: '#fff6f7',
                            flexDirection: 'row'
                        }]}>

                            {/* <Text onPress={() => decreaseQuantity()} style={incdecbtn}>-</Text>
                            <TextInput value={quantity} style={incdecinput} />
                            <Text onPress={() => increaseQuantity()} style={incdecbtn}>+</Text> */}

                            <TouchableOpacity style={{ paddingHorizontal: 15, }} onPress={() => decreaseQuantity()}><Text style={{ fontSize: 20, fontWeight: '600' }}>-</Text></TouchableOpacity>
                            <Text style={{ fontSize: 23, fontWeight: '400' }}> {quantity} </Text>
                            <TouchableOpacity style={{ paddingHorizontal: 15, }} onPress={() => increaseQuantity()}><Text style={{ fontSize: 20, fontWeight: '600' }}>+</Text></TouchableOpacity>

                        </View>
                        {/* <View style={hr80}></View> */}
                    </View>

                    {/* <View style={{
                        backfaceVisibility: 'hidden',
                        borderColor: 'red',
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        backgroundColor: '#fff6f7',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 16, fontWeight: '600' }}>-</Text></TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}> {quantity} </Text>
                        <TouchableOpacity style={{ paddingHorizontal: 10, }}><Text style={{ fontSize: 16, fontWeight: '600' }}>+</Text></TouchableOpacity>

                    </View> */}

                    <View style={styles.container4}>
                        {/* <View style={hr80}></View> */}

                        <View style={styles.c4in}>
                            <Text style={styles.txt2}>Sub total</Text>
                            {data.foodAddonPrice ?
                                <Text style={styles.txt3}>₹{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))
                                        + parseInt(addonquantity) * parseInt(data.foodAddonPrice)).toString()

                                }</Text>

                                :
                                <Text style={styles.txt3}>₹{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))).toString()
                                }</Text>
                            }
                        </View>


                        <View style={hr80}></View>
                    </View>

                    <View style={styles.btncont}>

                        {loading ?

                            <TouchableOpacity style={productbtn2} >
                                <ActivityIndicator size="small" color={colors.col1} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={productbtn2} onPress={() => { addTocart() }}>
                                <Text style={styles.btntxt}>Add +</Text>
                            </TouchableOpacity>

                        }
                        <TouchableOpacity style={productbtn2}>
                            {/* <Text style={styles.btntxt} onPress={() => navigation.navigate('placeorder', { cartdata })}>Buy Now</Text> */}
                            <Text style={styles.btntxt} onPress={() => navigation.navigate('UserCartsScreen')}>Cart</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        backgroundColor: colors.col1,

        // alignItems: 'center',
        width: '100%',

    },
    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        // backgroundColor: '#fff',
        backgroundColor: '#ebebeb',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '95%',
        // height: 300,
        backgroundColor: '#fff',
        // alignItems: 'center',
        margin: 'auto',
        // justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        marginTop: 10

    },
    cardimgin: {
        width: '95%',
        height: '100%',
        height: 300,
        margin: 'auto',
        borderRadius: 15
    },
    s2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        // top: -30,
        backgroundColor: '#ebebeb',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    s2in: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 15,
        // marginBottom: 10,
        // paddingHorizontal: 10
    },
    head1: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text3,
        width: 220,
        marginRight: 10,
    },
    head2: {
        fontSize: 30,
        fontWeight: '600',
        color: colors.text3,
    },
    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.col1,
    },
    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: colors.col1,
    },
    s3in: {
        backgroundColor: colors.col1,
        paddingHorizontal: 10,
        paddingTop: 10,
        // borderRadius: 10,
        // width: 130,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btntxt: {
        // backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 17,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
        fontWeight: '600'

    },
    btncont: {
        width: '90%',
        justifyContent: 'center',
        // alignItems: 'center',
        margin: 'auto',
        marginTop: 0,
        flexDirection: 'row',
    },
    container2: {
        width: '100%',
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 2,
        alignItems: 'center',
    },
    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '600',

    },
    txt2: {
        color: '#9c9c9c',
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '600'
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        // paddingHorizontal: 10
    }
})

export default Productpage
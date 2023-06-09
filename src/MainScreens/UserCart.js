import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn2, colors, hr80, navbtn, navbtnin } from '../Global/styles'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'

// import BottomNav from '../components/BottomNav';

const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const UserCart = ({ navigation }) => {
    const [cartdata, setCartdata] = useState(null);
    const [totalCost, setTotalCost] = useState('0');

    const getcartdata = async () => {
        // const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);


        docRef.get().then((doc) => {
            if (doc.exists) {
                // const data = JSON.stringify(doc.data());
                // setCartdata(data)
                setCartdata(doc.data())

                // console.log('ye rha updated data', doc.data())
            } else {
                console.log('No such document!');
            }
        })
    }

    useEffect(() => {

        getcartdata();
    }, [])

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
    useEffect(() => {
        if (cartdata != null) {

            console.log('Dekh bro 2')

            const cart23 = cartdata;
            const cartArrayNames = Object.keys(cart23);



            console.log('dekhi bro 3', cartArrayNames.length);
            let newData = [];
            console.log('Dekh bro 4')

            for (let i = 0; i < cartArrayNames.length; i++) {
                console.log('Dekh bro 5')

                const foodData = cart23[cartArrayNames[i]];
                console.log('Dekh bro 6')


                foodData.forEach((item) => {

                    // newData(push.item)
                    newData.push(item)
                });


            }
            setAllData(newData)

        }
    }, [cartdata]);

    console.log('ho yd', allData)

    // const [totalcost, setTotalCost] = useState(null);

    //CODE FOR TOTAL FOOD PRICE
    useEffect(() => {
        // setIsLoading(true);
        console.log('Dekh bro 1')

        if (cartdata != null) {
            // const cart23 = JSON.parse(cartdata);
            // const cartArrayNames = Object.keys(cart23);
            console.log('Dekh bro 2')

            const cart23 = cartdata;
            const cartArrayNames = Object.keys(cart23);



            console.log('dekhi bro 3', cartArrayNames.length);
            let totalfoodprice = 0;
            console.log('Dekh bro 4')

            for (let i = 0; i < cartArrayNames.length; i++) {
                console.log('Dekh bro 5')

                const foodprice = cart23[cartArrayNames[i]];
                console.log('Dekh bro 6')

                //OLD CODE

                // foodprice.forEach((item) => {
                //     totalfoodprice += (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
                //         (parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity));
                // });

                //NEW CODE
                foodprice.forEach((item) => {
                    totalfoodprice += (parseInt(item.TotalFoodPrice)) +
                        (parseInt(item.TotalAddOnPrice));
                });


            }

            setTotalCost(totalfoodprice.toString());
            // setIsLoading(false);
        }
    }, [cartdata]);

    // console.log('dekh bro ho gya ', totalCost)



    //New Approach
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const [closedRestaurants, setClosedRestaurants] = useState([]);

    useEffect(() => {
        const checkShopOpen = () => {
            if (cartdata !== null) {
                //OLD CODE
                // const cart23 = JSON.parse(cartdata);
                // const cartArrayNames = Object.keys(cart23);

                //NEW CODE
                const cartArrayNames = Object.keys(cartdata);


                console.log('dekhi bro 1', cartArrayNames);
                // let checkStockV = false;

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



    // const deleteItem = (item) => {
    //     const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
    //     docRef.update({
    //         cart: firebase.firestore.FieldValue.arrayRemove(item)
    //     })
    //     getcartdata();

    // }

    const deleteItem = async (item, cart) => {
        console.log('delete trigerr')
        // setIsLoading(true);
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docRef.get();
        const cartData = docSnapshot.data();

        if (cartData && cartData[cart] && cartData[cart].length === 1) {
            // Delete the cart property
            await docRef.update({
                [cart]: firebase.firestore.FieldValue.delete()
            });
        } else {
            // Remove the item from the cart array
            await docRef.update({
                [cart]: firebase.firestore.FieldValue.arrayRemove(item)
            });
        }
        getcartdata();

        // setIsLoading(false);
    }

    // console.log(typeof (cartdata))
    // console.log(totalCost.type)
    console.log(typeof totalCost);
    if (totalCost === '0') {

        return (

            <View style={[styles.containerout,]}>
                <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                        <Text style={{ fontSize: 16 }}>Close</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <View style={styles.navbtn}>
                        <AntDesign name="back" size={24} color="black" style={styles.navbtnin} />
                    </View>
                </TouchableOpacity> */}
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="fast-food" size={250} color="#dedede" />
                    <Text style={{ color: '#dedede', fontSize: 25, fontWeight: '600' }}>Cart is Empty!</Text>
                </View>
            </View>
        )



    }
    // else {
    return (

        <View style={styles.containerout}>

            {/* <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity> */}
            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                    <Text style={{ fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.bottomnav}>
                    <BottomNav navigation={navigation} />
                </View> */}
            <View style={styles.container}>
                <Text style={styles.head1}>Your Cart</Text>
                <View style={styles.cartout}>
                    {/* {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? */}
                    {allData == null ?

                        <Text style={styles.head2}>Your Cart is Empty</Text>
                        :
                        // <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart} renderItem={
                        <FlatList style={styles.cardlist} data={allData} renderItem={

                            ({ item }) => {

                                const nData = foodDataAll.filter((items) => items.id === item.dataid)
                                // console.log('ye hai aa ka result',nData[0].foodImageUrl)
                                return (
                                    <View style={styles.cartcard}>
                                        <Image source={{ uri: nData[0].foodImageUrl }} style={styles.cartimg} />
                                        <View style={styles.cartcardin}>
                                            <View style={styles.c1}>
                                                <Text style={styles.txt1}>{item.Foodquantity}&nbsp;
                                                    {nData[0].foodName}
                                                </Text>
                                                <Text style={styles.txt2}>₹{nData[0].foodPrice}/each</Text>
                                            </View>
                                            {item.Addonquantity > 0 &&
                                                <View style={styles.c2}>
                                                    <Text style={styles.txt3}>{item.Addonquantity}&nbsp;
                                                        {nData[0].foodAddon}
                                                    </Text>
                                                    <Text style={styles.txt3}>₹{nData[0].foodAddonPrice}/each</Text>
                                                </View>}
                                            <TouchableOpacity style={styles.c4} onPress={() => deleteItem(item, nData[0].shopId)}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <AntDesign name="delete" size={24} color="black" style={styles.del} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }
                        } />}
                </View>
                {totalCost && totalCost !== '0' ?
                    <View style={styles.btncont}>
                        <View style={styles.c3}>
                            <Text style={styles.txt5}>Total</Text>
                            <Text style={styles.txt6}>₹{totalCost}</Text>
                        </View>
                        <TouchableOpacity style={btn2}>
                            <Text style={styles.btntxt} onPress={() => navigation.navigate('PaymentNdetail', { cartdata })}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null

                }

            </View>
        </View>
    )
    // }


}

export default UserCart

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        // height: '100%',

    },
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
    },
    head1: {
        fontSize: 40,
        textAlign: 'center',
        // fontWeight: '200',
        // marginVertical: 20,
        color: colors.text1,
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
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        alignItems: 'center',
    },
    cartimg: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: colors.text3,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: colors.col1,
        borderRadius: 10,
        padding: 5,
    },
    txt1: {
        fontSize: 16,
        color: colors.text1,
        width: '60%',
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 16,
        color: colors.text3,
        fontWeight: 'bold',
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
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
        borderColor: colors.text1,
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: colors.text1,
    }
})
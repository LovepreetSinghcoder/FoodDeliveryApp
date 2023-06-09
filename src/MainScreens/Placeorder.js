import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1, colors, hr80, navbtn, navbtnin } from '../Global/styles';
import { firebase } from '../Firebase/FirebaseConfig'
import axios from 'axios';

import { AntDesign } from '@expo/vector-icons';
const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'


const Placeorder = ({ navigation, route }) => {
    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    const { cartdata } = route.params;
    useEffect(() => {
        // setOrderdata(JSON.parse(cartdata));
        setOrderdata(cartdata);

    }, [cartdata])

    // console.log(orderdata.cart[0])
    // console.log(typeof (orderdata))

    // console.log(cartdata)

    useEffect(() => {
        // setIsLoading(true);
        // console.log('Dekh bro 1')

        // if (cartdata != null) {
        //     // const cart23 = JSON.parse(cartdata);
        //     // const cartArrayNames = Object.keys(cart23);
        //     // console.log('Dekh bro 2')

        //     const cart23 = cartdata;
        //     const cartArrayNames = Object.keys(cart23);



        //     // console.log('dekhi bro 3', cartArrayNames.length);
        //     let totalfoodprice = 0;
        //     // console.log('Dekh bro 4')

        //     for (let i = 0; i < cartArrayNames.length; i++) {
        //         // console.log('Dekh bro 5')

        //         const foodprice = cart23[cartArrayNames[i]];
        //         // console.log('Dekh bro 6')


        //         foodprice.forEach((item) => {
        //             totalfoodprice += (parseInt(item.TotalFoodPrice)) +
        //                 (parseInt(item.TotalAddOnPrice));
        //         });


        //     }

        //     setTotalCost(totalfoodprice.toString());
        //     // setIsLoading(false);
        // }
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
    }, [cartdata]);


    // userdata -------------------------------------------------------
    // const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    // useEffect(() => {
    //     const checklogin = () => {
    //         firebase.auth().onAuthStateChanged((user) => {
    //             // console.log(user);
    //             if (user) {
    //                 // navigation.navigate('home');
    //                 setUserloggeduid(user.uid);
    //             } else {
    //                 // No user is signed in.
    //                 console.log('no user');
    //             }
    //         });
    //     }
    //     checklogin();
    // }, [])

    // // console.log(userloggeduid);

    // useEffect(() => {
    //     const getuserdata = async () => {
    //         try {
    //             const docRef = firebase.firestore().collection('UserData').doc(userloggeduid);
    //             const doc = await docRef.get();
    //             if (!doc.empty) {
    //                 doc.forEach((doc) => {
    //                     setUserdata(doc.data());
    //                 })
    //             }
    //             else {
    //                 console.log('no user data');
    //             }
    //         } catch (error) {
    //             console.log('let me check', error)
    //         }
    //     }
    //     getuserdata();
    // }, [userloggeduid]);

    useEffect(() => {
        const getuserdata = async () => {
            try {
                const docRef = firebase.firestore().collection('UserData').doc(userloggeduid);
                const doc = await docRef.get();
                // console.log('doc', doc.data())
                setUserdata(doc.data());

                // if (!doc.empty) {
                //     doc.forEach((userData) => {
                //         setUserdata(userData.data());
                //     });
                // } else {
                //     console.log('no user data');
                // }
            } catch (error) {
                console.log('let me check', error);
            }
        };
        getuserdata();
    }, [userloggeduid]);


    //   const getcartdata = async () => {
    //     // const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
    //     const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);


    //     docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             // const data = JSON.stringify(doc.data());
    //             // setCartdata(data)
    //             setCartdata(doc.data())

    //             // console.log('ye rha updated data', doc.data())
    //         } else {
    //             console.log('No such document!');
    //         }
    //     })
    // }

    // useEffect(() => {

    //     getcartdata();
    // }, [])

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

    // console.log(userdata);

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

    const deleteCart = async () => {
        console.log('delete trigger');
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            await docRef.delete();
            console.log('Document successfully deleted.');
        } else {
            console.log('Document does not exist.');
        }
    };

    // useEffect(() => {
    //     deleteCart();
    // }, [])
    const sendPushNotification = async (fcmTokens, title, message) => {
        try {
            const config = {
                method: 'post',
                url: 'https://fcm.googleapis.com/fcm/send',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer AAAALDQPvlg:APA91bH3XMSBJiuy7dpj5LRf1OiB1Ncpwvk3nc-1qffGN3EzBrhLeDu0uG0t3tp7PkC9lVrsTGtTPreXVzAB_1VHsaMU-6MCSCiugZ95yFBAIsWhdhJew3_HKmlwVdUhIlzELhTtoUTo', // Replace with your server key from Firebase Console
                },
                data: {
                    registration_ids: fcmTokens,
                    notification: {
                        title,
                        body: message,
                    },
                },
            };

            const response = await axios.request(config);

            console.log('Notification sent successfully:', response.data);
        } catch (error) {
            console.log('Error sending notification:', error);
        }
    };

    // Usage example
    //   const fcmTokens = ['FCM_TOKEN_1', 'FCM_TOKEN_2', 'FCM_TOKEN_3'];
    //   sendPushNotification(fcmTokens, 'Hello', 'This is a test notification');
    const shopTokens = 'cE13la2-TaK1HWiJ1_JEee:APA91bGlIZxF-gZ7fzLaJKG577cPR_ZVhVOystTY65LSeNFZ2dPqo-mtVIgvCyvsbVStxq6udghfkxLT59X4_mmRWDHQckLQcJph9UYgv6R31T13ez-AOAslUCwAyDcLIpvDWoosiCHM'
    //   sendPushNotification(shopTokens, 'New Order Received', 'mujhe nhi ptaaa ' + orderby);



    //NEW APPROACH
    const addingSomedata = (orderdata) => {
        console.log('Dekh bro 1')

        if (orderdata !== null && foodDataAll !== null) {
            console.log('Dekh bro 2')

            const cartArrayNames = Object.keys(orderdata);

            for (let i = 0; i < cartArrayNames.length; i++) {
                console.log('Dekh bro 3')

                const cartItem = orderdata[cartArrayNames[i]];
                console.log('Dekh bro 4')

                if (cartItem) {
                    console.log('Dekh bro 5')

                    for (let j = 0; j < cartItem.length; j++) {
                        console.log('Dekh bro 6')

                        const item = cartItem[j];
                        console.log('Dekh bro 7')

                        const matchingFoodData = foodDataAll.find((foodItem) => foodItem.id === item.dataid);
                        console.log('Dekh bro 8')

                        if (matchingFoodData) {
                            cartItem[j].data = matchingFoodData;
                            //   delete cartItem[j].dataid;
                            // console.log('dekh veere', matchingFoodData)
                        }
                    }
                }
            }
        }

        // console.log('hogyte ke', orderdata)
        return orderdata;
    };

    //OLD Approach
    // const placenow = () => {
    //     console.log('triggered 1');
    //     const updatedOrderdata = addingSomedata(orderdata);
    //     console.log('triggered 2');

    //     if (updatedOrderdata) {
    //         const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString() + userloggeduid);
    //         console.log('triggered 3');

    //         docRef
    //             .set({
    //                 orderid: docRef.id,
    //                 //   orderdata: updatedOrderdata,
    //                 ...updatedOrderdata, // Use spread operator to include all fields from updatedOrderdata
    //                 orderstatus: 'pending',
    //                 ordercost: totalCost,
    //                 //   orderdate: firebase.firestore.FieldValue.serverTimestamp(),
    //                 orderdate: new Date().getTime().toString(),
    //                 orderaddress: userdata.address,
    //                 orderphone: userdata.phone,
    //                 orderby: userdata.name,
    //                 orderuseruid: userloggeduid,
    //                 orderpayment: 'online',
    //                 paymenttotal: totalCost
    //             })
    //             .then(() => {
    //                 // Perform actions after successful document set
    //                 return deleteCart(); // Call deleteCart function and return its promise
    //             })
    //             .then(() => {
    //                 return sendPushNotification(shopTokens, 'New Order Received', 'mujhe nhi ptaaa ' + userdata.name);
    //             })
    //             .then(() => {
    //                 // Perform actions after deleteCart completes
    //                 console.log('triggered 4');
    //                 navigation.navigate('Home');
    //                 alert('Order Placed Successfully');
    //             })
    //             .catch(error => {
    //                 // Handle any errors that occurred during the process
    //                 console.log('Error placing order:', error);
    //                 alert('Error placing order. Please try again.');
    //             });
    //     } else {
    //         alert('Order data is undefined. Please check your code.');
    //     }
    // };


    //New Approach
    const placenow = () => {
        console.log('triggered 1');
        // const updatedOrderdata = addingSomedata(orderdata);
        console.log('triggered 2');
        const docid = new Date().getTime().toString() + userloggeduid;
        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid);
        console.log('triggered 3');
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid);
        orderitemstabledoc.set({
            ...cartdata
        })
        orderdatadoc
            .set({
                // orderid: docRef.id,
                orderid: docid,

                //   orderdata: updatedOrderdata,

                orderstatus: 'pending',
                ordercost: totalCost,
                //   orderdate: firebase.firestore.FieldValue.serverTimestamp(),
                orderdate: new Date().getTime().toString(),
                // orderaddress: userdata.address,
                // orderphone: userdata.phone,
                // orderby: userdata.name,
                userid: userloggeduid,
                orderpayment: 'online',
                paymenttotal: totalCost
            })
            .then(() => {
                // Perform actions after successful document set
                return deleteCart(); // Call deleteCart function and return its promise
            })
            .then(() => {
                return sendPushNotification(shopTokens, 'New Order Received', 'mujhe nhi ptaaa ' + userdata.name);
            })
            .then(() => {
                // Perform actions after deleteCart completes
                console.log('triggered 4');
                navigation.navigate('Home');
                alert('Order Placed Successfully');
            })
            .catch(error => {
                // Handle any errors that occurred during the process
                console.log('Error placing order:', error);
                alert('Error placing order. Please try again.');
            });
    };



    return (
        <>
            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                    <Text style={{ fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.containerout}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <View style={navbtn}>
                        <AntDesign name="back" size={24} color="black" style={navbtnin} />
                    </View>
                </TouchableOpacity> */}
                <View style={styles.container}>

                    <Text style={styles.head1}>Your Order Summary</Text>
                    <FlatList style={styles.c1} data={orderdata.cart} renderItem={
                        ({ item }) => {
                            return (
                                <View style={styles.rowout}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <Text style={styles.qty}>{item.Foodquantity}</Text>
                                            <Text style={styles.title}>{item.data.foodName}</Text>
                                            <Text style={styles.price1}>₹{item.data.foodPrice}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Text style={styles.totalprice}>₹{totalCost}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <Text style={styles.qty}>{item.Addonquantity}</Text>
                                            <Text style={styles.title}>{item.data.foodAddon}</Text>
                                            <Text style={styles.price1}>₹{item.data.foodAddonPrice}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Text style={styles.totalprice}>₹{parseInt(item.Addonquantity) * parseInt(item.data.foodAddonPrice)}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    } />
                    <View style={hr80}>

                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Order Total :</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.totalprice}>₹{totalCost}</Text>
                        </View>
                    </View>

                    <View style={hr80}>
                    </View>

                    <View style={styles.userdataout}>
                        <Text style={styles.head1}>Your Details</Text>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Name :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Email :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.email}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Phone :</Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Address :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.address}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={hr80}></View>

                    <View style={{ width: '91%', alignSelf: 'center' }}>
                        {/* <TouchableOpacity style={btn1}>
                            <Text style={styles.btntext} onPress={() => placenow()}>Proceed to Payment</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.editButton]}
                            // onPress={() => { alert('Selected') }}
                            onPress={() => placenow()}
                        >
                            <Text style={styles.editButtonText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Placeorder

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },

    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row',
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    },
    editButton: {
        backgroundColor: colors.text1
        ,
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        color: '#474747',

        fontSize: 16,
        fontWeight: 'bold',
    },
})
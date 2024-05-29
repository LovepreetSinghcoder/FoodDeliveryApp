import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import axios from 'axios';
import { AntDesign, Ionicons, FontAwesome6, Fontisto, FontAwesome } from '@expo/vector-icons';



const PaymentAndDetails = ({ navigation, route }) => {

    const { userloggeduid, checkIsLogged } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    // const { cartdata } = route.params;
    // const route = useRoute();

    // Access the passed values from route.params
    const deliveryAdress = route.params.deliveryAdress;

    const restaurantName = route.params.restaurantName;
    const _shopId = route.params.shopId;


    // const cartdata = route.params.cartdata;
    const cartAllData = route.params.cartAllData;

    const finalCost = route.params.totalCost;
    console.log('dekh bro total code', _shopId)

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



    // useEffect(() => {
    //     console.log('trigegeegg', shopTokens)
    //     // sNotif()
    //     sendNotification( shopTokens, 'Dekh broro', 'body guyi tel lene');
    // }, [])
    // const docid = new Date().getTime().toString() + userloggeduid;

    //New approach for adding data
    const [updatedCartData, setUpdatedCartData] = useState(null);
    const addingSomedata = (docid, date) => {



        if (cartAllData !== null) {
            console.log('dekh 1');
            const updatedData = { ...orderdata };
            // console.log('dekh 2', updatedData.cartItems);

            updatedData.cartItems.forEach((item) => {
                item.orderId = docid;
                item.orderDate = date;
            });

            // console.log('Updated cart data:', updatedData);

            setUpdatedCartData(updatedData);
        }

    }

    // useEffect(() => {
    //     addingSomedata()

    // }, [])

    // console.log('ertertert', typeof cartdata)

    const OrderPlacementHandler = async () => {
        setLoading(true);
        // console.log('triggered 1');
        // console.log('triggered 2');
        const currentDate = new Date().getTime().toString()
        const docid = new Date().getTime().toString() + userloggeduid;
        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid);
        // console.log('triggered 3');
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid);

        await addingSomedata(docid, currentDate);

        if (updatedCartData !== null) {
            try {
                await orderitemstabledoc.set({ ...updatedCartData });
                console.log("Dekh A")
                await orderdatadoc.set({
                    orderid: docid,
                    orderStatus: 'Pending',
                    ordercost: totalCost,
                    orderdate: new Date().getTime().toString(),
                    userid: userloggeduid,
                    orderpayment: 'online',
                    paymenttotal: finalCost,
                    shopId: _shopId
                });
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

                await sendNotification(shopTokens, 'New Order Received', 'Time: ' + currentTime);
                // await sendNotification(shopTokens, 'New Order Received', 'Time:' + (new Date().getTime().toString()));
                console.log("Dekh E")

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
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 0, paddingTop: 6, paddingBottom: 1 }}>Home |<Text style={{ fontSize: 15, fontWeight: '400', paddingHorizontal: 10, color: 'grey' }}> {deliveryAdress}</Text></Text>

                    </View>
                </View>
            </View>

            <View style={styles.container}>


                <View>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Pay on Delivery</Text>

                    <View style={[styles.box, { borderTopWidth: 0, borderRadius: 15, marginVertical: 10 }]}>

                        <View style={[styles.boxIn, {}]}>
                            {/* <Fontisto name="stopwatch" size={15} color="black" /> */}
                            <View style={{backgroundColor: colors.col2, padding: 10, borderRadius: 15}}>

                                <FontAwesome name="rupee" size={15} color="black" />
                            </View>
                            <View>

                                <Text style={[styles.boxInText, {paddingLeft: 5,fontSize: 17}]}>Pay on Delivery <Text style={{ fontWeight: '500' }}>{'(Cash/UPI)'}</Text></Text>
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
                            onPress={() => OrderPlacementHandler()}

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
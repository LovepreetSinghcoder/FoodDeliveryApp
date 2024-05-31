import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
// import HomeHeadNav from '../components/HomeHeadNav'
// import BottomNav from '../components/BottomNav'
import { btn1, btn2, colors } from '../Global/styles'

import { firebase } from '../Firebase/FirebaseConfig'
import TrackOrderC from '../Components/TrackOrderC'
import { AuthContext } from '../Context/AuthContext'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';




// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const TrackOrderScreen = ({ navigation }) => {
    const { userloggeduid, checkIsLogged, } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([])
    const [allRestaurantsData, setAllRestaurantsData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const getorders = async () => {
        // const ordersRef = firebase.firestore().collection('UserOrders').where('orderuseruid', '==', firebase.auth().currentUser.uid);
        const ordersRef = firebase.firestore().collection('UserOrders').where('userid', '==', userloggeduid);

        ordersRef.onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getorders()
    }, [])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getorders()

    //         console.log('triggered trackorder')
    //     }, [])
    // );

    const GetAllRestaurantsData = () => {
        const docRef = firebase.firestore().collection('RestaurantData');
        docRef.onSnapshot(snapshot => {
            setAllRestaurantsData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }

    useEffect(() => {
        GetAllRestaurantsData();
    }, [orders])



    // console.log('Please check the data of the Restaurant All Data', allRestaurantsData)
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
    }, []);

    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('OrderItems');

            foodRef.onSnapshot(snapshot => {
                setFoodData(snapshot.docs.map(doc => doc.data().cartItems))
            }
            )
        };

        fetchData();
    }, []);

    // const convertDate = (milliseconds) => {
    //     const date = new Date(parseInt(milliseconds));

    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const ampm = hours >= 12 ? 'PM' : 'AM';

    //     const formattedHours = hours % 12 || 12;
    //     const formattedMinutes = minutes.toString().padStart(2, '0');

    //     const day = date.getDate();
    //     const month = date.getMonth() + 1; // Months are zero-based
    //     const year = date.getFullYear();

    //     const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} ${day}/${month}/${year}`;

    //     return formattedDate;
    // }

    const convertDate = (milliseconds) => {
        const date = new Date(parseInt(milliseconds));

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const day = date.getDate();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = ` ${day} ${month} ${year} at ${formattedHours}:${formattedMinutes}${ampm}`;

        return formattedDate;
    }

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleCancelOrder = async (orderid) => {
        setLoading(true);
        setModalVisible(false);

        try {
            const orderRef = firebase.firestore().collection('UserOrders').doc(orderid);
            // const orderSnapshot = await orderRef.get();

            // if (orderSnapshot.exists) {
            //     await orderRef.update({
            //         orderStatus: "Canceled"
            //     });
            //     getorders()
            //     setShowSuccessMessage(true);
            //     alert('Order cancelled successfully');
            //     console.log('Order cancelled successfully');
            // } else {
            //     console.log('Order not found');
            // }
            await orderRef.update({
                orderStatus: "Canceled"
            });
            getorders()
            console.log('Order cancelled successfully', orderid);
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            {/* <StatusBar /> */}
            {/* <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                    <Text style={{ fontSize: 16 , color: colors.col1}}>Close</Text>
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 15,
                alignItems: 'center'
            }} onPress={() => { navigation.navigate('HomeScreen') }} >
                <FontAwesome6 name="arrow-left" size={20} color="black" />
                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 10 }}>Your Orders</Text>
            </TouchableOpacity>


            <ScrollView style={styles.containerin}>
                {/* <Text style={styles.head1}>My Orders</Text> */}
                <View>
                    {orders.sort(
                        // (a, b) => b.orderdate.seconds - a.orderdate.seconds
                        (a, b) => {
                            const dateA = new Date(parseInt(a.orderdate));
                            const dateB = new Date(parseInt(b.orderdate));
                            return dateB - dateA;
                        }
                    ).map((order, index) => {
                        const findRestaurantData = allRestaurantsData.find((items) => items.shopId === order.shopId);
                        // console.log('This is the data of the restaurant', findRestaurantData.restaurant_name)
                        // console.log('This is the data of the restaurant', order.orderStatus)

                        return (
                            <View style={styles.order} key={index}>

                                <View style={{ paddingVertical: 5, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', backgroundColor: '#f5f6fb', borderRadius: 12 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: '#cccccc', borderRadius: 10, alignContent: 'center', alignItems: 'center' }}>
                                            {findRestaurantData ?
                                                <Image source={{
                                                    uri: findRestaurantData.restaurant_logo
                                                }} style={{ width: 20, height: 20, marginHorizontal: 5, marginVertical: 5, padding: 5 }} />
                                                :
                                                null}
                                        </View>
                                        <View>

                                            <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 5 }}>{findRestaurantData ? findRestaurantData.restaurant_name : null}</Text>
                                            <Text style={{ fontSize: 13, fontWeight: '400', paddingHorizontal: 5, color: 'grey' }}>{findRestaurantData ? findRestaurantData.restaurant_address : null}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        <View style={{ marginVertical: 10, marginHorizontal: 5 }}>


                                            {order.orderStatus === 'Pending' && (
                                                <>
                                                    {/* <View style={{ backgroundColor: 'orange', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                        <Text style={{ textTransform: 'uppercase', fontSize: 12, }}>
                                                            {order.orderStatus}
                                                        </Text>
                                                    </View> */}
                                                    <TouchableOpacity style={{ backgroundColor: '#ffa187', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginTop: 5 }}
                                                        onPress={() => setModalVisible(true)}

                                                    >

                                                        <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white', alignSelf: 'center' }}>
                                                            Cancel
                                                        </Text>

                                                    </TouchableOpacity>
                                                </>
                                            )}
                                            <Modal
                                                animationType="none"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    setModalVisible(false);
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <Text style={{ marginBottom: 10 }}>Are you sure you want to cancel your order?</Text>
                                                        <TouchableOpacity style={{
                                                            backgroundColor: 'red',
                                                            width: 220,
                                                            borderRadius: 15,
                                                            marginTop: 5
                                                        }} onPress={() => handleCancelOrder(order.orderid)}>
                                                            <Text style={{ color: 'white', paddingVertical: 10, alignSelf: 'center' }}>Yes, Cancel Order</Text>
                                                        </TouchableOpacity>
                                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                                                            <Ionicons name="alert-circle" size={18} color="grey" />
                                                            <Text style={{ fontSize: 14 }}>Order cancellation: -5 coins.</Text>
                                                        </View> */}
                                                        <TouchableOpacity style={{
                                                            backgroundColor: 'green',
                                                            borderRadius: 15,
                                                            width: 220,

                                                            marginTop: 5

                                                        }} onPress={() => setModalVisible(false)}
                                                        >
                                                            <Text style={{ color: 'white', alignSelf: 'center', paddingVertical: 10 }}>No, Keep Order</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                            backgroundColor: '#ccc',
                                                            borderRadius: 16,
                                                            marginTop: 5

                                                        }}
                                                            onPress={() => setModalVisible(false)}
                                                        >
                                                            <Text style={{ color: 'black', paddingHorizontal: 20, paddingVertical: 5 }}>X</Text>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                            </Modal>
                                            {order.orderStatus === 'Confirmed' && (
                                                <View style={{ backgroundColor: '#8a8aff', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                        {order.orderStatus}
                                                    </Text>
                                                </View>

                                            )}
                                            {order.orderStatus === 'Ready' && (
                                                <View style={{ backgroundColor: '#88fc9a', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'black' }}>
                                                        {order.orderStatus}
                                                    </Text>
                                                </View>

                                            )}
                                            {order.orderStatus === 'OutforDelivery' && (
                                                <View style={{ backgroundColor: '#d28aff', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                        Out for Delivery
                                                    </Text>
                                                </View>

                                            )}
                                            {order.orderStatus === 'Delivered' && (
                                                <View style={{ backgroundColor: '#b8ffff', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: '#a3a3a3' }}>
                                                        {order.orderStatus}
                                                    </Text>
                                                </View>

                                            )}
                                            {order.orderStatus === 'Canceled' && (
                                                <View style={{ backgroundColor: '#ffa187', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                        {order.orderStatus}
                                                    </Text>
                                                </View>

                                            )}




                                        </View>
                                    </View>
                                </View>


                                <TrackOrderC foodDataAll={foodDataAll} data={order.orderid} navigation={navigation} />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                                    <Text style={styles.ordertxttime}>{convertDate(order.orderdate)}</Text>
                                    <Text style={styles.total}>{order.paymenttotal}₹</Text>
                                </View>
                                {/* {
                                    order.orderstatus === 'Delivered' ? <Text style={styles.ordertxt3}>Thank you for ordering with us</Text> : null
                                }
                                {
                                    order.orderstatus === 'cancelled' ? <Text style={styles.ordertxt3}>Sorry for the inconvenience</Text> : null
                                }
                                {
                                    order.orderstatus != 'cancelled' && order.orderstatus != 'delivered' ?
                                        <TouchableOpacity style={styles.cancelbtn} onPress={() => cancelOrder(order)}>
                                            <Text style={styles.cencelbtnin}>Cancel Order</Text>
                                        </TouchableOpacity>
                                        : null
                                } */}
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>


    )
}

export default TrackOrderScreen

const styles = StyleSheet.create({
    container: {
        // marginTop: 50,
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    containerin: {
        // paddingVertical: 10,
        flex: 1,
        // backgroundColor: colors.col1,
        backgroundColor: '#edeef0',

        // alignItems: 'center',
        width: '100%',
        height: '100%',
        // marginBottom: 100,
    },
    head1: {
        fontSize: 20,
        // color: colors.text1,
        // textAlign: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
        fontWeight: '500',
        paddingVertical: 10
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
        elevation: 2,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },
    row1: {
        flexDirection: 'column',
        margin: 10,
        elevation: 2,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        fontSize: 20,
        color: colors.text1,
        marginRight: 10,

    },
    title: {
        fontSize: 17,
        color: colors.text1,
        marginRight: 10,

    },
    price1: {
        fontSize: 17,
        color: colors.text1,
        marginRight: 10,
    },
    totalprice: {
        fontSize: 20,
        // color: colors.text1,
        marginRight: 10,

    },
    total: {
        fontSize: 17,
        color: colors.text3,
        textAlign: 'right',
        marginVertical: 5,
        marginRight: 20,
        fontWeight: '600'
    },
    order: {
        marginBottom: 10,
        marginHorizontal: 10,
        // alignSelf: 'center',
        // elevation: 2,
        // backgroundColor: colors.col1,
        backgroundColor: 'white',
        // paddingVertical: 5,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#cccccc'

    },
    ordertxt1: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 10,

    },
    ordertxt2: {
        fontSize: 16,
        color: colors.text3,
        // textAlign: 'center',
        // marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        fontWeight: 'bold',
    },
    ordertxttime: {
        paddingHorizontal: 6,
        paddingVertical: 5,
        color: 'grey'
    },
    orderindex: {
        fontSize: 20,
        color: colors.col1,
        backgroundColor: colors.text1,
        textAlign: 'center',
        borderRadius: 30,
        padding: 5,
        width: 30,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    ordertxt3: {
        fontSize: 17,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 5,
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    cancelbtn: {
        backgroundColor: colors.text1,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: 'center',

    },
    cencelbtnin: {
        fontSize: 16,
        color: colors.text3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    orderstatus: {
        // fontSize: 20,
    },
    orderstatusin: {},
    orderotw: {
        fontSize: 20,
        backgroundColor: 'orange',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderdelivered: {
        fontSize: 20,
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    ordercancelled: {
        fontSize: 20,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderpending: {
        fontSize: 20,
        backgroundColor: 'yellow',
        color: 'grey',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#f5f6fb',
        borderRadius: 10,
        padding: 20,
        width: '80%', // Adjust the width as needed
        alignItems: 'center',
        shadowColor: '#cccc',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
})
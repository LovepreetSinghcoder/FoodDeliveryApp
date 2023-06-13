import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
// import HomeHeadNav from '../components/HomeHeadNav'
// import BottomNav from '../components/BottomNav'
import { btn1, btn2, colors } from '../Global/styles'

import { firebase } from '../Firebase/FirebaseConfig'
import TrackOrderC from '../Components/TrackOrderC'
import { AuthContext } from '../Context/AuthContext'
import { useFocusEffect } from '@react-navigation/native';



// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'

const TrackOrderScreen = ({ navigation }) => {
  const { userloggeduid, checkIsLogged , loading} = useContext(AuthContext);

    const [orders, setOrders] = useState([])

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

    useFocusEffect(
        React.useCallback(() => {
            getorders()

          console.log('triggered trackorder')
        }, [])
      );
    // console.log('dekh bro', orders)
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

    const convertDate = (milliseconds) => {
        // // console.log(date.seconds)
        // const newdate = new Date(date.seconds * 1000)
        // // console.log(newdate)
        // return newdate.toDateString()
        const date = new Date(parseInt(milliseconds));

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} ${day}/${month}/${year}`;

        return formattedDate;
    }

    // const nData = foodData.filter((items) => items.id === )
    // console.log('dejhbsjdkj',foodData)


    // const cancelOrder = (orderitem) => {
    //     const orderRef = firebase.firestore().collection('UserOrders').doc(orderitem.orderid);
    //     orderRef.update({
    //         orderstatus: 'canceled'
    //     })
    //     getorders();
    // }

    // console.log('dekh ke', Object.values(orders[0][0]))
    return (
        <View style={styles.container}>
            {/* <StatusBar /> */}
            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                    <Text style={{ fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
            </View>


            <ScrollView style={styles.containerin}>
                <Text style={styles.head1}>Orders</Text>
                <View>
                    {orders.sort(
                        // (a, b) => b.orderdate.seconds - a.orderdate.seconds
                        (a, b) => {
                            const dateA = new Date(parseInt(a.orderdate));
                            const dateB = new Date(parseInt(b.orderdate));
                            return dateB - dateA;
                        }
                    ).map((order, index) => {
                        return (
                            <View style={styles.order} key={index}>

                                <Text style={styles.ordertxt2}>Order id : {(order.orderid).substring(0, 14)}</Text>
                                <Text style={styles.ordertxttime}>Time : {convertDate(order.orderdate)}</Text>
                                {/* <Text style={styles.ordertxt2}>order date : {order.orderdate}</Text> */}

                                {/* {order.orderstatus == 'ontheway' && <Text style={styles.orderotw}>Your order is on the way </Text>}
                                {order.orderstatus == 'delivered' && <Text style={styles.orderdelivered}>Your order is delivered </Text>}
                                {order.orderstatus == 'cancelled' && <Text style={styles.ordercancelled}>Your order is cancelled </Text>}
                                {order.orderstatus == 'pending' && <Text style={styles.orderpending}>Your order is pending </Text>} */}


                                {/* <View style={styles.row1}>
                                    <Text style={styles.ordertxt1}>Delivery Agent name & contact</Text>
                                    {
                                        order.deliveryboy_name ? <Text style={styles.ordertxt2}>{order.deliveryboy_name} : {order.deliveryboy_contact}</Text> : <Text style={styles.ordertxt2}>Not Assigned</Text>
                                    }
                                    {
                                        order.deliveryboy_phone ? <Text style={styles.ordertxt2}>{order.deliveryboy_phone}</Text> : null
                                    }
                                </View> */}

                                <TrackOrderC foodDataAll={foodDataAll} data={order.orderid} navigation={navigation} />

                                <Text style={styles.total}>Total: ₹{order.ordercost}</Text>
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
        // marginTop: 10,
        flex: 1,
        // backgroundColor: colors.col1,
        backgroundColor: '#edeef0',

        // alignItems: 'center',
        width: '100%',
        height: '100%',
        // marginBottom: 100,
    },
    head1: {
        fontSize: 25,
        color: colors.text1,
        // textAlign: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
        fontWeight: '600'
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
        fontSize: 20,
        color: colors.text3,
        textAlign: 'right',
        marginVertical: 10,
        marginRight: 20,
    },
    order: {
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        paddingVertical: 10,
        borderRadius: 25,

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
        paddingVertical: 5
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
    }
})
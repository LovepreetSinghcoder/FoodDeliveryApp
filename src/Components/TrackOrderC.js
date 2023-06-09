import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'



const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'


const TrackOrderC = ({ foodDataAll, data, navigation }) => {
    const [orderData, setOrderData] = useState([]);



    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('OrderItems').doc(data);

            foodRef.onSnapshot(doc => {
                // setOrderData(snapshot.docs.map(doc => doc.data().cartItems))

                // console.log('dekh veere',doc.data() )
                setOrderData(doc.data().cartItems)
            }
            )
        };

        fetchData();
    }, [data]);




    const getDta = (id) => {
        const nData = foodDataAll.filter((items) => items.id === id)
        return nData;
    }

    // console.log('645', nData)
    return (
        <View>
            {orderData && orderData.map((order, index) => {
                return (
                    <View key={index} style={{ borderRadius: 20, backgroundColor: '#f2f2f2', width: '95%', alignSelf: 'center', marginVertical: 2, elevation: 2 }}>
                        {/* <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: '600' }}>
                            Quantity:{order.foodquantity}
                        </Text> */}
                        <FlatList style={styles.c1}

                            data={getDta(order.item_id)}
                            renderItem={

                                ({ item }) => {
                                    return (
                                        <View style={styles.rowout}>
                                            <View style={styles.row}>
                                                <View style={styles.left}>
                                                    {/* <Text style={styles.qty}>hjgvjh{item.Foodquantity}</Text> */}
                                                    <Image source={{ uri: item.foodImageUrl }} style={styles.cartimg} />
                                                </View>

                                            </View>

                                            <View style={styles.row1}>
                                                <View style={[styles.left, {}]}>
                                                    <Text style={styles.title}>{item.foodName}</Text>
                                                    <Text style={styles.price1}>₹{item.foodPrice}</Text>
                                                    <Text style={{ paddingVertical: 5, fontSize: 15, fontWeight: '600' }}>
                                                        Quantity:{order.foodquantity}
                                                    </Text>
                                                </View>
                                                <View style={{ marginVertical: 10, marginHorizontal: 5 }}>



                                                    {/* {order.orderStatus == 'Pending' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>}
                                                        {order.orderStatus == 'Confirmed' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>}
                                                        {order.orderStatus == 'Ready' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>}
                                                        {order.orderStatus == 'OutforDelivery' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>}
                                                        {order.orderStatus == 'Delivered' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>}
                                                        {order.orderStatus == 'Canceled' && <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{order.orderStatus}</Text>} */}
                                                    {order.orderStatus === 'Pending' && (
                                                        <View style={{ backgroundColor: 'orange', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12,  }}>
                                                                {order.orderStatus}
                                                            </Text>
                                                        </View>
                                                    )}
                                                    {order.orderStatus === 'Confirmed' && (
                                                        <View style={{ backgroundColor: 'blue', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                                {order.orderStatus}
                                                            </Text>
                                                        </View>

                                                    )}
                                                    {order.orderStatus === 'Ready' && (
                                                        <View style={{ backgroundColor: 'green', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white'}}>
                                                                {order.orderStatus}
                                                            </Text>
                                                        </View>

                                                    )}
                                                    {order.orderStatus === 'OutforDelivery' && (
                                                        <View style={{ backgroundColor: 'purple', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12,  color: 'white'}}>
                                                                Out for Delivery
                                                            </Text>
                                                        </View>

                                                    )}
                                                    {order.orderStatus === 'Delivered' && (
                                                        <View style={{ backgroundColor: 'teal', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                                {order.orderStatus}
                                                            </Text>
                                                        </View>

                                                    )}
                                                    {order.orderStatus === 'Canceled' && (
                                                        <View style={{ backgroundColor: 'red', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 5 }}>

                                                            <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white' }}>
                                                                {order.orderStatus}
                                                            </Text>
                                                        </View>

                                                    )}




                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            } />

                    </View>
                )
            })

            }

        </View>
    )
}

export default TrackOrderC

const styles = StyleSheet.create({
    cartimg: {
        width: 90,
        height: 80,
        // borderRadius: 10,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    rowout: {
        flexDirection: 'row',
        // width: '95%'
    },
    row1: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
        width: '73%'
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    }
})
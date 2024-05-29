import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';


// const userloggeduid = 'U08laKOtyLZWlAXzRFLVYi8ReeK2'


const TrackOrderC = ({ foodDataAll, data, navigation }) => {
    const { userloggeduid } = useContext(AuthContext);

    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [user, setUser] = useState([]);

    const getuserData = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUser(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserData();
    }, [userloggeduid]);

    // console.log('user is ', user.totalCoin - 5)

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
    const [modalVisible, setModalVisible] = useState(false);


    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Check if the success message should be shown (e.g., when the order is successfully canceled)
        if (showSuccessMessage) {
            // Set a timeout to hide the success message after a few seconds
            const timeout = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // Adjust the time (in milliseconds) as needed

            return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
        }
    }, [showSuccessMessage]);

    // const handleCancelOrder = async () => {
    //     setLoading(true);
    //     setModalVisible(false);
    //     // Perform action for option 1
    //     // You can call your function here

    //     // Assuming 'data' contains the order ID or document reference
    //     try {
    //         // Fetch the order data from Firebase Firestore
    //         const orderRef = firebase.firestore().collection('OrderItems').doc(data);
    //         const orderSnapshot = await orderRef.get();

    //         if (orderSnapshot.exists) {
    //             const orderData = orderSnapshot.data();

    //             // Iterate through cartItems and set orderstatus to "cancelled"
    //             const updatedCartItems = orderData.cartItems.map((item) => ({
    //                 ...item,
    //                 orderStatus: 'Canceled',
    //             }));

    //             // Update the order data with the modified cartItems
    //             await orderRef.update({ cartItems: updatedCartItems });
    //             await firebase.firestore().collection('UserData').doc(userloggeduid).update({
    //                 totalCoin: user.totalCoin - 5,
    //               });
    //             // Alert.alert('Order cancelled successfully')
    //             setShowSuccessMessage(true);
    //             console.log('Order cancelled successfully');

    //             // Close the modal
    //             setModalVisible(false);
    //         } else {
    //             console.log('Order not found');
    //             setModalVisible(false);

    //         }
    //     } catch (error) {
    //         console.error('Error cancelling order:', error);
    //         setModalVisible(false);

    //     } finally {
    //         setLoading(false); // Set loading to false when the operation is complete (success or error)
    //         setModalVisible(false);
    //     }
    // };

    const handleCancelOrder = async () => {
        setLoading(true);
        setModalVisible(false);

        try {
            const orderRef = firebase.firestore().collection('OrderItems').doc(data);
            const orderSnapshot = await orderRef.get();

            if (orderSnapshot.exists) {
                const orderData = orderSnapshot.data();

                const updatedCartItems = orderData.cartItems.map((item) => ({
                    ...item,
                    orderStatus: 'Canceled',
                }));

                // Deduct 5 coins from totalCoin
                const updatedTotalCoin = user.totalCoin - 5;

                // Update both the order and user data concurrently
                await Promise.all([
                    orderRef.update({ cartItems: updatedCartItems }),
                    firebase.firestore().collection('UserData').doc(userloggeduid).update({
                        totalCoin: updatedTotalCoin,
                    }),
                ]);

                setShowSuccessMessage(true);
                console.log('Order cancelled successfully');
            } else {
                console.log('Order not found');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        } finally {
            setLoading(false);
        }
    };






    const showAlert = () => {
        Alert.alert(
            'Choose an option',
            'Select an option below:',
            [
                { text: 'Option 1', onPress: handleOption1 },
                { text: 'Option 2', onPress: handleOption2 },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    // console.log('645', nData)
    if (loading) {
        { loading && <ActivityIndicator size="large" color="green" /> } {/* Display the loading indicator if loading is true */ }
    }
    return (
        <View>
            {orderData && orderData.map((order, index) => {

                return (
                    <View key={index} style={{
                        // borderRadius: 10,
                        // backgroundColor: '#f2f2f2',
                        // width: '100%',
                        // alignSelf: 'center',
                        // marginVertical: 2,
                        paddingHorizontal: 5
                        //    elevation: 2 
                    }}>

                        <FlatList style={styles.c1}

                            data={getDta(order.item_id)}
                            renderItem={

                                ({ item }) => {
                                    return (
                                        <View style={styles.rowout}>
                                            <View style={styles.row}>
                                                {/* <View style={styles.left}>
                                                    <Image source={{ uri: item.foodImageUrl }} style={styles.cartimg} />
                                                </View> */}
                                                {item.foodType == 'Veg' ?
                                                    <Image
                                                        source={require('../Images/VegPng.png')}
                                                        style={{ width: 18, height: 18, marginHorizontal: 5, marginVertical: 10 }}
                                                    />
                                                    :
                                                    <Image
                                                        source={require('../Images/NonVeg.png')}
                                                        style={{ width: 15, height: 15, marginHorizontal: 5, marginVertical: 10 }}
                                                    />
                                                }

                                            </View>

                                            <View style={styles.row1}>
                                                <View style={[styles.left, {}]}>
                                                    <Text style={styles.title}> <Text style={{fontWeight: '500', color: 'grey'}}>{order.foodquantity} x </Text>{item.foodName}</Text>
                                                    {/* <Text style={styles.price1}>₹{item.foodPrice}</Text>
                                                    <Text style={{ paddingVertical: 5, fontSize: 15, fontWeight: '600' }}>
                                                        Quantity:{order.foodquantity}
                                                    </Text> */}
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
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        borderBottomColor: 'grey'
    },
    row1: {
        // paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
        width: '73%',
        paddingVertical: 5,
        paddingTop: 7
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%', // Adjust the width as needed
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../Global/styles';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig'
import axios from 'axios';

const PaymentAndDetails = ({ navigation, route }) => {

    const { userloggeduid, checkIsLogged } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    const { cartdata } = route.params;

    useEffect(() => {
        // setOrderdata(JSON.parse(cartdata));
        setOrderdata(cartdata);

    }, [cartdata])

    useEffect(() => {

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

    // console.log('dekh veere', totalCost)

    const placenow = async () => {
        setLoading(true);
        console.log('triggered 1');
        console.log('triggered 2');
        const docid = new Date().getTime().toString() + userloggeduid;
        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid);
        console.log('triggered 3');
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid);

        try {
            await orderitemstabledoc.set({ ...cartdata });
            await orderdatadoc.set({
                orderid: docid,
                orderstatus: 'pending',
                ordercost: totalCost,
                orderdate: new Date().getTime().toString(),
                userid: userloggeduid,
                orderpayment: 'online',
                paymenttotal: totalCost
            });

            await deleteCart();
            await sendPushNotification(shopTokens, 'New Order Received', 'mujhe nhi ptaaa ');

            console.log('triggered 4');
            navigation.navigate('HomeScreen');
            alert('Order Placed Successfully');
        } catch (error) {
            console.log('Error placing order:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <TouchableOpacity style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={{ fontSize: 16 }}>Close</Text>

            </TouchableOpacity>
         
            <View style={styles.container}>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Payment Options</Text>

                    <TouchableOpacity style={styles.editButton}
                        onPress={() => { alert('Selected') }}
                    >
                        <Text style={styles.editButtonText}>Cash on Delivery</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: 30 }}>
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
                </View>

                <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>


                    {loading ?

                        <TouchableOpacity style={styles.editButton} >
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.editButton}
                            onPress={() => placenow()}

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
        backgroundColor: '#fff',
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
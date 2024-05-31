import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Cart from './Cart';
import { colors } from '../Global/styles';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';

const CartsComponent = ({ dataArray, shopId, restaurantsData, userloggeduid, getcartdata, GetTotalPrice, navigation, optimize }) => {
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState(false);


console.log('This is the usercartScreen00',optimize)

    const GetRestaurantDataHandler = (id) => {

        if (!restaurantsData) {
            console.log('Restaurant data is not loaded')
            return;
        }
        const data = restaurantsData.filter((item) => item.shopId == id)
        return data;

    }

    const deleteShopIdArray = async (shopId) => {

        setLoading(true)
        setProcess(true)
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);


        try {
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();

                if (data && data.hasOwnProperty(shopId)) {
                    // Remove the shopId key from the document
                    await docRef.update({
                        [shopId]: firebase.firestore.FieldValue.delete()
                    });

                    console.log(`Deleted shopId: ${shopId}`);
                } else {
                    console.log(`shopId: ${shopId} does not exist in the document.`);
                }
            } else {
                console.log(`Document for user ${userloggeduid} does not exist.`);
            }
        } catch (error) {
            console.error('Error deleting shopId array:', error);
        }

        getcartdata();
        GetTotalPrice();
        // checkShopOpen();
        setProcess(false)
        setLoading(false)
    };

    const openUserCartScreen = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('Usercart', item)
    }
    return (
        <View>
            <FlatList
                data={dataArray}
                keyExtractor={item => item.shopId}
                renderItem={({ item }) => {
                    const restaurantData = GetRestaurantDataHandler(item.shopId);

                    const restaurant = restaurantData.length > 0 ? restaurantData[0] : {};

                    return (
                        <View style={styles.CartContainer}>
                            <View style={styles.CartContainerRestaurant}>
                                <View style={styles.CartContainerRestaurantLogo}>
                                    <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />

                                </View>
                                <View style={styles.CartContainerRestaurantText}>

                                    <Text style={styles.CartContainerRestaurantText1}>{restaurant.restaurant_name ? restaurant.restaurant_name : 'N/A'}</Text>

                                    <Text style={styles.CartContainerRestaurantText2}>{
                                        (item.transactions).length > 1 ?
                                            <Text>{(item.transactions).length} items</Text> : <Text>{(item.transactions).length} item</Text>

                                    } </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={ optimize?{paddingHorizontal: 20, backgroundColor: '#ed5624',  borderRadius: 15,}: {backgroundColor: '#ed5624',  borderRadius: 15}} onPress={() => { openUserCartScreen(item.shopId) }}>


                                    <Cart title={'ok12'} data={item.transactions} navigation={navigation} />
                                </TouchableOpacity>
                                {!optimize ?
                                    <TouchableOpacity style={styles.CartContRemove} onPress={() => deleteShopIdArray(item.shopId)}>
                                        <Text style={styles.CartContRemoveText}>X</Text>
                                    </TouchableOpacity>
                                    :
                                    null}
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    )
}

export default CartsComponent

const styles = StyleSheet.create({


    containerout: {
        flex: 1,
        width: '100%',

    },
    container_cart: {
        flex: 1,
        backgroundColor: colors.col2,
        width: '100%',
    },

    CartContainer: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    CartContainerRestaurant: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5

    },
    CartContainerRestaurantLogo: {

        // backgroundColor: 'cyan',
        borderRadius: 50,
        alignContent: 'center'
    },
    LogoImg: {
        width: 40, // Adjust as needed
        height: 40
    },
    CartContainerRestaurantText: {
        // backgroundColor: 'yellow',
        paddingHorizontal: 5
    },
    CartContainerRestaurantText1: {

        fontSize: 15,
        fontWeight: '600'
    },
    CartContainerRestaurantText2: {

        fontSize: 15,
        fontWeight: '400'
    },
    CartContRemove: {
        backgroundColor: '#fff1ed',

        borderRadius: 15,
        // marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,


        justifyContent: 'center'
    },

    CartContRemoveText: {
        fontSize: 15,
        // fontWeight: '600',
        color: colors.text1,
        alignSelf: 'center'
    }
})
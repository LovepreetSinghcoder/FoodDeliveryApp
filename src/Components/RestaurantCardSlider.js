import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, veg, nonveg } from '../Global/styles'
import LineWithText from './LineWithText'


const RestaurantCardSlider = ({ title, data, navigation, restaurant_id }) => {
    const openProductPage = (item) => {
        navigation.navigate('productpage', item)
    }
    const filteredData = data.filter(item => item.shopId === restaurant_id);
    
    return (
        <View style={styles.container}>
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={filteredData}
                renderItem={({ item }) =>
                (
                    <TouchableOpacity key={item.index}
                        onPress={() => { openProductPage(item) }}>
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                {item.stock === 'out' ?
                                    <View style={styles.outOfStockContainer}>
                                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                                    </View>
                                    :
                                    null
                                }

                                <Image source={{
                                    uri: item.foodImageUrl || ''
                                }} style={styles.cardimgin} />

                            </View>
                            <View style={styles.s2}>
                                {item.foodType == 'Veg' ?
                                    <Image
                                        source={require('../Images/VegPng.png')}
                                        style={{ width: 18, height: 18, marginLeft: 7, marginVertical: 5 }}
                                    />
                                    :
                                    <Image
                                        source={require('../Images/NonVeg.png')}
                                        style={{ width: 15, height: 15, marginLeft: 7, marginVertical: 5 }}
                                    />
                                }

                                <View style={styles.s2in}>
                                    <Text style={styles.txt1}>{item.foodName}</Text>
                                    {/* <Text style={styles.txt2}>FAST FOOD • <Text style={{textDecorationLine:'line-through'}}>{item.actualFoodPrice}</Text> • ₹{item.foodPrice}/-</Text> */}
                                    <Text style={styles.txt2}>
                                        Fast Food •{' '}
                                        <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red' }}>₹{item.actualFoodPrice}/-</Text> • ₹{item.foodPrice}/-
                                    </Text>
                                    {/* {item.foodType == 'Veg' ? <Text style={veg}>VEG</Text> : <Text style={nonveg}>NON-VEG</Text>} */}

                                </View>

                            </View>

                            {/* {item.stock === 'out' ?
                                <View style={styles.s3}>
                                    <Text style={[styles.buybtn, { backgroundColor: 'red' }]}>
                                        OUT OF STOCK
                                    </Text>
                                </View>
                                :
                                <View style={styles.s3}>
                                    <Text style={styles.buybtn}>
                                        BUY NOW
                                    </Text>
                                </View>
                            } */}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default RestaurantCardSlider

const styles = StyleSheet.create({
    container: {
        // marginVertical: 10,
        marginBottom: 10
    },
    //card
    cardouthead: {
        color: colors.text3,
        width: '90%',
        fontSize: 20,
        fontWeight: '600',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingLeft: 5
    },
    cardsout: {
        width: '100%',
        // backgroundColor: 'red',
    },
    card: {
        // backgroundColor: "aqua",
        width: 330,
        // width: '100%',

        // height: 260,
        height: 225,

        marginLeft: 10,
        marginTop: 10,
        // borderRadius: 15,
        // borderWidth: 1,
        // borderColor: '#d6d6d6',
        // backgroundColor: colors.col1,
        backgroundColor: 'white'
        // elevation: 5,
        // paddingBottom: 100
    },
    s1: {
        position: 'relative', // Position the child elements relative to this container

    },

    outOfStockContainer: {
        position: 'absolute', // Position this container absolutely within its parent
        top: 5, // Align it to the top
        left: 5, // Align it to the left
        backgroundColor: 'red', // Background color
        padding: 5, // Add padding for better visibility
        zIndex: 1, // Ensure it's above the image
        borderRadius: 14,
        paddingHorizontal: 10
    },
    outOfStockText: {
        color: 'white', // Text color
        fontWeight: 'bold', // Text style

    },
    cardimgin: {
        width: "100%",
        height: 170,
        // borderRadiusTop: 20,
        // borderTopLeftRadius: 14,
        // borderTopRightRadius: 14,
        borderRadius: 13,
    },
    s2: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginHorizontal: 3,
        // marginTop: -50
        marginTop: 3,
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 3

        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 16,
        color: colors.text3,
        // marginHorizontal: 5,
        fontWeight: '600',
        width: 150,
        // backgroundColor: 'white',
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // borderRadius: 5
    },
    txt2: {
        fontSize: 12,
        color: colors.text2,
        marginRight: 10,
        fontWeight: '500',
        // textDecorationLine: 'line-through'
    },
    s2in: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginHorizontal: 6,
        marginBottom: 6

    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 1,
        width: '100%',
    },
    buybtn: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 8.5,
        fontSize: 15,
        // borderRadius: 10,
        fontWeight: '600',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        width: '100%',
        textAlign: 'center',
    }
})
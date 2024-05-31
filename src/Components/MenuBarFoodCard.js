import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, veg, nonveg } from '../Global/styles'
import LineWithText from './LineWithText'

const MenuBarFoodCard = ({ title, data, callfn, navigation }) => {
    const openProductPage = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', item)
    }

    const test = (fg) => {
        console.log('This is the item id', fg)

    }

    return (
        <View style={styles.container}>

            <LineWithText navigation={navigation} heading={title} />
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                // horizontal
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index}
                        onPress={() => { openProductPage(item) }}>
                        <View style={styles.card}>
                            <View style={styles.s2}>
                                <View>
                                    {item.foodType == 'Veg' ?
                                        <>

                                            <Image
                                                source={require('../Images/VegPng.png')}
                                                style={{ width: 20, height: 20, marginHorizontal: 5, marginVertical: 5 }}
                                            />
                                        </>

                                        :
                                        <Image
                                            source={require('../Images/NonVeg.png')}
                                            style={{ width: 20, height: 20, marginHorizontal: 5, marginVertical: 5 }}
                                        />
                                    }
                                </View>

                                <Text style={styles.txt1}>{item.foodName}</Text>

                                <View style={styles.s2in}>

                                    <Text style={styles.txt2}>
                                        Fast Food
                                    </Text>

                                    {/* <Text style={styles.txt2}>

                                        <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red' }}>₹{item.actualFoodPrice}/-</Text>


                                    </Text> */}
                                    <Text style={[styles.txt2, { fontSize: 15, fontWeight: '500', paddingVertical: 5, color: 'black' }]}>₹{item.foodPrice}</Text>


                                    {/* {item.foodType == 'Veg' ? <Text style={veg}>VEG</Text> : <Text style={nonveg}>NON-VEG</Text>} */}
                                </View>

                            </View>
                            <View style={styles.s1}>
                                {item.stock === 'out' ?
                                    <View style={styles.outOfStockContainer}>
                                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                                    </View>
                                    :
                                    null
                                }
                                {/* <TouchableOpacity style={[styles.outOfStockContainer, {
                                    top: 90,
                                    left: -20,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#fff6f7'
                                }]} 
                                // onPress={() => callfn(item.id)}
                                >
                                    <Text style={styles.outOfStockText}>ADD +</Text>
                                </TouchableOpacity> */}
                                <Image source={{
                                    uri: item.foodImageUrl
                                }} style={styles.cardimgin} />

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

export default MenuBarFoodCard

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
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
        backgroundColor: "white",
        // width: '95%',
        // alignSelf: 'center',
        // height: 260,
        height: 150,

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        paddingVertical: 5,
        // marginLeft: 10,
        marginTop: 1,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#d6d6d6',
        // backgroundColor: colors.col1,
        backgroundColor: 'white',
        // elevation: 2,
        // paddingBottom: 100
    },
    s1: {
        position: 'relative', // Position the child elements relative to this container

    },

    outOfStockContainer: {
        position: 'absolute', // Position this container absolutely within its parent
        top: 5, // Align it to the top
        left: 5, // Align it to the left
        // backgroundColor: 'white', 
        backfaceVisibility: 'hidden',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 15,
        padding: 5, // Add padding for better visibility
        zIndex: 1, // Ensure it's above the image
        borderRadius: 14,
        paddingHorizontal: 10
    },
    outOfStockText: {
        color: 'red', // Text color
        fontWeight: 'bold', // Text style
        textTransform: 'uppercase'

    },
    cardimgin: {
        width: "100%",
        width: 150,
        height: 138,
        // borderRadiusTop: 20,
        // borderTopLeftRadius: 21,
        // borderTopRightRadius: 21
        borderRadius: 15
    },
    s2: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginHorizontal: 3,
        marginTop: 3
        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 16,
        color: colors.text3,
        marginHorizontal: 5,
        fontWeight: '600',
        width: 150,
    },
    txt2: {
        fontSize: 12,
        color: colors.text2,
        marginRight: 10,
        fontWeight: '500',
        flexDirection: 'column',

    },
    s2in: {
        flexDirection: 'column',
        // alignItems: 'center',
        marginHorizontal: 6,

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
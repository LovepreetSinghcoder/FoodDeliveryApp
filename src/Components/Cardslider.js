import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, veg, nonveg } from '../Global/styles'


const Cardslider = ({ title, data, navigation }) => {
    const openProductPage = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>
                {title}
            </Text>
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index}
                        onPress={() => { openProductPage(item) }}>
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                <Image source={{
                                    uri: item.foodImageUrl
                                }} style={styles.cardimgin} />
                            </View>
                            <View style={styles.s2}>
                                <Text style={styles.txt1}>{item.foodName}</Text>

                                <View style={styles.s2in}>
                                    {/* <Text style={styles.txt2}>FAST FOOD • <Text style={{textDecorationLine:'line-through'}}>{item.actualFoodPrice}</Text> • ₹{item.foodPrice}/-</Text> */}
                                    <Text style={styles.txt2}>
                                        Fast Food •{' '}
                                        <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red'  }}>₹{item.actualFoodPrice}/-</Text> • ₹{item.foodPrice}/-
                                    </Text>
                                    {item.foodType == 'Veg' ? <Text style={veg}>VEG</Text> : <Text style={nonveg}>NON-VEG</Text>}
                                </View>

                            </View>
                            <View style={styles.s3}>
                                <Text style={styles.buybtn}>
                                    Buy
                                </Text>
                            </View>
                            {item.stock === 'out' ?
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
                            }
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Cardslider

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
        // backgroundColor: "aqua",
        width: 300,
        height: 260,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        backgroundColor: colors.col1,
        // elevation: 5,
        // paddingBottom: 100
    },
    cardimgin: {
        width: "100%",
        height: 170,
        // borderRadiusTop: 20,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17
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
        // textDecorationLine: 'line-through'
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
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
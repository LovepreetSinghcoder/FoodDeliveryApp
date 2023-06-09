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
                                    <Text style={styles.txt2}>Rs.{item.foodPrice}/-</Text>
                                    {item.foodType == 'Veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                                </View>

                            </View>
                            <View style={styles.s3}>
                                <Text style={styles.buybtn}>
                                    Buy
                                </Text>
                            </View>
                            {item.stock === 'out' ?
                                <View style={styles.s3}>
                                    <Text style={[styles.buybtn, {backgroundColor:'red'}]}>
                                       Out of Stock
                                    </Text>
                                </View>
                                :
                                <View style={styles.s3}>
                                    <Text style={styles.buybtn}>
                                        Buy
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
        margin: 10,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        backgroundColor: colors.col1,
        // elevation: 2
    },
    cardimgin: {
        width: "100%",
        height: 180,
        // borderRadiusTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    s2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 18,
        color: colors.text3,
        marginHorizontal: 5,
        width: 150,
    },
    txt2: {
        fontSize: 20,
        color: colors.text2,
        marginRight: 10,
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,

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
        paddingVertical: 5,
        fontSize: 20,
        // borderRadius: 10,
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
        width: '100%',
        textAlign: 'center',
    }
})
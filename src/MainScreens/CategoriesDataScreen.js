import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors, veg, nonveg } from '../Global/styles'
import { AuthContext } from '../Context/AuthContext';

const CategoriesDataScreen = ({ navigation, route }) => {

    const { userloggeduid, checkIsLogged, loading } = useContext(AuthContext);

    const Ndata = route.params;
    // console.log('dekh veer',data )
    if (route.params === undefined) {
        navigation.navigate('HomeScreen')
    }

    const [foodData, setFoodData] = useState([]);

    const foodRef = firebase.firestore().collection('foodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }, [])

    const [searchresult, setSearchresult] = useState([]);


    const searchResult = () => {
        const data = foodData.filter(item =>
            item.foodName.toLowerCase().includes(Ndata.toLowerCase())
        );
        // console.log('dekh veer', data)
        setSearchresult(data);
    };

    useEffect(() => {
        searchResult();
    }, [Ndata, foodData])

    const openProductPage = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', item)
    }
    return (
        <View style={styles.Maincontainer}>
            <TouchableOpacity style={styles.searchbox}
                onPress={() => { navigation.navigate('Searchpage') }}>

                <Ionicons name="search" size={24} color="black" style={
                    styles.searchicon
                } />
                {/* <TextInput style={styles.input}
                    placeholder="Search"
                    onChangeText={(e) => {
                        setSearch(e)
                    }}
                    onSubmitEditing={() => {
                        // searchResult(search);
                        Keyboard.dismiss(); // Close the keyboard
                    }} /> */}

                <TextInput style={styles.input}
                    placeholder="Search"
                    value={Ndata ? Ndata || '' : ''}
                    // onChangeText={setEmail}
                    keyboardType="default"
                    editable={false}
                />

                <TouchableOpacity style={{ borderLeftWidth: 1, borderColor: '#8c8c8c' }}
                // onPress={() => { searchResult(search); Keyboard.dismiss(); }}
                >
                    <Text style={{ fontWeight: '600', color: '#8c8c8c', paddingLeft: 4, }}>Search</Text>
                </TouchableOpacity>


            </TouchableOpacity>

            {searchresult.length === 0 ?
                <View style={{ width: '91%', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>No results found</Text>
                </View>
                :
                <FlatList style={styles.cardsout}
                    showsHorizontalScrollIndicator={false}
                    // horizontal
                    data={searchresult}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index}
                            onPress={() => { openProductPage(item) }}
                        >
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
                                        uri: item.foodImageUrl
                                    }} style={styles.cardimgin} />
                                </View>
                                <View style={styles.s2}>
                                    <Text style={styles.txt1}>{item.foodName}</Text>

                                    <View style={styles.s2in}>
                                        {/* <Text style={styles.txt2}>Rs.{item.foodPrice}/-</Text> */}
                                        <Text style={styles.txt2}>
                                            Fast Food •{' '}
                                            <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red' }}>₹{item.actualFoodPrice}/-</Text> • ₹{item.foodPrice}/-
                                        </Text>
                                        {item.foodType == 'Veg' ? <Text style={veg}>VEG</Text> : <Text style={nonveg}>NON-VEG</Text>}
                                    </View>

                                </View>
                                {/* <View style={styles.s3}>
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
                                } */}
                            </View>
                        </TouchableOpacity>
                    )}
                />

            }

        </View>
    )
}

export default CategoriesDataScreen

const styles = StyleSheet.create({

    Maincontainer: {
        // backgroundColor: 'green',
        flex: 1,
        height: '100%'

    },
    searchbox: {
        flexDirection: 'row',
        width: '92%',
        backgroundColor: colors.col1,
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
        marginVertical: 20,
        alignSelf: 'center',
        elevation: 2,
    },
    input: {
        marginLeft: 10,
        width: '75%',
        fontSize: 16,
        color: colors.text1,
    },
    searchicon: {
        color: colors.text1,
    },
    seacrhresultsouter: {
        width: '100%',
        // marginHorizontal: 30,
        // paddingLeft: 20,
        height: '100%',
        backgroundColor: colors.col1,
    },
    searchresultsinner: {
        width: '100%',
        paddingLeft: 20,
    },
    searchresult: {
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 5,
    },
    searchresulttext: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1,
    },



    cardsout: {
        width: '100%',
        // backgroundColor: 'red',
    },
    card: {


        width: '94%',
        height: 225,
        //    marginLeft: 10,
        marginTop: 10,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        backgroundColor: colors.col1,
        alignSelf: 'center',
        // elevation: 1

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
        borderTopLeftRadius: 21,
        borderTopRightRadius: 21
    },
    // cardimgin: {

    //     width: "100%",
    //     height: 170,
    //     // borderRadiusTop: 20,
    //     borderTopLeftRadius: 17,
    //     borderTopRightRadius: 17
    // },
    s2: {

        marginHorizontal: 3,
        marginTop: 3
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
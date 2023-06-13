import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { colors, veg, nonveg } from '../Global/styles'

const SearchItemScreen = () => {
    const [search, setSearch] = useState('')
    const [foodData, setFoodData] = useState([]);

    const foodRef = firebase.firestore().collection('foodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }, [])

    const [searchresult, setSearchresult] = useState([]);
    // const searchResult = (foodname) => {
    //     const data = foodData.foodName.toLowerCase().includes(foodname.toLowerCase())
    //     setSearchresult(data)
    // }
    const searchResult = (newsearch) => {
        const data = foodData.filter(item =>
            item.foodName.toLowerCase().includes(newsearch.toLowerCase())
        );
        setSearchresult(data);
    };
    // console.log('dekh veere 213232',searchresult )


    const openProductPage = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', item)
    }
    // if (searchresult.length === 0) {
    //     return (
    //         <View style={styles.Maincontainer}>

    //         </View>
    //     )
    // }

    return (
        <View style={styles.Maincontainer}>
            <View style={styles.searchbox}>
                {/* <AntDesign name="search1" size={24} color="black" style={
                    styles.searchicon
                } /> */}
                <Ionicons name="search" size={24} color="black" style={
                    styles.searchicon
                } />
                <TextInput style={styles.input} placeholder="Search" onChangeText={(e) => {
                    setSearch(e)
                }} onSubmitEditing={() => {
                    searchResult(search);
                    Keyboard.dismiss(); // Close the keyboard
                }} />

                <TouchableOpacity style={{ borderLeftWidth: 1, borderColor: '#8c8c8c' }} onPress={() => { searchResult(search); Keyboard.dismiss(); }}>
                    <Text style={{ fontWeight: '600', color: '#8c8c8c', paddingLeft: 5 }}>Search</Text>
                </TouchableOpacity>


            </View>
            {/* {search != '' && <View style={styles.seacrhresultsouter}>
                <FlatList style={styles.searchresultsinner} data={foodData} renderItem={
                    ({ item }) => {
                        if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <TouchableOpacity style={styles.searchresult} onPress={() => searchResult(item.foodName)}>
                                 <Ionicons name="ios-search-circle-outline" size={24} color={colors.text1} />
                            
                                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }
                } />
            </View>} */}
            {searchresult.length === 0 ?
                <View style={{width: '91%', alignSelf: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: '600', color: '#8c8c8c'}}>No results found</Text>
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
                                        <Text style={[styles.buybtn, { backgroundColor: 'red' }]}>
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

            }

        </View>
    )
}

export default SearchItemScreen

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
        // backgroundColor: "aqua",
        width: '90%',
        height: 260,
        margin: 10,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        backgroundColor: colors.col1,
        alignSelf: 'center'
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
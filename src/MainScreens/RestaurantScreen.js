import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1, btn2, colors, hr80, navbtn, navbtnin, navbtnout, nonveg, veg, incdecbtn, incdecinput, incdecout } from '../Global/styles';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'


import Restaurants from '../Components/Restaurants';
import LineWithText from '../Components/LineWithText';
import MenuBar from '../Components/MenuBar';

const RestaurantScreen = ({ navigation, route }) => {

    // Access the passed values from route.params
    const RestaurantId = route.params.id;
    // console.log('dekh veere restaurant id', RestaurantId)

    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantMenuIds, setRestaurantMenuIds] = useState([]);
    const [allMenuData, setAllMenuData] = useState([]);
    const [allFoodData, setAllFoodData] = useState([]);

    // console.log('dekh veere restaurantMenuIds', restaurantMenuIds)
    // console.log('dekh veere menuData1', menuData)
    // console.log('dekh veere allFoodData', allFoodData)





    const GetMenuData = async () => {
        const docRef = firebase.firestore().collection('RestaurantMenus');
        docRef.onSnapshot(snapshot => {
            setAllMenuData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }


    const GetFoodData = async () => {
        const docRef = firebase.firestore().collection('foodData');
        docRef.onSnapshot(snapshot => {
            setAllFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }

    const GetRestaurantData = async () => {
        const docRef = firebase.firestore().collection('RestaurantData').where('restaurant_id', '==', RestaurantId)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setRestaurantData(doc.data());
            })
        }
        else {
            console.log('No data found!');
        }
    }
    useEffect(() => {
        GetRestaurantData()
        GetMenuData()
        GetFoodData()
    }, [])

    const GetRestaurantMenuData = () => {

    }

    useEffect(() => {
        if (restaurantData && restaurantData.menu_list) {
            // Initialize an array to store menu ids
            const menuIds = [];

            const arrayofdata = restaurantData.menu_list
            for (let i = 0; i < arrayofdata.length; i++) {
                const element = arrayofdata[i];
                // Assuming each menu item has an 'id' property, you may need to adjust this
                menuIds.push(element);
            }

            // Set the state with the array of menu ids
            setRestaurantMenuIds(menuIds);
        }
    }, [restaurantData]);

    //   const fff = restaurantData.menu_list;
    // console.log('dekh bro, 34', fff.length)
    // console.log('dekh bro, 34', restaurantMenuIds)




    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>

                    <Text style={{ fontSize: 16, color: colors.col1 }}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container_inner1}>
                <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                        {/* Shovii - Shop of Village */}{restaurantData.restaurant_name}
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: 'grey' }}>
                        Fast Food
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5, marginVertical: 4 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'green', borderRadius: 9, paddingVertical: 2, paddingHorizontal: 5 }}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: 'white' }}>
                            {/* 4.3 */}{restaurantData.restaurant_rating}
                        </Text>
                        <View style={{ alignSelf: 'center', paddingLeft: 2 }}>

                            <AntDesign name="star" size={11} color="white" />
                        </View>
                    </View>

                    <View style={{
                        alignSelf: 'center', marginLeft: 5, borderBottomWidth: 1, borderBottomStyle: 'dashed', borderBottomColor: 'grey', paddingVertical: 2,
                        borderRadius: 1,
                    }}>
                        <Text  >
                            38.4K ratings
                        </Text>
                    </View>

                </View>

                <View style={{ borderRadius: 12, flexDirection: 'row', backgroundColor: '#e3eeff', paddingHorizontal: 8, paddingVertical: 1 }}>

                    <View style={{ alignSelf: 'center', paddingRight: 3 }}>
                        {/* <Octicons name="stopwatch" size={24} color="black" /> */}
                        <Entypo name="stopwatch" size={12} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            20-25 min 1km
                        </Text>
                        <View style={{ alignSelf: 'center', }}>

                            <Entypo name="dot-single" size={15} color="black" />
                        </View>
                        <Text>
                            100ft Road
                        </Text>
                    </View>
                </View>
            </View>
            {/* <LineWithText navigation={navigation} heading={'FOODS'} />agg */}

            {/* <Restaurants navigation={navigation} title={'FOODS'}/> */}

            {/* <Text>Restaurant Foods</Text> */}

            {restaurantMenuIds && restaurantMenuIds.map((data, index) => (

                <View key={index}>
                    {/* <Text>dekh bro</Text> */}
                    <MenuBar navigation={navigation} menu_id={data} />
                </View>

            )
            )}
        </ScrollView>
    )
}

export default RestaurantScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    backgroundColor: colors.col1,

        // alignItems: 'center',
        width: '100%',

    },
    container_inner1: {
        // backgroundColor: 'green',
        paddingVertical: 15,
        alignItems: 'center',

    }
})
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1, btn2, colors, hr80, navbtn, navbtnin, navbtnout, nonveg, veg, incdecbtn, incdecinput, incdecout } from '../Global/styles';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo, FontAwesome6, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'


import Restaurants from '../Components/Restaurants';
import LineWithText from '../Components/LineWithText';
import MenuBar from '../Components/MenuBar';
// import BottomSlider from './BottomSlider';
import { Button } from 'react-native-elements';
import RestaurantCouponsSlider from '../Components/RestaurantCouponsSlider';
import MenuBarFoodCard from '../Components/MenuBarFoodCard';
import { LinearGradient } from 'expo-linear-gradient';

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


    const GetAllFoodData = async () => {
        const docRef = firebase.firestore().collection('foodData');
        docRef.onSnapshot(snapshot => {
            setAllFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }
    const [foodData, setFoodData] = useState([]);

    const GetFoodData = async () => {
        const docRef = await firebase.firestore().collection('foodData').where('shopId', '==', RestaurantId);
        await docRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }

    useEffect(() => {
        GetFoodData();
    }, [RestaurantId])

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
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openEditProductHandler = (item_id) => {
        const qty = '1'
        setSelectedProduct({ item_id, qty });
        // console.log('This is openEditProductHandler Data ::', item_id, qty)
    };

    const closeEditProductHandler = () => {
        setSelectedProduct(null);
        // getSpecificArray()
        // GetTotalPrice()
    }



    return (
        <ScrollView style={styles.container}>

            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: colors.col2, padding: 15 }} onPress={() => { navigation.navigate('HomeScreen') }} >
                <FontAwesome6 name="arrow-left" size={24} color="black" />

            </TouchableOpacity>

            <View style={styles.container_inner1}>
                {restaurantData.isShop === 'Open'
                    ?

                    <LinearGradient
                        colors={['#000000', '#0f9b0f']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        // style={styles.container}
                        style={{
                            transform: [{ rotate: '-5deg' }],
                            padding: 10,
                            borderRadius: 12,
                            backgroundColor: 'transparent',
                            marginBottom: 5
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '400', color: 'white' }}>Opened</Text>

                    </LinearGradient>
                    :
                    <LinearGradient
                        colors={['#8E0E00', '#1F1C18']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            transform: [{ rotate: '5deg' }],
                            padding: 10,
                            borderRadius: 12,
                            backgroundColor: 'transparent',
                            marginBottom: 5
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '400', color: 'white' }}>Closed</Text>

                    </LinearGradient>
                }
                <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                        {restaurantData.restaurant_name}
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

                <View style={{
                    borderRadius: 12,
                    flexDirection: 'row',
                    backgroundColor: '#e3eeff',
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    alignContent: 'center'
                }}>

                    <View style={{ alignSelf: 'center', paddingRight: 3 }}>
                        <Fontisto name="stopwatch" size={15} color="black" />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>20-25 min<Entypo name="dot-single" size={15} color="black" />1km</Text>
                        <View style={{ alignSelf: 'center', }}>
                            <Entypo name="dot-single" size={15} color="black" />
                        </View>
                        <Text>100ft Road</Text>
                    </View>
                </View>
            </View>

            <View>
                <RestaurantCouponsSlider />
            </View>
            {/* <LineWithText navigation={navigation} heading={'FOODS'} />agg */}

            {/* <Restaurants navigation={navigation} title={'FOODS'}/> */}

            <View>
                {foodData.length === 0 ? null : <MenuBarFoodCard title={'Menu'} data={foodData} navigation={navigation} callfn={console.log('ok')} />}
            </View>


            {restaurantMenuIds && restaurantMenuIds.map((data, index) => (

                <View key={index}>
                    <MenuBar navigation={navigation} menu_id={data} callfn={openEditProductHandler} />
                </View>

            )
            )}

            {selectedProduct && (
                <View style={{
                    height: 440, zIndex: 100,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}>
                    <TouchableOpacity style={{ backgroundColor: '#a1a1a1', borderRadius: 50, width: 50, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginBottom: 15, marginTop: -65 }} onPress={() => closeEditProductHandler()}><Text style={{ fontSize: 18, fontWeight: '600' }}>X</Text></TouchableOpacity>
                    <EditProductSlider
                        restaurantsData={restaurantData}
                        item_id={selectedProduct.item_id}
                        qty={selectedProduct.qty}
                        callFn={getuserData}
                        closeFn={closeEditProductHandler}
                    />
                </View>
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
        backgroundColor: colors.col2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',

    }
})
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import LineWithText from './LineWithText'
import { firebase } from '../Firebase/FirebaseConfig'


const Restaurants = ({ navigation, title }) => {

    // Assuming you have an array of restaurant data
    // const restaurantData = [
    //     { logo: <Image source={require('../LogoImg/chef.png')} style={styles.LogoImg} />, name: 'PFC' },
    //     { logo: <Image source={require('../LogoImg/kitchenTable.png')} style={styles.LogoImg} />, name: 'MFC' },
    //     { logo: <Image source={require('../LogoImg/tray.png')} style={styles.LogoImg} />, name: 'KFC' },
    //     { logo: <Image source={require('../LogoImg/restaurant1.png')} style={styles.LogoImg} />, name: 'Preet' },
    //     { logo: <Image source={require('../LogoImg/restaurant2.png')} style={styles.LogoImg} />, name: 'Pizza way' },
    //     { logo: <Image source={require('../LogoImg/restaurant3.png')} style={styles.LogoImg} />, name: 'Shovii' },
    //     { logo: <Image source={require('../LogoImg/restaurant4.png')} style={styles.LogoImg} />, name: 'Fifa Drink' },
    //     { logo: <Image source={require('../LogoImg/chef.png')} style={styles.LogoImg} />, name: 'Samosa 8' },
    // ];


    const [restaurantData, setRestaurantData] = useState([]);



    const doc_query = firebase.firestore().collection('RestaurantData');

    // const GetRestaurantData = () => {

    // }
    useEffect(() => {
        doc_query.onSnapshot(snapshot => {
            setRestaurantData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }, [])

    // console.log('dekh veere 12', restaurantData1[0].restaurant_logo)

    return (
        <View style={styles.container}>
            <LineWithText navigation={navigation} heading={title} />

            <View style={styles.inner_container}>
                {restaurantData.map((restaurant, index) => (
                    <TouchableOpacity key={index} style={styles.inner_container_box} onPress={() => navigation.navigate('RestaurantScreen', {id: restaurant.restaurant_id})}>
                        <View style={styles.inner_container_box_1}>
                            <Image source={{uri : restaurant.restaurant_logo}} style={styles.LogoImg} />
                        </View>
                        <View style={styles.inner_container_box_2}>
                            <Text style={styles.inner_container_box_name}>{(restaurant.restaurant_tag).substring(0, 10)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    )
}

export default Restaurants

const styles = StyleSheet.create({

    container: {
        marginVertical: 10,
    },
    inner_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        justifyContent: 'space-around',
        paddingHorizontal: 10
    },
    inner_container_box: {
        // borderBottomWidth: 1,
        // borderColor: '#f5f5f5',
        height: 65,
        borderRadius: 13,
        width: '23%', // Adjust the width as needed
        marginVertical: 5,
        padding: 5,
        backgroundColor: '#f5f5f5',
        elevation: 1,

        alignItems: 'center'
    },
    LogoImg: {
        // Your image styles go here
        // backgroundColor: 'green',
        width: 25, // Adjust as needed
        height: 30 // Adjust as needed
    },
    inner_container_box_1: {
        // Styles for the first inner container box part
        // backgroundColor: 'green',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        // height: 35,
        // alignContent: 'center'
    },
    inner_container_box_2: {
        // Styles for the second inner container box part
    },
    inner_container_box_logo: {
        // Styles for the logo text
    },
    inner_container_box_name: {
        // Styles for the restaurant name text
    },
})
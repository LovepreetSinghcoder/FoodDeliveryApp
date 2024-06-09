import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LineWithText from './LineWithText'
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext'
import Cardslider from './Cardslider'
import RestaurantCardSlider from './RestaurantCardSlider'


const Restaurants = ({ navigation, title, data }) => {
    const { userloggeduid, checkIsLogged, SetLocationName, locationName, userDataHandler, userdata, userLongitude, userLatitude } = useContext(AuthContext);


    const haversineDistance = (coords1, coords2) => {
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        // console.log('ok ffff',coords2.latitude )
        const lat1 = coords1.latitude;
        const lon1 = coords1.longitude;
        const lat2 = coords2.latitude;
        const lon2 = coords2.longitude;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        console.log('this is the distance between coords 444', distance)
        return distance;
    };


    const [restaurantData, setRestaurantData] = useState([]);


    let doc_query = firebase.firestore().collection('RestaurantData')

    useEffect(() => {

        if (locationName) {
            doc_query = doc_query.where('location.address.restaurant_city', '==', locationName);
        } else if (userdata.location.address.postalCode) {
            doc_query = doc_query.where('location.address.restaurant_postal_code', '==', userdata.location.address.postalCode);
        }
        doc_query.onSnapshot(snapshot => {
            setRestaurantData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }, [locationName])

    const [filterData, setFilterData] = useState([])
    // useEffect(() => {
    //     setFilterData(data.filter((item) => item.shopId == restaurantData.shopId && item.restaurant_id == restaurantData.shopId))
    // },[])

    // console.log('dekh veere 12', restaurantData1[0].restaurant_logo)
    // console.log('this is the location Name', locationName)
    // console.log('this is the data of the restaurant', restaurantData[0].restaurant_id)

    console.log('This is the coords', userLatitude, userLongitude)

    return (
        <View style={styles.container}>
            <LineWithText navigation={navigation} heading={title} />

            <View style={styles.inner_container}>
                {/* {restaurantData.map((restaurant, index) =>

                (
                    <TouchableOpacity key={index} style={styles.inner_container_box} onPress={() => navigation.navigate('RestaurantScreen', { id: restaurant.restaurant_id })}>
                        <View style={styles.inner_container_box_1}>
                            {restaurant.restaurant_logo && (

                                <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />
                            )}
                        </View>
                        <View style={styles.inner_container_box_2}>
                            <Text style={styles.inner_container_box_name}>{(restaurant.restaurant_tag).substring(0, 10)}</Text>
                        </View>
                    </TouchableOpacity>
                )
                )} */}

                {/* {restaurantData.map((restaurant, index) => {
                    if (restaurantData.Availablilty_Radius < haversineDistance(
                        { latitude: restaurantData.location.geolocation.latitude || 29.522884, longitude: restaurantData.location.geolocation.longitude || 75.025359 },
                        { latitude: userLatitude || 29.522884, longitude: userLongitude || 75.025359 }
                    )) {
                        return (
                            <TouchableOpacity key={index} style={styles.inner_container_box} onPress={() => navigation.navigate('RestaurantScreen', { id: restaurant.restaurant_id })}>
                                <View style={styles.inner_container_box_1}>
                                    {restaurant.restaurant_logo && (
                                        <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />
                                    )}
                                </View>
                                <View style={styles.inner_container_box_2}>
                                    <Text style={styles.inner_container_box_name}>{restaurant.restaurant_tag.substring(0, 10)}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return null; // Explicitly return null if the condition is not met
                    }
                })} */}

                {restaurantData.map((restaurant, index) => {
                    if (restaurant.location && restaurant.location.geolocation) {

                        // console.log('this is the value of coords RR,', typeof(restaurant.location.geolocation.latitude), )
                        const distance = haversineDistance(
                            { latitude: parseInt(restaurant.location.geolocation.latitude), longitude: parseInt(restaurant.location.geolocation.longitude) },
                            { latitude: userLatitude, longitude: userLongitude }
                        );
                        // console.log('this is the total distance', userLatitude)
                        // if (!distance) {
                            return (
                                <View style={{
                                    borderRadius: 15,
                                    // borderWidth: 1,
                                    // borderColor: '#d6d6d6',
                                    backgroundColor: 'white',
                                    marginBottom: 20,
                                    elevation: 3
                                }}>
                                    <TouchableOpacity key={index} style={styles.inner_container_box} onPress={() => navigation.navigate('RestaurantScreen', { id: restaurant.restaurant_id })}>
                                        <View style={styles.inner_container_box_1}>
                                            {restaurant.restaurant_logo && (

                                                <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />
                                            )}
                                        </View>
                                        <View style={styles.inner_container_box_2}>
                                            <View style={{flexDirection: 'row'}}>

                                                <Text style={styles.inner_container_box_name}>{restaurant.restaurant_name}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: '400', backgroundColor: 'green', color: 'white', paddingHorizontal: 5, borderRadius: 7, marginLeft: 5, alignContent: 'center', alignItems: 'center', paddingVertical: 2 }}>{restaurant.restaurant_rating} ✩</Text>
                                            </View>
                                            <Text style={[styles.inner_container_box_name, { fontSize: 14, fontWeight: '400' }]}>{(restaurant.location.address.restaurant_city)}</Text>
                                        </View>


                                    </TouchableOpacity>
                                    <SafeAreaView>

                                        {/* <RestaurantCardSlider title={"VEG"} data={data} navigation={navigation} restaurantid={restaurantData.restaurant_id} shopId={restaurantData.shopId} /> */}
                                        <RestaurantCardSlider title={"VEG"} data={data} navigation={navigation} restaurant_id={restaurant.restaurant_id} shopId={restaurant.shopId} />
                                    </SafeAreaView>
                                </View>
                            )
                        // }
                        // if (restaurant.Availablilty_Radius > distance) {
                        //     return (
                        //         <View style={{
                        //             borderRadius: 15,
                        //             // borderWidth: 1,
                        //             // borderColor: '#d6d6d6',
                        //             backgroundColor: 'white',
                        //             marginBottom: 20,
                        //             elevation: 3

                        //         }}>
                        //             <TouchableOpacity key={index} style={styles.inner_container_box} onPress={() => navigation.navigate('RestaurantScreen', { id: restaurant.restaurant_id })}>
                        //                 <View style={styles.inner_container_box_1}>
                        //                     {restaurant.restaurant_logo && (

                        //                         <Image source={{ uri: restaurant.restaurant_logo }} style={styles.LogoImg} />
                        //                     )}
                        //                 </View>
                        //                 <View style={styles.inner_container_box_2}>
                        //                     <View style={{flexDirection: 'row'}}>

                        //                         <Text style={styles.inner_container_box_name}>{restaurant.restaurant_name}</Text>
                        //                         <Text style={{ fontSize: 12, fontWeight: '400', backgroundColor: 'green', color: 'white', paddingHorizontal: 5, borderRadius: 7, marginLeft: 5, alignContent: 'center', alignItems: 'center', paddingVertical: 2 }}>{restaurant.restaurant_rating} ✩</Text>
                        //                     </View>
                        //                     <Text style={[styles.inner_container_box_name, { fontSize: 14, fontWeight: '400' }]}>{(restaurant.location.address.restaurant_city)}</Text>
                        //                 </View>
                        //             </TouchableOpacity>
                        //             <SafeAreaView>

                        //                 <RestaurantCardSlider title={"VEG"} data={data} navigation={navigation} restaurant_id={restaurant.restaurant_id}
                        //                     shopId={restaurant.shopId}
                        //                 />
                        //             </SafeAreaView>
                        //         </View>
                        //     );
                        // }
                    }
                    return null;
                })}

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
        flexDirection: 'column',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // justifyContent: 'space-around',
        paddingHorizontal: 10
    },
    inner_container_box: {
        // borderBottomWidth: 1,
        // borderColor: '#f5f5f5',
        // height: 65,
        // height: 300,

        // borderRadius: 14,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // width: '23%', // Adjust the width as needed
        // width: '95%', // Adjust the width as needed
        // marginVertical: 5,
        padding: 5,
        backgroundColor: '#e6efff',
        flexDirection: 'row',
        // justifyContent: 'space-between'
        // elevation: 1,

        // alignItems: 'center',

    },
    LogoImg: {
        // Your image styles go here
        // backgroundColor: 'green',
        width: 30, // Adjust as needed
        height: 30, // Adjust as needed
        borderRadius: 50,
    },
    inner_container_box_1: {
        // Styles for the first inner container box part
        // backgroundColor: 'green',
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: 35,
        // alignContent: 'center'
        padding: 5
    },
    inner_container_box_2: {
        // Styles for the second inner container box part
    },
    inner_container_box_logo: {
        // Styles for the logo text
    },
    inner_container_box_name: {
        // Styles for the restaurant name text
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 5
    },
})
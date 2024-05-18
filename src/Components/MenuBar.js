import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import MenuBarFoodItem from './MenuBarFoodItem';


const MenuBar = ({ navigation, menu_id }) => {
    // console.log('this is the id ', menu_id)
    const [menuData, setMenuData] = useState([]);

    const GetMenuData = async () => {
        const docRef = firebase.firestore().collection('RestaurantMenus').where('restaurant_id', '==', menu_id);
        docRef.onSnapshot(snapshot => {
            setMenuData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }

    useEffect(() => {
        GetMenuData()
    }, [menu_id])

    // console.log('this is the data that we got from fnction', menuData)
    return (
        <View>
            {menuData && menuData.map((data, index) => (
                
                <View key={index} >
                    {/* <Text>MenuName - {data.menu_name}</Text> */}
                    {/* <Text>dekh 2</Text> */}
                    <MenuBarFoodItem navigation={navigation} menu_id={data.menu_id} restaurant_id={data.restaurant_id} menu_name={data.menu_name}/>
                </View>

            )
            )}
        </View>
    )
}

export default MenuBar

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import Cardslider from './Cardslider';
import MenuBarFoodCard from './MenuBarFoodCard';

const MenuBarFoodItem = ({navigation, menu_id,callfn, restaurant_id, menu_name}) => {

    // console.log('This is the menu id ', menu_id)
    // console.log('This is the restaurant id ', restaurant_id)

    const [foodData, setFoodData] = useState([]);


    const GetFoodData = async () => {
        const docRef = firebase.firestore().collection('foodData').where('menu_id', '==', menu_id);
        docRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }

    useEffect(() => {
        GetFoodData();
    },[menu_id])


    // console.log('This is the data for special Menu', foodData)
  return (
    <View>
      {/* <Text>MenuBarFoodItem</Text> */}
    
      {foodData.length === 0 ? null :   <MenuBarFoodCard title={menu_name} data={foodData} navigation={navigation} callfn={callfn} />}
    </View>
  )
}

export default MenuBarFoodItem

const styles = StyleSheet.create({})
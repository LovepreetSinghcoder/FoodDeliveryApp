import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Global/styles';

const Cart = ({ title, data, navigation }) => {
    //   console.log('This is the cart', data);

    // Handle case where data might be null or undefined
    if (!data) {
        return (
            <View>
                <Text>No data available</Text>
            </View>
        );
    }

  


    const [cartTotal, setCartTotal] = useState('0')

    // Updated version of the Get Total Food Price (Cart Version)
    const GetTotalPrice = () => {
        if (data !== null && Object.keys(data).length !== 0) {
            const cart23 = data;
            let totalfoodprice = 0;
            const foodprice = cart23;
            foodprice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice)) +
                    (parseInt(item.totalAddOnPrice));
            });
            // console.log('This i "setItemCost"', totalfoodprice.toString())
            // return totalfoodprice.toString()
            setCartTotal(totalfoodprice.toString())
        }
        else {
            console.log('Else :: This i "setTotalCost"', '0')
            // return '0'
            setCartTotal('0')

        }
    }

    useEffect(() => {
        GetTotalPrice()

    }, [data])


    return (
        <View style={styles.cont}>
            <View style={styles.CartCont}>
                {/* <Text>{title}</Text> */}
                {data.map((item, index) => (
                    <View key={index}>
                        {/* <Text>User ID: {item.userid}</Text> */}
                        {/* <Text>User ID: {item.date}</Text> */}
                        {/* <Text>User ID: {item.orderStatus}</Text> */}

                        {/* <Text>Total Food Price: {item.totalFoodPrice}</Text> */}
                        {/* <Text>Total All Food Price: {GetTotalPrice()}</Text> */}


                        {/* <TouchableOpacity onPress={() => GetTotalPrice()}>
                        <Text>
                        Clikkkk
                        </Text>
                    </TouchableOpacity> */}
                    </View>
                ))}

                <Text style={styles.CartContText1}>₹{cartTotal}</Text>
                <Text style={styles.CartContText2}>View Cart</Text>


            </View>
            

        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row'
    },
    CartCont: {
        // backgroundColor: 'red',
        // backgroundColor: '#ed5624',

        borderRadius: 15,
        // marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
   
    CartContText1: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.col2,
        alignSelf: 'center'
    },
    CartContText2: {
        // color: colors.col2,
        color: '#f0a890',

        fontSize: 15,
        fontWeight: '400'
    }
});

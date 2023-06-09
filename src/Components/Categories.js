import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { colors } from '../Global/styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[styles.box, { backgroundColor: '#ddfbf3' }]}>
                    {/* <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" style={styles.myicon} /> */}
                    {/* <View style={styles.s1}> */}
                    <Image source={require('../Images/cat_1.png')} style={styles.image} />
                    {/* </View> */}
                    <Text style={styles.mytext}>Pizza</Text>
                </View>

                <View style={[styles.box, { backgroundColor: '#f5e5ff' }]}>
                    {/* <MaterialIcons name="dinner-dining" size={24} color="black" style={styles.myicon} /> */}
                    <Image source={require('../Images/cat_2.png')} style={styles.image} />
                    <Text style={styles.mytext}>Burger</Text>
                </View>

                <View style={[styles.box, { backgroundColor: '#e5f1ff' }]}>
                    {/* <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.myicon} /> */}
                    <Image source={require('../Images/cat_3.png')} style={styles.image} />
                    <Text style={styles.mytext}>Drink</Text>
                </View>

                <View style={[styles.box, { backgroundColor: '#ebfde5' }]}>
                    <Image source={require('../Images/cat_3.png')} style={styles.image} />
                    <Text style={styles.mytext}>Noodles</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.col1,
        width: '100%',
        // height: 100,
        // alignItems: 'center',
        // elevation: 10,
        borderRadius: 10,
    },
    head: {
        // color: colors.text1,
        fontSize: 20,
        fontWeight: '600',
        margin: 10,
        // alignSelf: 'center',
        paddingBottom: 5,
        paddingLeft: 5,
        borderBottomColor: colors.text1,
        // borderBottomWidth: 1,
    },
    box: {
        backgroundColor: colors.col1,
        // elevation: 20,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    myicon: {
        marginRight: 10,
        color: colors.text3,
    },
    mytext: {
        color: colors.text3,
        marginLeft: 4
    },
    image: {
        width: 20,
        height: 20,
    }
})
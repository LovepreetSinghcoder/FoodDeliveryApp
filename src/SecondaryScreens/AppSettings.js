import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Global/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AppSettings = ({navigation}) => {
    return (
        <View style={styles.container}>


            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: colors.col2,
                // backgroundColor: 'red', 
                padding: 15,
                alignItems: 'center'
            }} onPress={() => { navigation.navigate('AccountSettingsScreen') }} >
                <FontAwesome6 name="arrow-left" size={23} color="black" />
                <Text style={{ fontSize: 24, fontWeight: '500', paddingHorizontal: 10 }}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                // marginHorizontal: 15, 
                paddingHorizontal: 10,
                marginBottom: 15,
                // borderRadius: 15, 
                alignItems: 'center',
            }} onPress={() => alert('Request Sent.')}>

                <View style={{ flexDirection: 'row', paddingVertical: 15, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1.5, borderColor: '#ebebeb' }} >
                    <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '500' }}>Delete Account</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AppSettings

const styles = StyleSheet.create({})
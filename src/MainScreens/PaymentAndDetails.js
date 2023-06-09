import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../Global/styles';

const PaymentAndDetails = ({ navigation, route }) => {
    const { cartdata } = route.params;
    // useEffect(() => {
        // setOrderdata(JSON.parse(cartdata));
    // }, [cartdata])

    return (
        <>
            <View style={{ backgroundColor: colors.text1, paddingVertical: 15, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 16 }}>Close</Text>
            </View>
            <View style={styles.container}>

                <View>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Payment Options</Text>

                    <TouchableOpacity style={styles.editButton}
                        onPress={() => { alert('Selected') }}
                    >
                        <Text style={styles.editButtonText}>Cash on Delivery</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 4 }}>Delivery Location</Text>

                    <TouchableOpacity style={[styles.editButton, { marginBottom: 10 }]}
                        onPress={() => { alert('Selected') }}

                    >
                        <Text style={styles.editButtonText}>Current Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}
                    // onPress={handleSaveProfile}
                    >
                        <Text style={styles.editButtonText}>Change Delivery Location</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>
                    <TouchableOpacity style={styles.editButton}
                    // onPress={handleSaveProfile}
                    onPress={() => navigation.navigate('Placeorder', { cartdata })}
                    >
                        <Text style={styles.editButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default PaymentAndDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    editButton: {
        backgroundColor: colors.text1
        ,
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        color: '#474747',

        fontSize: 16,
        fontWeight: 'bold',
    },
})
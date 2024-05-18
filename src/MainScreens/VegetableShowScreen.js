import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Linking } from 'react-native'
import React from 'react'
import { btn2, colors, } from '../Global/styles'


const VegetableShowScreen = ({ navigation }) => {
    return (
        <View style={styles.containerout}>


            <View style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} >

                    <Text style={{ fontSize: 16, color: 'black' }}>Close</Text>

                </TouchableOpacity>
            </View>

            <ScrollView style={{marginBottom: 50,}}>


                <View style={{ paddingVertical: 10 }}>
                    <TouchableOpacity style={{ width: '95%', alignSelf: 'center', height: 550, borderRadius: 20, elevation: 2, backgroundColor: 'white', borderColor: 'green', borderWidth: .5 }} >
                        <View style={{ backgroundColor: 'green', borderTopRightRadius: 18.5, borderTopLeftRadius: 18.5, paddingVertical: 10, paddingHorizontal: 15 }}>
                            <Text style={{ fontWeight: '500', color: 'white' }}>Vegetables</Text>
                        </View>
                        <View style={{ flexDirection: 'colomn', width: '100%', paddingHorizontal: 10 }}>
                            <View style={{ height: 240, width: '100%', borderWidth: 1, borderColor: 'grey', borderRadius: 12, marginVertical: 5 }}>
                                <Image source={require('../Images/gobhi.jpg')} style={{ width: '100%', height: '75%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                <View style={{ paddingLeft: 5, paddingTop: 2 }}>
                                    <Text style={{ fontWeight: '500' }}>Gobhi</Text>

                                    <View style={styles.s2in}>
                                        <Text style={styles.txt2}>
                                            Price •{' '}
                                            <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red' }}>₹60/-</Text> • ₹50/-
                                        </Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ height: 240, width: '100%', borderWidth: 1, borderColor: 'grey', borderRadius: 12, marginVertical: 5 }}>

                                <Image source={require('../Images/aalu.jpg')} style={{ width: '100%', height: '75%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                <View style={{ paddingLeft: 5, paddingVertical: 5 }}>
                                    <Text style={{ fontWeight: '500' }}>Aalu</Text>

                                    <View style={styles.s2in}>

                                        <Text style={styles.txt2}>
                                            Price •{' '}
                                            <Text style={{ textDecorationLine: 'line-through', textDecorationColor: 'red' }}>₹20/-</Text> • ₹10/-
                                        </Text>
                                    </View>

                                </View>
                            </View>


                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ paddingVertical: 15, paddingHorizontal: 10, alignItems: 'center' }}>
                    <Text style={{fontSize: 25, fontWeight: '700', color: 'green', backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: 'green', paddingHorizontal: 30, paddingVertical: 5}}>Trial</Text>
                    <Text style={{paddingVertical: 10, justifyContent: 'center'}}>Vegetables are fresh arrivals on our app! We'd love to hear your thoughts and feedback about these new products.</Text>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/shoviiofficial/') }} style={{ backgroundColor: colors.text1, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, elevation: 2 }}>
                  <Text style={{ fontWeight: '600', fontSize: 12, color: colors.col1 }}>Instagram</Text>

                </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

export default VegetableShowScreen

const styles = StyleSheet.create({})
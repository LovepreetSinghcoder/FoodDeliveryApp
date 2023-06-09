import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
// import { colors } from '../Global/style'
import { colors } from '../Global/styles'



const OfferSlider = ({navigation}) => {
    return (
        <View>
            <View style={styles.offerSlider}>
                <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true} removeClippedSubviews={false}
                    dotColor={colors.text2} activeDotColor={colors.text1}
                    nextButton={<Text style={styles.buttonText}>›</Text>}
                    prevButton={<Text style={styles.buttonText}>‹</Text>}
                >

                    <TouchableOpacity style={styles.slide} onPress={() => {navigation.navigate('Promotion')}}>
                        <Image source={require('../../assets/OfferSliderImages/img1.jpg')} style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.slide} onPress={() => {navigation.navigate('Promotion')}}>
                        <Image source={require('../../assets/OfferSliderImages/img2.jpg')} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.slide} onPress={() => {navigation.navigate('Promotion')}}>
                        <Image source={require('../../assets/OfferSliderImages/img3.jpg')} style={styles.image} />
                    </TouchableOpacity>
                </Swiper>
            </View>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerSlider: {
        width: '100%',
        height: 150,
        backgroundColor: colors.col1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 150,
        backgroundColor: colors.col1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    buttonText: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 20,
        height: 20,
        textAlign: 'center',
        lineHeight: 20,
    }
})
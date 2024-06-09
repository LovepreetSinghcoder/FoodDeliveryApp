import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
// import { colors } from '../Global/style'
import { colors } from '../Global/styles'
import { firebase } from '../Firebase/FirebaseConfig'
// import sampleimg from '../Images/sampleImg1.jpeg'



const RestaurantCouponsSlider = ({ navigation }) => {

    const [data, setData] = useState('');


    const GetOfferSlider = async () => {
        const docRef = firebase.firestore().collection('offerSlider');


        //NEWER
        docRef.onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => doc.data()))
        }
        )
    };


    useEffect(() => {
        GetOfferSlider();
    }, []);


    const handleSlidePress = () => {
        // navigation.navigate('Promotion');
    };


    return (

        <View style={styles.offerSlider}>
            <Swiper
                autoplay={true}
                autoplayTimeout={5}
                showsButtons={true}
                removeClippedSubviews={false}
                dotColor={colors.text2}
                activeDotColor={colors.text1}
                nextButton={<Text ></Text>}
                prevButton={<Text></Text>}
            >
                <TouchableOpacity
                    style={styles.slide}
                    onPress={handleSlidePress}
                >
                    <Image
                        // source={{ uri: data && data[0] && data[0].img1 }}
                        source={{ uri: data && data[0] && data[0].img1 ? data[0].img1 : 'https://firebasestorage.googleapis.com/v0/b/shovii-official.appspot.com/o/OfferSlider%2Fnew%20menu%20added.jpeg?alt=media&token=eefef563-6923-4968-aac2-c4cd11066a47' }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.slide}
                    onPress={handleSlidePress}
                >
                    <Image
                        // source={{ uri: data && data[0] && data[0].img2 }}
                        source={{ uri: data && data[0] && data[0].img2 ? data[0].img2 : 'https://firebasestorage.googleapis.com/v0/b/shovii-official.appspot.com/o/OfferSlider%2Fnew%20menu%20added.jpeg?alt=media&token=eefef563-6923-4968-aac2-c4cd11066a47' }}

                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.slide}
                    onPress={handleSlidePress}
                >
                    <Image

                        // source={{ uri: data && data[0] && data[0].img3 }}
                        source={{ uri: data && data[0] && data[0].img3 ? data[0].img3 : 'https://firebasestorage.googleapis.com/v0/b/shovii-official.appspot.com/o/OfferSlider%2Fnew%20menu%20added.jpeg?alt=media&token=eefef563-6923-4968-aac2-c4cd11066a47' }}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </Swiper>
        </View>


    )
}

export default RestaurantCouponsSlider

const styles = StyleSheet.create({
    offerSlider: {
        width: '100%',
        // width: 400,
        height: 100,
        backgroundColor: colors.col1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 100,
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
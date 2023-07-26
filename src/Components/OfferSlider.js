import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'
// import { colors } from '../Global/style'
import { colors } from '../Global/styles'
import { firebase } from '../Firebase/FirebaseConfig'



const OfferSlider = ({ navigation }) => {

    const [data, setData] = useState('');


    const GetOfferSlider = async () => {
        const docRef = firebase.firestore().collection('offerSlider');
        // const docs = await docRef.get();

        //OLD ONE
        // if (!docs.empty) {
        //   const imageData = docs.map((doc) => doc.data());
        //   setData(imageData);
        // } else {
        //   console.log('No data');
        // }

        //NEXT OLD ONE
        // docRef.onSnapshot((snapshot) => {
        //     if (!snapshot.empty) {
        //         const imageData = snapshot.docs.map((doc) => doc.data());
        //         // const imageData = snapshot.docs.data();

        //         // setData(imageData.flat());
        //         setData(imageData.flatMap(Object.values));

        //     } else {
        //         console.log('No data');
        //     }
        // });

        //NEWER
        docRef.onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => doc.data()))
        }
        )
    };

    // const foodRef = firebase.firestore().collection('UserData');

    //   useEffect(() => {
    //     foodRef.onSnapshot(snapshot => {
    //       setUserData(snapshot.docs.map(doc => doc.data()))
    //     }
    //     )
    //   }, [])
    // console.log('dekh veer', data[0].img1)

    useEffect(() => {

        GetOfferSlider();
    }, []);


    const handleSlidePress = () => {
        navigation.navigate('Promotion');
    };
    // console.log('dekh veeerr', data)
    return (

        <View style={styles.offerSlider}>
            <Swiper
                autoplay={true}
                autoplayTimeout={4}
                showsButtons={true}
                removeClippedSubviews={false}
                dotColor={colors.text2}
                activeDotColor={colors.text1}
                nextButton={<Text style={styles.buttonText}>›</Text>}
                prevButton={<Text style={styles.buttonText}>‹</Text>}
            >
                {/* {data && data.map((image, index) => ( */}
                    <TouchableOpacity
                        style={styles.slide}
                        // onPress={() => {
                        //     navigation.navigate('Promotion');
                        // }}
                        onPress={handleSlidePress}
                        // key={index}
                    >
                        <Image
                            source={{ uri: data && data[0] && data[0].img1 }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.slide}
                        // onPress={() => {
                        //     navigation.navigate('Promotion');
                        // }}
                        onPress={handleSlidePress}
                        // key={index}
                    >
                        <Image
                            source={{ uri: data && data[0] && data[0].img2 }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.slide}
                        // onPress={() => {
                        //     navigation.navigate('Promotion');
                        // }}
                        onPress={handleSlidePress}
                        // key={index}
                    >
                        <Image
                            source={{ uri: data && data[0] && data[0].img3 }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                {/* ))} */}
            </Swiper>
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
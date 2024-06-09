import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import MapBoxGL from '@rnmapbox/maps'


// MapboxGL.setAccessToken('sk.eyJ1IjoibG92ZTc5MjU3cCIsImEiOiJjbHg1NjVheGQwZ3U3Mm1zYTg2cHFvcHk3In0.GRapMqMOdR5i4aTQDPtDAA');

const OpenMap = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={8}
                        centerCoordinate={[-73.99155, 40.73581]}
                    />
                </MapboxGL.MapView>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default OpenMap;

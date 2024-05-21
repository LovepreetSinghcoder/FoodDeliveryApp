import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const MapLib = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    
      const [address, setAddress] = useState('');
    
      useEffect(() => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
    
            // Get address from latitude and longitude
            Geocoder.from(latitude, longitude)
              .then(json => {
                const addressComponent = json.results[0].formatted_address;
                setAddress(addressComponent);
              })
              .catch(error => console.warn(error));
          },
          (error) => console.warn(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }, []);
    
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onRegionChangeComplete={region => setRegion(region)}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Current Address: {address}</Text>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      addressContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
      },
      addressText: {
        fontSize: 16,
      },
    });
export default MapLib
import React, { useEffect, useState } from 'react';
import { firebase } from '../Firebase/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [loading, setLoading] = useState(false);



 

  // const UserLoggedHandler = (userid) => {
  //     setUserloggeduid(userid);
  //     AsyncStorage.setItem('userloggeduid', userloggeduid);
  // }

  const UserLoggedHandler = (userid) => {
    setUserloggeduid(userid);
    AsyncStorage.setItem('userloggeduid', userid);
    // console.log('saved uid')
  }

  // console.log('dekh veere', userloggeduid)


  // const checkIsLogged = async () => {
  //     async () => {
  //         try {
  //             const value = await AsyncStorage.getItem('userloggeduid');
  //             if (value !== null) {
  //                 console.log('User logged UID retrieved from AsyncStorage:', value);
  //                 setUserloggeduid(value);
  //             } else {
  //                 console.log('User logged UID not found in AsyncStorage');
  //             }
  //         } catch (error) {
  //             console.log('Error retrieving userloggeduid:', error);
  //         }
  //     };
  // }F

  const checkIsLogged = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('userloggeduid');
      if (value !== null) {
        // console.log('User logged UID retrieved from AsyncStorage:', value);
        setUserloggeduid(value);
      } else {
        console.log('User logged UID not found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error retrieving userloggeduid:', error);
    }
    setLoading(false);
  };


  // const checkLocation = async () => {
  //   setLoading(true);

  //   try {
  //     const value = await AsyncStorage.getItem('locationName');
  //     if (value !== null) {
  //       // console.log('User logged UID retrieved from AsyncStorage:', value);
  //       setLocationName(value);
  //     } else {
  //       console.log('locationName not found in AsyncStorage');
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving locationName:', error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //     checkIsLogged();
  // }, [])

  const removeUserLoggedUidFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userloggeduid');
      // console.log('User logged UID removed from AsyncStorage');
    } catch (error) {
      console.log('Error removing userloggeduid:', error);
    }
  };

  const logout = () => {
    // setUserUID(null);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Logout successful, perform any necessary actions
        // e.g., clear user session, update UI/navigation, etc.
        setUserloggeduid(null);

        // Remove user-specific data from AsyncStorage
        removeUserLoggedUidFromStorage();
        // console.log(userloggeduid)
      })
      .catch((error) => {
        // Handle any errors that occur during the logout process
        console.log('Logout error:', error);
      });
  };

  const [locationName, setLocationName] = useState(null);
  const SetLocationName = (newLocationName) => {
    // setLocationName(newLocationaName);
    setLocationName(newLocationName.toLowerCase());
    AsyncStorage.setItem('locationName', newLocationName.toLowerCase());

  }

  //getting coords from location 
  // const getCoordinatesFromLocationName = async (locationName) => {

  // // const getCoordinatesFromLocationName = async () => {
  //   try {
  //     const encodedLocationName = encodeURIComponent(locationName);
  //     // const encodedLocationName = encodeURIComponent('sekhu');

  //     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocationName}`);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch coordinates');
  //     }

  //     const data = await response.json();

  //     if (data.length > 0) {
  //       const { lat, lon } = data[0];
  //       console.log('dekh veere location coords ', parseFloat(lat), parseFloat(lon))
  //       return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  //     } else {
  //       throw new Error('Location not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching coordinates:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getCoordinatesFromLocationName(locationName)
  // }, [locationName])

  // Usage example
  // getLocationName(latitude, longitude)
  //   .then((locationName) => {
  //     if (locationName) {
  //       console.log('Location Name:', locationName);

  //       // Now, you can get coordinates from the location name
  //       getCoordinatesFromLocationName(locationName)
  //         .then((coordinates) => {
  //           if (coordinates) {
  //             console.log('Coordinates:', coordinates);
  //             // You can do something with the coordinates here
  //           } else {
  //             console.log('Coordinates not found.');
  //           }
  //         });
  //     } else {
  //       console.log('Location name not found.');
  //     }
  //   });

  const location1 = { latitude: 29.953863, longitude: 74.836231 }; // Random Address
  const location2 = { latitude: 29.947497, longitude: 74.867019 }; // Dabwali Address


  //calucalating distance from cords
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    console.log('this is the total distance', distance)
    return distance;
  }

  // useEffect(() => {
  //   calculateDistance(location1.latitude, location1.longitude, location2.latitude, location2.longitude);
  // },[])

  return <AuthContext.Provider value={{ UserLoggedHandler, userloggeduid, logout, checkIsLogged, loading, SetLocationName, locationName, calculateDistance }}>
    {children}
    {/* {!loading && children} */}
  </AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

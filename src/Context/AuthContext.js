import React, { useEffect, useState } from 'react';
import { firebase } from '../Firebase/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [locationName, setLocationName] = useState(null);


  // Function to Save  user Data to the userData State 
  const userDataHandler = (data) => {
    setUserdata(data)
  }


  // Function to handle "is user is logged?" 
  const UserLoggedHandler = (userid) => {
    setUserloggeduid(userid);
    AsyncStorage.setItem('userloggeduid', userid);
  }


  const checkIsLogged = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('userloggeduid');
      if (value !== null) {
        setUserloggeduid(value);
      } else {
        console.log('User logged UID not found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error retrieving userloggeduid:', error);
    }
    setLoading(false);
  };



  // Function to remove the user account and Uid  (to remove asynstorage)
  const removeUserLoggedUidFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userloggeduid');
    } catch (error) {
      console.log('Error removing userloggeduid:', error);
    }
  };

  // Function to logout the user account 
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserloggeduid(null);
        removeUserLoggedUidFromStorage();
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };


  // Function to set location of the user 
  const SetLocationName = (newLocationName) => {
    setLocationName(newLocationName.toLowerCase());
    AsyncStorage.setItem('locationName', newLocationName.toLowerCase());

  }





  const location1 = { latitude: 29.953863, longitude: 74.836231 }; // Random Address
  const location2 = { latitude: 29.947497, longitude: 74.867019 }; // Dabwali Address



  // Function to calculate the distance of the user location to the user destination location 
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


  return <AuthContext.Provider value={{
    UserLoggedHandler,
    userloggeduid,
    logout,
    checkIsLogged,
    loading,
    SetLocationName,
    locationName,
    calculateDistance,
    userDataHandler,
    userdata
  }}>
    {children}
  </AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

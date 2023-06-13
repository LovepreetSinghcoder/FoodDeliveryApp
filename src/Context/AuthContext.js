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
        console.log('saved uid')
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
    // }

    const checkIsLogged = async () => {
        setLoading(true);

        try {
          const value = await AsyncStorage.getItem('userloggeduid');
          if (value !== null) {
            console.log('User logged UID retrieved from AsyncStorage:', value);
            setUserloggeduid(value);
          } else {
            console.log('User logged UID not found in AsyncStorage');
          }
        } catch (error) {
          console.log('Error retrieving userloggeduid:', error);
        }
        setLoading(false);
      };

    // useEffect(() => {
    //     checkIsLogged();
    // }, [])

    const removeUserLoggedUidFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('userloggeduid');
            console.log('User logged UID removed from AsyncStorage');
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
                console.log(userloggeduid)
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

    }
   

    return <AuthContext.Provider value={{ UserLoggedHandler, userloggeduid ,logout, checkIsLogged,loading, SetLocationName, locationName}}>
        {children}
        {/* {!loading && children} */}
        </AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

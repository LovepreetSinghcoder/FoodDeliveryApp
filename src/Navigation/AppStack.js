import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import UserProfile from '../MainScreens/UserProfile';
import LoginScreen from '../Screens/LoginScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AccountSettingsScreen from '../MainScreens/AccountAndSettings';
import PromotionOffersScreen from '../MainScreens/PromotionOffersScreen';
import EditProfileScreen from '../MainScreens/EditProfileScreen';
import NotificationScreen from '../MainScreens/NotificationScreen';
import HomeScreen from '../MainScreens/HomeScreen';
import Productpage from '../MainScreens/Productpage';
import UserCart from '../MainScreens/UserCart';
import Placeorder from '../MainScreens/Placeorder';
import PaymentAndDetails from '../MainScreens/PaymentAndDetails';
import TrackOrderScreen from '../MainScreens/TrackOrderScreen';
import { colors } from '../Global/styles';
import ChangeLocationScreen from '../MainScreens/ChangeLocationScreen';
import SearchItemScreen from '../MainScreens/SearchItemScreen';
import CategoriesDataScreen from '../MainScreens/CategoriesDataScreen';
import VegetableShowScreen from '../MainScreens/VegetableShowScreen';
import LineWithText from '../Components/LineWithText';
import Restaurants from '../Components/Restaurants';
import RestaurantScreen from '../MainScreens/RestaurantScreen';
// import MapLib from '../Components/mapLib';

// import MapLib from '../Components/MapLib';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//             <Stack.Navigator>
//                 {/* <Stack.Screen name="Home" component={Home} /> */}
//                 {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
//                 {/* <Stack.Screen name="Profile" component={Profile} /> */}
//                 {/* <Stack.Screen name="Settings" component={Settings} /> */}
//             </Stack.Navigator>
//         </NavigationContainer>

//     )
// }


const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="productpage" component={Productpage} options={{ headerShown: false }} />
        <Stack.Screen name="Changeloction" component={ChangeLocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentNdetail" component={PaymentAndDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Usercart" component={UserCart} options={{ headerShown: false }} />
        <Stack.Screen name="Promotion" component={PromotionOffersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Editprofile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Placeorder" component={Placeorder} options={{ headerShown: false }} />
        <Stack.Screen name="Searchpage" component={SearchItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categoriesdata" component={CategoriesDataScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VegetableShow" component={VegetableShowScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LineWithText" component={LineWithText} options={{ headerShown: false }} />
        <Stack.Screen name="Restaurants" component={Restaurants} options={{ headerShown: false }} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ headerShown: false }} />
       
        














        {/* Add more screens to the home stack if needed */}
    </Stack.Navigator>
);

const AppStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: styles.tabBar,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Settings') {
                            iconName = 'settings';
                        } else if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Profile') {
                            iconName = 'person';
                        } else if (route.name === 'Notification') {
                            iconName = 'notifications';
                        } else if (route.name === 'Cart') {
                            iconName = 'md-cart';
                        } else if (route.name === 'TrackOrders') {
                            iconName = 'map';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarActiveTintColor: colors.text1,
                })}
            // tabBarOptions={{ style: styles.tabBar }}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                {/* <Tab.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> */}
                {/* <Tab.Screen name="Notification" component={NotificationScreen} options={{headerShown: false}}/> */}
                <Tab.Screen name="Cart" component={UserCart} options={{ headerShown: false }} />

                <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
                <Tab.Screen name="TrackOrders" component={TrackOrderScreen} options={{ headerShown: false }} />

                <Tab.Screen name="Settings" component={AccountSettingsScreen} options={{ headerShown: false }} />


                {/* Add more screens to the tab navigator if needed */}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

// export default App;

export default AppStack

const styles = StyleSheet.create({
    tabBar: {
        height: 60, // Adjust the height value as needed
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
    },
    tabBarLabel: {
        paddingBottom: 4, // Add the desired padding value
    },
})
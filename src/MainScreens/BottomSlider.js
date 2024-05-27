// import React, { useState, useRef } from 'react';
// import { View, StyleSheet, Button, Dimensions } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native';
// import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';

// const { height } = Dimensions.get('window');

// const BottomSlider = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const translateY = useSharedValue(height);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//     };
//   });

//   const toggleSlider = () => {
//     if (isOpen) {
//       translateY.value = withSpring(height);
//     } else {
//       translateY.value = withSpring(0);
//     }
//     setIsOpen(!isOpen);
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Button title="Toggle Slider" onPress={toggleSlider} />
//       <Animated.View style={[styles.slider, animatedStyle]}>
//         {/* Add your slider content here */}
//       </Animated.View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   slider: {
//     height: height / 2,
//     width: '100%',
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     position: 'absolute',
//     bottom: 0,
//   },
// });

// export default BottomSlider;

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BottomSlider from '../MainScreens/BottomSlider';
// import BottomSlider from './BottomSlider'; 

const SliderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomSlider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SliderScreen;

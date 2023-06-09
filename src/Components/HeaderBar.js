import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HeaderBar = ({ title, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* {onButtonPress && (
        <TouchableOpacity onPress={onButtonPress} style={styles.button}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#2EEAB1",
  },
});

export default HeaderBar;

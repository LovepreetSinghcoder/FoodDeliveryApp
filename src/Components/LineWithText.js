import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LineWithText = ({ navigation, heading }) => {


    return (
        <View>
            <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.text}>{heading}</Text>
                <View style={styles.line} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    line: {
        flex: 1,
        height: 1.5,
        backgroundColor: '#C4C4C4',
    },
    text: {
        marginHorizontal: 10, // Adjust spacing as needed
        marginHorizontal: 10, // Adjust spacing as needed
        fontSize: 13,
        color: '#9A9A9A',
        fontWeight: '500'
    },
});

export default LineWithText;

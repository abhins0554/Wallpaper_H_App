import { Left, Right } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Share } from 'react-native';
function Header(props) {
    return (
        <View style={styles.mainhead}>
            <Left />
            <Text style={styles.heading}>Home</Text>
            <Right />
        </View>
    );
}
const styles = StyleSheet.create({
    mainhead: {
        width: Dimensions.get('window').width,
        height: 45,
        backgroundColor: "#DC143C",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white"
    },
    heading: {
        alignSelf: "center",
        fontSize: 25,
        color: "white",
        flexDirection: "column",
        textAlign: "center",
    },
})
export default Header;
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';

import Header from "../Components/Header"

import firestore from "@react-native-firebase/firestore";
import { Container, Left } from 'native-base';


function HomeScreen({ navigation }) {

    const [list, setlist] = useState([]);
    const [cateories, setcateories] = useState("All");
    const [cateorieList, setcateorieList] = useState([]);
    const [imageLoading, setimageLoading] = useState(false);

    const get_data = async () => {
        let response = await firestore()
            .collection('Wallpaper')
            .where("Categories", "==", cateories)
            .get();
            setlist(response._docs);
    }

    React.useEffect(() => {
        get_data();
    }, [cateories]);

    const get_categories_list = async () => {
        setcateorieList([]);
        let response = await firestore()
            .collection("Categories")
            .get();
        setcateorieList(response._docs);
    }

    React.useEffect(() => {
        get_categories_list();
    }, []);

    let dimensions = Dimensions.get("window").width / 1.2;
    let imageWidth = Math.round((dimensions * 9) / 16);
    let imageHeight = dimensions;
    let imageCenter = imageHeight / 2 - 10;

    return (
        <View style={styles.mainframe}>
            <Header />
            <View>
                <FlatList
                    data={cateorieList}
                    keyExtractor={item => item._data.Categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ margin: 10, backgroundColor: cateories === item._data.Categories ? "#DC143C" : "white", borderRadius: 15, padding: 2, borderWidth: cateories === item._data.Categories ? 0 : 0.8, borderColor: "#DC143C", alignSelf: "center", }} onPress={() => setcateories(item._data.Categories)}>
                            <Text style={{ alignSelf: "center", color: cateories === item._data.Categories ? "white" : "black", margin: 2.5, padding: 2, fontSize: 16 }}>{" " + item._data.Categories + " "}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal={true}
                    style={{}}
                />
            </View>
            <FlatList
                data={list}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={{ margin: 5, alignSelf: "center" }} onPress={() => navigation.navigate("SetWallpaper", { item: item._data })}>
                            <View style={{ backgroundColor: "white", zIndex: 10, position: "absolute", margin: 5, padding: 2.5, overflow: "hidden", borderRadius: 8, }}>
                                <Text style={{ color: "red", }} numberOfLines={1}>{item._data.Artist}</Text>
                            </View>
                            <Image source={{ uri: item._data.ImageLink }} style={[styles.imagestyle, { height: imageHeight, width: imageWidth }]} onLoadStart={() => setimageLoading(true)} onLoadEnd={() => setimageLoading(false)} />
                            {
                                imageLoading === true ?
                                    <ActivityIndicator size="small" color="#DC143C" style={{ position: "absolute", justifyContent: "center", zIndex: 999, alignSelf: "center", top: imageCenter }} />
                                    :
                                    null
                            }
                        </TouchableOpacity>
                    </>
                )}
                ListEmptyComponent={() => {
                    return <ActivityIndicator size="small" color="#DC143C" style={{ justifyContent: "center", zIndex: 999, alignSelf: "center", }} />;
                }}
                numColumns={2}
                style={styles.FlatListstyling}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    mainframe: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "lightgrey",
    },
    imagestyle: {
        borderRadius: 10,
    },
    FlatListstyling: {
        alignSelf: "center",
        flex: 1,
    },
})
export default HomeScreen;
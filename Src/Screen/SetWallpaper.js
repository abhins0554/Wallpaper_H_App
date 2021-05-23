import React,{useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ToastAndroid, Image, Dimensions, ActivityIndicator, Modal, Pressable, Linking, Share} from "react-native";

import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

function SetWallpaper({route}) {
    let item = route.params.item;
    const [imageLoading,setimageLoading]=useState(false);
    let dimensions = Dimensions.get("window").width;
    let imageWidth = Math.round((dimensions * 9) / 16);
    let imageHeight = dimensions;
    let imageCenter = imageHeight/2-10;
    const [modalVisible, setModalVisible] = useState(false);

    const _callback = res => {
        console.log('Response: ', res);
        ToastAndroid.show("Wallpaper set successfully !", ToastAndroid.LONG);
    };
    
    const _setWallpaperhome = async (value) => {
        ManageWallpaper.setWallpaper(
            {
                uri: item.ImageLink,
            },
            _callback,
            TYPE.HOME,
        );
    }
    const _setWallpaperlock = async (value) => {
        ManageWallpaper.setWallpaper(
            {
                uri: item.ImageLink,
            },
            _callback,
            TYPE.HOME,
        );
    }
    const _setWallpaperboth = async (value) => {
        ManageWallpaper.setWallpaper(
            {
                uri: item.ImageLink,
            },
            _callback,
            TYPE.HOME,
        );
    }
    const download_wallpaper = async () =>{
      Linking.openURL(item.ImageLink).then((resp)=>console.log(resp)).catch((err)=>console.log(err));
    }
     
    return (
        <View
        style={{
          flex: 1,
        }}
      >
        <View style={{backgroundColor:"white",zIndex:10,position:"absolute",margin:5,padding:2.5,overflow:"hidden",borderRadius:8,marginTop:10}}>
          <Text style={{color:"red",}} numberOfLines={1}>{item.Artist}</Text>
        </View>                          
          <Image source={{uri:item.ImageLink}} style={[styles.imagestyle,{flex:1}]} onLoadStart={()=>setimageLoading(true)} onLoadEnd={()=>setimageLoading(false)}/>
            {
              imageLoading===true?
                <ActivityIndicator size="small" color="#DC143C" style={{position:"absolute",justifyContent:"center",zIndex:999,alignSelf:"center",top:imageCenter}}/>
                  :
                null
            }
          <TouchableOpacity style={{position:"absolute",left:"90%",marginTop:10,backgroundColor:"white",borderRadius:350,padding:2.5,margin:2.5}} onPress={()=>download_wallpaper()}>
            <Image source={require("../Assets/downloadicon.png")} style={{height:25,width:25,borderRadius:360}}/>
          </TouchableOpacity>
        <TouchableOpacity style={{position:"absolute",alignSelf:"center",marginTop:Dimensions.get('window').height-100,width:"80%",backgroundColor:"#DC143C",borderRadius:50}} onPress={()=>setModalVisible(true)}>
          <Text style={{color:"white",alignSelf:"center",margin:5}}>Set Wallpaper</Text>
        </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Select Options</Text>
                  <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible); _setWallpaperhome();}}>
                    <Text style={styles.textStyle}>Home Screen</Text>
                  </Pressable>
                  <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible); _setWallpaperlock();}}>
                    <Text style={styles.textStyle}>Lock Screen</Text>
                  </Pressable>
                  <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible); _setWallpaperboth();}}>
                    <Text style={styles.textStyle}>Both Home & Lock</Text>
                  </Pressable>
              </View>
            </View>
          </Modal>
      </View>
    );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
    modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:18,
    fontWeight:"bold"
  },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:10
  },
  buttonOpen: {
    backgroundColor: "#DC143C",
  },
  buttonClose: {
    backgroundColor: "#DC143C",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})
export default SetWallpaper;
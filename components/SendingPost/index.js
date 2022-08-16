import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import  AntDesign  from "react-native-vector-icons/AntDesign";
import { COLORS } from '../../utils/Colors';

const SendingPost = () => {
    return (
        
            <View style={styles.statusContainer}>
                <View style={styles.statusAvatar}>
                    <Image
                        source={{
                            uri: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg",
                        }}
                        style={{ width: 40, height: 40,borderRadius:5, resizeMode: "cover" }}
                    />
                </View>
                <View style={styles.flexGrow}>
                    <Text style={styles.status}>My Status</Text>
                    <Text style={styles.addStatus}>Envoi...</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity>
                        <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('like')}>
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        
    )
}

export default SendingPost

const styles = StyleSheet.create({
    statusContainer: {
        backgroundColor: '#FFFFFF',
        height: 76,
        paddingHorizontal:10,
        alignItems: 'center',
        width:'100%',
        borderBottomColor:COLORS.black,
        
        flexDirection: 'row',
      },
      status: { fontSize: 16, fontWeight: 'bold' },
      addStatus: { color: '#8E8E93' },
      buttons: {
        width: 88,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 8,
      },
      statusAvatar: { marginLeft: 2, marginRight: 9 },
      flexGrow: { flexGrow: 1 },
})

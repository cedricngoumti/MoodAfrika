import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import { COLORS } from '../../utils/Colors'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import  Entypo  from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import CertifiedIcon from '../CertifiedIcon';
import { convertDateToFrench } from '../../utils/API';
import { connect } from "react-redux";
import { AuthContext } from '../../navigation/AuthProvider';


const RoomItem = ({item,index}) => {
  const [dateg, setDateg] = useState(null)
  const {setPodCast,playSound} = useContext(AuthContext);
  const navigation = useNavigation();
  
  useEffect(() => {
    setDateg(convertDateToFrench(item.item.registration));
  }, [])
  

  return (
    <View  style={{backgroundColor:'rgba(52, 52, 52, 0.4)',width:windowWidth*0.9,height:windowHeight*0.3,borderRadius:15,marginTop:windowHeight*0.04}}>
        <Text style={{color:COLORS.white,fontSize:14, padding:10,paddingLeft:20}} numberOfLines={2}>{item.item.title}</Text>
        <Text style={{color:COLORS.gray,fontSize:12,fontWeight:'300', padding:5,paddingLeft:10}} numberOfLines={1}>{item.item.description}</Text>
        <View style={[styles.userName, styles.spacing,styles.transparentBackgroundCircle]}>
                        <View
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: "#fff",
                            overflow: "hidden",
                            marginRight: 10,
                        }}
                        >
                        <Image
                            source={{
                            uri: item.item.picture,
                            }}
                            style={{ width: 24, height: 24, resizeMode: "cover" }}
                        />
                        </View>
                        <View >
                            <Text style={[styles.userNameText]}>{item.item.username}{' '}{(item.item.certified==1) ? <CertifiedIcon />:null}</Text>
                            <Text style={[styles.postDate]}>{dateg}</Text>
                        </View>                       
        </View>
        <View style={{width:windowWidth,position:'absolute', bottom:10, flexDirection:'row',alignItems:'flex-end',justifyContent:'space-around',padding:10}}>
            <Text style={styles.postDetails}><Entypo name="time-slot" size={10} color={COLORS.gray} />{" "}30 min</Text>
            <Text style={styles.postDetails}><Entypo name="users" size={10} color={COLORS.gray} />{" "}10 online</Text>
            <TouchableOpacity
                style={[styles.buttonContainer, {backgroundColor: "#f5e7ea"}]}
                onPress={() => {
                  setPodCast(item)
                  playSound(item.item.audio)
                  //navigation.navigate("RoomDetail",{
                    //index:item.index,
                    //item:item.item.id,
                    //isLoad:true,
                //})
                }}
                >
                
                <View style={styles.btnTxtWrapper}>
                    <Text style={[styles.buttonText, {color: COLORS.primary}]}>Lire</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}


const mapStateToProps = state => ({
  
  uploading: state.AppReducer.uploading,
  confirmMessage: state.AppReducer.confirmMessage,
});

export default connect(mapStateToProps)(RoomItem);

const styles = StyleSheet.create({
    postDate: {
        color: COLORS.gray,
        fontSize:10,
        textAlign:'left',
        alignSelf:'flex-start'
      },
      postDetails: {
        color: COLORS.gray,
        fontSize:10,
        textAlign:'left',
        alignSelf:'center'
      },
      buttonContainer: {
        marginTop: 10,
        width: windowWidth * 0.3,
        height: windowHeight * 0.05,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 3,
        marginRight:20,
      },
      
      
      
      buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        
      },
      userDetails: {
        flex: 1,
        alignItems: "flex-start",
      },
      userName: {
        flexDirection: "row",
        
      },
      spacing: {
        paddingBottom: 10,
        
      },
      transparentBackgroundCircle:{
        
        padding:10,
        borderRadius:70
      },
      userNameText: {
        color: "white",
        textAlign: "left",
        
      },
})
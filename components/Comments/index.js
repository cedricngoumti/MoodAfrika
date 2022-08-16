import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,TextInput, FlatList, ActivityIndicator } from 'react-native';
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import React,{useRef,useContext,useState,useEffect } from 'react';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { COLORS } from '../../utils/Colors';
import { AuthContext } from '../../navigation/AuthProvider'
import CertifiedIcon from '../CertifiedIcon';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import { convertDateToFrench } from '../../utils/API';


const Comments = ({commentaires,isLoading}) => {

    const {user, setUser} = useContext(AuthContext);
    const [liked, setLiked]=useState(false)
    const [labelValue, setLabelValue]=useState(null)
    const [dataComments,setDataComments]=useState([])
    const placeholderText='Tapez un commentaire ...'
    const number = 0;

    useEffect(() => {
        
      setDataComments(commentaires)
        
        
    }, [commentaires]);

    const onLike = () =>{
        setLiked(!liked);

        liked ? (setNumber(number - 1)):(setNumber(number + 1))
    }


  return (
    <View style={{flex:1, flexDirection:'column',paddingBottom:windowHeight*0.09}}>
        <View  style={{flex:1,height:windowHeight*0.8, paddingTop:10, paddingHorizontal:10}}>
         { isLoading && (
             <View style={{flex:1,height:'100%',justifyContent:'center',alignItems:'center'}}>
                 <ActivityIndicator size={'large'} color={COLORS.gray} />
             </View>
         )}  
         {( !isLoading && commentaires.length)?(
             
             <FlatList
             data={dataComments}
             renderItem={({item}) => 
             <View style={{paddingBottom:15}}>
                                    <View style={{flexDirection:'row', alignSelf:'flex-start'}}>
                                        <View
                                            style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 8,
                                            borderWidth: 2,
                                            borderColor: "#fff",
                                            overflow: "hidden",
                                            marginLeft:15,
                                            alignItems:'center',
                                            justifyContent:'center'
                                            }}
                                        >
                                    
                                            <Image
                                            source={{
                                                uri: item.picture,
                                            }}
                                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                                            />
                                        
                                        
                                        </View>
                                        <View style={{flexDirection:'column',justifyContent:'center'}}>
                                            <View style={{flexDirection:'row',marginBottom:5}}>
                                                <Text style={{color:COLORS.black, marginLeft:10,fontSize:12,fontWeight:'bold'}}>{item.username}{' '}{' '}{(item.certified==1) && <CertifiedIcon />}</Text>
                                                <Text >· </Text>
                                                <Text style={{fontSize:12}}>{ convertDateToFrench(item.registration)}</Text>
                                            </View>
                                            
                                            <Text style={{fontSize:12,color:COLORS.black,width:'80%',marginHorizontal:10}}>{item.comments}</Text>
            
                                            
                                            <View style={{paddingLeft:10,paddingTop:5,  flexDirection:'row', alignSelf:'flex-start'}}>
                                                <Text style={{paddingRight:20, fontSize:12}}>Répondre</Text>
                                                
                                            </View>
                                                
                                            
                                        </View>
                                        
                                    </View>
                            </View>}
           />

         ):null}  

         {
             (!isLoading && !commentaires.length) ? (
                <View style={{width:windowWidth,height:'70%',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{alignSelf:'center',justifyContent:'center'}}>Soyez le premier à laisser un commentaire</Text>
                    </View>
            ):null
         } 
        
      
                    

        </View> 
        <View style={styles.containerSendMessages}>
                <TextInput 
                    style={styles.input}
                    value={labelValue}
                    placeholder={placeholderText}
                    placeholderTextColor="#666"
                    multiline={true}
                    
                />
                <TouchableOpacity style={styles.containerButtonSend}>
                    
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    icon: {
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        padding:10,
        borderRadius:99,
        marginRight:10
        
    },
    textIcon: {
        color: "white",
        textAlign: "center",
        marginRight:10
    },
    containerTitle:{
        paddingTop:10,
        paddingBottom:15,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        color:COLORS.black,
        fontWeight:'600'
    },
    iconLiked: {
        textAlign: "center",
        backgroundColor: '#dc0b4f',
        padding:10,
        borderRadius:99,
        marginLeft:5,

        color:COLORS.black,
        fontWeight:'600',
        fontSize:10,
      },
    containerSendMessages:{
        position:'absolute',
        bottom:0,
        
        width:'100%',
        height:windowHeight*0.08,
        flexDirection:'row'
    },
    containerButtonSend:{
        width:'20%',
        height:'100%',
        backgroundColor:COLORS.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:'80%',
        height:'100%',
        backgroundColor:COLORS.white,
        padding:10,
    }
});


export default Comments
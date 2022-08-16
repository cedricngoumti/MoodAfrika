import { StyleSheet, Text, View,ActivityIndicator,TouchableOpacity,TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { COLORS } from '../utils/Colors'
import ImagePost from '../components/ImagePost';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Entypo  from "react-native-vector-icons/Entypo";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../navigation/AuthProvider"; 
import VideoPost from '../components/VideoPost';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import SocialButton from '../components/Form/SocialButton';
import { sendPost } from '../actions/AppActions';
import { connect } from 'react-redux';

const UploadScreen = (props) => {
  const {user} = useContext(AuthContext);
  const [singleFile, setSingleFile] = useState(null);
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [ImagePreviewHeight, setImagePreviewHeight] = useState(windowHeight*0.5);

  const photosExt = ['image','jpeg','jpg'];
  const [data, setData] = useState({}); 
  const [isPicture, setIsPicture] = useState(false); 
  const [isVideo, setIsVideo] = useState(false); 
  const {isLoad,item} = props.route.params
  const [isLoading, setIsLoading]=useState(isLoad)
  const [isUpLoading, setIsUpLoading]=useState(false)
  const {navigation,sendPost} = props

  useEffect(() => {
    setIsLoading(true)

    const text = item.node.type
    const myArray = text.split("/")

    if(myArray[0]=='image'){
        setIsPicture(true)
        setIsVideo(false)
        setData({
            image:item.node.image.uri,
            resizeMode:'contain',
            username:user.username,
        })
        setSingleFile(item.node.image)
        
        setPhoto({
            uri: item.node.image.uri,
            type: item.node.type,
            name: "photo.jpg"
        })
        setIsLoading(false)
    }
    if(myArray[0]=='video'){
        
        setIsPicture(false)
        setIsVideo(true)
        setData({
            //image:item.node.image.uri,
            video:item.node.image.uri,
            resizeMode:'contain',
            username:user.username,
        })
        console.log(item.node.image.uri)
        setPhoto({
            uri: item.node.image.uri,
            type: item.node.type,
            name: "photo.mp4"
        })
        setIsLoading(false)
    }
    
    
    
  }, [])
  const renderLoader = () =>{
    if(isUpLoading) { 
        return (
        
            <View style={styles.loader}>
              <ActivityIndicator size={"large"} color={COLORS.grayLight}/>
              <Text style={{color:COLORS.grayLight}}>Envoi....</Text>
            </View>
         

    )}
    
  }

  const uploadImage = async () => {
    setIsUpLoading(true);
    setTimeout(function(){
        if(!error){
           
            sendPost(photo,description,user.userid);
            
            navigation.goBack();
            
        }
    }, 1000)
    

    
        

};


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.replace('Select',{isLoad:true})}>
                        <Entypo name="cross" size={30} color={COLORS.white} />
                        
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.title}>Créer un mood</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('Settings') } >
                        <AntDesign name="setting" size={24} color={COLORS.white} />
        
                    </TouchableOpacity>
       </View>
       {renderLoader()}
      {isLoading ? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={COLORS.white}/>
        </View>
      ):(<View style={{height:ImagePreviewHeight,width:windowWidth}}>
          {
              isPicture && (
                  <ImagePost item={data}/>
                  
                  )
          }
          {
              isVideo && (<VideoPost item={data}/>)
          }
      </View>)}
        <View  style={styles.footerBotom}>
            <View style={{flexDirection:'column',width:windowWidth,flex:1,height:windowHeight*0.3,justifyContent:'flex-start'}}>
                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:15}}>
                        <Text style={{color:COLORS.white,paddingHorizontal:10}}>Ajouter une description</Text>
                        <MaterialIcons name="expand-more" size={26} color={COLORS.white} />
                </View>
                <View>
                <TextInput
                    style={{paddingHorizontal:15,height:windowHeight*0.23}}
                    multiline={true}
                    numberOfLines={4}
                    color={COLORS.white}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    onFocus={() =>setImagePreviewHeight(0) }
                    onBlur={() => setImagePreviewHeight(windowHeight*0.5) } 
                    />
                 </View> 
            </View>
        </View>
        
            <View style={{zIndex:2,position:'absolute', bottom:10,width:windowWidth*0.9,justifyContent:'center',alignSelf:'center'}}>
                <SocialButton
                    buttonTitle={isUpLoading ? "Envoi...":"Mettre en ligne le mood"}
                    btnType="upload"
                    color={COLORS.primary}
                    backgroundColor="#f5e7ea"
                    onPress={isUpLoading ?null:uploadImage}
                    
                />
            </View>
        
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        paddingTop:25,
        flexDirection:'column',
        backgroundColor:COLORS.black,
        //justifyContent:'space-around'
    },
    header:{
        width:windowWidth,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth:0.5,
        alignSelf:'flex-start'
        

    },
    title:{
        fontSize:22,
        marginHorizontal:20,
        color:COLORS.white,
        fontWeight:"600",
        alignSelf:'center',
        
    },
    footerBotom:{
        position:'absolute',
        zIndex:10,
        alignItems: "flex-end",
        justifyContent: "space-between",
        bottom:windowHeight*0.07,
        width:windowWidth
    },
    loader:{
        
        position:'absolute',
        width:windowWidth,
        height:windowHeight, 
        marginVertical:windowHeight*0.4,
        
        textAlignVertical:'center',
        alignItems:"center",
        alignContent:'center',
        zIndex:100,
      
  },
})

const mapStateToProps = state => ({
  
    uploading: state.AppReducer.uploading,
  });
export default connect(mapStateToProps,{sendPost})(UploadScreen);
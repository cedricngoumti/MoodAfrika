import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { COLORS } from '../../utils/Colors'
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Entypo  from "react-native-vector-icons/Entypo";
import Slider from '@react-native-community/slider';

const MusicPlayer = (props) => {
  const [result,setResult] = useState(0)
  const {podcast,pauseSound,pause,resumeSound,stopSound,value,getInfo} = props

  useEffect(() => {
    
      
      getInfo().then(e=>console.log(e))
      
      
      
  }, [])
  
  

  return (
    <View>
      <View style={{
        position:'absolute',
        right:0,
        left:0,
        width:windowWidth, 
        bottom:windowHeight*0.075, 
        zIndex:10

      }}>
        <View style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>00:00</Text>
              <Text style={styles.progressLabelText}>00:00</Text>
        </View>
                      <Slider
                          style={{width: windowWidth}}
                          minimumValue={0}
                          maximumValue={100}
                          thumbTintColor={"#FFD369"}
                          minimumTrackTintColor={COLORS.primary}
                          maximumTrackTintColor="#000000"
                          value={value}
                          //thumbTintColor={COLORS.primary}
                          onSlidingComplete={()=>{null}}
                      />
                  </View>
      <View style={{
                    width:windowWidth,
                    position:'absolute', 
                    bottom:0, 
                    flexDirection:'column',
                    
                }}
                >
                  
                  <View style={{
                    
                    backgroundColor:COLORS.grayLight,
                    flexDirection:'row',
                    alignItems:'flex-end',
                    justifyContent:'space-around'
                  }}>
                  <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 8,
                                    borderWidth: 2,
                                    borderColor: "#fff",
                                    overflow: "hidden",
                                    margin:10
                                }}
                            >
                                <Image
                                    source={{
                                        uri: podcast.item.picture,
                                    }}
                                    style={{ width: 40, height: 40, resizeMode: "cover" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignSelf:'center',maxWidth:windowWidth*0.6}} onPress={() => null}>
                                <View >
                                    <Text style={styles.postDetails} numberOfLines={1} >{podcast.item.title}</Text>
                                </View>
                            </TouchableOpacity>
                            {
                              pause ? (
                                  <TouchableOpacity
                                    style={{backgroundColor: "#f5e7ea",padding:5,alignSelf:'center'}}
                                    onPress={() => resumeSound()}
                                    >
                                    
                                    <View >
                                        <AntDesign name="playcircleo" size={30} color={COLORS.primary} />
                                    </View>
                                </TouchableOpacity>):(
                                  <TouchableOpacity
                                      style={{backgroundColor: "#f5e7ea",padding:5,alignSelf:'center'}}
                                      onPress={() => pauseSound()}
                                      >
                                      
                                      <View >
                                          <AntDesign name="pausecircle" size={30} color={COLORS.primary} />
                                      </View>
                                  </TouchableOpacity>)
                            }
                            
                            <TouchableOpacity
                                style={{padding:5,alignSelf:'center'}}
                                onPress={() => stopSound()}
                                >
                                
                                <View >
                                    <AntDesign name="close" size={30} color={COLORS.black} />
                                </View>
                            </TouchableOpacity>

                  </View>
                  
                            
                        
                    </View>
    </View>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
    footerBtn:{
        zIndex:12,
        backgroundColor:'white',
        width: windowWidth,
        justifyContent:'center',
        position:'absolute',
        bottom:0
        
      },
      buttonContainer: {
        marginTop: 10,
        width: windowWidth*0.35,
        height: windowHeight *0.055,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 3,
      },
      iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        fontWeight: 'bold',
      }, 
      btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        
      },
      postDetails: {
        color: COLORS.black,
        fontSize:12,
        fontWeight:'600',
        textAlign:'left',
        alignSelf:'center',

      },
      progressLevelDuration:{
        width:windowWidth,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      progressLabelText:{
        color:COLORS.white,
        fontWeight:'500'
      }
})
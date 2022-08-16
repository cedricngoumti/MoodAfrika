import React ,{useState, useEffect,useContext,useRef} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, FlatList,Animated } from 'react-native'

import { COLORS } from "../utils/Colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { AuthContext } from "../navigation/AuthProvider"; 
import { connect } from "react-redux";
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Entypo  from "react-native-vector-icons/Entypo";

import HomeScreen from './HomeScreen';
import SnackBar from '../components/SnackBar';

import RoomScreen from './RoomScreen';
import MarketScreen from './MarketScreen';
import MusicPlayer from '../components/MusicPlayer';


const data = [{
    title:'podcasts',
    ref:React.createRef()
},{
    title:'entreprises',
    ref:React.createRef()
}/*,{
    title:'market',
    ref:React.createRef()
}*/]

const Tab = React.forwardRef(({item,activeIndex,index,flatListRef,setActiveIndex},ref) => {
    return <View style={{width:100,alignItems:'center',justifyContent:'center'}} ref={ref}>
        
        {(activeIndex == index) ? (<Text style={{alignSelf:'center',color:COLORS.primary,fontWeight:'400',fontSize:16}}>{item.title}</Text>):
        (<TouchableOpacity onPress={()=> {
            setActiveIndex(index)
            flatListRef.current.scrollToIndex({index: index})}}><Text style={{alignSelf:'center',color:COLORS.gray,fontWeight:'300'}}>{item.title}</Text></TouchableOpacity>)}
        </View>
});


const Tabs =({data, scrollX,activeIndex ,setActiveIndex,flatListRef}) => {
    
    

    return <View style={{position:'absolute',top:windowHeight*0.11,width:windowWidth,paddingHorizontal:windowWidth*0.14}}>
        <View  style={{justifyContent:'space-evenly',flexDirection:'row',flex:1}}>
            {
                data.map((item,index) => {
                    return <Tab key={index}  index={index} item={item} ref={item.ref} activeIndex={activeIndex} flatListRef={flatListRef} setActiveIndex={setActiveIndex}/>;
                })
            }
            
        </View>
        
    </View>
}

const DashboardScreen = (props) => {
    const {user,page,setPage,posts,setPosts,podcast,pauseSound,pause,resumeSound,stopSound,value,getInfo,SoundPlayer} = useContext(AuthContext);
    const {navigation,uploading,confirmMessage} = props; 
    const ref = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    
    
    const scrollX = useRef(new Animated.Value(0)).current;


    const DisplaySnackBar = () => {
        ref.current.ShowSnackBarFunction("Mood ajouté");
        
    };

    useEffect(() => {
        if(confirmMessage){
            DisplaySnackBar()
        }
    }, [confirmMessage])
    
    const onMomentumScrollEnd = ({nativeEvent}) => {
        const newIndex =  nativeEvent.contentOffset.x / windowWidth;

        if(newIndex !== activeIndex && newIndex < posts.length && newIndex >= 0){
            setActiveIndex(newIndex);
        }
        console.log('content',flatListRef.current.getItem)
        
    }
   
    


    return (
        <View style={{flex:1,backgroundColor:COLORS.black,height:windowHeight}}>
            <Animated.FlatList
                initialNumToRender={3}
                ref={flatListRef}
                data={data}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onMomentumScrollEnd={onMomentumScrollEnd}
                
                renderItem={({ item, index }) => {
                    if(index == 0){
                        return (<RoomScreen key={0}/>)
                    }else if(index==1) {
                        return (<HomeScreen key={1} activeTabs={activeIndex}/>)
                    }else if(index==2) {
                        return (<MarketScreen key={1} activeTabs={activeIndex}/>)
                    }
                    
                }}
                
                removeClippedSubviews={false}
            />
            
            <View style={styles.header}>
                <Text style={styles.reels}>Mood😊</Text>
                <View style={{flexDirection:'row-reverse'}}>
                {
                    user ? (
                        <TouchableOpacity onPress={()=>navigation.navigate('List',{
                            picture:user.picture,
                            username:user.username,
                            certified:user.certified,
                            userid:1
                            })}>
                        
                        <View
                            style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: "#fff",
                            overflow: "hidden",
                            margin:15
                            }}
                        >
                        { uploading ? (<Image
                            source={{
                                uri: "https://cdn.dribbble.com/users/122051/screenshots/5749053/media/eed0300056c330951265c360681b48f3.gif",
                            }}
                            style={{ width: 40, height: 40, resizeMode: "contain" }}
                            />):(
                            <Image
                            source={{
                                uri: user.picture,
                            }}
                            style={{ width: 40, height: 40, resizeMode: "cover" }}
                            />
                        )
                        }    
                            
                        </View>

                    
                        
                    </TouchableOpacity>
                    ):(
                            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                            
                            <View
                                style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                
                                overflow: "hidden",
                                margin:15,
                                alignContent:'center',
                                justifyContent:'center',
                                alignItems:'center'
                                }}
                            >
                            
                            <AntDesign name="user" size={30} color={COLORS.white} />
                            </View>

                        
                            
                        </TouchableOpacity>
                      )
                }
                
                
                {
                            activeIndex == 1 && (<TouchableOpacity onPress={()=>navigation.navigate('search')}>
                            
                            <View
                                style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                
                                overflow: "hidden",
                                margin:15,
                                marginRight:0,
                                alignContent:'center',
                                justifyContent:'center',
                                alignItems:'center'
                                }}
                            >
                            
                                <AntDesign name="search1" size={30} color={COLORS.white} />
                            </View>

                        
                            
                        </TouchableOpacity>)
                }
                        
                </View>
            </View>
            <Tabs scrollX={scrollX} data={data} activeIndex={activeIndex} setActiveIndex={setActiveIndex} flatListRef={flatListRef}/>
            <SnackBar ref={ref} />
            {
                podcast && (
                
                    <MusicPlayer 
                        podcast={podcast}
                        pauseSound={pauseSound}
                        pause={pause} resumeSound={resumeSound} stopSound={stopSound} 
                        value={value}
                        getInfo={getInfo}
                        />
                )
            }
    </View>
    )
}



const styles = StyleSheet.create({
    header: {
        width: windowWidth,
        paddingTop:20,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      reels: {
        padding: 15,
        fontSize: 30,
        
        color: "white",
        fontWeight: "bold",
      },
      reelsCamera: {
        padding: 15,
      },
      loader:{
          marginVertical:66,
          width:windowWidth,
          height:windowHeight,
          textAlignVertical:'center',
          alignItems:"center",
          alignContent:'center'
      
      },
      footer:{
        width: windowWidth,
        justifyContent:'center',
        position:'absolute',
        bottom:10
        
      },
     
})


const mapStateToProps = state => ({
  
    uploading: state.AppReducer.uploading,
    confirmMessage: state.AppReducer.confirmMessage,
});
  
  export default connect(mapStateToProps)(DashboardScreen);
import React ,{useState, useEffect,useRef} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import PostItem from '../components/PostItem';
import { fetchPostApi } from '../utils/API';
import { COLORS } from "../utils/Colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";



const renderLoader = () =>{
    return(
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color="white"/>
        <Text style={{color:'white'}}>Chargement.....</Text>
      </View>
    )
}

const ReaderScreen = (props) => {
    const flatListRef = useRef(null)
    const {navigation,route} = props; 
    const [isLoading, setIsLoading] = useState(true); 
    const {videos,indexVideo} = route.params
    const [videoDataReader, setVideoDataReader] = useState(videos);
    const ITEM_WIDTH = videos.length

    useEffect(() => {
        
        
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({index: indexVideo}) // Scroll to indexPost
        }
        
      }, []);


    return (
        <View style={{backgroundColor:COLORS.black,height:windowHeight}}>
            
            <FlatList
                ref={flatListRef}
                getItemLayout={(data, index) => (
                  {length: ITEM_WIDTH, offset: windowHeight * index, index}
                )}
                data={videoDataReader}
                keyExtractor={(item,index) =>
                    index.toString()
                }
            
                windowSize={5}
                
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                
                renderItem={({ item, index }) => {
                
                return (
                    <PostItem item={item} key={index} index={index} activeIndex={null} navigation={navigation}/>
                    //<View key={index} style={{width:windowWidth,flex:1, justifyContent:'center',alignItems:'center'}}><Text > {index} </Text></View>
                    
                );
                }}
                //onEndReachedThreshold={3}
                //ListFooterComponent={renderLoader}
                //onEndReached={loadMorePost}
                //viewabilityConfig = {viewConfigRef.current}
                //onViewableItemsChanged={onViewRef.current}
            />
      
            <View style={styles.header}>
                    <TouchableOpacity style={styles.reels} onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace"  size={30} color={COLORS.white} />
                    </TouchableOpacity>
                
                
                
                
            
                
            </View>
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
        
        //color: "white",
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
})



  
  export default ReaderScreen;
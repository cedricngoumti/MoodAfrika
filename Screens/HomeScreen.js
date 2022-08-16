import React ,{useState, useEffect,useContext,useRef,useCallback, useMemo} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native'
import PostItem from '../components/PostItem';
import { fetchPostApi } from '../utils/API';
import { COLORS } from "../utils/Colors";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { AuthContext } from "../navigation/AuthProvider"; 
import { connect } from "react-redux";
import  FontAwesome  from "react-native-vector-icons/FontAwesome";

import { useNavigation } from '@react-navigation/native';

const renderLoader = () =>{
    return(
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color="white"/>
        <Text style={{color:'white'}}>Chargement.....</Text>
      </View>
    )
}

const HomeScreen = (props) => {
    const {user,page,setPage,posts,setPosts} = useContext(AuthContext);
    const {uploading,activeTabs} = props; 
    const navigation = useNavigation()
    const [isLoading, setIsLoading] =useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const [ITEM_WIDTH,SETITEM_WIDTH] = useState(posts.length)
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 75 })
   
    const refreshdata = async () =>{
        setPage(1)
        setIsLoading(true);
        setPosts([]);
        const data =  user? await fetchPostApi(user.userid,page):await fetchPostApi(false,page);
        setPosts(data);
        setIsLoading(false);
    }
    const fetchPostApiCall = async () => {

        const data =  user? await fetchPostApi(user.userid,page):await fetchPostApi(false,page);
        setPosts([...posts,...data]);
        SETITEM_WIDTH(data.length);
      };
    const loadMorePost = () =>{
        setPage(parseInt(page)+parseInt(1));
        
        fetchPostApiCall();
        
    }

    useEffect(() => {
        
        loadMorePost();
      }, []);
    
    const onMomentumScrollEnd = ({nativeEvent}) => {
        
            const newIndex =  nativeEvent.contentOffset.y / windowHeight;

            if(newIndex !== activeIndex && newIndex < posts.length && newIndex >= 0){
                setActiveIndex(newIndex);
            }
        
    }

    const renderPostItem = useCallback((item, index)=> {
            return(<PostItem  item={item} key={index} index={index}  navigation={navigation} activeIndex={activeIndex} activeTabs={activeTabs}/>)
            //return(<VideoPost item={item} key={index} index={index}  navigation={navigation}/>)
    },[activeIndex,activeTabs]);

    
    return (
        <View style={{backgroundColor:COLORS.black,height:windowHeight}}>
            
            <FlatList
                initialNumToRender={5}
                windowSize={15}
                ref={flatListRef}
                data={posts}
                keyExtractor={(item,index) =>
                    index.toString()
                }
                
                maxToRenderPerBatch={15}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                vertical={true}
                
                onMomentumScrollEnd={onMomentumScrollEnd}
                renderItem={({ item, index }) =>renderPostItem(item,index)}
                onEndReachedThreshold={1.5}
                ListFooterComponent={renderLoader}
                onEndReached={loadMorePost}
                removeClippedSubviews={false}
                refreshing={isLoading}
                onRefresh={()=> {
                    setIsLoading(true)
                    refreshdata()}}  
            />
            
            
            {
                user && (<View style={styles.footerBtn}>
                    <View style={{width:windowWidth, flexDirection:'row',alignItems:'flex-end',justifyContent:'space-around',padding:10}}>
            
                        <TouchableOpacity
                            style={[styles.buttonContainer, {backgroundColor: "#f5e7ea"}]}
                            onPress={() => navigation.navigate('Select')}
                            >
                            <View style={styles.iconWrapper}>
                                <FontAwesome name={'camera'} style={styles.icon} size={16} color={COLORS.primary} />
                            </View>
                            <View style={styles.btnTxtWrapper}>
                                <Text style={[styles.buttonText, {color: COLORS.primary}]}>Créer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>)
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
        
      },footerBtn:{
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
        width: 20,
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
})


const mapStateToProps = state => ({
  
    uploading: state.AppReducer.uploading,
  });
  
  export default connect(mapStateToProps)(HomeScreen);
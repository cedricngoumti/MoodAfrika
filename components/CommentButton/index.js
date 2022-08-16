import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView } from 'react-native';
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import React,{useRef,useContext,useState } from 'react';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { COLORS } from '../../utils/Colors';
import { AuthContext } from '../../navigation/AuthProvider'
import  AntDesign  from "react-native-vector-icons/AntDesign";
import Comments from '../Comments';
import { useEffect } from 'react';
import { fetchCommentsApi } from '../../utils/API';


const CommentButton = ({item}) => {
    const bottomSheet = useRef();
    const [commentaires, setCommentaires] = useState([])
    const {user, setUser} = useContext(AuthContext);
    const [liked, setLiked]=useState(false)
    const [isLoading, setIsLoading]=useState(true)
    
    const [number,setNumber] = useState(0);

    useEffect(() => {
        item.nbcomment && setNumber(item.nbcomment);
        
        
    }, []);

    const loadComment = async () => {
        
        const data = await fetchCommentsApi(item.id)
        console.log(data)
        setNumber(data.nbcomments)
        setCommentaires(data.comments)
        setIsLoading(false)
        
    }


   
    return (
        <>
            <TouchableOpacity onPress={()=>{
                loadComment()
                bottomSheet.current.show()
                
                }
            }>
            
                <MaterialIcons style={styles.icon} name="sms"
                                size={24}
                                color="white"
                />
                    <Text style={styles.textIcon}>{number}</Text>
            </TouchableOpacity>
            <BottomSheet draggable={false}  ref={bottomSheet} height={windowHeight*0.6} >
                <View style={{flex:1}}>
                    <View style={styles.containerTitle}>
                        <View style={{flexDirection:'row'}}>
                                {
                                    (number >= 2) ? (<>
                                        <TouchableOpacity style={{marginHorizontal:5}} >
                                            <Text style={styles.title} >{number}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>Commentaires</Text>
                                        </>
                                    ):null
                                }
                                {
                                    (number == 1) ? (<>
                                        <TouchableOpacity style={{marginHorizontal:5}} >
                                            <Text style={styles.title} >{number}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>Commentaire</Text>
                                        </>
                                    ):null
                                }
                                
                        </View>
                        <TouchableOpacity style={{position:'absolute', top:10,right:20}} onPress={()=>bottomSheet.current.close()}>
                            <AntDesign name="close" size={26} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Comments  commentaires={commentaires} isLoading={isLoading}/>
                </View>
                
            </BottomSheet >
        </>
    );
};

export default CommentButton;

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
        alignItems:'center',
        
        width:windowWidth
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
});

import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import React,{useEffect, useState,useContext} from 'react';
import { AuthContext } from "../../navigation/AuthProvider"; 
import { sendLike,sendUnLike } from '../../actions/AppActions';
import { connect } from 'react-redux';

const LikeButton = ({item,nblikes,sendLike, sendUnLike}) => {
    
    const {user} = useContext(AuthContext);
    const [liked, setLiked]=useState(item.liked)
    const [number, setNumber]=useState(nblikes)
    const [userid, setUserid] = useState(null)
    
    const onLike = () =>{
        setLiked(!liked);
        
        liked ? (
            sendUnLike(user.userid,item.id,parseInt(number),setNumber,setLiked)
        )
        :(
            
            sendLike(user.userid,item.id,parseInt(number),setNumber,setLiked)
        )
    }

    

    

    return (
        <>
            <TouchableOpacity onPress={onLike}>
                {
                    liked  ? (
                        <AntDesign
                            style={styles.iconLiked}
                            name="heart"
                            size={24}
                            color="white"
                            />

                    ):(
                        <AntDesign
                            style={styles.icon}
                            name="heart"
                            size={24}
                            color="white"
                            />
                    )
                }
                
                <Text style={styles.textIcon}>{number}</Text>
            </TouchableOpacity>
        
        </>
    );
};



const styles = StyleSheet.create({
      icon: {
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        padding:10,
        borderRadius:99,
        marginRight:10
        
      },
      iconLiked: {
        textAlign: "center",
        backgroundColor: '#dc0b4f',
        padding:10,
        borderRadius:99,
        marginRight:10
        
      },
      textIcon: {
        color: "white",
        textAlign: "center",
        marginRight:10
      },

});

const mapStateToProps = state => ({
  
    uploading: state.AppReducer.uploading,
  });
export default connect(mapStateToProps,{sendLike,sendUnLike})(LikeButton);
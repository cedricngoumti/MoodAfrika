import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, FlatList,ActivityIndicator} from 'react-native'
import { COLORS } from '../utils/Colors';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { sendStatus } from '../actions/AppActions';
import { connect } from 'react-redux';
import { AuthContext } from '../navigation/AuthProvider';


const StatusScreen = (props) => {
    const {navigation,sendStatus } = props 
    const {user} = useContext(AuthContext);
    const dataFilter = [{id:'1',backgroundColor:'white',textColor:'black'}]
    const [error, setError]= useState();    
    const [text, setText] = useState('');
    const [heightTextInput , setHeightTextInput] = useState(24);
    const [isLoading, setIsLoading] = useState(false);



    const renderLoader = () =>{
        if(isLoading) { 
            return (
            
                <View style={styles.loader}>
                  <ActivityIndicator size={"large"} color={COLORS.gray}/>
                  <Text style={{color:COLORS.gray}}>Envoi....</Text>
                </View>
             

        )}
        
      }
    const _checkTextInput = () => {
        if(!text.trim()){
            return null  
        }else{
            return (
                
            <TouchableOpacity style={{paddingTop:5,width:70,alignSelf:'flex-end',alignItems:'center'}} onPress={()=>_addStatusText(text)}>
                <MaterialIcons
                style={styles.iconSend}
                name="send"
                size={36}
                color={COLORS.primary}
                />
                
            </TouchableOpacity>
                
            )
        }
    }

    const _addStatusText = (descriptionText) => {
        
        setIsLoading(true);
        setTimeout(function(){
            setError("");
            
            if(!descriptionText.trim()){
                console.warn("Votre status ne peut etre vide! ");
            }
            
            if(!error){
                 
                setIsLoading(false);
                
                sendStatus(descriptionText,'128C7E','FFF',user.userid);
                setText('');
                navigation.goBack();
                
            }
        }, 1000)
        
        
        
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center',backgroundColor: '#128C7E',}}>
            <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            
                            navigation.goBack();
                        }}
                        style={{padding:18}}
                    >
                        <AntDesign name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                   
                    
                    
                </View>
                {renderLoader()}
                <TextInput
                    autoFocus={true}
                    multiline={true}
                    placeholder={'Ecrivez un status'}
                    placeholderTextColor={COLORS.gray}
                    textAlign={'center'}
                    underlineColorAndroid={COLORS.transparent}
                    style={{
                        height:heightTextInput,
                        width:windowWidth,
                        borderWidth: 0,
                        fontSize:30,
                        textAlign:'center',
                        color:COLORS.white,
                        borderColor:COLORS.transparent    
                    }}
                    onChangeText={(e)=> {
                        setText(e)
                        
                    }}
                    onContentSizeChange={(e) => setHeightTextInput(e.nativeEvent.contentSize.height)}
                    value={text}
                    
                    
                />
                <View style={styles.footer}>
                    {_checkTextInput()}
                    <FlatList 
                        style={{backgroundColor:COLORS.transparent,paddingVertical:2}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={dataFilter}
                        renderItem={item => (<View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                                width: 40,
                                height: 40,
                                borderRadius: 3,
                                borderWidth: 2,
                                borderColor: "#fff",
                                overflow: "hidden",
                                margin: 3,
                                backgroundColor:'#128C7E'
                            }}
                            >
                                
                            <Text style={{color:COLORS.white}}>Text</Text>
                            </View>)}
                    />
                
                        
                        

                        
                        
                        
                </View>
                
            
        </View>
    )
}



const styles = StyleSheet.create({
    header:{
        position:'absolute',
        top:windowHeight*0.02,
        left:windowWidth*0.02,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    
    },
    row:{
        flexDirection:'row',
    },
    footer: {
        width:windowWidth,
        position:'absolute',
        bottom:10,
        paddingVertical: 10,
        marginBottom:50
      },
      iconSend: {
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        padding:10,
        borderRadius:99,
        marginRight:10
        
      },
      loader:{
          position:'absolute',
          
          marginVertical:66,
          
          textAlignVertical:'center',
          alignItems:"center",
          alignContent:'center',
          zIndex:100,
        
    },
})

const mapStateToProps = state => ({
  
    uploading: state.AppReducer.uploading,
  });
export default connect(mapStateToProps,{sendStatus})(StatusScreen);
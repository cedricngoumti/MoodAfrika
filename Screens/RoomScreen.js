import { StyleSheet, Text, View,TouchableOpacity,ScrollView,ActivityIndicator, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { windowHeight, windowWidth } from '../utils/Dimensions'
import SearchBar from '../components/SearchBar.js'
import { COLORS } from '../utils/Colors';
import { fetchRoomApi } from '../utils/API';
import RoomItem from '../components/RoomItem';
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import  FontAwesome  from "react-native-vector-icons/FontAwesome";


const RoomScreen = () => {

  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] =useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [rooms, setRooms] = useState();
  const {user} = useContext(AuthContext)
  const navigation = useNavigation()
  

  const fetchRoomApiCall = async () => {
    setRooms([])
    const data =  await fetchRoomApi();
    setRooms(data.rooms); 
    setIsLoading(false)
  };

  useEffect(() => {    
    fetchRoomApiCall()
  }, []);

  return (
    <View style={{flex:1,paddingTop:windowHeight*0.12,width:windowWidth}}>
            <View style={styles.header}>
                    
                    <SearchBar 
                        searchPhrase={searchPhrase}
                        setSearchPhrase={(text)=>{
                            //deleteSuggestion()
                            setSearchPhrase(text)
                            //getSuggestion()
                            
                          }
                          
                        }
                        clicked={clicked}
                        setClicked={setClicked}
                        searchFunction={()=>null}
                        deleteSuggestion = {()=>null}
                        leftText = {false}
                    />
                    
                    
                    
        </View>
        <View style={styles.container}>
            <View>
                <Text style={styles.title}><FontAwesome name="filter" size={14} color={COLORS.white}/>{"  "}Programmes </Text>
            </View>
            <View>
                <Text style={styles.title}><FontAwesome name="filter" size={14} color={COLORS.white}/>{"  "}Selection du jour</Text>
            </View>
            {
                isLoading && (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size={'large'} color={COLORS.white} style={{paddingBottom:windowHeight*0.2}}/>
                    </View>
                )
            }
            {
                (!isLoading && rooms.length < 1) && (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <View style={{paddingBottom:windowHeight*0.2}}>
                        <Text style={{textAlign:'center',alignSelf:'center',justifyContent:'center',color:COLORS.grayLight,fontSize:20}}>Aucune Room n'est ouverte actuellement</Text>
                        <Text style={{textAlign:'center',alignSelf:'center',justifyContent:'center',color:COLORS.gray,fontSize:14}}>Créer une Room et partager votre expérience avec le monde
                        </Text>
                        </View>
                    </View>
                )
            }
            
            <View style={{justifyContent:'center',alignItems:'center',paddingTop:windowHeight*0.005,paddingBottom:windowHeight*0.05}}>
                        <FlatList 
                            data={rooms}
                            
                            renderItem={(item,index) => (
                                <RoomItem item={item} key={index} />)}
                            refreshing={isLoading}
                            onRefresh={()=> {
                                setIsLoading(true)
                                fetchRoomApiCall()}}                      
                        />
                        
                    </View>
        </View>
        
    </View>
  )
}

export default RoomScreen

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:15,
        flex:1
    },
    header:{
      paddingTop:windowHeight*0.03
    },
    title:{
        color:COLORS.white,
        fontSize:14,
        fontWeight:'300'

    },
    
    
})
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { windowHeight, windowWidth } from '../utils/Dimensions'
import SearchBar from '../components/SearchBar.js'
import { COLORS } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import  FontAwesome  from "react-native-vector-icons/FontAwesome";


const MarketScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] =useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [products, setProduct] = useState([]);
  const {user} = useContext(AuthContext)
  const navigation = useNavigation()

  const GetProducts = () => {
   
    fetch(`https://bonaberifc.com/apimood/public/products`,{ 
            credentials: "same-origin",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        },)
        .then((response) => response.json())
        .then((json) => {
            
            setProduct(json.products)
            
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
      
  }

  useEffect(() => {
    GetProducts()
  }, [])
  

  return (
    <View  style={{flex:1,paddingTop:windowHeight*0.12,width:windowWidth}}>
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
            <View style={styles.headerContainer}>
            
              <View style={{width:windowWidth*0.6}}><Text style={styles.title}><FontAwesome name="filter" size={14} color={COLORS.white}/>{"  "}Selection du jour</Text></View>
              <View style={{width:windowWidth*0.3}}><Text style={styles.location}><Entypo name="location" size={24} color={COLORS.primary} />{" "}Douala</Text></View>
                
                
            </View>
            <View style={{flex:1}}>
            {
                isLoading && (
                    <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    </View>
                )
            }
            {
              !isLoading && (
                <View style={{justifyContent:'flex-start',alignItems:'flex-start',paddingTop:windowHeight*0.005,paddingBottom:windowHeight*0.12,width:windowWidth}}>
                        <FlatList 
                            data={products}
                            numColumns={2}
                            renderItem={(item,index) => (
                                <View style={{backgroundColor:'rgba(52, 52, 52, 0.4)',marginTop:10,marginRight:5,borderRadius:10,width:windowWidth*0.45,height:windowHeight*0.3,justifyContent:'center',alignItems:'center'}}>
                                    <View>
                                        <Image 
                                            style={{flex:1, width:windowWidth*0.42, maxHeight:windowHeight*0.22,borderRadius:10}} 
                                            source={{ uri: item.item.image}} 
                                            resizeMode='cover' 
                                          />
                                    </View>
                                    <Text style={{color:COLORS.white,fontSize:12, padding:10,paddingLeft:20}} numberOfLines={1}>{item.item.title}</Text>
                                    <Text style={{color:COLORS.gray,fontSize:10, padding:5,paddingLeft:10}} numberOfLines={1}>{item.item.price} XAF</Text>
                                </View>)}
                            refreshing={isLoading}
                            onRefresh={()=> {
                                setIsLoading(true)
                                GetProducts()}}                  
                        />
                        
                </View>
              )
            }
            </View>
        </View>
    </View>
  )
}

export default MarketScreen

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:15,
    flex:1
  },
  header:{
    paddingTop:windowHeight*0.03
  },
  title:{
    
    alignSelf:'flex-start',
    color:COLORS.white,
    fontSize:14,
    fontWeight:'300'
  },
  location:{
    alignSelf:'center',
    color:COLORS.primary,
    fontSize:16
  },
  headerContainer:{
    paddingRight:20,
    height:windowHeight*0.05,
    width:windowWidth,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
    
  }
})
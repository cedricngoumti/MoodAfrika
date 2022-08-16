import {  StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native';
import React,{useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/Colors';

import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";

import SearchBar from '../components/SearchBar.js';

import ResultScreen from './ResultScreen';
import SuggestionScreen from './SuggestionScreen';

const SearchScreen = ({navigation}) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] =useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [data, setData] = useState([]);
  const [suggestion, setSuggestion] = useState(true);
  const [dataSuggestion, SetDataSuggestion] = useState([]);
  const [userSuggestion, SetUserSuggestion] = useState([]);
  const [hashtagSuggestion, SetHashtagSuggestion] = useState([]);

  const Search = () => {
    if(searchPhrase.length > 2) {
    setIsLoading(true)
    setSuggestion(false)
    fetch(`https://moodafrika.bonaberifc.com/api_search?text=${searchPhrase}`,{ 
            credentials: "same-origin",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        },
        )
        .then((response) => response.json())
        .then((json) => {
            
            //setPostUserData([...postUserData,...json.posts]);
            //setUserProfile(json.user);
            setData(json)
            //console.log(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
      }
  }

  const deleteSuggestion = () =>{
    SetUserSuggestion([])
    SetHashtagSuggestion([])
    console.log("delete cache");
  }

  const getSuggestion = () => {
    if(searchPhrase.length > 2) {
        fetch(`https://moodafrika.bonaberifc.com/api_search_suggestion?text=${searchPhrase}`,{ 
          credentials: "same-origin",
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
      },
      )
      .then((response) => response.json())
      .then((json) => {
          
          //setPostUserData([...postUserData,...json.posts]);
          //setUserProfile(json.user);
          SetDataSuggestion(json)
          SetHashtagSuggestion(json.hashtags)
          SetUserSuggestion(json.users)
          console.log(json.users);
          //console.log(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setSuggestion(true));
    }
        

  }
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace"  size={30} color={COLORS.white} />
                    </TouchableOpacity>
                    <SearchBar 
                        searchPhrase={searchPhrase}
                        setSearchPhrase={(text)=>{
                            deleteSuggestion()
                            setSearchPhrase(text)
                            getSuggestion()
                          }
                          
                        }
                        clicked={clicked}
                        setClicked={setClicked}
                        searchFunction={Search}
                        deleteSuggestion = {deleteSuggestion}
                        autoFocus={true}
                    />
                    
                    
                    
        </View>
        {
          clicked && !suggestion ? (<ResultScreen isLoading={isLoading}  data={data} post={data.post} 
              setData={setData} 
              navigation={navigation} 
              suggestion={suggestion} 
              dataSuggestion={dataSuggestion} 
              
              />
              
              ):null
        }
        {
               (clicked && suggestion) ? <SuggestionScreen dataSuggestion={dataSuggestion} hashtagSuggestion={hashtagSuggestion} 
               userSuggestion={userSuggestion} navigation={navigation}/>:null
        }
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        backgroundColor:COLORS.black
    },
    header:{
        
      paddingLeft:15,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      borderBottomWidth:0.5,
      

  },
  formField: {
    width:'90%',
    borderWidth: 1,
    padding: 12,
    marginLeft:10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderColor: '#888888',
    fontSize: 14,
    height: 40,
    color:COLORS.gray
  }
});

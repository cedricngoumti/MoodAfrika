import { ActivityIndicator, FlatList, StyleSheet, Text, View,TouchableOpacity,Image, ScrollView } from 'react-native';
import React,{useEffect} from 'react';
import { COLORS } from '../utils/Colors';
import { windowWidth } from '../utils/Dimensions';
import PostResults from '../components/Search/PostResults';
import HashtagsResults from '../components/Search/HashtagsResults';
import UserResults from '../components/Search/UserResults';
import SuggestionScreen from './SuggestionScreen';

const ResultScreen = ({isLoading,data,setData,navigation}) => {
    const {post,hashtags,users} = data;

   
  return (
      <View style={{flex:1}}>
           
           {isLoading ? (<View style={{flex:1, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <ActivityIndicator color={"#fff"} size={'large'}/>
                <Text style={{color:COLORS.white}}>Chargement...</Text>
            
            </View>):(
               
                <>
                    
                    <PostResults  post={post} navigation={navigation}/>
                    
                    <HashtagsResults hashtags={hashtags} navigation={navigation} />
                    
                    <UserResults  users={users} navigation={navigation}/>
                    
                </>
            )
            }
            {
                !isLoading &&  !(post.length != 0 || hashtags.length != 0 || users.length != 0) ? (
                    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                        <Text style={{color:COLORS.white,margin:20,textAlign:'center',fontSize:16}}>Désolé, Aucun element ne correspond a votre recherche</Text>
                    </View>
                ):null

                    
                
            }
     </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
    title:{
        color:COLORS.white
    }
});

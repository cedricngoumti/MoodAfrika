import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { windowWidth } from '../../utils/Dimensions';
import { COLORS } from '../../utils/Colors';
import  Feather  from "react-native-vector-icons/Feather";



const HashtagsResults = ({hashtags,navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList 
            windowSize={6}
            horizontal={false}
            scrollEnabled
            numColumns={2}
            data={hashtags}
            keyExtractor={(item,index) => 
                    index.toString()
                    
                
            }
            renderItem={({ item, index }) => {
                            
                return (
                  <TouchableOpacity 
                        onPress={()=> navigation.navigate('HashTag',{
                            //id:item.id,
                            name:item.name
                        })} 
                        style={styles.suggestionUser}
                    >
                    <View  style={{flexDirection:'row'}}>
                        <Feather name="hash" size={24} color={COLORS.white} />
                        <Text style={styles.titleHash}>{' '} {item.name.substring(1)} {' '} </Text>
                    </View>
                    
                </TouchableOpacity>
                );
                }}
            />
    </View>
  );
};

export default HashtagsResults;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:5,
},
suggestionUser:{
    
    paddingBottom:10,
    paddingHorizontal:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    

},
title:{
    fontSize:14,
    color:COLORS.white,
    fontWeight:"bold",
    
},
titleHash:{
    fontSize:18,
    color:COLORS.white,
    fontWeight:"bold",
    
},
});

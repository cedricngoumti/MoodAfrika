import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { windowWidth } from '../../utils/Dimensions';

const PostResults = ({post,navigation}) => {
  return (
    <View>
      <FlatList 
                        windowSize={6}
                        horizontal={false}
                        scrollEnabled
                        numColumns={2}
                        data={post}
                        keyExtractor={(item,index) => 
                                index.toString()
                                
                            
                        }
                        renderItem={({ item, index }) => {
                            
                            return (
                                <View style={{margin:10}}>
                                    {
                                        (index > 3) ? null:(
                                            <TouchableOpacity onPress={() => navigation.navigate('Reader',{
                                                videos:post,
                                                indexVideo:index,
                                            })}       
                                            key={index} style={[{width:(windowWidth/2.2)},{height:(windowWidth/2.2)}, index % 3 !== 0 ? {paddingLeft:2}:{paddingLeft:0}]}>
                                                        <Image style={{flex:1, width:windowWidth/2.2, height:windowWidth/3}} 
                                                            source={{
                                                                    uri: item.image,
                                                            }} 
                                                            resizeMode='cover' 
                                                        />
                                            </TouchableOpacity>
                                        )
                                    }
                                    
                                </View>
                            );
                            }}
                    />
    </View>
  );
};

export default PostResults;

const styles = StyleSheet.create({});

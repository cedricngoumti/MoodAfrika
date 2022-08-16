import { FlatList,  StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native';
import React,{useState} from 'react';
import { COLORS } from '../utils/Colors';
import CategoryItem from '../components/CategoryItem';
import categories from '../utils/categories';

import { SliderBox } from 'react-native-image-slider-box';

const DiscoverScreen = ({navigation}) => {
  
  const [imageSlider, setImageSlider] = useState(['https://www.journaldugeek.com/wp-content/blogs.dir/1/files/2017/10/fran%C3%A7ais-publicit%C3%A9-smartphone.jpg',"https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree"])
  return (
    <>
       
        
        <View >
            
            <FlatList 
            ListHeaderComponent={<>
                <View >
                  <SliderBox images={imageSlider}
                      dotColor={COLORS.primary} 
                      onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
                      
                      autoplay
                      circleLoop
                      resizeMethod={'resize'}
                      resizeMode={'cover'}
                      paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10
                      }}
                  />
                  {/*<Image style={{width:windowWidth, height:windowHeight*0.25}} source={{uri: 'https://www.journaldugeek.com/wp-content/blogs.dir/1/files/2017/10/fran%C3%A7ais-publicit%C3%A9-smartphone.jpg'}}  />*/}
                </View>
            </>}
              data={categories.items}
              renderItem={({item})=> <CategoryItem category={item} />}
              showsVerticalScrollIndicator={false}
              
            />
        </View>

    </>
  );
};

export default DiscoverScreen;

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

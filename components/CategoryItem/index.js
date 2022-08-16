import { StyleSheet, Text, View, FlatList,Image } from 'react-native';
import React, { useEffect } from 'react';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { COLORS } from '../../utils/Colors';

const CategoryItem = (props) => {
    const {category} = props;
    useEffect(() => {
        
        
        console.log(category);
      }, []);
    return (
        <View style={{marginTop:15,paddingHorizontal: 15}}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={category.movies}
                renderItem={({item,index})=> <Image 
                source={{uri: item.poster}} 
                style={[{width:(windowWidth/3)},{height:(windowWidth/3)}, index % 3 !== 0 ? {paddingLeft:2}:{paddingLeft:0}]}/>}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default CategoryItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:30,
        paddingBottom:windowHeight*0.15
        
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:COLORS.grayLight,
        marginBottom:20
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
      image:{
        width:100,
        height:170,
        resizeMode:'cover',
        borderRadius: 5,
        margin:5,
      }
});

import { ScrollView, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React,{useState, useCallback} from 'react';
import { COLORS } from '../../utils/Colors';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { useNavigation } from '@react-navigation/native';

const PostDescription = ({description}) => {
    const navigation = useNavigation()
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }
     
    const HASHTAG_FORMATTER = string => {
        return string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v,index)=>{
          
          if(v.includes('#')){
                
                return <TouchableOpacity key={index} onPress={()=> navigation.navigate('HashTag',{
                    //id:item.id,
                    name:v
                })} ><Text style={{color:COLORS.gray}}>{v}</Text></TouchableOpacity>
          
          }else{
                
                return <Text key={index} >{v}</Text>
          }
          
          
        })
    };
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=3); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    },[]);


    return (
        <>
            {description  ? (
                <ScrollView style={!textShown ? styles.mainContainer : styles.mainContainerPlus}>
            
                    <Text
                        onPress={toggleNumberOfLines}
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 3}
                        style={styles.text}>{HASHTAG_FORMATTER(description)} </Text>

                        {
                            lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={{ color:COLORS.white, fontWeight:'700' }}>{!textShown }</Text>
                            :null
                        }
            
                </ScrollView>
            ):null}
        </>
    );
};

export default PostDescription;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        minHeight:0,
        width:'100%',
        paddingLeft:5,
        maxHeight:windowHeight*0.3
    },
    mainContainerPlus:{
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        minHeight:0,
        width:'100%',
        paddingLeft:5,
        maxHeight:windowHeight*0.3
    },
    text: {
        color: "white",
        textAlign: "left",
        color:'white', 
        lineHeight: 21,
        paddingBottom: 10,
    },
});

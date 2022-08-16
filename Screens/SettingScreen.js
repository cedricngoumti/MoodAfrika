import { SafeAreaView, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React,{useContext} from 'react'
import { COLORS } from '../utils/Colors'
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { windowWidth } from '../utils/Dimensions';
import SocialButton from '../components/Form/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';


const SettingScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace"  size={30} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Parramètres</Text>
                    
        </View>
        <View style={{flex:1,paddingHorizontal:25, justifyContent:'center'}}>
          <SocialButton 
            //btnType={'logout'}
            buttonTitle={'Deconnexion'}
            color={COLORS.white}
            backgroundColor='rgba(52, 52, 52, 0.7)'
            onPress={() => logout()}
          />
      </View>
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        paddingTop:25,
        backgroundColor:COLORS.black
        
    },
    header:{
        
        padding:10,
        flexDirection:'row',
        width:windowWidth,
        alignItems:'center',
        borderBottomWidth:0.5,
        
        

    },
    title:{
        fontSize:18,
        color:COLORS.white,
        fontWeight:"bold",
        alignSelf:'center',
        paddingLeft:windowWidth*0.25
    },
})
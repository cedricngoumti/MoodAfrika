import React,{useState,useContext,useRef} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView, Platform, StatusBar} from 'react-native'
import FormInput from '../components/Form/FormInput'
import { COLORS } from '../utils/Colors'
import { windowHeight, windowWidth } from '../utils/Dimensions';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import BottomSheet from "react-native-gesture-bottom-sheet";
import logo  from '../assets/moood.png'
import SocialButton from '../components/Form/SocialButton';
import { fetchUserApi } from '../utils/API';
import { AuthContext } from '../navigation/AuthProvider'


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [account, setAccount] = useState([])
    const [number,setNumber] = useState(0);
    const { login,fbLogin,gLogin,loginDirect } = useContext(AuthContext);
    const [isLoading, setIsLoading]=useState(true)

    const signIn = () => {
        console.log(email, password);
        login('Grandoos', 'dim1992')
    }
    const loadAccount = async () => {
        console.log('start');
        const data = await fetchUserApi()
        console.log(data)
        setAccount(data.users)
        setNumber(account.length)
        setIsLoading(false)
        
    }

    const bottomSheet = useRef();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View >
                    <TouchableOpacity
                        onPress={() => {
                            
                            navigation.goBack();
                        }}
                        style={{padding:18}}
                    >
                        <AntDesign name="close" size={28} color={COLORS.black}/>
                    </TouchableOpacity>
                    
                    
                    
                </View>
            <View style={styles.main}>
                <View style={{width:'100%', alignContent:'center', alignItems:'center'}}>
                    <Image
                    source={require('../assets/moood.png')}
                    resizeMode='cover'
                    style={{
                        width:windowWidth*0.2,
                        height:windowHeight*0.1
                    }}
                    
                />

                </View>
            <Text style={styles.text}>Connecte-toi sur MoodAfrika😊, </Text> 
            
            <Text style={styles.slogan}>Cree ton profil, partages ta bonne humeur avec plus de 50 millions d'amis en Afrique et partout dans le monde! </Text>
             
            
            <View>
                <SocialButton
                    buttonTitle="Continuer avec Facebook"
                    btnType="facebook-square"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => fbLogin()}
                />

                <SocialButton
                    buttonTitle="Continuer avec Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => login()}
                />
                
                <SocialButton
                    buttonTitle="Continuer avec un compte"
                    btnType="select1"
                    color="#0274b3"
                    backgroundColor="#e6ebf4"
                    onPress={() => {
                        loadAccount()
                        bottomSheet.current.show()
                    }}
                />

                
            </View>
            <Text style={styles.notice}>En continuant, vous reconnaissez avoir lu notre politique de confidentialité sur l'utilisation de vos données et accepté nos conditions d'utilisation </Text>

            
                </View>
                <BottomSheet draggable={false}  ref={bottomSheet} height={windowHeight*0.6} >
                <View style={{flex:1}}>
                    <View style={styles.containerTitle}>
                        <View style={{flexDirection:'row'}}>
                                {
                                    (number >= 2) ? (<>
                                        <TouchableOpacity  style={{marginHorizontal:5}} >
                                            <Text style={styles.title} >{number}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>Comptes</Text>
                                        </>
                                    ):null
                                }
                                {
                                    (number == 1) ? (<>
                                        <TouchableOpacity style={{marginHorizontal:5}} >
                                            <Text style={styles.title} >{number}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>Comptes</Text>
                                        </>
                                    ):null
                                }
                                
                               
                                
                        </View>
                        <TouchableOpacity style={{position:'absolute', top:10,right:20}} onPress={()=>bottomSheet.current.close()}>
                            <AntDesign name="close" size={26} color="black" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                    {
                                    account.map((i,index)=>{
                                        return (
                                            <View style={{width:windowWidth}} key={index}>
                                                <SocialButton
                                                        buttonTitle={i.username}
                                                        btnType="user"
                                                        color="#0274b3"
                                                        backgroundColor="#e6ebf4"
                                                        onPress={() => {
                                                            loginDirect(i)
                                                        }}
                                                />
                                            </View>

                                        )
                                    })
                                }
                    </ScrollView>
                </View>
                
            </BottomSheet >
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

        justifyContent: 'center',
        //alignItems: 'center',
        //padding: 5,
        //paddingTop: 5,
        
    },
    title:{
        color:COLORS.black,
        fontWeight:'600'
    },
    main:{
        padding:20,
        paddingTop:2
    },
    header:{
        
        flexDirection:'row',
        width:'100%',
        alignItems:'flex-start'
    
    },
    text:{
        width:'100%',
        fontSize: 20,
        fontWeight:'bold',
        marginBottom: 10,
        color: COLORS.primary,
        textAlign:'left'
    },
    slogan:{
        width:'100%',
        fontSize:16,
        marginTop:20,
        marginBottom: 20,
        textAlign:'center',
    },
    logo:{
        height: 100,
        width: 100,
        resizeMode: 'cover',
        alignSelf:'center'
    },
    navButton: {
        marginTop: 15,
      },
    forgotButton: {
        marginVertical: 35,
        textAlign:'center',
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.primary,
       
      },
      notice:{
        width:'100%',
        fontSize:13,
        color:COLORS.gray,
        marginTop:20,
        
        textAlign:'center',
    },
})

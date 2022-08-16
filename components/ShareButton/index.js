import { StyleSheet, Text, View,TouchableOpacity, ScrollView ,Platform, PermissionsAndroid} from 'react-native';
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import React,{useRef, useState} from 'react';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import SocialButton from '../Form/SocialButton';
import SocialIcon from '../Form/SocialIcon';
import { COLORS } from '../../utils/Colors';

import RNFetchBlob from 'rn-fetch-blob';
import { otherShareApi, singleShareOnWhatzapp } from '../../utils/API';
import Share, { Social } from 'react-native-share'


const ShareButton = ({item,setIsDownloading, setLocalContent,localContent}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  
    const bottomSheet = useRef();
  

    const checkBeforeShare = (social=false) =>{
      bottomSheet.current.close();
        if(localContent){
          if(social == 'whatzapp'){
            const shareOptions = {
              title: 'Share via MoodAfrika',
              social:Share.Social.WHATSAPP,
              message: item.description,
              subject:item.description,
              url: "file://"+localContent
            }
            
            singleShareOnWhatzapp(shareOptions);
          }
        }else{
          checkPermission(social)
        }
    }
    const checkPermission = async (social=false) => {
    
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
         
        if (Platform.OS === 'ios') {
          downloadImage(social);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              handleDownload(social);
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };

      
    const handleDownload = async (social=false) => {

          setIsDownloading(true);
          let date = new Date();
          let image_URL = item.downloadable ? item.downloadable : item.image
          
          let ext = getExtention(image_URL);
          ext = '.' + ext[0];
          const { config, fs } = RNFetchBlob;

          let PictureDir = fs.dirs.PictureDir;
          let options = {
            fileCache: true,
            addAndroidDownloads: {
              // Related to the Android only
              useDownloadManager: true,
              notification: true,
              path:PictureDir +'/MoodAfrika_' + Math.floor(date.getTime() + date.getSeconds() / 2) +ext,
              description: 'Image',
            },
          };
          config(options)
            .fetch('GET', image_URL)
            .then(res => {
             
              imagePath = res.path() ;
              console.log('imagePath',imagePath);
              setLocalContent(res.data);
              setIsDownloading(false);
              if(social == 'whatzapp'){
                  const shareOptions = {
                    title: 'Share via MoodAfrika',
                    social:Share.Social.WHATSAPP,
                    message: item.description,
                    subject:item.description,
                    url: "file://"+imagePath
                  }
                  
                  singleShareOnWhatzapp(shareOptions);
              }
              
            });
          
        
      };

      const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };


    return (
            <>
                  <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                    <FontAwesome
                        style={styles.icon}
                        name="share"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.textIcon}></Text>
                </TouchableOpacity>
                
                <BottomSheet  ref={bottomSheet} height={windowHeight*0.35} >
                    <View style={styles.titleContainer}>
                        <Text style={styles.shareTitleText}>Partagez sur {uploadProgress}%:</Text>
                    </View>
                    
                    
                    <View style={{flex:1}}>
                    <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                            <SocialIcon
                                buttonTitle="sms"
                                btnType="comment"
                                color="#fff"
                                backgroundColor={COLORS.primary}
                                onPress={() => console.log('first')}
                            />
                            <SocialIcon
                                buttonTitle="Whatsapp"
                                btnType="whatsapp"
                                color="#fff"
                                backgroundColor="#25D366"
                                onPress={() => checkBeforeShare('whatzapp')}
                            />
                            
                            <SocialIcon
                                buttonTitle="Facebook"
                                btnType="facebook"
                                color="#4867aa"
                                backgroundColor="#e6eaf4"
                                onPress={() => console.log('firs')}
                            />
                            <SocialIcon
                                icon="MaterialIcons"
                                buttonTitle="Autres"
                                btnType="more-horiz"
                                color="#4867aa"
                                backgroundColor="#e6eaf4"
                                onPress={() => otherShareApi(item)}
                            />
                            {/* 
                            <SocialIcon
                                buttonTitle="Snapchat"
                                btnType="snapchat-ghost"
                                color="#FFF"
                                backgroundColor="#FFFC00"
                                onPress={() => console.log('first')}
                            />
                            <SocialIcon
                                buttonTitle="Plus"
                                btnType="snapchat-ghost"
                                color={COLORS.black}
                                backgroundColor='rgba(52, 52, 52, 0.1)'
                                onPress={() => console.log('first')}
                            />
                            */}

                        </ScrollView>
                        <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                            <SocialIcon
                                buttonTitle="copier le lien"
                                btnType="link"
                                color={COLORS.black}
                                backgroundColor='rgba(52, 52, 52, 0.1)'
                                onPress={() => console.log('first')}
                            />
                            
                            <SocialIcon
                                buttonTitle="Telecharger"
                                btnType="download"
                                color={COLORS.black}
                                backgroundColor='rgba(52, 52, 52, 0.1)'
                                onPress={() => checkBeforeShare(null)}
                            />
                            

                        </ScrollView>
                        
                    </View>
                </BottomSheet>
            </>
    );
};

export default ShareButton;

const styles = StyleSheet.create({
    titleContainer:{
        paddingTop:10,
        alignItems:'center',
        width:windowWidth,
    
    },
    icon: {
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        padding:10,
        borderRadius:99,
        marginRight:10
        
      },
      textIcon: {
        color: "white",
        textAlign: "center",
        marginRight:10
      },
      shareTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        
      },
});

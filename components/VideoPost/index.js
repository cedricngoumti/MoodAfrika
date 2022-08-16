import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableWithoutFeedback ,Image, ActivityIndicator} from 'react-native'
import Video from 'react-native-video';
import { COLORS } from '../../utils/Colors';
import { windowHeight,windowWidth } from '../../utils/Dimensions';



const VideoPost = ({item,index,activeIndex,activeTabs}) => {
    const [isStarted,setIsStarted] = useState(false)
    const [isPaused, setisPaused] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [lastPress, setLastPress] = useState(0);
    const [percent, setPercent] = useState(0)
    //Video Reference
    const video = useRef(null);

    

    const onManualPress = async () => {
        const time = new Date().getTime();
        const delta = time - lastPress;
        const DOUBLE_PRESS_DELAY = 300;
        
        if(delta < DOUBLE_PRESS_DELAY){
            console.log("Double Press");
            setLastPress(time);
        }else{
            
            setLastPress(time);
        }
        setIsStarted(!isPaused)
        setisPaused(!isPaused);
        //pausePlay().then().catch(err=>console.error(err))
    }

    useEffect(() => {
        console.log('activeTabs',activeTabs)
            if((index < activeIndex + 2   ) && (index > activeIndex - 2 )){
                if(activeTabs==1){

                
                    setisPaused(!(index == activeIndex));

                }else{
                    setisPaused(true)
                }
            }
            
            //if(!((index < activeIndex + 4   ) && (index > activeIndex - 4 ))){
              //  video.current.seek(0)
            //}
    
      }, [activeIndex,activeTabs])
     
      
    
    
    
    

    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center', width:windowWidth, height:windowHeight, position: "relative" }}>
                    <TouchableWithoutFeedback onPress={onManualPress}>

                        <Video
                            
                            ref={video}
                            onLoadStart={e => console.log(e)}
                            onLoad={() => {
                                
                                setIsLoading(false)
                                //setisPaused(false)
                                video.current.seek(0); // this will set first frame of video as thumbnail
                            }}
                            onProgress={e => {//setPercent(parseInt((e.currentTime / e.seekableDuration)*100))
                                //console.log(percent);
                            }}
                            paused={isPaused}
                            source={{uri:item.video}}
                            resizeMode={'contain'}
                            posterResizeMode={'cover'}
                            poster={ 'https://moodafrika.bonaberifc.com/assets/img/defaultcover.jpg' }
                            style={[StyleSheet.absoluteFillObject]}
                            repeat={true}
                            playInBackground={false}
                            playWhenInactive={false}
                            
                        />

                    </TouchableWithoutFeedback>
                    {(isStarted && isPaused &&!isLoading   ) ? (<TouchableWithoutFeedback onPress={onManualPress}>
                        <Image source={require('../../assets/play-button.png')} style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            height: 30, width: 30,
                            tintColor: '#cacaca'
                        }} /> 
                    </TouchableWithoutFeedback>):null}
                    {isLoading && (<>
                         
                        <ActivityIndicator 
                                style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    paddingBottom:windowHeight*0.1,
                                    tintColor: '#cacaca'
                                }}
                                size={'large'}
                                color={'#cacaca'}
                        />
                    </>)}
                    </View>
    )
}

export default VideoPost

const styles = StyleSheet.create({

    backgroundVideo: {
      position: 'absolute',
      width:'100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  
})




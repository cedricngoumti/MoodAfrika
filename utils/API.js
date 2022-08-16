import Share from 'react-native-share'

export const addTextStory = async (descriptionText,userPhone) =>{
    try{
        let reponse = await fetch(`https://uneplace.juristecemac.net/public/voiture/create?descriptionText=${descriptionText}&userPhone=${userPhone}`);
        let res = await reponse.json()
       
        return res
    } catch(error){
        console.error(error)
    }
}

export const ConnexionUser = async (userid,social,picture,username) =>{
    console.log('yoken 2', userid);
    try{
        let reponse = await fetch(`http://watch.balazstudio.com/public/user/create?userid=${userid}&picture=${picture}&social=${social}&username=${username}`);
        let res = await reponse.json()
       
        return res
    } catch(error){
        console.error(error)
    }
}

export const fetchPostApi = async (userid=null,page=null) => {
    const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
    const API_URL = `https://bonaberifc.com/apimood/public/post?me=${userid}&page=${page}`;
    
    const data = await fetch(API_URL, {
       headers: {
         Authorization: API_KEY,
         
       },
     }); 
     
     const { posts } = await data.json();
     
     //const  videos  = data.videos;
     return posts;
};

export const fetchCommentsApi = async (postId) => {
  const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
  const API_URL = `https://moodafrika.bonaberifc.com/api_getComments?postId=${postId}`;
  const data = await fetch(API_URL, {
     headers: {
       Authorization: API_KEY,
       Accept: 'application/json',
        'Content-Type': 'application/json'
     },
   }); 
 
   
   return await data.json();
};


export const fetchUserApi = async () => {
  const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
  const API_URL = `https://bonaberifc.com/apimood/public/user`;
  const data = await fetch(API_URL, {
     headers: {
       Authorization: API_KEY,
       Accept: 'application/json',
        'Content-Type': 'application/json'
     },
   }); 
 
   
   return await data.json();
};

export const fetchRoomApi = async () => {
  const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
  const API_URL = `https://bonaberifc.com/apimood/public/rooms`;
  const data = await fetch(API_URL, {
     headers: {
       Authorization: API_KEY,
       Accept: 'application/json',
        'Content-Type': 'application/json'
     },
   }); 
 
   
   return await data.json();
};

export const fetchLikesApi = async (postId,userid) => {
  const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
  const API_URL = `https://moodafrika.bonaberifc.com/api_getLikes?postId=${postId}&userid=${userid}`;
  const data = await fetch(API_URL, {
     headers: {
       Authorization: API_KEY,
       Accept: 'application/json',
        'Content-Type': 'application/json'
     },
   }); 
 
   
   return await data.json();
};


export const fetchUserPostApi = async (userid,$me=false,limit=false,start=false) => {
  const API_KEY = "563492ad6f91700001000001ba23a3d005f6448b86f12731d9c6ddfe";
  const API_URL = `https://moodafrika.bonaberifc.com/api_user_posts?userid=${userid}&limit=${limit}&start=${start}&me=${me}`;
  const data = await fetch(API_URL, {
     headers: {
       Authorization: API_KEY,
       
     },
   }); 
 
   //const { posts } = await data.json();
   //const  videos  = data.videos;
   return await data.json();
};

export const otherShareApi = async (item) => {
    console.log("open comment");
      const shareOptions = {
          message: item.image,
          
          
      }
      try {
          const ShareResponse = await Share.open(shareOptions)
      }catch(error){
          console.log(error);
      }
}

export const singleShareOnWhatzapp = async (options) => {
    try {
        await Share.shareSingle(options).then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
        const { isInstalled } = await Share.isPackageInstalled(
          "com.whatsapp.android"
        );
  
        /*if (isInstalled) {
          await Share.shareSingle(customOptions);
        } else {
          alert(
            "Whatsapp not installed",
            "Whatsapp not installed, please install.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        }*/
      } catch (err) {
        console.log(err);
      }
}

import {Linking, Platform} from 'react-native'
export const dialCall = (phone) => {

  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phone}`;
  }
  else {
    phoneNumber =   `telprompt:${phone}`;
  }

  Linking.openURL(phoneNumber);
};

import Moment from 'moment';

export const convertDateToFrench = (dt) => {
    Moment.locale('fr');
    
    const a = Moment();
    const b = Moment(dt);
    const c= a.diff(b,'days')
    if(c > 365){
       return Moment(dt).format(' DD MMM. YYYY HH:mm');
    }else if( c >= 2 ){
       return Moment(dt).format(' DD MMM.  HH:mm');
    }else{
      if(Moment(dt).format(' DD MM.') == Moment().format(' DD MM.')){
        return Moment(dt).format(' HH:mm');
      }else if(Moment().format('DD')-Moment(dt).format('DD') == 1){
        return Moment(dt).format('[Hier]  HH:mm');
      }else{
        return Moment(dt).format(' DD MMM.  HH:mm');
      }
    }
}
import React,{createContext,useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { auth } from '../utils/Firebase';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//rimport * as Facebook from 'expo-facebook';
import { ConnexionUser, fetchPostApi } from '../utils/API';
import SoundPlayer from 'react-native-sound-player';






export const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [value, setValue] = useState(0)
    const [pause, setPause] = useState(true)
    const [podcast, setPodCast] = useState(null)
    const [loading, setLoading] = useState(true);
    const [posts, setPosts]= useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
      async function LoadPosts(){
        const data =  user? await fetchPostApi(user.userid,page):await fetchPostApi(false,page);
        setPosts([...posts,...data]);
      }

      LoadPosts()
      
    }, [])

    useEffect(() => {
      async function localStorageData(){
        const storagedUser = await AsyncStorage.getItem('@MoodAfrika_Auth:user')

          if (storagedUser){
            
            const userDataLocal = JSON.parse(storagedUser)
              setUser(userDataLocal)
              
              setLoading(false)
          }else{
              setLoading(false)
          }
      }

      localStorageData()
      
    }, [])

    return (
            <AuthContext.Provider 
                value={{
                    page,
                    setPage,
                    posts,
                    setPosts,
                    user, 
                    setUser,
                    loading,
                    podcast,
                    pause,
                    setPodCast,
                    SoundPlayer,
                    playSound : async (url) => {
                      try {

                        SoundPlayer.loadUrl(url)
                        const sound = new Promise((resolve, reject) => {
                        SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
                            SoundPlayer.play()
                            setPause(false)
                            resolve(success)     
                            
                        })
                        
                      }); 
                        
                      await sound
                      //SoundPlayer.stop()
                      } catch (e) {
                        console.log(`cannot play the sound file`, e);
                      }
                    },
                    resumeSound : async () =>{
                      try {
                        SoundPlayer.resume()
                        
                        //getInfo()
                        setPause(false)
                      } catch (e) {
                        console.log(`cannot play the sound file`, e)
                      }
                    },
                    pauseSound : async () =>{
                      try {
                        SoundPlayer.pause()
                        //getInfo()
                        setPause(true)
                      } catch (e) {
                        console.log(`cannot play the sound file`, e)
                      }
                    },
                    stopSound : async () =>{
                      try {
                        SoundPlayer.stop()
                        //getInfo()
                        setPause(true)
                        setPodCast(null)
                      } catch (e) {
                        console.log(`cannot play the sound file`, e)
                      }
                    },
                    getInfo : async() => { // You need the keyword `async`
                      try {
                        const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
                        return info // {duration: 12.416, currentTime: 7.691}
                      } catch (e) {
                        console.log('There is no song playing', e)
                      }
                    },
                    gLogin:async () => {
                      
                    },
                    fbLogin: async () => {
                      try{
                        if(email=='cedricngoumti@gmail.com' && password=='dim1992'){
                                
                        }
                        const userData = {
                          userid:13,
                          userToken: 'gyugsu',
                          username:'Shelby\'s',
                          userPhone:'655742128',
                          picture:'http://moodafrika.bonaberifc.com/./assets/img/user/13/image/271399893_1013474739383730_3354707301596175858_n.jpg'
                        }
                        const userObject = JSON.stringify(userData)
                        try {
                          await AsyncStorage.setItem('@MoodAfrika_Auth:user', userObject)
                          setUser(userData)
                        } catch (e) {
                          // saving error
                        }
                        
                    } catch(e){
                        console.log(e)
                    }
                      
                    
                    },
                    login: async(email,password) =>{
                      
                      
                     // await signInWithEmailAndPassword(auth, email,password).then((userCredential) => {
                        // Signed in 
                       // console.log('userCredentials',userCredential.user);
                        //setUser(userCredential.user);
                        // ...
                      //})
                      //.catch((error) => {
                        //const errorCode = error.code;
                        //const errorMessage = error.message;

                        //console.log('userCredentials',error.code)
                        // ..
                      //});
                      
                      //auth
                      //.createUserWithEmailAndPassword(email,password).then(userCredentials =>{
                        //console.log(userCredentials)
                      //}).catch(err => console.log(err))
                        try{
                            if(email=='cedricngoumti@gmail.com' && password=='dim1992'){
                                    
                            }
                            const userData = {
                              userid:41,
                              userToken: 'gyugsu',
                              username:'LOL.COM',
                              userPhone:'655742128',
                              picture:'http://moodafrika.bonaberifc.com/./assets/img/user/40/image/justepourrire.jpg'
                            }
                            const userObject = JSON.stringify(userData)
                            try {
                              await AsyncStorage.setItem('@MoodAfrika_Auth:user', userObject)
                              setUser(userData)
                            } catch (e) {
                              // saving error
                            }
                            

                    
                            
                        } catch(e){
                            console.log(e)
                        }
                    },
                    loginDirect: async(item) =>{
                      
                      
                      // await signInWithEmailAndPassword(auth, email,password).then((userCredential) => {
                         // Signed in 
                        // console.log('userCredentials',userCredential.user);
                         //setUser(userCredential.user);
                         // ...
                       //})
                       //.catch((error) => {
                         //const errorCode = error.code;
                         //const errorMessage = error.message;
 
                         //console.log('userCredentials',error.code)
                         // ..
                       //});
                       
                       //auth
                       //.createUserWithEmailAndPassword(email,password).then(userCredentials =>{
                         //console.log(userCredentials)
                       //}).catch(err => console.log(err))
                         try{
                             
                             const userData = {
                               userid:item.id,
                               userToken: item.userid,
                               username:item.username,
                               userPhone:item.tel,
                               picture:item.picture
                             }
                             const userObject = JSON.stringify(userData)
                             try {
                               await AsyncStorage.setItem('@MoodAfrika_Auth:user', userObject)
                               setUser(userData)
                             } catch (e) {
                               // saving error
                             }
                             
 
                     
                             
                         } catch(e){
                             console.log(e)
                         }
                     },
                    /*googleLogin: async () => {
                        try {
                          // Get the users ID token
                          const { idToken } = await GoogleSignin.signIn();
              
                          // Create a Google credential with the token
                          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
              
                          // Sign-in the user with the credential
                          await auth().signInWithCredential(googleCredential)
                          // Use it only when user Sign's up, 
                          // so create different social signup function
                          // .then(() => {
                          //   //Once the user creation has happened successfully, we can add the currentUser into firestore
                          //   //with the appropriate details.
                          //   // console.log('current User', auth().currentUser);
                          //   firestore().collection('users').doc(auth().currentUser.uid)
                          //   .set({
                          //       fname: '',
                          //       lname: '',
                          //       email: auth().currentUser.email,
                          //       createdAt: firestore.Timestamp.fromDate(new Date()),
                          //       userImg: null,
                          //   })
                          //   //ensure we catch any errors at this stage to advise us if something does go wrong
                          //   .catch(error => {
                          //       console.log('Something went wrong with added user to firestore: ', error);
                          //   })
                          // })
                          //we need to catch the whole sign up process if it fails too.
                          .catch(error => {
                              console.log('Something went wrong with sign up: ', error);
                          });
                        } catch(error) {
                          console.log({error});
                        }
                      },
                      fbLogin: async () => {
                        try {
                          // Attempt login with permissions
                          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
              
                          if (result.isCancelled) {
                            throw 'User cancelled the login process';
                          }
              
                          // Once signed in, get the users AccesToken
                          const data = await AccessToken.getCurrentAccessToken();
              
                          if (!data) {
                            throw 'Something went wrong obtaining access token';
                          }
              
                          // Create a Firebase credential with the AccessToken
                          const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
              
                          // Sign-in the user with the credential
                          await auth().signInWithCredential(facebookCredential)
                          // Use it only when user Sign's up, 
                          // so create different social signup function
                          // .then(() => {
                          //   //Once the user creation has happened successfully, we can add the currentUser into firestore
                          //   //with the appropriate details.
                          //   console.log('current User', auth().currentUser);
                          //   firestore().collection('users').doc(auth().currentUser.uid)
                          //   .set({
                          //       fname: '',
                          //       lname: '',
                          //       email: auth().currentUser.email,
                          //       createdAt: firestore.Timestamp.fromDate(new Date()),
                          //       userImg: null,
                          //   })
                          //   //ensure we catch any errors at this stage to advise us if something does go wrong
                          //   .catch(error => {
                          //       console.log('Something went wrong with added user to firestore: ', error);
                          //   })
                          // })
                          //we need to catch the whole sign up process if it fails too.
                          .catch(error => {
                              console.log('Something went wrong with sign up: ', error);
                          });
                        } catch(error) {
                          console.log({error});
                        }
                      },*/
                      logout: async () => {
                        AsyncStorage.clear().then( () => {
                          try {
                            setUser(null) 
                          } catch (e) {
                            console.log(e);
                          }
                        })
                          
                        },
                      }}>
                {children}
            </AuthContext.Provider>
        )

}

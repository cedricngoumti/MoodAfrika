export const SEND_STATUS_DONE = 'send_status_done';
export const LOADING_INDICATOR = 'loading_indicator';
export const UPLOADING_INDICATOR_STARTED = 'uploading_indicator_started';
export const UPLOADING_INDICATOR_END = 'uploading_indicator_end';
export const UPLOADING_INDICATOR_SUCCESS = 'uploading_indicator_success';


export const sendPost = (photo,description,userid) => {
    //console.log("Mensagem:",message,", Nome:",contactName,", Email: ",contactEmail);
    //const { currentUser } = firebase.auth();
    //const userEmail = currentUser.email;
   
    return dispatch => {

        dispatch({type: UPLOADING_INDICATOR_STARTED}); // LOADING
        _addPost(photo,description,userid).then(res => {
            if(res.status == 200){
                console.log('message posté');

                dispatch({type: UPLOADING_INDICATOR_SUCCESS});
                dispatch({type: UPLOADING_INDICATOR_END});
            }else{
                //setError(res.error)
                console.log('une erreure est survenue');
                dispatch({type: UPLOADING_INDICATOR_END});
            }
            //setIsLoading(false);
            dispatch({type: UPLOADING_INDICATOR_END});
        })
       
        
        
    }
    

}



 const _addPost = async (photo,description,userid) =>{
    const form = new FormData();
    form.append("image", photo);
    form.append("userid", userid);
    form.append("description", encodeURIComponent(description));

    try{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: form
        };
        
        let reponse = await fetch(`https://bonaberifc.com/apimood/public/post/addPost`,requestOptions);
        let res = await reponse.json()
        console.log(res)
        return res
        
        
    } catch(error){
        console.error(error)
    }
    
}


export const sendStatus = (message,backgroundColorL,textColorL,userid) => {
    //console.log("Mensagem:",message,", Nome:",contactName,", Email: ",contactEmail);
    //const { currentUser } = firebase.auth();
    //const userEmail = currentUser.email;
   
    return dispatch => {

        dispatch({type: UPLOADING_INDICATOR_STARTED}); // LOADING
        _addStatus(message,backgroundColorL,textColorL,userid).then(res => {
            if(res.status == 0){
                console.log('message posté');
                dispatch({type: UPLOADING_INDICATOR_END});
            }else{
                //setError(res.error)
                console.log('une erreure est survenue');
                dispatch({type: UPLOADING_INDICATOR_END});
            }
            //setIsLoading(false);
            dispatch({type: UPLOADING_INDICATOR_END});
        })
       
        
        
    }
    

}



 const _addStatus = async (message,backgroundColorL,textColorL,userid) =>{
    if(message.trim()){
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    description: message,
                    backgroundColor: backgroundColorL,
                    textColor: textColorL,

                 })
            };
            
                let reponse = await fetch(`https://moodafrika.bonaberifc.com/api_postText?userid=${userid}&description=${message}&type=2`,requestOptions);
                let res = await reponse.json()
                //console.log(res)
                return res
            
            
        } catch(error){
            console.error(error)
        }
    }
}

export const sendLike = (userid,postid,number,setNumber,setLiked) => {
    //console.log("Mensagem:",message,", Nome:",contactName,", Email: ",contactEmail);
    //const { currentUser } = firebase.auth();
    //const userEmail = currentUser.email;
   
    return dispatch => {
        const value = parseInt(number) + parseInt(1)
        setNumber(value) 
        //dispatch({type: UPLOADING_INDICATOR_STARTED}); // LOADING
        _addLike(userid,postid).then(res => {
            console.log(res)
            if(res.status == 0){
                //dispatch({type: UPLOADING_INDICATOR_END});
            }else{
                //setError(res.error)
                //dispatch({type: UNLIKE_INDICATOR_END});
                setLiked(false)
                setNumber(parseInt(number)) 
            }
            //setIsLoading(false);
            //dispatch({type: UPLOADING_INDICATOR_END});
        })
        
        
        
    }
    

}

const _addLike = async (userid,postid) =>{
    
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userid: userid,
                    postid: postid,
                    

                 })
            };
            
                let reponse = await fetch(`https://moodafrika.bonaberifc.com/api_postLikes?userid=${userid}&postid=${postid}`,requestOptions);
                let res = await reponse.json()
                //console.log(res)
                return res
            
            
        } catch(error){
            console.error(error)
        }
   
}




export const sendUnLike = (userid,postid,number,setNumber,setLiked) => {
    //console.log("Mensagem:",message,", Nome:",contactName,", Email: ",contactEmail);
    //const { currentUser } = firebase.auth();
    //const userEmail = currentUser.email;
   
    return dispatch => {
        const value = parseInt(number) - parseInt(1)
        setNumber(value) 
        //dispatch({type: UPLOADING_INDICATOR_STARTED}); // LOADING
        _unLike(userid,postid).then(res => {
            console.log(res)
            if(res.status == 0){
                //dispatch({type: UPLOADING_INDICATOR_END});
            }else{
                //setError(res.error)
                //dispatch({type: UNLIKE_INDICATOR_END});
                setLiked(true)
                setNumber(parseInt(number)) 
            }
            //setIsLoading(false);
            //dispatch({type: UPLOADING_INDICATOR_END});
        })
        
        
        
    }
    

}

const _unLike = async (userid,postid) =>{
    
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userid: userid,
                    postid: postid,
                    

                 })
            };
            
                let reponse = await fetch(`https://moodafrika.bonaberifc.com/api_postUnlikes?userid=${userid}&postid=${postid}`,requestOptions);
                let res = await reponse.json()
                //console.log(res)
                return res
            
            
        } catch(error){
            console.error(error)
        }
   
}

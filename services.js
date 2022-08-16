import SoundPlayer from "react-native-sound-player";


module.exports = async function () {
    SoundPlayer.addEventListener('remote-play',()=>{
        SoundPlayer.play()
    })
    SoundPlayer.addEventListener('remote-pause',()=>{
        SoundPlayer.pause()
    })
}
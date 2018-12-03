const player = {}

player.player = document.querySelector('.container .player')
player.video = player.player.querySelector('.video')
player.containerControls = player.player.querySelector('.container-bottom-controls')
player.infoSerie = player.player.querySelector('.info-serie')
player.infoImg = player.player.querySelector('.icon-info')
player.btn_play = player.player.querySelector('.btn')
player.currentTimeVideo = player.player.querySelector('.current-time')
player.durationTimeVideo = player.player.querySelector('.duration-time')
player.containerVolume = player.player.querySelector('.container-volume')
player.fill = player.player.querySelector('.fill') // volume
player.fillTime = player.player.querySelector('.fill-time')
player.seekTime = player.player.querySelector('.seek-time')
player.cursorTime = player.player.querySelector('.cursor-time')
player.iconVolume = player.player.querySelector('.icon-volume')
player.returnPast = player.player.querySelector('.return-button')
player.timePassing = player.player.querySelector('.time-passing-button')
player.settingImg = player.player.querySelector('.settings-controls')
player.settingContent = player.player.querySelector('.container-quality')
player.fullScreen = player.player.querySelector('.screen-button')
player.exitFullScreen = player.player.querySelector('.exitfullscreen')
player.goFullScreen = player.player.querySelector('.fullscreenbutton')
player.containerThumbnailContent = player.player.querySelector('.container-thumbnail-current')
player.thumbnailCurrentTime = player.player.querySelector('.thumbnail-current-time')
player.buttonLowQuality = player.player.querySelector('.low-quality')
player.buttonHdQuality = player.player.querySelector('.hd-quality')
player.video.volume = 0.5

// EVEVENEMENT

player.currentTimeVideo.innerHTML = formatTime(player.video.currentTime) + " " + "/"
player.durationTimeVideo.innerHTML =  "0" + "1" + ":" + "0" + "0" // c pas comme sa ki faut faire en plus c bien facile


window.addEventListener('keydown', (keyDown))


player.btn_play.addEventListener('click', () =>
{
    player.btn_play.classList.contains('play') ? player.btn_play.classList.remove('play') :  player.btn_play.classList.add('play')
    player.btn_play.classList.contains('pause') ? player.btn_play.classList.remove('pause') :  player.btn_play.classList.add('pause')
})
player.btn_play.onclick = playVideo


player.infoImg.addEventListener('click', () =>
{
    player.infoSerie.style.transform = 'translateX(0%)'
    player.infoSerie.style.opacity = '1'
    player.infoImg.style.display = 'none'
})

player.video.addEventListener('click', () =>
{
    player.infoSerie.style.transform = 'translateX(100%)'
    player.infoSerie.style.opacity = '0'
    player.infoImg.style.display = 'block'
})

player.video.addEventListener('timeupdate', () => {
    player.currentTimeVideo.innerHTML = formatTime(player.video.currentTime) + " " + "/"
})

player.iconVolume.addEventListener('mouseover', () =>
{
    player.containerVolume.style.opacity='1'
})
player.iconVolume.addEventListener('click', () =>
{
    player.video.volume = 0
    player.fill.style.transform = `scaleX(${player.video.volume})`
})

player.timePassing.addEventListener('click', () =>
{
    player.video.currentTime = player.video.currentTime + 10
})
player.returnPast.addEventListener('click', () =>
{
    player.video.currentTime = player.video.currentTime - 10
})

player.settingImg.addEventListener('click', () =>
{
    showAndhideElement()
})

player.fullScreen.addEventListener('click', () =>
{
    toggleFullscreen()
})

player.containerVolume.addEventListener('click' , (event) =>
{
    const bounding = player.containerVolume.getBoundingClientRect()
    let ratio = (event.clientX - bounding.left) / bounding.width
    player.video.volume = ratio
    player.fill.style.transform = `scaleX(${ratio})`
})

player.seekTime.addEventListener('click', (_event) =>
{
    const mouseX = _event.clientX
    const bounding = player.seekTime.getBoundingClientRect()
    const ratio = (mouseX - bounding.left) / bounding.width
    const time = ratio * player.video.duration
    console.log(time)

    player.video.currentTime = time
})

player.seekTime.addEventListener('mousemove', (_event) =>
{
    const mouseX = _event.clientX
    const bounding = player.seekTime.getBoundingClientRect()
    const ratio = (mouseX - bounding.left) / bounding.width * 100
    const ratio_deux = (mouseX - bounding.left) / bounding.width
    player.containerThumbnailContent.style.left = ratio + "%"
    const newTime = ratio_deux * player.video.duration
    player.thumbnailCurrentTime.innerHTML = formatTime(Math.floor(newTime))
    player.containerThumbnailContent.style.opacity = '1'
    player.thumbnailCurrentTime.style.opacity = '1'
})
player.seekTime.addEventListener('mouseout', (_event) =>
{
    player.containerThumbnailContent.style.opacity = '0'
    player.thumbnailCurrentTime.style.opacity = '0'
})





// FONCTIONS

function playVideo(){
    player.video.paused ? player.video.play() : player.video.pause()
}

function keyDown(){
    if(event.which == 32)
    {
        playVideo()
        player.btn_play.classList.contains('play') ? player.btn_play.classList.remove('play') :  player.btn_play.classList.add('play')
        player.btn_play.classList.contains('pause') ? player.btn_play.classList.remove('pause') :  player.btn_play.classList.add('pause')
    }
    else if (event.which == 39)
    {
        player.video.currentTime = player.video.currentTime + 5
    }
    else if (event.which == 37)
    {
        player.video.currentTime = player.video.currentTime - 5
    }
    else if (event.which == 38 )
    {
        if (player.video.volume + 0.1 < 1) {
            player.fill.style.transform = `scaleX(${player.video.volume})`
            player.video.volume = player.video.volume + 0.1
        }
        else{
            player.video.volume = 1
            player.fill.style.transform = `scaleX(${player.video.volume})`
        }
    }
    else if (event.which == 40 )
    {
        if (player.video.volume - 0.1>0) {
            player.fill.style.transform = `scaleX(${player.video.volume})`
            player.video.volume = player.video.volume - 0.1
        }
        else{
            player.video.volume = 0
            player.fill.style.transform = `scaleX(${player.video.volume})`
        }

    }
}

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function volumeVid(){
    if (player.video.volume < 0)
    {
        player.video.volume = 0
    }
    else if (player.video.volume >= 1)
    {
        player.video.volume = 1
    }
}

function showAndhideElement(elem) {
    elem = player.settingContent;
    elem.style.display == 'none' ? elem.style.display='block' : elem.style.display='none'
}


function toggleFullscreen(elem)
{
   elem = player.player;
   if (!document.fullscreenElement && !document.mozFullScreenElement &&
   !document.webkitFullscreenElement && !document.msFullscreenElement) {
   if (elem.requestFullscreen) {
     elem.requestFullscreen();
   } else if (elem.msRequestFullscreen) {
     elem.msRequestFullscreen();
   } else if (elem.mozRequestFullScreen) {
     elem.mozRequestFullScreen();
   } else if (elem.webkitRequestFullscreen) {
     elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
   }
 } else {
   if (document.exitFullscreen) {
     document.exitFullscreen();
   } else if (document.msExitFullscreen) {
     document.msExitFullscreen();
   } else if (document.mozCancelFullScreen) {
     document.mozCancelFullScreen();
   } else if (document.webkitExitFullscreen) {
     document.webkitExitFullscreen();
   }
 }
}

const loop = () =>
{
     window.requestAnimationFrame(loop)
     const ratio = player.video.currentTime / player.video.duration
     player.fillTime.style.transform = `scaleX(${ratio})`
}
loop()

const loop_time = () =>
{
    window.requestAnimationFrame(loop_time)
    const bounding = player.fillTime.getBoundingClientRect()
    let ratio = bounding.width
    // if (ratio >= 789)
    // {
    //     ratio = 787
    // }
    player.cursorTime.style.transform = `translateX(${ratio}px)`
}
loop_time()


function changingQuality(){
    const playerVid = player.video
    let currentSource = playerVid.currentSrc
    let newSource = playerVid.src = "audio-video/PeakyBlindersHD.mp4"
    console.log(playerVid.currentSrc)
    let actualTime = player.video.currentTime

    playerVid.addEventListener('timeupdate', () =>{
        actualTime = player.video.currentTime
    })

    player.buttonHdQuality.addEventListener('click', () =>
        {
            playerVid.removeAttribute('src')
            playerVid.setAttribute('src', newSource)
            let newTime = player.video.currentTime + actualTime
            console.log(playerVid.currentSrc)
        })
}

changingQuality()


// var loadVideo = function(movieUrl) {
//     console.log('loadVideo()');
//     $videoLoading.show();
//     var isReady = function (event) {
//             console.log('video.isReady(event)', event.type);
//             video.removeEventListener('canplay', isReady);
//             video.removeEventListener('loadedmetadata', isReady);
//             $videoLoading.hide();
//             video.currentTime = 0;
//             video.play();
//         },
//         whenPaused = function() {
//             console.log('video.whenPaused()');
//             video.removeEventListener('pause', whenPaused);
//             video.addEventListener('canplay', isReady, false);
//             video.addEventListener('loadedmetadata', isReady, false); // Sometimes Firefox don't trigger "canplay" event...
//             video.src = movieUrl; // Change actual source
//         };
//
//     if (video.src && !video.paused) {
//         video.addEventListener('pause', whenPaused, false);
//         video.pause();
//     }
//     else whenPaused();
// };
// const loop_thumb = () =>
// {
//     window.requestAnimationFrame(loop_thumb)
//     const bounding = player.fillTime.getBoundingClientRect()
//     let ratio = bounding.width
//     player.cursorTime.style.transform = `translateX(${ratio}px)`
// }
// loop_thumb()

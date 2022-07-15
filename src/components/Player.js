import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';
// import { Style } from '../styles/app.scss';
// import { FontAwsomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay } from '@fortawesome/free-solid-svg-icons';



const Player = ({setIsPlaying, isPlaying, currentSong, audioRef, setSongInfo, songInfo, songs, setCurrentSong}) => {
    // UseEffect
    useEffect(() => {
        songs.forEach( s =>  s.id !== currentSong.id ? s.active = false : s.active = true);
    })   
    // Event handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
        }else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
    
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    const dragHandler = (e) => {
        setSongInfo({...songInfo, currentTime: e.target.value});
        audioRef.current.currentTime = e.target.value;
    }
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        // console.log(currentIndex);
        if(direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            // console.log(`next index is ${currentIndex + 1}`);
            // console.log(`songs length is  ${songs.length}`);
        }
        if(direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        
        if(isPlaying) audioRef.current.play();
        // playAudio(isPlaying, audioRef);

        // MY WAY
        // if(direction === 'skip-forward') {
        //     if(currentIndex >= songs.length - 1) {
        //         setCurrentSong(songs[0]);
        //     } else {
        //         setCurrentSong(songs[currentIndex + 1]);
        //     }
        // } if(direction === 'skip-back') {
        //     if(currentIndex <= 0) {
        //         setCurrentSong(songs[songs.length - 1])
        //     } else {
        //         setCurrentSong(songs[currentIndex - 1]);
        //     }
        // }

    }
    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}
                    className="track">
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range" />
                        <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                {/* <FontAwsomeIcon icon={faPlay}/> */}
                {/* <FaAngleLeft /> */}
                <div className="icon-container skip-back">
                    <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} icon={faAngleLeft} />
                </div>
                <div className={`icon-container ${isPlaying ? 'pause' : 'play'}`}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={playSongHandler}/>
                </div>
                <div className="icon-container skip-forward">
                    <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} icon={faAngleRight} />
                </div>
                
                
               
                {/* <FaAngleRight /> */}
            </div>
        </div>
    )
}

export default Player;
import React, {useState, useRef} from "react";
// adding styles
import "./styles/app.scss";
// ADDING COMPONENTS
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from "./components/Nav";
// import LibrarySong from "./components/LibrarySong";
// adding util
import data from "./data";
// import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
});
  const [libraryStatus, setLibraryStatus] = useState(false);
  // Event handlers
  const timeUpdatehandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = (roundedCurrent / roundedDuration) * 100;
    // const animation = 100 / roundedCurrent;
    // console.log('OLD', (roundedCurrent / roundedDuration) * 100);
    // console.log('NEW', (roundedCurrent / roundedDuration) * 1000);
    setSongInfo({
      ...currentSong,
      currentTime: current,
      duration,
      animationPercentage: animation})
}
const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  if(isPlaying) audioRef.current.play();
}

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav
      setLibraryStatus={setLibraryStatus}
      libraryStatus={libraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player
        setCurrentSong={setCurrentSong}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}/>
      <Library
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}/>
      <audio
          onTimeUpdate={timeUpdatehandler}
          onLoadedMetadata={timeUpdatehandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;

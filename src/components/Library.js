import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong
                                        setSongs={setSongs}
                                        songs={songs}
                                        isPlaying={isPlaying}
                                        audioRef={audioRef}
                                        song={song}
                                        setCurrentSong={setCurrentSong}
                                        id={song.id}
                                        key={song.id}/>)}
                {/* <LibrarySong song={songs}/> */}
            </div>
        </div>
    )
}

export default Library;
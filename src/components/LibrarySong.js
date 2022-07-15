import React from 'react';

const LibrarySong = ({ song, setCurrentSong, audioRef, isPlaying, songs, setSongs }) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        // Add active state
        songs.forEach( s =>  s.id !== song.id ? s.active = false : s.active = true);
        // check is fong is playing
        if(isPlaying) audioRef.current.play();
        // setSongs(newSongs);
    }
    
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;
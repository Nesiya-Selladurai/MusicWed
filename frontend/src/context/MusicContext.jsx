import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Singleton audio instance
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Audio on mount
    if (!audioRef.current) {
      console.log("[MusicEngine] Initializing Singleton Audio Instance...");
      const audio = new Audio();
      audio.preload = "auto";
      
      // Basic event setup
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onTimeUpdate = () => setProgress(audio.currentTime);
      const onDurationChange = () => setDuration(audio.duration);
      const onEnded = () => playNext();
      const onError = (e) => {
        console.error("[MusicEngine] Audio Error:", audio.error);
        setIsPlaying(false);
      };

      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('durationchange', onDurationChange);
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);

      audioRef.current = audio;
      setIsReady(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const getAuthHeader = () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const { token } = JSON.parse(userInfo);
        return { Authorization: `Bearer ${token}` };
      }
    } catch (e) {}
    return {};
  };

  const fetchUserData = async () => {
    try {
      const headers = getAuthHeader();
      if (!headers.Authorization) return;
      const { data } = await axios.get('http://localhost:5000/api/users/me', { headers });
      setLikedSongs(data.likedSongs || []);
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error('[MusicEngine] Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const playSong = async (song, playlist = null) => {
    if (!song || !audioRef.current) return;
    
    console.log("[MusicEngine] Play requested for:", song.title, "Source:", song.audioUrl);

    try {
      const audio = audioRef.current;

      // Update State
      if (playlist && Array.isArray(playlist)) {
        setQueue(playlist);
        const index = playlist.findIndex(s => s._id === song._id);
        setCurrentIndex(index !== -1 ? index : 0);
      } else {
        setQueue([song]);
        setCurrentIndex(0);
      }
      
      setCurrentSong(song);

      const url = song.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      // Change Source
      if (audio.src !== url) {
        audio.pause();
        audio.src = url;
        audio.load();
      }

      // Try to play
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("[MusicEngine] Playback started!");
        }).catch(err => {
          console.warn("[MusicEngine] Playback blocked by browser. User must interact first.", err);
          setIsPlaying(false);
          // Fallback: The UI will show the Play button, user clicks it, it unlocks.
        });
      }
    } catch (error) {
      console.error("[MusicEngine] playSong failed:", error);
    }
  };

  const togglePlayPause = () => {
    if (!currentSong || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("[MusicEngine] Manual play toggle failed:", err));
    }
  };

  const playNext = () => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextSong = queue[nextIndex];
      playSong(nextSong, queue);
    } else {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const playPrevious = () => {
    if (progress > 3) {
      audioRef.current.currentTime = 0;
    } else if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevSong = queue[prevIndex];
      playSong(prevSong, queue);
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const changeVolume = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleLike = async (songId) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/me/like/${songId}`, {}, {
        headers: getAuthHeader()
      });
      setLikedSongs(data);
    } catch (error) {
      console.error('Error toggling like', error);
    }
  };

  const createPlaylist = async (name, songs = []) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/me/playlists`, { name, songs }, {
        headers: getAuthHeader()
      });
      setPlaylists([...playlists, data]);
    } catch (error) {
      console.error('Error creating playlist', error);
    }
  };

  // Expose engine to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.musicEngine = {
        play: (url) => {
          if (audioRef.current) {
            audioRef.current.src = url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            audioRef.current.play();
          }
        },
        status: () => ({
          isPlaying,
          currentSong: currentSong?.title,
          src: audioRef.current?.src,
          isReady
        })
      };
    }
  }, [isPlaying, currentSong, isReady]);

  return (
    <MusicContext.Provider
      value={{
        likedSongs,
        playlists,
        toggleLike,
        createPlaylist,
        fetchUserData,
        currentSong,
        isPlaying,
        queue,
        progress,
        duration,
        volume,
        playSong,
        togglePlayPause,
        playNext,
        playPrevious,
        seek,
        changeVolume,
        isReady
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

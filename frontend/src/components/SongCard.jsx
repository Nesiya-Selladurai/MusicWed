import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const SongCard = ({ song, playlist }) => {
  const { playSong, currentSong, isPlaying, likedSongs, toggleLike } = useMusic();
  const isActive = currentSong?._id === song._id;
  const isLiked = likedSongs.some(id => id === song._id || id?._id === song._id);

  const handleLike = (e) => {
    e.stopPropagation();
    console.log("[SongCard] Like clicked for song:", song.title);
    toggleLike(song._id);
  };

  const handlePlay = () => {
    console.log("[SongCard] Card clicked! Calling playSong for:", song.title);
    playSong(song, playlist);
  };

  return (
    <div className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors duration-300 group cursor-pointer relative" onClick={handlePlay}>
      <div className="relative aspect-square mb-4 drop-shadow-lg">
        <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover rounded-md" />
        
        <button 
          onClick={handleLike}
          className="absolute top-2 right-2 text-white hover:scale-110 transition opacity-0 group-hover:opacity-100"
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'fill-primary text-primary' : 'text-gray-400 hover:text-white'}`} />
        </button>

        <div className={`absolute bottom-2 right-2 w-12 h-12 bg-primary flex items-center justify-center rounded-full shadow-xl transition-all duration-300 transform translate-y-4 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0'} hover:scale-105`}>
            <Play className="w-6 h-6 fill-black text-black ml-1" />
        </div>
      </div>
      <div>
        <h3 className={`font-semibold truncate ${isActive ? 'text-primary' : 'text-white'}`}>{song.title}</h3>
        <p className="text-sm text-gray-400 truncate mt-1">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;

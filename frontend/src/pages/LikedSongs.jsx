import React from 'react';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/SongCard';

const LikedSongs = () => {
  const { likedSongs } = useMusic();

  return (
    <div className="pb-24">
      <div className="flex items-end gap-6 mb-8 pt-8 px-4">
        <div className="w-48 h-48 bg-gradient-to-br from-indigo-600 to-blue-400 rounded-sm shadow-2xl flex items-center justify-center">
            <svg className="w-20 h-20 text-white fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div>
          <p className="text-sm font-bold tracking-widest uppercase mb-2">Playlist</p>
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 mt-2">Liked Songs</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-bold text-white">Streamify</span>
            <span>•</span>
            <span>{likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}</span>
          </div>
        </div>
      </div>

      <div className="bg-black/20 p-6 rounded-xl min-h-[50vh]">
        {likedSongs.length === 0 ? (
           <div className="text-center py-20 text-gray-400 flex flex-col items-center">
             <Heart className="w-16 h-16 mb-4 text-gray-500" />
             <h2 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h2>
             <p>Save songs by tapping the heart icon.</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {likedSongs.map((song) => (
              <SongCard key={song._id} song={song} playlist={likedSongs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Also import Heart since we use it
import { Heart } from 'lucide-react';

export default LikedSongs;

import React from 'react';
import { Heart, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

const Library = () => {
  const navigate = useNavigate();
  const { likedSongs, playlists } = useMusic();

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Library</h1>
      
      {likedSongs.length === 0 && playlists.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-[#181818] rounded-xl p-10">
          <h2 className="text-2xl font-bold text-white mb-2">Your library is empty.</h2>
          <p>Start liking songs or create a playlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div onClick={() => navigate('/liked-songs')} className="col-span-2 row-span-2 bg-gradient-to-br from-indigo-600 to-blue-400 p-6 rounded-md flex flex-col justify-end group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-300"></div>
            <div className="mb-4 text-white z-10 w-full overflow-hidden">
              <p className="opacity-80 mt-2 line-clamp-2">The songs you loved most. Play them anytime, anywhere.</p>
            </div>
            <div className="z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Liked Songs</h2>
              <p className="text-white font-semibold">{likedSongs.length} liked {likedSongs.length === 1 ? 'song' : 'songs'}</p>
            </div>
            <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary flex items-center justify-center rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
               <Heart className="w-6 h-6 fill-black text-black" />
            </div>
          </div>
          
          {playlists.map((playlist) => (
            <div key={playlist._id} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors duration-300 group cursor-pointer">
              <div className="relative aspect-square mb-4 drop-shadow-lg bg-[#333] flex items-center justify-center rounded-md overflow-hidden">
                  <Music className="w-12 h-12 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400 truncate mt-1">Playlist • {playlist.songs?.length || 0} songs</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;

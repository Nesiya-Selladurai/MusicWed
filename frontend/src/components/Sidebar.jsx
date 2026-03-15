import React, { useState } from 'react';
import { Home, Search, Library, PlusCircle, HeartIcon, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { createPlaylist } = useMusic();
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName.trim()) return;
    await createPlaylist(playlistName);
    setShowModal(false);
    setPlaylistName('');
    navigate('/library');
  };

  return (
    <>
      <div className="w-64 bg-black text-gray-400 p-6 flex flex-col gap-6 h-full border-r border-gray-800">
        <div className="text-white text-2xl font-bold mb-4 tracking-wider flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="bg-primary text-black rounded-full p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </span>
          Streamify
        </div>
        
        <div className="flex flex-col gap-4">
          <NavLink to="/" className={({isActive}) => `flex items-center gap-4 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`}>
            <Home className="w-6 h-6" /> <span className="font-semibold text-sm">Home</span>
          </NavLink>
          <NavLink to="/search" className={({isActive}) => `flex items-center gap-4 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`}>
            <Search className="w-6 h-6" /> <span className="font-semibold text-sm">Search</span>
          </NavLink>
          <NavLink to="/library" className={({isActive}) => `flex items-center gap-4 hover:text-white transition-colors duration-200 ${isActive ? 'text-white' : ''}`}>
            <Library className="w-6 h-6" /> <span className="font-semibold text-sm">Your Library</span>
          </NavLink>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-4 hover:text-white transition-colors duration-200 group">
            <div className="bg-gray-400 group-hover:bg-white text-black p-1 rounded-sm"><PlusCircle className="w-4 h-4"/></div> 
            <span className="font-semibold text-sm">Create Playlist</span>
          </button>
          <button onClick={() => navigate('/liked-songs')} className="flex items-center gap-4 hover:text-white transition-colors duration-200 group">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-300 text-white p-1 rounded-sm"><HeartIcon className="w-4 h-4 fill-current"/></div>
            <span className="font-semibold text-sm">Liked Songs</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-800">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-gray-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-semibold text-sm truncate">{user.username}</span>
                  <button onClick={logout} className="text-xs text-left text-gray-400 hover:text-white transitions">Log out</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <NavLink to="/login" className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition text-center text-sm">Log in</NavLink>
              <NavLink to="/signup" className="px-6 py-2 border border-gray-600 text-white font-bold rounded-full hover:scale-105 transition text-center text-sm hover:border-white">Sign up</NavLink>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-[#282828] p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create playlist</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6"/></button>
            </div>
            <form onSubmit={handleCreatePlaylist}>
              <input 
                type="text"
                autoFocus
                placeholder="My Playlist #1"
                className="w-full bg-[#3e3e3e] text-white px-4 py-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-white font-bold hover:scale-105 transition rounded-full">Cancel</button>
                <button type="submit" disabled={!playlistName.trim()} className="px-6 py-2 bg-primary text-black font-bold rounded-full hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

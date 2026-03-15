import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const Player = () => {
  const { currentSong, isPlaying, togglePlayPause, playNext, playPrevious, progress, duration, volume, changeVolume, seek } = useMusic();

  if (!currentSong) return null;

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="h-24 bg-[#181818] border-t border-gray-800 flex items-center justify-between px-6 z-50">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/4">
        <img src={currentSong.imageUrl} alt={currentSong.title} className="w-14 h-14 rounded-md shadow-lg" />
        <div>
          <h4 className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs hover:underline cursor-pointer">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-2/4 max-w-[722px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-gray-400 hover:text-white transition"><Shuffle className="w-4 h-4" /></button>
          <button onClick={playPrevious} className="text-gray-400 hover:text-white transition"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button onClick={togglePlayPause} className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition transform">
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
          </button>
          <button onClick={playNext} className="text-gray-400 hover:text-white transition"><SkipForward className="w-5 h-5 fill-current" /></button>
          <button className="text-gray-400 hover:text-white transition"><Repeat className="w-4 h-4" /></button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full text-xs text-gray-400">
          <span>{formatTime(progress)}</span>
          <div className="w-full h-1 bg-gray-600 rounded-full flex-1 relative cursor-pointer group" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            seek(pos * duration);
          }}>
            <div className="h-full bg-white group-hover:bg-primary rounded-full" style={{ width: `${(progress / duration) * 100}%` }}></div>
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" style={{ left: `calc(${(progress / duration) * 100}% - 4px)` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end w-1/4 gap-2">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group relative" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            changeVolume(Math.max(0, Math.min(1, pos)));
        }}>
          <div className="h-full bg-white group-hover:bg-primary rounded-full" style={{ width: `${volume * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Player;

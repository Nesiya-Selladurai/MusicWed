import React, { useState, useEffect } from 'react';
import { api } from '../api.js';
import { Search as SearchIcon, ChevronLeft } from 'lucide-react';
import SongCard from '../components/SongCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreSongs, setGenreSongs] = useState([]);
  const [fetchingGenre, setFetchingGenre] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setSongs([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setSelectedGenre(null); // Clear selected genre when searching
      try {
        const { data } = await api.get(`/api/search?q=${query}`);
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error searching songs', error);
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setFetchingGenre(true);
    try {
      const { data } = await api.get(`/api/songs/genre/${genre}`);
      setGenreSongs(data);
    } catch (error) {
      console.error('Error fetching genre songs', error);
    } finally {
      setFetchingGenre(false);
    }
  };

  const filteredSongs = songs; // State already holds filtered songs from the backend

  return (
    <div className="pb-24">
      <div className="sticky top-0 bg-background/95 backdrop-blur-md pt-4 pb-4 z-10 -mt-4 mb-6 -mx-6 px-6 border-b border-gray-800">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-transparent rounded-full leading-5 bg-[#242424] text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-black focus:ring-0 sm:text-sm transition-colors duration-200"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {query ? (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Top results</h2>
              {filteredSongs.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                  {filteredSongs.map(song => <SongCard key={song._id} song={song} playlist={filteredSongs} />)}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <h3 className="text-xl font-bold text-white mb-2">No results found for "{query}"</h3>
                  <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
                </div>
              )}
            </div>
          ) : selectedGenre ? (
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setSelectedGenre(null)}
                  className="mr-4 p-2 rounded-full bg-[#181818] hover:bg-[#282828] text-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h2 className="text-3xl font-bold">{selectedGenre}</h2>
              </div>
              
              {fetchingGenre ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : genreSongs.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                  {genreSongs.map(song => <SongCard key={song._id} song={song} playlist={genreSongs} />)}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <p>No songs found for this genre yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Browse all</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {['Pop', 'Hip-Hop', 'Rock', 'Indie', 'Tamil', 'Workout', 'Chill', 'Sleep', 'Focus', 'Jazz', 'Classical'].map((genre, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleGenreClick(genre)}
                    className={`aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer shadow-lg transform hover:scale-105 transition duration-300`} 
                    style={{backgroundColor: `hsl(${200 + (i * 30) % 160}, 70%, 40%)`}}
                  >
                    <h3 className="text-xl font-bold text-white">{genre}</h3>
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-black/20 rounded-full blur-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;

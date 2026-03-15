import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongCard from '../components/SongCard';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/songs');
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tamilSongs = songs.filter(song => song.language === 'Tamil');
  const englishSongs = songs.filter(song => song.language === 'English');

  const renderSection = (title, data, sectionKey) => {
    const isExpanded = expandedSection === sectionKey;
    const items = isExpanded ? data : data.slice(0, 6);
    
    return (
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">{title}</h2>
          {data.length > 6 && (
            <span 
              onClick={() => setExpandedSection(isExpanded ? null : sectionKey)}
              className="text-sm text-gray-400 font-semibold hover:underline cursor-pointer"
            >
              {isExpanded ? 'Show less' : 'Show all'}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 transition-all">
          {items.map((song) => (
            <SongCard key={song._id} song={song} playlist={data} />
          ))}
        </div>
      </section>
    );
  };

  const hindiSongs = songs.filter(song => song.language === 'Hindi');

  return (
    <div className="pb-24">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Good evening</h1>
      </div>

      {renderSection('Trending Now', songs, 'trending')}
      {tamilSongs.length > 0 && renderSection('Top Tamil Songs', tamilSongs, 'tamil')}
      {englishSongs.length > 0 && renderSection('Top English Songs', englishSongs, 'english')}
      {hindiSongs.length > 0 && renderSection('Top Hindi Songs', hindiSongs, 'hindi')}
    </div>
  );
};

export default Home;

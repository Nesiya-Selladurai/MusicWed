import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import LandingPage from './pages/LandingPage';
import LikedSongs from './pages/LikedSongs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { useMusic } from './context/MusicContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentSong } = useMusic();
  const { user, loading } = useAuth();

  if (loading) return null;

  // Global click listener to "prime" audio engine for Safari/Chrome autoplay policies
  const handleFirstClick = () => {
    if (window.musicEngine && !window.musicEngine.primed) {
      console.log("[App] Priming Audio Engine on first interaction...");
      window.musicEngine.play("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      const audio = document.getElementsByTagName('audio')[0];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      window.musicEngine.primed = true;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col bg-background text-white" onClick={handleFirstClick}>
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-surface to-background px-6 py-4">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/library" element={<Library />} />
                      <Route path="/liked-songs" element={<LikedSongs />} />
                      <Route path="/welcome" element={<LandingPage />} />
                    </Routes>
                  </div>
                </div>
                {currentSong && <Player />}
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import Song from '../models/Song.js';
import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Playlist from '../models/Playlist.js';
import User from '../models/User.js';

// ---- SONGS ----
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongsByLanguage = async (req, res) => {
  try {
    const songs = await Song.find({ language: req.params.language });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongsByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const songs = await Song.find({ 
      $or: [
        { genre: genre },
        { language: genre }
      ]
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSongsByArtist = async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.artist });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    const createdSong = await song.save();
    res.status(201).json(createdSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- ARTISTS ----
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    const createdArtist = await artist.save();
    res.status(201).json(createdArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- ALBUMS ----
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({}).populate('songs');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const album = new Album(req.body);
    const createdAlbum = await album.save();
    res.status(201).json(createdAlbum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- PLAYLISTS ----
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({}).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    const createdPlaylist = await playlist.save();
    res.status(201).json(createdPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- SEARCH ----
export const searchSongs = async (req, res) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i');
    const songs = await Song.find({
      $or: [{ title: regex }, { artist: regex }, { album: regex }]
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- USER ----
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedSongs').populate({
      path: 'playlists',
      populate: { path: 'songs' }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLikeSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isLiked = user.likedSongs.includes(songId);
    if (isLiked) {
      user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
    } else {
      user.likedSongs.push(songId);
    }
    await user.save();
    
    const updatedUser = await User.findById(user._id).populate('likedSongs');
    
    res.json(updatedUser.likedSongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlaylistForUser = async (req, res) => {
  try {
    const { name, songs } = req.body;
    const playlist = new Playlist({ name, songs: songs || [] });
    const createdPlaylist = await playlist.save();
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.playlists.push(createdPlaylist._id);
    await user.save();
    
    res.status(201).json(createdPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

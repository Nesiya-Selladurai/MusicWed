import express from 'express';
import {
  getSongs,
  getSongById,
  getSongsByLanguage,
  getSongsByGenre,
  createSong,
  getArtists,
  createArtist,
  getAlbums,
  createAlbum,
  getPlaylists,
  createPlaylist,
  searchSongs,
  getSongsByArtist,
  getUserData,
  toggleLikeSong,
  createPlaylistForUser
} from '../controllers/musicController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/search').get(searchSongs);

router.route('/songs').get(getSongs).post(createSong);
router.route('/songs/:id').get(getSongById);
router.route('/songs/language/:language').get(getSongsByLanguage);
router.route('/songs/genre/:genre').get(getSongsByGenre);
router.route('/songs/artist/:artist').get(getSongsByArtist);

router.route('/artists').get(getArtists).post(createArtist);
router.route('/albums').get(getAlbums).post(createAlbum);
router.route('/playlists').get(getPlaylists).post(createPlaylist);

// User routes - Protected
router.route('/users/me').get(protect, getUserData);
router.route('/users/me/like/:songId').post(protect, toggleLikeSong);
router.route('/users/me/playlists').post(protect, createPlaylistForUser);

export default router;

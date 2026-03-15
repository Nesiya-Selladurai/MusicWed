import mongoose from 'mongoose';

const playlistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    coverImage: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  },
  { timestamps: true }
);

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;

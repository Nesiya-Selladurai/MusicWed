import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    googleId: { type: String },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

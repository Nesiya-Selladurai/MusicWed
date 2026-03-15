import mongoose from 'mongoose';

const songSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    language: { type: String, required: true },
    genre: { type: String },
    duration: { type: Number },
    imageUrl: { type: String },
    audioUrl: { type: String, required: true },
    releaseYear: { type: Number },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', songSchema);
export default Song;

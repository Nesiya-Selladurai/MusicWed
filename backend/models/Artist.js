import mongoose from 'mongoose';

const artistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    language: { type: String },
  },
  { timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;

import mongoose from 'mongoose';
import Song from './models/Song.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const songsData = [

  {
    title: 'Why This Kolaveri Di',
    artist: 'Anirudh Ravichander',
    album: '3',
    language: 'Tamil',
    genre: 'Pop/R&B',
    duration: 250,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/06WhyThisKolaveriDi/06%20-%20Why%20This%20Kolaveri%20Di.mp3',
    releaseYear: 2011
  },
  {
    title: 'Ethir Neechal',
    artist: 'Anirudh Ravichander',
    album: 'Ethir Neechal',
    language: 'Tamil',
    genre: 'Pop',
    duration: 215,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Ethir-Neechal.mp3',
    releaseYear: 2013
  },
  {
    title: 'Google Google',
    artist: 'Harris Jayaraj, Vijay',
    album: 'Thuppakki',
    language: 'Tamil',
    genre: 'Dance',
    duration: 282,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5eafece?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Google-Google.mp3',
    releaseYear: 2012
  },
  {
    title: 'Kannuladha',
    artist: 'Anirudh Ravichander',
    album: '3',
    language: 'Tamil',
    genre: 'Remix',
    duration: 190,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/06WhyThisKolaveriDi/02%20-%20Kannuladha.mp3',
    releaseYear: 2011
  },
  {
    title: 'Kangal Irandal',
    artist: 'James Vasanthan',
    album: 'Subramaniapuram',
    language: 'Tamil',
    genre: 'Melody',
    duration: 228,
    imageUrl: 'https://images.unsplash.com/photo-1516280440502-8610f4435967?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Kangal-Irandal.mp3',
    releaseYear: 2008
  },
  {
    title: 'Aga Naga',
    artist: 'A.R. Rahman',
    album: 'Ponniyin Selvan',
    language: 'Tamil',
    genre: 'Soul',
    duration: 198,
    imageUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Aga-Naga.mp3',
    releaseYear: 2023
  },
  {
    title: 'Mun Andhi',
    artist: 'Harris Jayaraj',
    album: '7aum Arivu',
    language: 'Tamil',
    genre: 'Pop/Melody',
    duration: 215,
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Mun-Andhi.mp3',
    releaseYear: 2011
  },
  {
    title: 'Nee Partha Vizhigal',
    artist: 'Anirudh Ravichander',
    album: '3',
    language: 'Tamil',
    genre: 'Melody',
    duration: 216,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Nee-Partha-Vizhigal.mp3',
    releaseYear: 2011
  },
  {
    title: 'Oru Kal Oru Kannadi',
    artist: 'Harris Jayaraj',
    album: 'OKOK',
    language: 'Tamil',
    genre: 'Pop',
    duration: 215,
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Oru-Kal-Oru-Kannadi.mp3',
    releaseYear: 2012
  },
  {
    title: 'Adhaaru Adhaaru',
    artist: 'Harris Jayaraj',
    album: 'Yennai Arindhaal',
    language: 'Tamil',
    genre: 'Mass',
    duration: 305,
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop',
    audioUrl: 'https://archive.org/download/tamil-melody-hits/Adhaaru-Adhaaru.mp3',
    releaseYear: 2015
  }
];

export const seedData = async ({ force = false } = {}) => {
  try {
    const existingCount = await Song.countDocuments();
    if (existingCount > 0 && !force) {
      console.log(`Seed skipped: database already contains ${existingCount} song(s).`);
      return;
    }

    if (force) {
      await Song.deleteMany();
      console.log('Existing data cleared.');
    }

    await Song.insertMany(songsData);
    console.log('Final stabilization of database complete!');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  connectDB().then(() => {
    seedData().then(() => process.exit(0)).catch(() => process.exit(1));
  });
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 bg-black z-50 flex flex-col justify-center items-center text-center p-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>
            
            <div className="z-10 bg-black/40 p-12 rounded-3xl backdrop-blur-md border border-white/10 max-w-3xl transform transition-all duration-1000 translate-y-0 hover:-translate-y-2 relative shadow-[0_0_100px_rgba(30,215,96,0.2)]">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="bg-primary text-black rounded-full p-4 hover:scale-110 transition cursor-pointer shadow-lg shadow-primary/50">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                    </span>
                    <h1 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Streamify</h1>
                </div>
                
                <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto font-medium">Listening is everything. Millions of songs and podcasts. No credit card needed.</p>
                
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-primary hover:bg-[#1fdf64] hover:scale-105 active:scale-95 text-black font-bold py-4 px-12 rounded-full transition duration-300 flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_rgba(30,215,96,0.3)]"
                >
                    <Play className="fill-current w-5 h-5" /> Start Listening
                </button>
            </div>
        </div>
    )
}

export default LandingPage;

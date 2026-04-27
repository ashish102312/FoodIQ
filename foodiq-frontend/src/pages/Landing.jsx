import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Scan, PieChart, Camera, X } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleScannerClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/scanner');
      return;
    }

    const lastScanStr = localStorage.getItem('lastGuestScanTimestamp');
    if (lastScanStr) {
      const lastScan = parseInt(lastScanStr, 10);
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - lastScan < oneDay) {
        setShowModal(true);
        return;
      }
    }

    localStorage.setItem('lastGuestScanTimestamp', Date.now().toString());
    navigate('/scanner');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f9f6]">
      {/* Navbar */}
      <nav className="px-10 py-6 flex justify-between items-center bg-transparent">
        <div className="text-2xl font-extrabold text-primary tracking-wide">
          FoodIQ
        </div>
        <div className="gap-8 flex items-center text-sm font-semibold text-gray-800">
          <Link to="/" className="text-primary border-b-2 border-primary pb-1">Home</Link>
          <Link to="#" className="hover:text-primary transition-colors">Product</Link>
          <Link to="#" className="hover:text-primary transition-colors">Sports</Link>
          <Link to="#" className="hover:text-primary transition-colors">Reports</Link>
          <Link to="#" className="hover:text-primary transition-colors">Menu</Link>
          <Link to="/login" className="hover:text-primary transition-colors ml-4">Login</Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-10 py-12 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-20 bg-white rounded-[2rem] shadow-sm p-12 relative overflow-hidden min-h-[550px]">
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/11610-231571879_medium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-[1]"></div>
          
          <div className="md:w-1/2 pr-10 z-10 relative">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Welcome to FoodIQ - Your Personalized Nutrition Intelligence.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
              Leverage AI-driven insights to make informed dietary choices and optimize your health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-secondary transition-all">
                <User size={20} className="fill-white" />
                Get Started
              </Link>
              <button onClick={handleScannerClick} className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-primary text-primary font-semibold rounded-full shadow-sm hover:bg-emerald-50 transition-all">
                <Camera size={20} />
                Try Scanner (Guest)
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0 relative z-10 flex justify-end">
            <img 
              src="/salad_bowl.png" 
              alt="Healthy Salad Bowl" 
              className="w-[450px] h-[450px] object-cover rounded-[2rem] shadow-xl"
            />
          </div>

          {/* Decorative background circle */}
          <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50 z-[2]"></div>
        </div>
        
        {/* How It Works */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center pb-20">
          <h3 className="text-lg font-bold text-gray-900 mb-12 uppercase tracking-widest">How It Works</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-primary mb-4">
                <User size={36} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-gray-800">1. Profile</p>
            </div>
            
            <div className="hidden md:block w-32 h-[1px] bg-gray-300"></div>

            <div className="flex flex-col items-center text-center">
              <div className="text-primary mb-4">
                <Scan size={36} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-gray-800">2. Scan Menu</p>
            </div>

            <div className="hidden md:block w-32 h-[1px] bg-gray-300"></div>

            <div className="flex flex-col items-center text-center">
              <div className="text-primary mb-4">
                <PieChart size={36} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-gray-800">3. Insights</p>
            </div>
          </div>
        </div>
      </main>

      {/* Limit Reached Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Camera size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Limit Reached!</h2>
              <p className="text-gray-600 mb-8">
                You've used your free guest scan for today. Please login or create a free account to unlock unlimited scans and personalized insights.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/login" className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-secondary transition-colors">
                  Login to Continue
                </Link>
                <Link to="/register" className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

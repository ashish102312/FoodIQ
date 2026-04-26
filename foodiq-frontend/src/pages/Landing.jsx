import React from 'react';
import { Link } from 'react-router-dom';
import { User, Scan, PieChart } from 'lucide-react';

const Landing = () => {
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
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-20 bg-white rounded-[2rem] shadow-sm p-12 relative overflow-hidden">
          
          <div className="md:w-1/2 pr-10 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Welcome to FoodIQ - Your Personalized Nutrition Intelligence.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
              Leverage AI-driven insights to make informed dietary choices and optimize your health.
            </p>
            
            <Link to="/register" className="inline-flex items-center gap-3 px-6 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-secondary transition-all">
              <User size={20} className="fill-white" />
              Get Started - Create Your Free Profile
            </Link>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0 relative z-10 flex justify-end">
            <img 
              src="/salad_bowl.png" 
              alt="Healthy Salad Bowl" 
              className="w-[450px] h-[450px] object-cover rounded-[2rem] shadow-xl"
            />
          </div>

          {/* Decorative background circle */}
          <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50 z-0"></div>
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
    </div>
  );
};

export default Landing;

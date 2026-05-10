import React, { useState } from 'react';
import { Dumbbell, Bike, User as UserIcon, Timer, Zap, Droplets, Target, Calculator } from 'lucide-react';
import Navbar from '../components/Navbar';

const Sports = () => {
  const [weight, setWeight] = useState(70);
  const [intensity, setIntensity] = useState('moderate');
  
  const calculateNeeds = () => {
    const base = weight * 35;
    const factor = intensity === 'high' ? 1.5 : intensity === 'moderate' ? 1.2 : 1.0;
    return Math.round(base * factor);
  };

  const sports = [
    {
      icon: <Bike size={32} className="text-blue-500" />,
      title: "Endurance Sports",
      subtitle: "Running, Cycling",
      items: ["High carb recommendations", "Timing strategies", "Electrolyte tracking"]
    },
    {
      icon: <Dumbbell size={32} className="text-emerald-500" />,
      title: "Strength Training",
      subtitle: "Bodybuilding, Powerlifting",
      items: ["High protein targets", "Muscle gain macros", "Supplement suggestions"]
    },
    {
      icon: <Zap size={32} className="text-orange-500" />,
      title: "Weight Class Sports",
      subtitle: "Boxing, Wrestling",
      items: ["Weight cut strategies", "Rehydration protocols"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f9f6]">
      <Navbar />

      {/* Header - Dark Hub */}
      <div className="bg-gray-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Sports Nutrition Hub</h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Fuel your performance with sport-specific nutrition plans designed for elite athletes and fitness enthusiasts.
            </p>
            <div className="flex gap-6 mt-10">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-emerald-900/50 text-emerald-400 rounded-2xl mb-2"><Zap /></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recovery</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-900/50 text-blue-400 rounded-2xl mb-2"><Droplets /></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hydration</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-orange-900/50 text-orange-400 rounded-2xl mb-2"><Timer /></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Performance</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img src="/salad_bowl.png" alt="Athlete Meal" className="w-full h-80 object-cover rounded-3xl shadow-2xl rotate-3" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1 text-gray-400">Target Protein</p>
              <p className="text-3xl font-black text-primary">185g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sport Specific Plans */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-gray-400">Sport-Specific Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-emerald-50 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{s.title}</h3>
              <p className="text-primary font-bold text-sm mb-6">{s.subtitle}</p>
              <ul className="space-y-3">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Sports Nutrition Calculator */}
      <section className="py-24 px-6 bg-gray-900 text-white rounded-t-[60px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-emerald-400 font-bold mb-8 uppercase tracking-widest text-xs">
            <Calculator size={16} /> Interactive Tool
          </div>
          <h2 className="text-4xl font-extrabold mb-12">Sports Nutrition Calculator</h2>
          
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Body Weight (kg)</label>
                <input 
                  type="range" min="40" max="150" value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full accent-emerald-500 bg-white/10 rounded-lg h-2"
                />
                <p className="mt-4 text-3xl font-black text-white">{weight} kg</p>
              </div>
              <div>
                <label className="block text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Training Intensity</label>
                <div className="flex gap-3">
                  {['low', 'moderate', 'high'].map((v) => (
                    <button 
                      key={v} 
                      onClick={() => setIntensity(v)}
                      className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${intensity === v ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-500/10 p-8 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Estimated Daily Needs</p>
                <p className="text-5xl font-black">{calculateNeeds()} <span className="text-lg font-normal text-white/50">kcal/day</span></p>
              </div>
              <button className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
                Save to Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete Profile Callout */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Athlete Profile</h4>
                        <p className="text-sm text-gray-500">Professional Level</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-gray-700">Daily Goal Adherence</span>
                            <span className="text-sm font-bold text-primary">92%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[92%] h-full bg-primary rounded-full"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase">Current Phase</p>
                            <p className="text-lg font-bold text-gray-900">Bulking</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase">Activity Level</p>
                            <p className="text-lg font-bold text-gray-900">Pro Athlete</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Your Personal Athlete Profile</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Set your activity level from Sedentary to Pro Athlete and let FoodIQ adjust your macro ratios dynamically based on your training phases.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 font-bold text-gray-800">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-primary"><Target size={18} /></div>
                Connect Strava & Apple Health
            </li>
            <li className="flex items-center gap-3 font-bold text-gray-800">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-primary"><Timer size={18} /></div>
                Recovery Metrics Integration
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Sports;

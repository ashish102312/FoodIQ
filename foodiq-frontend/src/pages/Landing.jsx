import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Scan, PieChart, Camera, X, Zap, Shield, Activity, ChevronRight, Star } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleScannerClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) { navigate('/scanner'); return; }
    const lastScanStr = localStorage.getItem('lastGuestScanTimestamp');
    if (lastScanStr) {
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(lastScanStr, 10) < oneDay) { setShowModal(true); return; }
    }
    localStorage.setItem('lastGuestScanTimestamp', Date.now().toString());
    navigate('/scanner');
  };

  const features = [
    { icon: <Camera size={22} />, title: 'Menu OCR Scanner', desc: 'Snap any restaurant menu. Local Tesseract AI extracts food items instantly.' },
    { icon: <Activity size={22} />, title: 'Live Nutrition Data', desc: 'Real-time calories, protein, carbs, and fat pulled from a verified food database.' },
    { icon: <Shield size={22} />, title: 'Private & Secure', desc: 'All OCR runs locally on your server. No data sent to third-party APIs.' },
    { icon: <PieChart size={22} />, title: 'Smart Dashboard', desc: 'Track weekly trends, protein goals, and personalized health insights.' },
  ];

  const steps = [
    { num: '01', icon: <User size={28} />, title: 'Create Profile', desc: 'Set your dietary preferences and daily goals.' },
    { num: '02', icon: <Scan size={28} />, title: 'Scan Your Menu', desc: 'Upload a menu photo — our OCR does the rest.' },
    { num: '03', icon: <PieChart size={28} />, title: 'Get Insights', desc: 'Instant nutrition breakdown and health score.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[40%] w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
          FoodIQ
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-8">
          <Zap size={12} /> Powered by Local Tesseract OCR · No API Keys Required
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Know What You
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Eat, Instantly.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Snap a restaurant menu, get instant calorie counts, protein scores, and smart food recommendations. 
          FoodIQ is your personal AI nutritionist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleScannerClick}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base
              bg-gradient-to-r from-emerald-500 to-cyan-500
              hover:from-emerald-400 hover:to-cyan-400
              transition-all duration-300 shadow-xl shadow-emerald-500/20"
          >
            <Camera size={18} />
            Try Scanner Free
          </button>
          <Link
            to="/register"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base
              bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20
              transition-all duration-300"
          >
            Create Account <ChevronRight size={16} />
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <div className="flex -space-x-2">
            {['bg-emerald-400', 'bg-cyan-400', 'bg-violet-400', 'bg-amber-400'].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-[#0a0a0f]`} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
          </div>
          <span>Trusted by health-conscious diners</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Everything You Need to Eat Smart</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white/3 border border-white/8 rounded-2xl hover:border-emerald-400/30 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Three Steps to Smarter Eating</h2>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black text-white/5">{s.num}</span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-20%] w-[40%] h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden p-10 text-center border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <h2 className="text-3xl font-bold text-white mb-3 relative">Ready to Eat Smarter?</h2>
          <p className="text-gray-400 mb-8 relative">Start for free. No credit card required.</p>
          <div className="flex gap-4 justify-center relative">
            <button onClick={handleScannerClick}
              className="px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-xl shadow-emerald-500/20">
              Try Scanner Now
            </button>
            <Link to="/register"
              className="px-8 py-3.5 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-600 text-sm">
        © 2026 FoodIQ · Built with Local AI
      </footer>

      {/* Guest Limit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X size={20} />
            </button>
            <div className="mx-auto w-14 h-14 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-2xl flex items-center justify-center mb-5">
              <Camera size={28} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 text-center">Daily Limit Reached</h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              You've used your free guest scan today. Login to unlock unlimited scans and nutrition tracking.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/login" className="w-full py-3 text-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors">
                Login to Continue
              </Link>
              <Link to="/register" className="w-full py-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

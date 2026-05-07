import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Target, Shield, AlertCircle, Zap, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', password: '', 
    goalProtein: 150, preference: 'VEG', allergies: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        preference: formData.preference.toUpperCase().replace('-', '_'),
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : []
      };
      await axios.post('http://localhost:8080/api/auth/register', payload);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">
        <ChevronLeft size={16} /> Back
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Start Your Journey</h2>
          <p className="text-gray-500 text-sm mt-2">Create your personalized nutrition profile</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={16} />
            <p className="text-rose-300 text-xs leading-relaxed">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e)=>setFormData({...formData, name: e.target.value})} 
                  required 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e)=>setFormData({...formData, email: e.target.value})} 
                  required 
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e)=>setFormData({...formData, password: e.target.value})} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Protein Goal (g)</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  type="number" 
                  value={formData.goalProtein} 
                  onChange={(e)=>setFormData({...formData, goalProtein: e.target.value})} 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Preference</label>
              <select 
                value={formData.preference} 
                onChange={(e)=>setFormData({...formData, preference: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="VEG" className="bg-[#1a1a25]">Vegetarian</option>
                <option value="NON_VEG" className="bg-[#1a1a25]">Non-Vegetarian</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Allergies</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                  type="text" 
                  value={formData.allergies} 
                  onChange={(e)=>setFormData({...formData, allergies: e.target.value})} 
                  placeholder="Nuts, Soy..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            Already a member? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

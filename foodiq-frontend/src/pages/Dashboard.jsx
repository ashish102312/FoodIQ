import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Activity, LogOut, Camera, Calendar, Flame, 
  TrendingUp, Award, Zap, ChevronRight, LayoutDashboard,
  Utensils, Clock, User as UserIcon
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('[FoodIQ] Dashboard error:', err);
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth loading feel
      }
    };
    fetchDashboard();
  }, [handleLogout]);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: data?.weeklyProgress || [1800, 2100, 1950, 2400, 2100, 1850, 2200],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#0a0a0f',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111118',
        titleColor: '#94a3b8',
        bodyColor: '#fff',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  };

  const statCards = [
    { label: 'Daily Calories', value: `${data?.dailyIntake || 0} kcal`, sub: 'of 2,500 target', icon: <Flame className="text-orange-500" />, color: 'from-orange-500/20 to-orange-500/5' },
    { label: 'Protein Score', value: `${data?.proteinScore || 0}%`, sub: 'Daily protein goal', icon: <Activity className="text-blue-500" />, color: 'from-blue-500/20 to-blue-500/5' },
    { label: 'Weekly Avg', value: `${Math.round((data?.weeklyProgress?.reduce((a,b)=>a+b, 0) || 0) / (data?.weeklyProgress?.length || 1))} kcal`, sub: 'Last 7 days', icon: <TrendingUp className="text-emerald-500" />, color: 'from-emerald-500/20 to-emerald-500/5' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Side Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-[#0a0a0f]/50 backdrop-blur-xl z-30 hidden lg:flex flex-col p-6">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-10">
          FoodIQ
        </Link>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => navigate('/scanner')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Camera size={18} /> Menu Scanner
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Utensils size={18} /> Food Logs
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <TrendingUp size={18} /> Analytics
          </button>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, {userName}. Here's your health report.</p>
          </div>
          <button 
            onClick={() => navigate('/scanner')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Zap size={18} /> Scan New Meal
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.color} border border-white/10 rounded-3xl p-6 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-lg">Live</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                <h3 className="text-3xl font-black text-white mt-1">{loading ? '...' : stat.value}</h3>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Clock size={12} /> {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Calorie Trend</h3>
                <p className="text-sm text-gray-500">Your intake over the last 7 days</p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                <button className="px-3 py-1.5 text-xs font-bold bg-emerald-500 rounded-lg">Week</button>
                <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-white">Month</button>
              </div>
            </div>
            
            <div className="h-[300px]">
              {loading ? (
                <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
              ) : (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </motion.div>

          {/* Side Panel: Insights */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Award size={20} className="text-amber-400" /> AI Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="font-bold text-emerald-400 text-sm">Great Protein Intake</p>
                  <p className="text-xs text-emerald-400/70 mt-1">
                    Your protein intake is up by 12% this week. Keep hitting those targets!
                  </p>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <p className="font-bold text-amber-400 text-sm">Carb Balance</p>
                  <p className="text-xs text-amber-400/70 mt-1">
                    Your evening carb intake is slightly high. Try a lighter dinner today.
                  </p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 text-sm font-bold bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                View Full Report <ChevronRight size={16} />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-6 shadow-xl shadow-indigo-500/20 relative overflow-hidden group"
            >
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <UserIcon size={40} className="text-white/20 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
              <p className="text-white/70 text-xs mb-6">Unlock deep metabolic insights and personal coaching AI.</p>
              <button className="w-full py-3 bg-white text-indigo-600 font-black rounded-xl text-sm shadow-lg hover:scale-[1.02] transition-all active:scale-95">
                Go Premium
              </button>
            </motion.div>
          </div>
        </div>

        {/* Recent Scans (Simplified List) */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-xs font-bold text-emerald-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl" />)
            ) : (
              [
                { item: 'Chicken Biryani', cal: 350, time: '2 hours ago', score: 82 },
                { item: 'Paneer Tikka', cal: 320, time: 'Yesterday', score: 75 },
                { item: 'Masala Dosa', cal: 300, time: '2 days ago', score: 68 },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                      <Utensils size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{log.item}</p>
                      <p className="text-xs text-gray-500">{log.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-white">{log.cal} kcal</p>
                    <p className={`text-[10px] font-bold ${log.score > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>Score: {log.score}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, Camera, Calendar, Flame } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        if(err.response?.status === 401) {
            handleLogout();
        }
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Intake',
        data: data?.weeklyProgress || [],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <Activity size={28} /> FoodIQ
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">Hi, {userName}</span>
          <button onClick={() => navigate('/scanner')} className="p-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200" title="Scan Menu">
            <Camera size={20} />
          </button>
          <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 rounded-full" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Health Overview</h1>
        
        {data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-orange-100 text-orange-500 rounded-full"><Flame size={28} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Daily Calories</p>
                  <p className="text-2xl font-bold text-gray-900">{data.dailyIntake} kcal</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-blue-100 text-blue-500 rounded-full"><Activity size={28} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Protein Score</p>
                  <p className="text-2xl font-bold text-gray-900">{data.proteinScore}% <span className="text-sm font-normal text-gray-400">of goal</span></p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-4 bg-purple-100 text-purple-500 rounded-full"><Calendar size={28} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Weekly Average</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(data.weeklyProgress.reduce((a,b)=>a+b, 0) / data.weeklyProgress.length)} kcal
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Calorie Trend</h3>
                <div className="h-72">
                  <Line data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Smart Recommendations</h3>
                <div className="flex-1 space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="font-bold text-emerald-800">Eat more Protein</p>
                    <p className="text-sm text-emerald-600 mt-1">You are 25% behind your daily goal. Try adding some Grilled Chicken or Tofu.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="font-bold text-blue-800">Hydration Alert</p>
                    <p className="text-sm text-blue-600 mt-1">Don't forget to drink water! Keep your metabolism active.</p>
                  </div>
                </div>
                <button onClick={() => navigate('/scanner')} className="mt-6 w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-secondary">
                  Scan Next Meal
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

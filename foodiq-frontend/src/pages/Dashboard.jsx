import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, Camera, Calendar, Flame } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-4 bg-gray-100 rounded-full">
                {loading ? <Skeleton circle width={28} height={28} /> : (
                  i === 1 ? <Flame size={28} className="text-orange-500" /> : 
                  i === 2 ? <Activity size={28} className="text-blue-500" /> : 
                  <Calendar size={28} className="text-purple-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">
                  {loading ? <Skeleton width={80} /> : (i === 1 ? "Daily Calories" : i === 2 ? "Protein Score" : "Weekly Average")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? <Skeleton width={120} /> : (
                    i === 1 ? `${data?.dailyIntake} kcal` : 
                    i === 2 ? `${data?.proteinScore}%` : 
                    `${Math.round(data?.weeklyProgress.reduce((a,b)=>a+b, 0) / data?.weeklyProgress.length)} kcal`
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Calorie Trend</h3>
            <div className="h-72">
              {loading ? <Skeleton height="100%" /> : <Line data={chartData} options={{ maintainAspectRatio: false }} />}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Smart Recommendations</h3>
            <div className="flex-1 space-y-4">
              {loading ? (
                <>
                  <Skeleton height={80} className="rounded-xl" />
                  <Skeleton height={80} className="rounded-xl" />
                </>
              ) : (
                <>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="font-bold text-emerald-800">Eat more Protein</p>
                    <p className="text-sm text-emerald-600 mt-1">You are 25% behind your daily goal. Try adding some Grilled Chicken or Tofu.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="font-bold text-blue-800">Hydration Alert</p>
                    <p className="text-sm text-blue-600 mt-1">Don't forget to drink water! Keep your metabolism active.</p>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => navigate('/scanner')} className="mt-6 w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-secondary">
              Scan Next Meal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

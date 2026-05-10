import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Share2, Info, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Reports = () => {
  const lineData = {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    datasets: [{
      label: 'Calorie Intake',
      data: [2100, 2350, 1900, 2200],
      borderColor: '#10b981',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(16, 185, 129, 0.1)'
    }]
  };

  const pieData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      borderWidth: 0
    }]
  };

  const insights = [
    { type: 'warning', text: "You're 15% over on carbs this week compared to your target." },
    { type: 'error', text: "You consistently miss protein targets on weekends." },
    { type: 'success', text: "Great job! 85% goal adherence over the last 30 days." }
  ];

  return (
    <div className="min-h-screen bg-[#f3f9f6]">
      <Navbar />

      {/* Header - Dark Premium Stats */}
      <div className="bg-gray-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 animate-in fade-in slide-in-from-top duration-1000">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/20">
              <TrendingUp size={12} /> Live Performance Data
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Personal Analytics</h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed italic">
              Deep-dive into your nutritional journey with AI-driven trends and compliance tracking.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-sm">
              <Download size={18} /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-secondary transition-all shadow-lg shadow-emerald-500/20">
                <Share2 size={18} /> Share Report
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Weekly Overview Stats - Rolling Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            {[
                { label: "Total Calories", value: "62,400", sub: "Last 30 Days", color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: "Macro Balance", value: "Optimal", sub: "Balanced Nutrition", color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Goal Success", value: "85%", sub: "+12% from last week", color: "text-orange-500", bg: "bg-orange-50" },
                { label: "Consistency", value: "92/100", sub: "Excellent Streak", color: "text-purple-500", bg: "bg-purple-50" }
            ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
                    <p className="text-4xl font-black text-gray-900 mb-2">{s.value}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${s.bg} ${s.color}`}>
                        {s.sub}
                    </div>
                </div>
            ))}
        </div>

        {/* Charts Grid - Dark Accents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <BarChart3 className="text-primary" /> Calorie Trends
                </h3>
                <select className="bg-gray-50 border-none text-gray-500 text-xs font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                </select>
            </div>
            <div className="h-80">
              <Line data={lineData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: false, grid: { display: false } } } }} />
            </div>
          </div>
          
          <div className="bg-gray-900 text-white p-8 md:p-10 rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-right duration-1000">
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-emerald-400">
                <PieChart /> Macro Balance
            </h3>
            <div className="flex-1 flex items-center justify-center relative mb-10">
              <div className="h-56 w-56">
                <Pie data={pieData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency</p>
                <p className="text-3xl font-black text-white">92%</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Protein</p>
                    <p className="text-sm font-black">30%</p>
                </div>
                <div className="text-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Carbs</p>
                    <p className="text-sm font-black">50%</p>
                </div>
                <div className="text-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Fats</p>
                    <p className="text-sm font-black">20%</p>
                </div>
            </div>
          </div>
        </div>

        {/* AI Insights & Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-emerald-50 text-primary rounded-2xl"><TrendingUp size={24} /></div>
                    <h3 className="text-2xl font-bold text-gray-800">AI Insights</h3>
                </div>
                <div className="space-y-6">
                    {insights.map((insight, i) => (
                        <div key={i} className={`p-6 rounded-3xl flex items-start gap-4 border transition-transform hover:scale-[1.02] cursor-default ${
                            insight.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                            insight.type === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-800' :
                            'bg-red-50 border-red-100 text-red-800'
                        }`}>
                            <div className="mt-1">
                                {insight.type === 'success' ? <CheckCircle2 /> :
                                 insight.type === 'warning' ? <Info /> :
                                 <AlertTriangle />}
                            </div>
                            <p className="font-bold leading-relaxed">{insight.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-white/10 text-emerald-400 rounded-2xl"><Calendar size={24} /></div>
                    <h3 className="text-2xl font-bold">Performance Summary</h3>
                </div>
                <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Top Choice</p>
                            <p className="text-xl font-bold">Green Leaf Cafe</p>
                        </div>
                        <div className="text-emerald-400 font-black text-2xl">12x</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Safe Items Found</p>
                            <p className="text-xl font-bold">45 Verified Items</p>
                        </div>
                        <CheckCircle2 className="text-blue-400" />
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Weekly Goal</p>
                            <p className="text-xl font-bold">Weight Maintenance</p>
                        </div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <button className="mt-10 w-full py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    View Comprehensive Report
                </button>
            </div>
        </div>
        {/* Global Nutrition Benchmarks - RAW DATA SECTION */}
        <section className="mt-20 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gray-900 text-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-gray-900">Global Nutrition Benchmarks</h2>
                    <p className="text-gray-500 font-medium">Real-world nutritional data comparisons from across the globe.</p>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest">Region / Country</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-center">Avg. Daily Kcal</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-center">Protein (g)</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-center">Sugar (g)</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-center">Health Score</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {[
                                { region: "North America", kcal: "3,620", protein: "105", sugar: "120", score: "62", trend: "Increasing" },
                                { region: "Western Europe", kcal: "3,340", protein: "98", sugar: "95", score: "78", trend: "Stable" },
                                { region: "East Asia", kcal: "2,850", protein: "88", sugar: "65", score: "85", trend: "Increasing" },
                                { region: "South Asia", kcal: "2,520", protein: "65", sugar: "75", score: "72", trend: "Improving" },
                                { region: "Latin America", kcal: "2,980", protein: "82", sugar: "110", score: "65", trend: "Stable" },
                                { region: "Sub-Saharan Africa", kcal: "2,450", protein: "58", sugar: "45", score: "68", trend: "Improving" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-emerald-50/30 transition-colors group">
                                    <td className="px-8 py-6 font-bold text-gray-900">{row.region}</td>
                                    <td className="px-8 py-6 text-gray-600 font-medium text-center">{row.kcal}</td>
                                    <td className="px-8 py-6 text-emerald-600 font-bold text-center">{row.protein}g</td>
                                    <td className="px-8 py-6 text-orange-500 font-bold text-center">{row.sugar}g</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 justify-center">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: row.score + '%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{row.score}/100</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">
                                        {row.trend}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="mt-12 p-10 bg-gray-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">World Nutrition Analysis</h3>
                    <p className="text-gray-400 max-w-2xl leading-relaxed">
                        Data sourced from the World Health Organization (WHO) and FoodIQ Global Trends. We compare your personal data against these regional averages to provide context on your nutritional performance.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;

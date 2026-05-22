import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { Camera, Upload, AlertCircle, CheckCircle, Plus, Minus, ShoppingCart, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [counts, setCounts] = useState({}); // { foodId: quantity }
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanMenu = async () => {
    if (!fileInputRef.current?.files[0]) return;
    setLoading(true);
    setResults(null);
    setCounts({});
    try {
      const formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]);
      
      const res = await axios.post(`${API_BASE_URL}/api/scan`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(res.data.foods);
    } catch (err) {
      console.error(err);
      alert('Failed to scan image. Make sure backend is running.');
    }
    setLoading(false);
  };

  const updateCount = (foodId, delta) => {
    setCounts(prev => {
      const current = prev[foodId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [foodId]: next };
    });
  };

  const cartSummary = useMemo(() => {
    if (!results) return { protein: 0, calories: 0, items: 0 };
    return results.reduce((acc, food) => {
      const q = counts[food.id] || 0;
      return {
        protein: acc.protein + (food.protein * q),
        calories: acc.calories + (food.calories * q),
        items: acc.items + q
      };
    }, { protein: 0, calories: 0, items: 0 });
  }, [results, counts]);

  const saveAllToIntake = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const itemsToSave = Object.entries(counts).filter(([_, q]) => q > 0);
      
      for (const [foodId, quantity] of itemsToSave) {
        await axios.post(`${API_BASE_URL}/api/intake/add?foodId=${foodId}&quantity=${quantity}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      alert('Successfully added to your daily intake!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (!err.response || (err.response.status !== 401 && err.response.status !== 403)) {
        alert('Failed to save intake.');
      }
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-3xl font-black text-emerald-600">FoodIQ</Link>
            {isLoggedIn ? (
                <Link to="/dashboard" className="px-5 py-2 bg-white rounded-full shadow-sm text-emerald-600 font-bold hover:shadow-md transition-shadow">Dashboard</Link>
            ) : (
                <Link to="/login" className="px-5 py-2 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 transition-colors">Login to Save</Link>
            )}
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-10 flex flex-col items-center border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Scan Your Menu</h2>
            <p className="text-gray-500">Capture a photo to get instant nutritional insights</p>
          </div>
          
          <div 
            className="w-full max-w-xl h-80 border-4 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all group overflow-hidden relative"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <Camera size={32} className="text-gray-400 group-hover:text-emerald-500" />
                </div>
                <p className="text-gray-400 font-bold text-lg">Click to upload menu image</p>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

          {image && (
            <button 
              onClick={scanMenu} 
              disabled={loading}
              className="mt-10 px-12 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-600 hover:translate-y-[-2px] transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin" /> : <Upload size={24} />}
              {loading ? 'Analyzing...' : 'Analyze Menu'}
            </button>
          )}
        </div>

        {results && (
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <CheckCircle className="text-emerald-500 w-8 h-8" />
                    Detected Items ({results.length})
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((food, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-600 uppercase tracking-wider border border-emerald-50">{food.category || 'Food'}</span>
                      <div className="text-right flex flex-col items-end">
                        <span className="px-2.5 py-1 bg-white rounded-lg text-xs font-bold text-gray-700 border border-gray-100 shadow-sm">
                          Net Wt: <span className="text-emerald-600">{food.netWeight || 100}g</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium mt-1">
                          {Math.round(((food.protein || 0) / (food.netWeight || 100)) * 100)}g protein, {Math.round(((food.calories || 0) / (food.netWeight || 100)) * 100)}kcal per 100g
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mt-3">{food.name}</h4>
                    <div className="flex gap-4 mt-2">
                      <p className="text-xs text-gray-500 font-medium">Total Protein: <span className="text-emerald-600 font-bold">{Math.round(food.protein)}g</span></p>
                      <p className="text-xs text-gray-500 font-medium">Total Calories: <span className="text-emerald-600 font-bold">{Math.round(food.calories)} kcal</span></p>
                    </div>
                  </div>

                  {isLoggedIn && (
                    <div className="mt-6 flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                      <button 
                        onClick={() => updateCount(food.id, -1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-bold text-xl text-gray-900">{counts[food.id] || 0}</span>
                      <button 
                        onClick={() => updateCount(food.id, 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-100"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isLoggedIn && results.length > 0 && (
                <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center">
                    <p className="text-emerald-800 font-bold">Login to save your daily intake and track your progress!</p>
                </div>
            )}
          </div>
        )}

        {isLoggedIn && cartSummary.items > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
            <div className="bg-gray-900/95 backdrop-blur-md text-white rounded-3xl p-6 shadow-2xl flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex flex-col border-r border-white/10 pr-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Protein</span>
                  <span className="text-3xl font-black text-emerald-400">{Math.round(cartSummary.protein)}g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Items</span>
                  <span className="text-xl font-bold">{cartSummary.items}</span>
                </div>
              </div>

              <button 
                onClick={saveAllToIntake}
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? <Loader className="animate-spin w-5 h-5" /> : <ShoppingCart size={20} />}
                <span>{saving ? 'Saving...' : `Add to Intake`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Camera, Upload, AlertCircle, CheckCircle, Zap, Flame, Activity, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NutritionBar = ({ label, value, max, color }) => (
  <div className="flex items-center gap-2 mt-1">
    <span className="text-xs text-gray-400 w-16 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
    <span className="text-xs text-gray-300 w-10 text-right">{Math.round(value)}g</span>
  </div>
);

const FoodCard = ({ food, index, isLoggedIn, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(food.dish);
  const [isUpdating, setIsUpdating] = useState(false);

  const score = food.healthScore || 0;
  const label = food.healthLabel || 'Moderate';
  const suggestion = food.suggestion;
  
  const labelColors = {
    'Healthy': { color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
    'Moderate': { color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
    'Indulgent': { color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' }
  };
  
  const { color, bg } = labelColors[label] || labelColors['Moderate'];

  const handleUpdate = async () => {
    if (editedName === food.dish) { setIsEditing(false); return; }
    setIsUpdating(true);
    try {
      // Small delay to simulate AI lookup if needed, or real API call
      // For now, let's just pass it back to parent to handle re-fetch or state update
      await onUpdate(index, editedName);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg ${isUpdating ? 'opacity-50 pointer-events-none' : 'hover:border-emerald-400/40'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input 
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
              autoFocus
            />
            <button onClick={handleUpdate} className="p-1 text-emerald-400 hover:bg-emerald-400/10 rounded">
              <CheckCircle size={16} />
            </button>
          </div>
        ) : (
          <h4 
            className="font-semibold text-white text-sm leading-tight cursor-pointer hover:text-emerald-400 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {food.dish}
          </h4>
        )}
        {!isEditing && <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${bg} ${color}`}>{label}</span>}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Flame size={14} className="text-orange-400" />
        <span className="text-2xl font-bold text-white">{Math.round(food.calories)}</span>
        <span className="text-xs text-gray-400">kcal</span>
        <span className={`ml-auto text-sm font-bold ${color}`}>{score}/100</span>
      </div>

      <NutritionBar label="Protein" value={food.protein} max={50} color="bg-blue-400" />
      <NutritionBar label="Carbs" value={food.carbs} max={100} color="bg-amber-400" />
      <NutritionBar label="Fat" value={food.fat} max={50} color="bg-rose-400" />

      {suggestion && (
        <p className="mt-3 text-[10px] text-gray-500 italic leading-tight">
          "{suggestion}"
        </p>
      )}

      {isLoggedIn && (
        <button className="mt-4 w-full py-2 text-sm font-semibold rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
          + Log Intake
        </button>
      )}
    </div>
  );
};

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);
  const [scanTime, setScanTime] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem('token');

  // New: Extract phrases for chips
  const phrases = rawText
    ? rawText.split(/[\n,;]+/)
        .map(p => p.trim().replace(/[^a-zA-Z ]/g, ''))
        .filter(p => p.length > 3)
        .slice(0, 10)
    : [];

  const handleUpdate = async (index, newName) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/food/search?keyword=${newName}`);
      const matchedFood = res.data?.[0];
      
      if (matchedFood) {
        const updatedFoods = [...results];
        updatedFoods[index] = {
          dish: matchedFood.name,
          calories: matchedFood.calories,
          protein: matchedFood.protein,
          carbs: matchedFood.carbs,
          fat: matchedFood.fat,
          healthScore: Math.round(100 - (matchedFood.calories/10) + (matchedFood.protein*2)), // Local fallback calculation
          healthLabel: matchedFood.calories > 400 ? 'Indulgent' : 'Healthy',
          suggestion: 'Refined search result.'
        };
        setResults(updatedFoods);
      } else {
        // Just update the name if no DB match
        const updatedFoods = [...results];
        updatedFoods[index] = { ...updatedFoods[index], dish: newName };
        setResults(updatedFoods);
      }
    } catch (err) {
      console.error('Failed to fetch nutrition for edited name', err);
    }
  };

  const processFile = (f) => {
    if (!f || !f.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (f.size > 15 * 1024 * 1024) {
      setError('File must be under 15MB.');
      return;
    }
    setFile(f);
    setError(null);
    setResults([]);
    setRawText('');
    setScanTime(null);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(f);
  };

  const handleFileChange = (e) => processFile(e.target.files?.[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files?.[0]);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const clearImage = () => {
    setImage(null); setFile(null); setResults([]); setRawText('');
    setError(null); setScanTime(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const scanMenu = async () => {
    if (!file) return;
    setLoading(true);
    setLoadingStep('Initializing AI Engine...');
    setResults([]);
    setError(null);
    setRawText('');
    setScanTime(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      setTimeout(() => setLoadingStep('Optimizing Image Quality...'), 1000);
      setTimeout(() => setLoadingStep('Extracting Menu Text...'), 2500);
      setTimeout(() => setLoadingStep('Matching Nutrition Data...'), 4500);

      const res = await axios.post('http://localhost:8080/api/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      console.log('[FoodIQ] Backend response:', res.data);

      if (res.data?.success) {
        setResults(Array.isArray(res.data.foods) ? res.data.foods : []);
        setRawText(res.data.rawText || '');
        setScanTime(res.data.scanTime);
      } else {
        setError(res.data?.error || 'Scan returned no results.');
      }
    } catch (err) {
      console.error('[FoodIQ] Scan error:', err);
      if (err.code === 'ECONNABORTED') {
        setError('Scan timed out. Please try a clearer image.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Could not connect to scanner. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          FoodIQ
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link to="/dashboard" className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Dashboard <ChevronRight size={14} />
            </Link>
          ) : (
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Login to save results
            </Link>
          )}
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Zap size={12} /> Local AI-Powered Scanner
          </div>
          <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Scan Your Menu
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Upload a menu photo. Our local OCR engine extracts food items and fetches nutritional data instantly.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="bg-white/3 border border-white/10 rounded-3xl p-6 backdrop-blur mb-6">
          <div
            className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden
              ${dragOver ? 'border-emerald-400 bg-emerald-400/5' : 'border-white/20 hover:border-emerald-400/60 hover:bg-white/3'}
              ${image ? 'h-64' : 'h-52'}`}
            onClick={() => !image && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {image ? (
              <>
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                <button
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 px-4 text-center pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Upload size={24} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Drop your menu image here</p>
                  <p className="text-gray-500 text-xs mt-1">or click to browse · JPG, PNG, WEBP · max 15MB</p>
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <p className="text-rose-300 text-sm">{error}</p>
            </div>
          )}

          {/* Scan Button */}
          {image && (
            <button
              onClick={scanMenu}
              disabled={loading}
              className="mt-5 w-full py-3.5 rounded-xl font-bold text-sm
                bg-gradient-to-r from-emerald-500 to-cyan-500
                hover:from-emerald-400 hover:to-cyan-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 shadow-lg shadow-emerald-500/20
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {loadingStep}
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Analyze Menu
                </>
              )}
            </button>
          )}
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div>
            <div className="h-5 w-40 bg-white/10 rounded-full mb-5 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-full w-3/4 mb-3" />
                  <div className="h-8 bg-white/10 rounded-full w-1/2 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded-full" />
                    <div className="h-2 bg-white/10 rounded-full w-4/5" />
                    <div className="h-2 bg-white/10 rounded-full w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div>
            {/* Detected Chips */}
            {phrases.length > 0 && (
              <div className="mb-8">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Detected Phrases</p>
                <div className="flex flex-wrap gap-2">
                  {phrases.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all cursor-default">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  {results.length} Food{results.length > 1 ? 's' : ''} Detected
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Activity size={12} />
                {scanTime ? `${scanTime}ms` : ''}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((food, i) => (
                <FoodCard key={i} food={food} index={i} isLoggedIn={isLoggedIn} onUpdate={handleUpdate} />
              ))}
            </div>

            {!isLoggedIn && (
              <div className="mt-6 p-4 bg-amber-500/8 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 text-sm font-medium">Guest Mode</p>
                  <p className="text-amber-400/70 text-xs mt-0.5">
                    <Link to="/login" className="underline">Login</Link> to save your scan history and track daily nutrition.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No results */}
        {!loading && image && results.length === 0 && !error && (
          <div className="text-center py-10 text-gray-500">
            <Camera size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No food items detected. Try a clearer or better-lit menu photo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

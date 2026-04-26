import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
    if (!image) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/scan', { base64Image: image.split(',')[1] });
      setResults(res.data.detectedFoods);
    } catch (err) {
      console.error(err);
      alert('Failed to scan image');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-primary">FoodIQ</Link>
            {isLoggedIn ? (
                <Link to="/dashboard" className="text-primary font-semibold hover:underline">Go to Dashboard</Link>
            ) : (
                <Link to="/login" className="text-primary font-semibold hover:underline">Login to Save</Link>
            )}
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Scan Your Menu</h2>
          
          <div 
            className="w-full max-w-lg h-64 border-4 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-emerald-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <Camera size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 font-medium">Click to upload menu image</p>
              </>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

          {image && (
            <button 
              onClick={scanMenu} 
              disabled={loading}
              className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold text-lg shadow-md hover:bg-secondary hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Analyze Menu'}
            </button>
          )}
        </div>

        {results && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><CheckCircle className="text-primary" /> Detected Food Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((food, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="font-bold text-lg text-gray-800">{food}</div>
                  <div className="text-sm text-gray-500 mt-2">Protein: ~20g | Calories: ~350</div>
                  {isLoggedIn && (
                      <button className="mt-4 w-full py-2 bg-emerald-100 text-emerald-800 font-semibold rounded-lg hover:bg-emerald-200">
                          Save Intake
                      </button>
                  )}
                </div>
              ))}
            </div>
            {!isLoggedIn && (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start gap-3">
                    <AlertCircle className="text-yellow-500 shrink-0" />
                    <div>
                        <p className="text-sm text-yellow-700 font-medium">You are in Guest Mode</p>
                        <p className="text-xs text-yellow-600 mt-1"><Link to="/login" className="underline">Login</Link> to get accurate nutritional values, allergy warnings, and track your intake.</p>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

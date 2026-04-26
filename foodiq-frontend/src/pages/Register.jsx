import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', goalProtein: 150, preference: 'veg', allergies: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        allergies: formData.allergies.split(',').map(s => s.trim())
      };
      await axios.post('http://localhost:8080/api/auth/register', payload);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} required className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
          <input type="password" placeholder="Password" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})} required className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
          <input type="number" placeholder="Daily Protein Goal (g)" value={formData.goalProtein} onChange={(e)=>setFormData({...formData, goalProtein: e.target.value})} required className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
          <select value={formData.preference} onChange={(e)=>setFormData({...formData, preference: e.target.value})} className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
          <input type="text" placeholder="Allergies (comma separated)" value={formData.allergies} onChange={(e)=>setFormData({...formData, allergies: e.target.value})} className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none transition-colors">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary hover:text-secondary font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

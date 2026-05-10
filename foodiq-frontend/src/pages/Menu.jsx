import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Leaf, Coffee, Wine, IceCream, Star, Clock, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';

const Menu = () => {
  const navigate = useNavigate();
  const menuCategories = [
    {
      title: "Brunch Specials",
      icon: <Star className="text-yellow-500" />,
      items: [
        { name: "Veggan Brunch", price: "$100.00", desc: "Orange Juice, Coffee, Brownie, Toast", tag: "Vegan" },
        { name: "Gluten Free Brunch", price: "$120.00", desc: "Orange Juice, Coffee, Toast, Brownie, Omelette, Fruits", tag: "Gluten-Free" },
        { name: "Special Omelette", price: "$130.00", desc: "Fresh eggs with seasonal vegetables and artisanal cheese.", tag: "Popular" },
        { name: "Frutal Plate", price: "$30.00", desc: "A fresh selection of seasonal organic fruits.", tag: "Light" }
      ]
    },
    {
      title: "Quick Snacks & Wraps",
      icon: <Utensils className="text-emerald-500" />,
      items: [
        { name: "Tuna Salad", price: "$5.99", desc: "Fresh tuna with garden greens and lemon dressing." },
        { name: "Chicken & Avocado Wrap", price: "$3.99", desc: "Grilled chicken, ripe avocado, and spicy aioli." },
        { name: "California Club", price: "$5.99", desc: "Turkey, bacon, avocado, and sprouts on sourdough." },
        { name: "Spicy Shrimp Tortilla", price: "$4.99", desc: "Sautéed shrimp with cilantro lime crema." }
      ]
    },
    {
      title: "Green Delight Entries",
      icon: <Leaf className="text-emerald-400" />,
      items: [
        { name: "Zen Garden Bowl", price: "$100.00", desc: "Quinoa, roasted chickpeas, kale, and tahini." },
        { name: "Mountain Peak Salad", price: "$145.00", desc: "Wild greens, goat cheese, walnuts, and balsamic." },
        { name: "Forest Mushroom Pasta", price: "$130.00", desc: "Handmade tagliatelle with wild truffles." },
        { name: "Ocean Breeze Platter", price: "$240.00", desc: "Sustainable seafood selection with herb butter." }
      ]
    },
    {
      title: "Cold Drinks & Desserts",
      icon: <Coffee className="text-blue-400" />,
      items: [
        { name: "Honey Tangerine Juice", price: "$5.99", desc: "Freshly squeezed with a hint of local honey." },
        { name: "New! Coconut Water", price: "$5.89", desc: "Raw, organic young coconut water." },
        { name: "Artisanal Brownie", price: "$10.00", desc: "70% dark chocolate with sea salt flakes." },
        { name: "Berry Fusion Tart", price: "$15.00", desc: "Organic berries on a gluten-free almond crust." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f9f6]">
      <Navbar />

      {/* Hero Section - Dark Elegant */}
      <div className="bg-gray-900 text-white py-28 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-top duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                <Heart size={14} className="animate-pulse" /> Curated for Health
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent">The FoodIQ Menu</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
                A selection of gourmet, nutritionally-optimized dishes designed to fuel your body and delight your palate.
            </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {menuCategories.map((cat, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${i * 200}ms` }}>
              <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-6">
                <div className="p-4 bg-white shadow-xl rounded-2xl text-gray-900">
                    {cat.icon}
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{cat.title}</h2>
              </div>

              <div className="space-y-8">
                {cat.items.map((item, j) => (
                  <div key={j} className="group relative bg-white p-6 rounded-3xl border border-gray-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 cursor-pointer overflow-hidden">
                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                            {item.tag && (
                                <span className="px-2 py-0.5 bg-emerald-50 text-primary text-[9px] font-black uppercase tracking-widest rounded-md">
                                    {item.tag}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <span className="text-xl font-black text-gray-900 bg-gray-50 px-4 py-2 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        {item.price}
                      </span>
                    </div>
                    {/* Hover Decoration */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/5 rounded-full group-hover:scale-[10] transition-transform duration-700"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-32 p-12 bg-gray-900 text-white rounded-[50px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="relative z-10 md:w-2/3">
                <h3 className="text-3xl font-black mb-4">Scan This Menu with AI</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Want to see the exact macros for these items? Use our **Smart Menu Scanner** to get instant nutritional breakdowns and personalized health ratings.
                </p>
                <div className="flex gap-6 mt-8">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                        <Clock size={18} /> Instant Results
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                        <Leaf size={18} /> 100% Organic Data
                    </div>
                </div>
            </div>
            <button 
                onClick={() => navigate('/scanner')}
                className="relative z-10 px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:bg-secondary hover:scale-105 transition-all duration-300"
            >
                Launch Scanner
            </button>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-primary/10 to-transparent opacity-50"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-gray-100">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Visit Us At</p>
        <p className="text-gray-900 font-black text-xl mb-2">Av. Stree Address 2396</p>
        <p className="text-primary font-bold">www.foodiq.com</p>
      </footer>
    </div>
  );
};

export default Menu;

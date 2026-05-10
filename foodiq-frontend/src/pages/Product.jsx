import React from 'react';
import { Check, Shield, Zap, Target, BarChart3, Layers, Database, Cpu, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Product = () => {
  const features = [
    { icon: <ImageIcon className="text-emerald-500" />, title: "Smart Menu Scanner", desc: "AI-powered food recognition from restaurant menus with instant macro detection." },
    { icon: <Target className="text-emerald-500" />, title: "Macro Tracking", desc: "Monitor your daily protein, carbs, and calories with precision and ease." },
    { icon: <Shield className="text-emerald-500" />, title: "Allergy Alerts", desc: "Automatic flagging of allergens in menu items based on your personal profile." },
    { icon: <Zap className="text-emerald-500" />, title: "AI Recommendations", desc: "Personalized meal suggestions based on your health goals and dietary needs." },
    { icon: <BarChart3 className="text-emerald-500" />, title: "Progress Dashboard", desc: "Visual charts of your weekly and monthly intake trends." },
  ];

  const plans = [
    {
      name: "Free Tier",
      price: "$0",
      features: ["5 menu scans per day", "Basic macro tracking", "3 allergy profiles", "Weekly reports"],
      button: "Get Started",
      accent: "border-gray-200"
    },
    {
      name: "Pro Tier",
      price: "$9.99",
      period: "/month",
      features: ["Unlimited scans", "Advanced analytics", "Unlimited allergy profiles", "Custom macro goals", "Export to PDF", "API access"],
      button: "Upgrade Now",
      accent: "border-primary border-2 shadow-xl scale-105 bg-white",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Team accounts", "Restaurant partnerships", "White-label solution", "Priority support"],
      button: "Contact Sales",
      accent: "border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f9f6]">
      <Navbar />

      {/* Hero Section - Dark Premium */}
      <div className="bg-gray-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">Our Features & Offerings</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the technology and tools making FoodIQ the world's most intelligent nutritional companion.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Features Overview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-gray-400">Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-gray-400">Pricing Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {plans.map((p, i) => (
              <div key={i} className={`p-10 rounded-3xl border flex flex-col items-center text-center relative ${p.accent}`}>
                {p.popular && <span className="absolute -top-4 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</span>}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-gray-900">{p.price}</span>
                  {p.period && <span className="text-gray-400 font-medium pb-1">{p.period}</span>}
                </div>
                <ul className="space-y-4 mb-10 w-full">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <Check size={18} className="text-primary flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`w-full py-4 rounded-2xl font-bold transition-all ${p.popular ? 'bg-primary text-white hover:bg-secondary shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {p.button}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#f3f9f6]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-gray-400">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {[
              { step: "01", text: "Upload menu photo" },
              { step: "02", text: "AI extracts items" },
              { step: "03", text: "Review nutrition" },
              { step: "04", text: "Track intake" },
              { step: "05", text: "Get recommendations" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center flex-1">
                <div className="text-4xl font-black text-emerald-100 mb-2">{s.step}</div>
                <div className="w-full h-1 bg-emerald-100 mb-4 rounded-full hidden md:block"></div>
                <p className="font-bold text-gray-800">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-gray-500">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-2xl"><Layers className="text-emerald-400" /></div>
              <div>
                <p className="font-bold text-lg">Google Cloud Vision</p>
                <p className="text-gray-400 text-sm italic">Native OCR processing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-2xl"><Database className="text-emerald-400" /></div>
              <div>
                <p className="font-bold text-lg">AI-Powered Database</p>
                <p className="text-gray-400 text-sm italic">Edamam Nutrition API</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-2xl"><Cpu className="text-emerald-400" /></div>
              <div>
                <p className="font-bold text-lg">Real-time Macros</p>
                <p className="text-gray-400 text-sm italic">High-speed calculations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-2xl"><Shield className="text-emerald-400" /></div>
              <div>
                <p className="font-bold text-lg">Secure JWT Auth</p>
                <p className="text-gray-400 text-sm italic">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-20"></div>
      </section>

      {/* Footer Call to Action */}
      <div className="py-20 text-center">
        <Link to="/register" className="inline-block px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-2xl hover:bg-secondary transform hover:scale-105 transition-all text-xl">
          Get Started for Free Today
        </Link>
      </div>
    </div>
  );
};

export default Product;

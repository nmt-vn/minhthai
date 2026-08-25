import React from 'react';
import { 
  Stethoscope, 
  CalendarCheck, 
  Sparkles, 
  Building2, 
  PhoneCall, 
  Search,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'doctors' | 'specialties' | 'ai-triage' | 'appointments' | 'hospitals';
  setActiveTab: (tab: 'home' | 'doctors' | 'specialties' | 'ai-triage' | 'appointments' | 'hospitals') => void;
  appointmentCount: number;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  appointmentCount,
  onOpenBooking
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top emergency bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Hệ thống đặt lịch khám 24/7
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">Hơn 50+ bệnh viện & phòng khám uy tín trên toàn quốc</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:115" className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold transition-colors">
              <PhoneCall className="w-3.5 h-3.5" />
              Cấp cứu: 115
            </a>
            <span className="text-slate-600">|</span>
            <a href="tel:19006868" className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Hotline: 1900 6868
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">Med<span className="text-teal-600">Book</span></span>
                <span className="text-[10px] uppercase font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full border border-teal-200">Y Tế</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Đặt Lịch Khám Nhanh & Trực Tuyến</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-home-btn"
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Trang chủ
            </button>
            <button
              id="nav-specialties-btn"
              onClick={() => setActiveTab('specialties')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'specialties'
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Chuyên khoa
            </button>
            <button
              id="nav-doctors-btn"
              onClick={() => setActiveTab('doctors')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'doctors'
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Bác sĩ giỏi
            </button>
            <button
              id="nav-hospitals-btn"
              onClick={() => setActiveTab('hospitals')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'hospitals'
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Cơ sở y tế
            </button>
            <button
              id="nav-ai-triage-btn"
              onClick={() => setActiveTab('ai-triage')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai-triage'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Tư vấn AI
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-my-appointments-btn"
              onClick={() => setActiveTab('appointments')}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'appointments'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Lịch hẹn</span>
              {appointmentCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-rose-500 rounded-full">
                  {appointmentCount}
                </span>
              )}
            </button>

            <button
              id="nav-quick-book-btn"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-sm transition-all hover:shadow"
            >
              <UserCheck className="w-4 h-4" />
              <span>Đặt khám ngay</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden items-center justify-between gap-1 py-2 border-t border-slate-100 overflow-x-auto text-xs">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-2.5 py-1.5 rounded-md shrink-0 font-medium ${activeTab === 'home' ? 'bg-teal-100 text-teal-800' : 'text-slate-600'}`}
          >
            Trang chủ
          </button>
          <button 
            onClick={() => setActiveTab('specialties')}
            className={`px-2.5 py-1.5 rounded-md shrink-0 font-medium ${activeTab === 'specialties' ? 'bg-teal-100 text-teal-800' : 'text-slate-600'}`}
          >
            Chuyên khoa
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`px-2.5 py-1.5 rounded-md shrink-0 font-medium ${activeTab === 'doctors' ? 'bg-teal-100 text-teal-800' : 'text-slate-600'}`}
          >
            Bác sĩ
          </button>
          <button 
            onClick={() => setActiveTab('hospitals')}
            className={`px-2.5 py-1.5 rounded-md shrink-0 font-medium ${activeTab === 'hospitals' ? 'bg-teal-100 text-teal-800' : 'text-slate-600'}`}
          >
            Bệnh viện
          </button>
          <button 
            onClick={() => setActiveTab('ai-triage')}
            className={`px-2.5 py-1.5 rounded-md shrink-0 font-semibold flex items-center gap-1 ${activeTab === 'ai-triage' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tư vấn AI
          </button>
        </div>
      </div>
    </header>
  );
};

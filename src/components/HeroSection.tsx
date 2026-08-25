import React from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedSpecialtyId: string;
  setSelectedSpecialtyId: (id: string) => void;
  onOpenAiTriage: () => void;
  onSearchSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedSpecialtyId,
  setSelectedSpecialtyId,
  onOpenAiTriage,
  onSearchSubmit,
}) => {
  const quickSymptoms = [
    'Đau ngực, tim đập nhanh',
    'Sốt cao, ho khò khè trẻ em',
    'Ợ chua, đau bao tử',
    'Đau mỏi cột sống thắt lưng',
    'Mất ngủ, chóng mặt',
    'Mẩn ngứa da'
  ];

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    onSearchSubmit();
  };

  return (
    <div className="relative bg-gradient-to-b from-teal-50/70 via-slate-50 to-white py-10 sm:py-14 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-teal-600"></span>
            Nền tảng Y tế kết nối Bác sĩ chuyên khoa & Bệnh viện tuyến đầu
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Đặt Lịch Khám Bệnh Trực Tuyến <br className="hidden sm:inline" />
            <span className="text-teal-700">Nhanh Chóng & Tiện Lợi</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Chủ động chọn bác sĩ đầu ngành, đặt khung giờ khám phù hợp, áp dụng giảm trừ BHYT và nhận phiếu khám điện tử có mã QR ngay lập tức.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-bold text-slate-500 mb-1">Tìm kiếm bác sĩ hoặc triệu chứng</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  placeholder="Bác sĩ, bệnh viện, tức ngực, đau đầu..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Specialty select */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1">Chuyên khoa</label>
              <select
                id="hero-specialty-select"
                value={selectedSpecialtyId}
                onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              >
                <option value="">Tất cả chuyên khoa</option>
                {SPECIALTIES.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.vietnameseName}
                  </option>
                ))}
              </select>
            </div>

            {/* City select */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1">Khu vực</label>
              <div className="relative">
                <select
                  id="hero-city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                >
                  <option value="">Toàn quốc</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex items-end">
              <button
                id="hero-search-submit-btn"
                onClick={onSearchSubmit}
                className="w-full mt-auto py-2.5 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Tìm kiếm</span>
              </button>
            </div>
          </div>

          {/* Quick symptom tags */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Gợi ý triệu chứng:</span>
            {quickSymptoms.map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTagClick(tag)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg transition-colors font-medium cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* AI Symptom Triage Banner CTA */}
        <div className="mt-6 max-w-4xl mx-auto bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
                Chưa rõ nên khám chuyên khoa nào?
                <span className="text-[11px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-semibold">
                  Bác sĩ AI miễn phí
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                Nhập triệu chứng của bạn, AI sẽ phân tích sơ bộ, đánh giá mức độ khẩn cấp và gợi ý chuyên khoa chính xác nhất.
              </p>
            </div>
          </div>
          <button
            id="hero-open-ai-triage-btn"
            onClick={onOpenAiTriage}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-sm shrink-0 flex items-center justify-center gap-2"
          >
            <span>Tư vấn triệu chứng ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Key trust badges */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">100% Bác sĩ chuyên khoa xác thực</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
            <Clock className="w-5 h-5 text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Chủ động chọn giờ, không chờ đợi</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Áp dụng giảm trừ BHYT nhà nước</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
            <CreditCard className="w-5 h-5 text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">Thanh toán tại viện hoặc trực tuyến</span>
          </div>
        </div>
      </div>
    </div>
  );
};

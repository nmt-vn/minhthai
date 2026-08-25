import React from 'react';
import { 
  Coffee, 
  CreditCard, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { PREPARATION_TIPS, EMERGENCY_CONTACTS } from '../data/mockData';

export const HealthTips: React.FC = () => {
  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-amber-600" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-teal-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'Clock':
      default:
        return <Clock className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Cẩm nang bệnh nhân</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hướng Dẫn Chuẩn Bị Trước Khi Đi Khám
          </h2>
          <p className="text-sm text-slate-600">
            Nắm rõ những lưu ý quan trọng để buổi thăm khám diễn ra thuận lợi, kết quả xét nghiệm chính xác và tiết kiệm tối đa thời gian chờ đợi.
          </p>
        </div>

        {/* 4 Cards Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PREPARATION_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mb-3">
                  {getTipIcon(tip.icon)}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{tip.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{tip.desc}</p>
              </div>

              <div className="pt-2 text-[11px] font-bold text-teal-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Khuyến nghị từ Bác sĩ</span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency contact hotlines */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-rose-400 tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                Đường dây nóng cấp cứu & hỗ trợ khẩn cấp 24/7
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Cần trợ giúp khẩn cấp về y tế?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Trong trường hợp người bệnh có dấu hiệu co giật, khó thở dữ dội, ngất xỉu hoặc tai nạn, hãy gọi ngay đường dây nóng cấp cứu 115 hoặc các bệnh viện gần nhất.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {EMERGENCY_CONTACTS.slice(0, 3).map((item, idx) => (
                <a
                  key={idx}
                  href={`tel:${item.number.replace(/\s+/g, '')}`}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-left transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-300 font-medium">{item.name}</div>
                    <div className="text-sm font-extrabold text-white">{item.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

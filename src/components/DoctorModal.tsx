import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  Calendar, 
  Languages, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  doctor,
  onClose,
  onBook
}) => {
  if (!doctor) return null;

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Doctor Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-teal-50 via-emerald-50/50 to-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {doctor.specialtyName}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  {doctor.experienceYears} năm kinh nghiệm
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {doctor.title} {doctor.name}
              </h2>

              <p className="text-sm font-semibold text-teal-700 flex items-center justify-center sm:justify-start gap-1.5">
                <Building2 className="w-4 h-4" />
                {doctor.hospital}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{doctor.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewCount} lượt đánh giá)</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{doctor.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Giới thiệu chuyên môn</h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {doctor.bio}
            </p>
          </div>

          {/* Education & Credentials */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              Quá trình đào tạo & Chức danh
            </h3>
            <ul className="space-y-2">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages & Working days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                Ngày làm việc trong tuần
              </span>
              <p className="text-xs font-semibold text-slate-800">
                {doctor.workingDays.map(d => dayNames[d]).join(', ')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mb-2">
                <Languages className="w-4 h-4 text-teal-600" />
                Ngôn ngữ giao tiếp
              </span>
              <p className="text-xs font-semibold text-slate-800">
                {doctor.languages.join(', ')}
              </p>
            </div>
          </div>

          {/* Available Slots Preview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              Các khung giờ khám tiêu chuẩn
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.timeSlots.map((slot, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold rounded-xl"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="sticky bottom-0 bg-white p-4 sm:p-6 border-t border-slate-200 flex items-center justify-between gap-4 rounded-b-3xl">
          <div>
            <span className="text-xs text-slate-500 block">Chi phí khám dịch vụ</span>
            <span className="text-xl font-extrabold text-teal-700">
              {doctor.consultationFee.toLocaleString('vi-VN')} đ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors"
            >
              Đóng
            </button>
            <button
              id="modal-book-doctor-btn"
              onClick={() => {
                onClose();
                onBook(doctor);
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>Chọn lịch khám</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

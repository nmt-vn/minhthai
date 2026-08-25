import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  Languages,
  ArrowRight
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookAppointment,
}) => {
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div 
      id={`doctor-card-${doctor.id}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
    >
      <div className="p-5">
        {/* Top Header info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-inner"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Bác sĩ đã xác thực">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {doctor.specialtyName}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                {doctor.experienceYears} năm KN
              </span>
            </div>

            <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-1 truncate">
              {doctor.title} {doctor.name}
            </h3>

            <div className="flex items-center gap-1 text-amber-500 mt-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-900">{doctor.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({doctor.reviewCount} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Hospital & Location */}
        <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-start gap-2">
            <Building2 className="w-3.5 h-3.5 text-teal-700 mt-0.5 shrink-0" />
            <span className="font-semibold text-slate-800 line-clamp-1">{doctor.hospital}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span className="text-slate-500 line-clamp-1">{doctor.hospitalAddress}</span>
          </div>
        </div>

        {/* Schedule preview & Days */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Lịch làm việc:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((dayIdx) => {
              const isWorking = doctor.workingDays.includes(dayIdx);
              return (
                <span 
                  key={dayIdx}
                  className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center ${
                    isWorking 
                      ? 'bg-teal-100 text-teal-800' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {dayNames[dayIdx]}
                </span>
              );
            })}
          </div>
        </div>

        {/* Earliest time slot */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/70 px-2.5 py-1.5 rounded-lg font-medium border border-emerald-100">
          <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Khung giờ gần nhất: <strong>{doctor.timeSlots[0]}</strong></span>
        </div>
      </div>

      {/* Footer / Booking Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 block">Giá khám dịch vụ:</span>
          <span className="text-base font-extrabold text-teal-700">
            {doctor.consultationFee.toLocaleString('vi-VN')} đ
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id={`btn-view-doctor-${doctor.id}`}
            onClick={() => onViewProfile(doctor)}
            className="px-3 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            Chi tiết
          </button>
          <button
            id={`btn-book-doctor-${doctor.id}`}
            onClick={() => onBookAppointment(doctor)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 hover:shadow"
          >
            <span>Đặt khám</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

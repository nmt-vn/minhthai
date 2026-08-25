import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  PhoneCall, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { HOSPITALS, SPECIALTIES } from '../data/mockData';
import { Hospital } from '../types';

interface HospitalDirectoryProps {
  onSelectHospitalSpecialty: (specialtyId: string) => void;
  onOpenBooking: () => void;
}

export const HospitalDirectory: React.FC<HospitalDirectoryProps> = ({
  onSelectHospitalSpecialty,
  onOpenBooking,
}) => {
  return (
    <div className="py-10 bg-slate-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Mạng lưới cơ sở y tế đối tác</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bệnh Viện & Phòng Khám Tuyến Đầu
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Hợp tác trực tiếp cùng các bệnh viện công lập hạng đặc biệt, bệnh viện đại học và các hệ thống y tế quốc tế đạt chuẩn JCI.
            </p>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOSPITALS.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {hospital.type}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hospital.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({hospital.reviewCount})</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {hospital.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Tổng đài: <strong>{hospital.phone}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-600 font-bold">
                      <PhoneCall className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Cấp cứu 24/7: <strong>{hospital.emergencyPhone}</strong></span>
                    </div>
                  </div>

                  {/* Specialties offered */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Chuyên khoa tiếp nhận:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.specialties.slice(0, 4).map((specId) => {
                        const spec = SPECIALTIES.find((s) => s.id === specId);
                        if (!spec) return null;
                        return (
                          <button
                            key={specId}
                            onClick={() => onSelectHospitalSpecialty(specId)}
                            className="text-[11px] font-semibold bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
                          >
                            {spec.vietnameseName}
                          </button>
                        );
                      })}
                      {hospital.specialties.length > 4 && (
                        <span className="text-[11px] text-slate-400 py-0.5">
                          +{hospital.specialties.length - 4} khoa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Đặt khám tại viện này</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

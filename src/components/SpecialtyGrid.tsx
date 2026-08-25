import React from 'react';
import { 
  HeartPulse, 
  Baby, 
  Sparkles, 
  Ear, 
  Bone, 
  Activity, 
  Brain, 
  Flower2, 
  Eye, 
  Stethoscope,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';
import { Specialty } from '../types';

interface SpecialtyGridProps {
  selectedSpecialtyId: string;
  onSelectSpecialty: (specialtyId: string) => void;
}

const getSpecialtyIcon = (iconName: string) => {
  switch (iconName) {
    case 'HeartPulse':
      return <HeartPulse className="w-6 h-6 text-rose-600" />;
    case 'Baby':
      return <Baby className="w-6 h-6 text-amber-600" />;
    case 'Sparkles':
      return <Sparkles className="w-6 h-6 text-fuchsia-600" />;
    case 'Ear':
      return <Ear className="w-6 h-6 text-indigo-600" />;
    case 'Bone':
      return <Bone className="w-6 h-6 text-teal-600" />;
    case 'Activity':
      return <Activity className="w-6 h-6 text-emerald-600" />;
    case 'Brain':
      return <Brain className="w-6 h-6 text-purple-600" />;
    case 'Flower2':
      return <Flower2 className="w-6 h-6 text-pink-600" />;
    case 'Eye':
      return <Eye className="w-6 h-6 text-sky-600" />;
    case 'Stethoscope':
    default:
      return <Stethoscope className="w-6 h-6 text-teal-600" />;
  }
};

export const SpecialtyGrid: React.FC<SpecialtyGridProps> = ({
  selectedSpecialtyId,
  onSelectSpecialty
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
              <span>Đa dạng chuyên khoa y tế</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Khám Theo Chuyên Khoa
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Chọn chuyên khoa phù hợp với tình trạng sức khỏe để tìm bác sĩ và đặt lịch hẹn khám nhanh chóng.
            </p>
          </div>
          {selectedSpecialtyId && (
            <button
              onClick={() => onSelectSpecialty('')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors self-start sm:self-auto"
            >
              Hiển thị tất cả chuyên khoa
            </button>
          )}
        </div>

        {/* Grid of specialties */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {SPECIALTIES.map((specialty) => {
            const isSelected = selectedSpecialtyId === specialty.id;
            return (
              <div
                key={specialty.id}
                id={`specialty-card-${specialty.id}`}
                onClick={() => onSelectSpecialty(isSelected ? '' : specialty.id)}
                className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50/90 border-teal-600 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105 ${
                    isSelected ? 'bg-white shadow-xs' : 'bg-slate-100'
                  }`}>
                    {getSpecialtyIcon(specialty.icon)}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {specialty.vietnameseName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {specialty.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {specialty.doctorCount} Bác sĩ
                  </span>
                  <span className="text-teal-600 font-bold group-hover:translate-x-1 transition-transform flex items-center">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

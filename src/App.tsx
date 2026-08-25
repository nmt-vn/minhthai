/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  HeroSection 
} from './components/HeroSection';
import { 
  SpecialtyGrid 
} from './components/SpecialtyGrid';
import { 
  DoctorCard 
} from './components/DoctorCard';
import { 
  DoctorModal 
} from './components/DoctorModal';
import { 
  BookingModal 
} from './components/BookingModal';
import { 
  AppointmentPassModal 
} from './components/AppointmentPassModal';
import { 
  AppointmentsManager 
} from './components/AppointmentsManager';
import { 
  AiSymptomAdvisor 
} from './components/AiSymptomAdvisor';
import { 
  HospitalDirectory 
} from './components/HospitalDirectory';
import { 
  HealthTips 
} from './components/HealthTips';
import { 
  Footer 
} from './components/Footer';
import { 
  Doctor, 
  Appointment, 
  AppointmentStatus 
} from './types';
import { 
  DOCTORS, 
  SPECIALTIES, 
  INITIAL_SAMPLE_APPOINTMENTS 
} from './data/mockData';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  Stethoscope,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<'home' | 'doctors' | 'specialties' | 'ai-triage' | 'appointments' | 'hospitals'>('home');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'under300' | '300to450' | 'above450'>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'priceAsc' | 'priceDesc'>('rating');

  // Appointments persistence State
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('medbook_appointments_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved appointments', e);
      }
    }
    return INITIAL_SAMPLE_APPOINTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('medbook_appointments_v1', JSON.stringify(appointments));
  }, [appointments]);

  // Modals state
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | null>(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [viewingAppointmentPass, setViewingAppointmentPass] = useState<Appointment | null>(null);

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const doctorsListRef = useRef<HTMLDivElement>(null);

  // Filtered and Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = doctor.name.toLowerCase().includes(q);
        const matchesTitle = doctor.title.toLowerCase().includes(q);
        const matchesSpecialty = doctor.specialtyName.toLowerCase().includes(q);
        const matchesHospital = doctor.hospital.toLowerCase().includes(q);
        const matchesBio = doctor.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesSpecialty && !matchesHospital && !matchesBio) {
          return false;
        }
      }

      // City filter
      if (selectedCity && doctor.city !== selectedCity) {
        return false;
      }

      // Specialty filter
      if (selectedSpecialtyId && doctor.specialtyId !== selectedSpecialtyId) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'all' && doctor.gender !== selectedGender) {
        return false;
      }

      // Price filter
      if (selectedPriceRange === 'under300' && doctor.consultationFee > 300000) return false;
      if (selectedPriceRange === '300to450' && (doctor.consultationFee < 300000 || doctor.consultationFee > 450000)) return false;
      if (selectedPriceRange === 'above450' && doctor.consultationFee < 450000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating || b.reviewCount - a.reviewCount;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'priceAsc') return a.consultationFee - b.consultationFee;
      if (sortBy === 'priceDesc') return b.consultationFee - a.consultationFee;
      return 0;
    });
  }, [searchQuery, selectedCity, selectedSpecialtyId, selectedGender, selectedPriceRange, sortBy]);

  // Handle Search submit
  const handleSearchSubmit = () => {
    setActiveTab('home');
    if (doctorsListRef.current) {
      doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking flow
  const handleOpenBooking = (doctor?: Doctor) => {
    if (doctor) {
      setSelectedDoctorForBooking(doctor);
    } else {
      setSelectedDoctorForBooking(null);
    }
    setIsBookingModalOpen(true);
  };

  // Appointment created callback
  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setViewingAppointmentPass(newAppointment);
    showToast(`Đặt khám thành công! Mã vé: ${newAppointment.bookingCode}`);
  };

  // Cancel appointment
  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as AppointmentStatus } : apt
      )
    );
    showToast('Đã hủy lịch khám thành công.', 'info');
  };

  // Reschedule appointment
  const handleRescheduleAppointment = (apt: Appointment) => {
    setSelectedDoctorForBooking(apt.doctor);
    setIsBookingModalOpen(true);
    showToast('Vui lòng chọn ngày và giờ mới để đổi lịch hẹn.', 'info');
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedSpecialtyId('');
    setSelectedPriceRange('all');
    setSelectedGender('all');
    setSortBy('rating');
  };

  const hasActiveFilters = searchQuery || selectedCity || selectedSpecialtyId || selectedPriceRange !== 'all' || selectedGender !== 'all';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage.text}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appointmentCount={appointments.filter((a) => a.status === 'confirmed').length}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* View routing based on active tab */}
      <main className="flex-1">
        {/* VIEW: HOME & DOCTORS */}
        {(activeTab === 'home' || activeTab === 'doctors' || activeTab === 'specialties') && (
          <div>
            {/* Hero & Search only on Home tab */}
            {activeTab === 'home' && (
              <>
                <HeroSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedSpecialtyId={selectedSpecialtyId}
                  setSelectedSpecialtyId={setSelectedSpecialtyId}
                  onOpenAiTriage={() => setActiveTab('ai-triage')}
                  onSearchSubmit={handleSearchSubmit}
                />

                {/* Specialties Grid */}
                <SpecialtyGrid
                  selectedSpecialtyId={selectedSpecialtyId}
                  onSelectSpecialty={(id) => {
                    setSelectedSpecialtyId(id);
                    if (doctorsListRef.current) {
                      doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </>
            )}

            {/* Specialties full page */}
            {activeTab === 'specialties' && (
              <div className="py-8">
                <SpecialtyGrid
                  selectedSpecialtyId={selectedSpecialtyId}
                  onSelectSpecialty={(id) => {
                    setSelectedSpecialtyId(id);
                    setActiveTab('doctors');
                  }}
                />
              </div>
            )}

            {/* Doctor Directory & Filters Section */}
            <section ref={doctorsListRef} className="py-10 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
                      <span>Đội ngũ chuyên gia y tế</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Danh Sách Bác Sĩ Chuyên Khoa
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Tìm thấy <strong>{filteredDoctors.length}</strong> bác sĩ phù hợp với tiêu chí tìm kiếm của bạn.
                    </p>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors border border-rose-200 self-start md:self-auto flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Xóa bộ lọc</span>
                    </button>
                  )}
                </div>

                {/* Filter Control Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
                  {/* Specialty Filter */}
                  <div>
                    <label className="block font-bold text-slate-500 mb-1">Chuyên khoa</label>
                    <select
                      id="filter-specialty-select"
                      value={selectedSpecialtyId}
                      onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="">Tất cả chuyên khoa</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.vietnameseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Filter */}
                  <div>
                    <label className="block font-bold text-slate-500 mb-1">Tỉnh / Thành phố</label>
                    <select
                      id="filter-city-select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="">Toàn quốc</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block font-bold text-slate-500 mb-1">Mức giá khám</label>
                    <select
                      id="filter-price-select"
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value as any)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="all">Tất cả mức giá</option>
                      <option value="under300">Dưới 300.000 đ</option>
                      <option value="300to450">300.000 - 450.000 đ</option>
                      <option value="above450">Trên 450.000 đ</option>
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label className="block font-bold text-slate-500 mb-1">Bác sĩ</label>
                    <select
                      id="filter-gender-select"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value as any)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="all">Bác sĩ Nam & Nữ</option>
                      <option value="male">Bác sĩ Nam</option>
                      <option value="female">Bác sĩ Nữ</option>
                    </select>
                  </div>

                  {/* Sort by */}
                  <div>
                    <label className="block font-bold text-slate-500 mb-1">Sắp xếp theo</label>
                    <select
                      id="filter-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="rating">Đánh giá cao nhất</option>
                      <option value="experience">Nhiều năm kinh nghiệm</option>
                      <option value="priceAsc">Giá khám: Thấp đến Cao</option>
                      <option value="priceDesc">Giá khám: Cao đến Thấp</option>
                    </select>
                  </div>
                </div>

                {/* Doctors Grid */}
                {filteredDoctors.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Không tìm thấy bác sĩ phù hợp</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                      Không có bác sĩ nào khớp với bộ lọc hiện tại. Bạn vui lòng thử chọn chuyên khoa khác hoặc xóa bộ lọc.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
                    >
                      Xem tất cả bác sĩ
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onViewProfile={(doc) => setSelectedDoctorForProfile(doc)}
                        onBookAppointment={(doc) => handleOpenBooking(doc)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Health Preparation Tips only on Home tab */}
            {activeTab === 'home' && <HealthTips />}
          </div>
        )}

        {/* VIEW: AI SYMPTOM ADVISOR */}
        {activeTab === 'ai-triage' && (
          <AiSymptomAdvisor
            onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
            onSelectSpecialtyToFilter={(specId) => {
              setSelectedSpecialtyId(specId);
              setActiveTab('doctors');
            }}
          />
        )}

        {/* VIEW: APPOINTMENTS MANAGER */}
        {activeTab === 'appointments' && (
          <AppointmentsManager
            appointments={appointments}
            onViewPass={(apt) => setViewingAppointmentPass(apt)}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
            onNewBooking={() => handleOpenBooking()}
          />
        )}

        {/* VIEW: HOSPITALS */}
        {activeTab === 'hospitals' && (
          <HospitalDirectory
            onSelectHospitalSpecialty={(specId) => {
              setSelectedSpecialtyId(specId);
              setActiveTab('doctors');
            }}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* MODAL 1: Doctor Profile */}
      <DoctorModal
        doctor={selectedDoctorForProfile}
        onClose={() => setSelectedDoctorForProfile(null)}
        onBook={(doc) => handleOpenBooking(doc)}
      />

      {/* MODAL 2: Step by step Booking */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDoctor={selectedDoctorForBooking}
        initialSpecialtyId={selectedSpecialtyId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* MODAL 3: E-Ticket QR Pass */}
      <AppointmentPassModal
        appointment={viewingAppointmentPass}
        onClose={() => setViewingAppointmentPass(null)}
      />
    </div>
  );
}

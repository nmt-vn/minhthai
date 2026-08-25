import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Doctor, Specialty, PatientInfo, Appointment } from '../types';
import { DOCTORS, SPECIALTIES } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctor?: Doctor | null;
  initialSpecialtyId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDoctor,
  initialSpecialtyId,
  onBookingSuccess,
}) => {
  if (!isOpen) return null;

  // Wizard steps: 1: Chọn bác sĩ & lịch, 2: Thông tin bệnh nhân, 3: Thanh toán & Xác nhận
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Selections
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>(
    initialDoctor?.specialtyId || initialSpecialtyId || SPECIALTIES[0].id
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Patient Info
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '1995-01-01',
    gender: 'Nam',
    identityCard: '',
    address: '',
    hasInsurance: false,
    insuranceNumber: '',
    symptoms: '',
    previousMedicalHistory: '',
    notes: '',
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'clinic' | 'momo' | 'vnpay' | 'bank_transfer'>('clinic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Available doctors for specialty
  const availableDoctors = DOCTORS.filter(
    (doc) => !selectedSpecialtyId || doc.specialtyId === selectedSpecialtyId
  );

  const currentDoctor = DOCTORS.find((doc) => doc.id === selectedDoctorId) || availableDoctors[0] || DOCTORS[0];

  // Set default doctor on specialty change
  useEffect(() => {
    if (initialDoctor) {
      setSelectedDoctorId(initialDoctor.id);
      setSelectedSpecialtyId(initialDoctor.specialtyId);
    } else if (availableDoctors.length > 0 && !availableDoctors.some(d => d.id === selectedDoctorId)) {
      setSelectedDoctorId(availableDoctors[0].id);
    }
  }, [selectedSpecialtyId, initialDoctor]);

  // Generate next 10 dates for calendar
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sun, 1 is Mon...
      const dateStr = d.toISOString().split('T')[0];
      const isAvailable = currentDoctor.workingDays.includes(dayOfWeek);
      days.push({
        date: dateStr,
        dayOfMonth: d.getDate(),
        month: d.getMonth() + 1,
        dayOfWeekName: dayOfWeek === 0 ? 'CN' : `Th ${dayOfWeek + 1}`,
        isAvailable,
        dayOfWeek
      });
    }
    return days;
  };

  const nextDays = getNextDays();

  // Set default date when doctor changes
  useEffect(() => {
    const firstAvailableDay = nextDays.find(d => d.isAvailable);
    if (firstAvailableDay && (!selectedDate || !nextDays.some(d => d.date === selectedDate && d.isAvailable))) {
      setSelectedDate(firstAvailableDay.date);
    }
    if (!selectedTimeSlot && currentDoctor.timeSlots.length > 0) {
      setSelectedTimeSlot(currentDoctor.timeSlots[0]);
    }
  }, [selectedDoctorId, selectedSpecialtyId]);

  // Fee calculation
  const consultationFee = currentDoctor.consultationFee;
  const insuranceDiscount = patientInfo.hasInsurance ? Math.round(consultationFee * 0.2) : 0;
  const serviceFee = 0; // MedBook free booking promo
  const finalFee = Math.max(0, consultationFee - insuranceDiscount + serviceFee);

  // Validate step 1
  const handleProceedToStep2 = () => {
    setErrorMessage('');
    if (!selectedDoctorId) {
      setErrorMessage('Vui lòng chọn bác sĩ khám.');
      return;
    }
    if (!selectedDate) {
      setErrorMessage('Vui lòng chọn ngày khám.');
      return;
    }
    if (!selectedTimeSlot) {
      setErrorMessage('Vui lòng chọn khung giờ khám.');
      return;
    }
    setStep(2);
  };

  // Validate step 2
  const handleProceedToStep3 = () => {
    setErrorMessage('');
    if (!patientInfo.fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên bệnh nhân.');
      return;
    }
    if (!patientInfo.phone.trim() || patientInfo.phone.length < 9) {
      setErrorMessage('Vui lòng nhập số điện thoại hợp lệ (ít nhất 9 số).');
      return;
    }
    if (!patientInfo.address.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ / tỉnh thành.');
      return;
    }
    if (patientInfo.hasInsurance && !patientInfo.insuranceNumber?.trim()) {
      setErrorMessage('Vui lòng nhập mã số thẻ BHYT (hoặc bỏ tích nếu không dùng BHYT).');
      return;
    }
    if (!patientInfo.symptoms.trim()) {
      setErrorMessage('Vui lòng mô tả sơ bộ lý do khám hoặc triệu chứng để bác sĩ chuẩn bị trước.');
      return;
    }
    setStep(3);
  };

  // Submit appointment
  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const bookingCode = `MED-2026-${randomCode}`;
      const specialty = SPECIALTIES.find(s => s.id === currentDoctor.specialtyId) || SPECIALTIES[0];

      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        bookingCode,
        doctorId: currentDoctor.id,
        doctor: currentDoctor,
        specialtyId: currentDoctor.specialtyId,
        specialtyName: currentDoctor.specialtyName,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        patient: patientInfo,
        status: 'confirmed',
        consultationFee,
        insuranceDiscount,
        serviceFee,
        finalFee,
        paymentMethod,
        paymentStatus: paymentMethod === 'clinic' ? 'pending' : 'paid',
        createdAt: new Date().toISOString(),
        qrData: `MEDBOOK|${bookingCode}|${currentDoctor.id}|${selectedDate}|${selectedTimeSlot}|${patientInfo.fullName.replace(/\s+/g, '_')}`,
        roomNumber: `Phòng ${Math.floor(200 + Math.random() * 200)} - Khu Khám Chuyên Khoa`
      };

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      onBookingSuccess(newAppointment);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between rounded-t-3xl sticky top-0 z-10">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">Phiếu đặt khám trực tuyến</span>
            <h2 className="text-lg sm:text-xl font-extrabold mt-0.5">
              Đặt Lịch Khám Bệnh MedBook
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-700' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>1</span>
              <span>Bác sĩ & Thời gian</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-700' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>2</span>
              <span>Thông tin bệnh nhân</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-teal-700' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>3</span>
              <span>Thanh toán & Xác nhận</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* STEP 1: Chọn bác sĩ & Thời gian */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Specialty & Doctor selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    1. Chọn chuyên khoa khám:
                  </label>
                  <select
                    id="booking-specialty-select"
                    value={selectedSpecialtyId}
                    onChange={(e) => {
                      setSelectedSpecialtyId(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.vietnameseName} ({s.doctorCount} bác sĩ)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    2. Chọn bác sĩ phụ trách:
                  </label>
                  <select
                    id="booking-doctor-select"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.title} {doc.name} - {doc.hospital} ({doc.consultationFee.toLocaleString('vi-VN')} đ)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Quick Preview Card */}
              {currentDoctor && (
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 flex items-center gap-4">
                  <img
                    src={currentDoctor.avatar}
                    alt={currentDoctor.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">
                        {currentDoctor.title} {currentDoctor.name}
                      </span>
                      <span className="text-[11px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md">
                        {currentDoctor.specialtyName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-1 truncate">
                      <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      {currentDoctor.hospital} ({currentDoctor.hospitalAddress})
                    </p>
                    <p className="text-xs font-bold text-teal-700 mt-1">
                      Giá khám niêm yết: {currentDoctor.consultationFee.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>
              )}

              {/* Date Selection Calendar Strip */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    3. Chọn ngày khám:
                  </label>
                  <span className="text-[11px] text-slate-500">Chỉ hiển thị các ngày bác sĩ có lịch</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {nextDays.map((dayItem) => {
                    const isSelected = selectedDate === dayItem.date;
                    return (
                      <button
                        key={dayItem.date}
                        id={`btn-date-${dayItem.date}`}
                        disabled={!dayItem.isAvailable}
                        onClick={() => setSelectedDate(dayItem.date)}
                        className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                          !dayItem.isAvailable
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-transparent opacity-60'
                            : isSelected
                            ? 'bg-teal-600 text-white font-bold shadow-sm border border-teal-600 scale-102'
                            : 'bg-white hover:bg-teal-50 border border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold opacity-80">{dayItem.dayOfWeekName}</span>
                        <span className="text-sm font-extrabold my-0.5">{dayItem.dayOfMonth}</span>
                        <span className="text-[9px] opacity-75">T{dayItem.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  4. Chọn khung giờ khám:
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {currentDoctor.timeSlots.map((slot) => {
                    const isSlotSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        id={`btn-slot-${slot.replace(/\s+/g, '')}`}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                          isSlotSelected
                            ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-500/30'
                            : 'bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-700 hover:border-teal-300'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSlotSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Thông tin bệnh nhân */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-blue-600" />
                <span>Thông tin được bảo mật y tế tuyệt đối và dùng để in phiếu khám số thứ tự tại bệnh viện.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên bệnh nhân <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-fullname-input"
                      type="text"
                      value={patientInfo.fullName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, fullName: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Minh Thái"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại nhận mã QR <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-phone-input"
                      type="tel"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      placeholder="Ví dụ: 0912345678"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email nhận vé khám
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-email-input"
                      type="email"
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngày tháng năm sinh
                  </label>
                  <input
                    id="patient-dob-input"
                    type="date"
                    value={patientInfo.dateOfBirth}
                    onChange={(e) => setPatientInfo({ ...patientInfo, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giới tính
                  </label>
                  <select
                    id="patient-gender-select"
                    value={patientInfo.gender}
                    onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ thường trú / Tỉnh Thành <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="patient-address-input"
                    type="text"
                    value={patientInfo.address}
                    onChange={(e) => setPatientInfo({ ...patientInfo, address: e.target.value })}
                    placeholder="Ví dụ: Quận Cầu Giấy, TP. Hà Nội"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* BHYT Checkbox */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <input
                    id="patient-insurance-checkbox"
                    type="checkbox"
                    checked={patientInfo.hasInsurance}
                    onChange={(e) => setPatientInfo({ ...patientInfo, hasInsurance: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded-sm focus:ring-teal-500"
                  />
                  <label htmlFor="patient-insurance-checkbox" className="text-xs font-bold text-emerald-900 cursor-pointer">
                    Tôi có thẻ Bảo hiểm Y tế (BHYT) - Giảm ngay 20% chi phí khám dịch vụ
                  </label>
                </div>

                {patientInfo.hasInsurance && (
                  <div className="mt-3 pl-7">
                    <label className="block text-xs font-semibold text-emerald-800 mb-1">
                      Mã số thẻ BHYT (in trên thẻ hoặc tra cứu VNeID/VssID):
                    </label>
                    <input
                      id="patient-insurance-number-input"
                      type="text"
                      value={patientInfo.insuranceNumber || ''}
                      onChange={(e) => setPatientInfo({ ...patientInfo, insuranceNumber: e.target.value.toUpperCase() })}
                      placeholder="Ví dụ: DN4010123456789"
                      className="w-full max-w-sm px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-slate-800 uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Symptoms description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả triệu chứng hoặc lý do khám <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="patient-symptoms-textarea"
                  rows={2}
                  value={patientInfo.symptoms}
                  onChange={(e) => setPatientInfo({ ...patientInfo, symptoms: e.target.value })}
                  placeholder="Ví dụ: Đau ngực trái khi gắng sức 3 ngày nay, khó thở nhẹ vào ban đêm..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 3: Thanh toán & Tóm tắt xác nhận */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tóm tắt phiếu khám</h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Bác sĩ:</span>
                    <span className="font-bold text-slate-900">{currentDoctor.title} {currentDoctor.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Chuyên khoa:</span>
                    <span className="font-bold text-slate-900">{currentDoctor.specialtyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bệnh viện:</span>
                    <span className="font-bold text-slate-900">{currentDoctor.hospital}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Thời gian:</span>
                    <span className="font-bold text-teal-700">{selectedTimeSlot} ngày {selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bệnh nhân:</span>
                    <span className="font-bold text-slate-900">{patientInfo.fullName} ({patientInfo.phone})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">BHYT áp dụng:</span>
                    <span className="font-bold text-slate-900">{patientInfo.hasInsurance ? `Có (${patientInfo.insuranceNumber})` : 'Không'}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Giá khám niêm yết:</span>
                    <span className="font-semibold">{consultationFee.toLocaleString('vi-VN')} đ</span>
                  </div>
                  {patientInfo.hasInsurance && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Giảm trừ BHYT (20%):</span>
                      <span>-{insuranceDiscount.toLocaleString('vi-VN')} đ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Phí tiện ích MedBook:</span>
                    <span className="text-emerald-600 font-semibold">Miễn phí (0 đ)</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Tổng chi phí khám:</span>
                    <span className="text-teal-700 text-base">{finalFee.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5">
                  Chọn phương thức thanh toán:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('clinic')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      paymentMethod === 'clinic'
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Thanh toán tại viện</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Trả tiền mặt hoặc quẹt thẻ tại quầy tiếp đón ưu tiên</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      paymentMethod === 'momo'
                        ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-md bg-pink-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">M</div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Ví MoMo</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Quét mã QR MoMo tiện lợi, vào khám ngay</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      paymentMethod === 'vnpay'
                        ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">VNPAY / Thẻ ATM & Visa</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Cổng thanh toán liên kết hơn 40 ngân hàng</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Chuyển khoản VietQR 24/7</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Xác nhận tự động không mất phí</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex items-center justify-between gap-3 rounded-b-3xl">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-colors"
            >
              Hủy
            </button>
          )}

          <div className="flex items-center gap-3">
            {step === 1 && (
              <button
                id="btn-step1-next"
                onClick={handleProceedToStep2}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Tiếp tục: Nhập thông tin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                id="btn-step2-next"
                onClick={handleProceedToStep3}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Tiếp tục: Thanh toán</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                id="btn-step3-confirm"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Đang tạo phiếu khám...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác nhận & Nhận mã QR</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

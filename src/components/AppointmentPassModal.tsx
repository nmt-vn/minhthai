import React from 'react';
import { 
  X, 
  Printer, 
  CalendarPlus, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Clock, 
  User, 
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentPassModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const AppointmentPassModal: React.FC<AppointmentPassModalProps> = ({
  appointment,
  onClose,
}) => {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent(`Khám bệnh: ${appointment.specialtyName} - BS. ${appointment.doctor.name}`);
    const details = encodeURIComponent(
      `Mã đặt khám: ${appointment.bookingCode}\nBác sĩ: ${appointment.doctor.title} ${appointment.doctor.name}\nBệnh viện: ${appointment.doctor.hospital}\nĐịa chỉ: ${appointment.doctor.hospitalAddress}\nBệnh nhân: ${appointment.patient.fullName}\nKhung giờ: ${appointment.timeSlot}`
    );
    const location = encodeURIComponent(appointment.doctor.hospitalAddress);
    
    // Format date string
    const dateFormatted = appointment.date.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T080000Z/${dateFormatted}T090000Z`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 relative overflow-hidden my-6 print:shadow-none print:border-none print:max-w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-700 p-6 text-white text-center relative print:bg-teal-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-2 text-white">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-extrabold">
            Phiếu Khám Điện Tử • E-Ticket
          </span>
          <h2 className="text-xl font-extrabold mt-0.5">Đặt Lịch Khám Thành Công</h2>
          
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
            Mã vé: {appointment.bookingCode}
          </div>
        </div>

        {/* E-Pass Content */}
        <div className="p-6 space-y-5">
          {/* QR Code section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-300 shadow-inner flex flex-col items-center justify-center shrink-0">
              <QrCode className="w-20 h-20 text-slate-900" />
              <span className="text-[9px] font-mono text-slate-500 mt-1">QUÉT TẠI QUẦY</span>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3" />
                Đã xác nhận giữ chỗ
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">
                {appointment.roomNumber || 'Phòng khám ưu tiên'}
              </h3>
              <p className="text-xs text-slate-500 leading-tight">
                Vui lòng xuất trình mã QR này tại quầy tiếp đón tiếp nhận bệnh nhân để lấy số vào khám ngay.
              </p>
            </div>
          </div>

          {/* Ticket Information Grid */}
          <div className="divide-y divide-slate-100 text-xs space-y-2.5">
            <div className="flex justify-between pt-1">
              <span className="text-slate-500 font-medium">Bệnh nhân:</span>
              <span className="font-bold text-slate-900">{appointment.patient.fullName}</span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Số điện thoại:</span>
              <span className="font-bold text-slate-900">{appointment.patient.phone}</span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Bác sĩ khám:</span>
              <span className="font-bold text-teal-800 text-right">
                {appointment.doctor.title} {appointment.doctor.name}
              </span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Chuyên khoa:</span>
              <span className="font-bold text-slate-900">{appointment.specialtyName}</span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Bệnh viện / Cơ sở:</span>
              <span className="font-bold text-slate-900 text-right max-w-[60%]">
                {appointment.doctor.hospital}
              </span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Địa chỉ:</span>
              <span className="text-slate-600 text-right max-w-[65%]">
                {appointment.doctor.hospitalAddress}
              </span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Thời gian khám:</span>
              <span className="font-extrabold text-teal-700">
                {appointment.timeSlot} • Ngày {appointment.date}
              </span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 font-medium">Thanh toán:</span>
              <span className="font-bold text-slate-900">
                {appointment.finalFee.toLocaleString('vi-VN')} đ ({appointment.paymentMethod === 'clinic' ? 'Thanh toán tại viện' : 'Đã thanh toán Online'})
              </span>
            </div>
          </div>

          {/* Guide notes */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý:</strong> Vui lòng có mặt trước giờ khám 15 phút. Nhớ mang theo CCCD gắn chip và Thẻ BHYT (nếu có đăng ký giảm trừ).
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>In vé khám</span>
            </button>

            <button
              onClick={handleAddToGoogleCalendar}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-teal-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Thêm Calendar</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

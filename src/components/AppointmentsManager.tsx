import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Building2, 
  QrCode, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Search,
  Plus,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { Appointment, AppointmentStatus } from '../types';

interface AppointmentsManagerProps {
  appointments: Appointment[];
  onViewPass: (appointment: Appointment) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onRescheduleAppointment: (appointment: Appointment) => void;
  onNewBooking: () => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  appointments,
  onViewPass,
  onCancelAppointment,
  onRescheduleAppointment,
  onNewBooking,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | AppointmentStatus>('all');
  const [searchCode, setSearchCode] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesSearch =
      !searchCode ||
      apt.bookingCode.toLowerCase().includes(searchCode.toLowerCase()) ||
      apt.patient.fullName.toLowerCase().includes(searchCode.toLowerCase()) ||
      apt.doctor.name.toLowerCase().includes(searchCode.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã xác nhận
          </span>
        );
      case 'rescheduled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
            <RotateCcw className="w-3.5 h-3.5" />
            Đã đổi lịch
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã khám xong
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Đã hủy lịch
          </span>
        );
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quản Lý Lịch Hẹn Khám Bệnh
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Theo dõi phiếu khám điện tử, xuất trình mã QR tại quầy tiếp đón hoặc đổi/hủy lịch hẹn khi có thay đổi.
            </p>
          </div>

          <button
            id="btn-create-appointment-from-manager"
            onClick={onNewBooking}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Đặt lịch khám mới</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({appointments.length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                filterStatus === 'confirmed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sắp tới ({appointments.filter(a => a.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                filterStatus === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Đã khám ({appointments.filter(a => a.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                filterStatus === 'cancelled'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Đã hủy ({appointments.filter(a => a.status === 'cancelled').length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Tìm theo mã vé, tên bệnh nhân..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy lịch hẹn nào</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Bạn chưa có lịch hẹn khám nào trong mục này. Hãy chọn bác sĩ và đặt lịch ngay để được tiếp đón ưu tiên.
            </p>
            <button
              onClick={onNewBooking}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Đặt khám ngay bây giờ</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                id={`appointment-card-${apt.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top bar with Booking code & Status */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                        {apt.bookingCode}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(apt.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>

                  {/* Doctor & Hospital info */}
                  <div className="mt-3.5 flex items-start gap-3.5">
                    <img
                      src={apt.doctor.avatar}
                      alt={apt.doctor.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded inline-block">
                        {apt.specialtyName}
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 truncate mt-1">
                        {apt.doctor.title} {apt.doctor.name}
                      </h3>
                      <p className="text-xs text-slate-600 truncate flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        {apt.doctor.hospital}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time slot */}
                  <div className="mt-3.5 p-3 rounded-xl bg-teal-50/70 border border-teal-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <Clock className="w-4 h-4 text-teal-700" />
                      <span>{apt.timeSlot}</span>
                    </div>
                    <div className="font-extrabold text-teal-800">
                      Ngày {apt.date}
                    </div>
                  </div>

                  {/* Patient summary */}
                  <div className="mt-3 text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bệnh nhân:</span>
                      <span className="font-semibold text-slate-800">{apt.patient.fullName} ({apt.patient.phone})</span>
                    </div>
                    {apt.patient.hasInsurance && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>BHYT:</span>
                        <span>{apt.patient.insuranceNumber}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phí khám:</span>
                      <span className="font-bold text-teal-700">{apt.finalFee.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    id={`btn-view-pass-${apt.id}`}
                    onClick={() => onViewPass(apt)}
                    className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-teal-200 shadow-xs"
                  >
                    <QrCode className="w-4 h-4 text-teal-700" />
                    <span>Xem mã QR vé</span>
                  </button>

                  {apt.status === 'confirmed' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onRescheduleAppointment(apt)}
                        className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Đổi giờ
                      </button>
                      <button
                        onClick={() => setCancellingId(apt.id)}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancellingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Xác nhận hủy lịch khám?</h3>
                <p className="text-xs text-slate-500">
                  Lịch khám của bạn sẽ bị hủy và khung giờ này sẽ được mở lại cho bệnh nhân khác.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setCancellingId(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  Giữ lại lịch
                </button>
                <button
                  id="btn-confirm-cancel-appointment"
                  onClick={() => {
                    onCancelAppointment(cancellingId);
                    setCancellingId(null);
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Xác nhận hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

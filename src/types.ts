export type UrgencyLevel = 'low' | 'medium' | 'urgent' | 'emergency';

export interface Specialty {
  id: string;
  name: string;
  vietnameseName: string;
  icon: string;
  description: string;
  doctorCount: number;
  popularSymptoms: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string; // e.g. "PGS.TS.BS", "ThS.BS.CKII", "BS.CKI"
  specialtyId: string;
  specialtyName: string;
  hospital: string;
  hospitalAddress: string;
  city: 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Đà Nẵng' | 'Cần Thơ';
  rating: number;
  reviewCount: number;
  experienceYears: number;
  consultationFee: number; // VND
  avatar: string;
  bio: string;
  education: string[];
  workingDays: number[]; // 0 for Sun, 1 for Mon, ..., 6 for Sat
  timeSlots: string[];
  languages: string[];
  gender: 'male' | 'female';
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  rating: number;
  reviewCount: number;
  image: string;
  specialties: string[];
  type: 'Bệnh viện công' | 'Bệnh viện quốc tế' | 'Phòng khám đa khoa';
}

export interface PatientInfo {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  identityCard?: string;
  address: string;
  hasInsurance: boolean;
  insuranceNumber?: string;
  symptoms: string;
  previousMedicalHistory?: string;
  notes?: string;
}

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';

export interface Appointment {
  id: string;
  bookingCode: string;
  doctorId: string;
  doctor: Doctor;
  specialtyId: string;
  specialtyName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  patient: PatientInfo;
  status: AppointmentStatus;
  consultationFee: number;
  insuranceDiscount: number;
  serviceFee: number;
  finalFee: number;
  paymentMethod: 'clinic' | 'momo' | 'vnpay' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid';
  createdAt: string;
  qrData: string;
  roomNumber?: string;
}

export interface TriageResult {
  recommendedSpecialtyId: string;
  recommendedSpecialtyName: string;
  urgencyLevel: UrgencyLevel;
  analysis: string;
  possibleCauses: string[];
  selfCareAdvice: string[];
  warningSignsToHospital: string[];
  questionsToDoctor: string[];
}

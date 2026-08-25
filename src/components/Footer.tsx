import React from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Heart,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Med<span className="text-teal-400">Book</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống kết nối bệnh nhân trực tiếp với bác sĩ chuyên khoa và bệnh viện tuyến đầu hàng đầu Việt Nam. Chủ động đặt khám, giảm trừ BHYT và nhận phiếu khám điện tử nhanh chóng.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảo mật dữ liệu hồ sơ y tế theo chuẩn Bộ Y Tế</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Chuyên khoa nổi bật</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Tim Mạch & Huyết Áp</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Nhi Khoa & Tiêm Chủng</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Cơ Xương Khớp & Cột Sống</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Tiêu Hóa & Gan Mật</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Sản Phụ Khoa & Thai Kỳ</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-pointer">Thần Kinh & Đột Quỵ</span></li>
            </ul>
          </div>

          {/* Hospitals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Cơ sở y tế đối tác</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span>Bệnh viện Bạch Mai Hà Nội</span></li>
              <li><span>Bệnh viện Chợ Rẫy TP.HCM</span></li>
              <li><span>Bệnh viện Đại học Y Dược TP.HCM</span></li>
              <li><span>Bệnh viện Nhi Đồng 1</span></li>
              <li><span>BV Đa khoa Quốc tế Vinmec</span></li>
              <li><span>Bệnh viện Đà Nẵng</span></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Tổng đài đặt lịch: <strong className="text-white">1900 6868</strong> (24/7)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Email: support@medbook.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Hà Nội: Tầng 6, Tòa nhà Y Dược, Đống Đa<br />TP.HCM: Quận 5, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MedBook - Nền Tảng Đặt Lịch Khám Bệnh Trực Tuyến Việt Nam. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Chính sách bảo mật</span>
            <span>•</span>
            <span>Quy chế hoạt động y tế</span>
            <span>•</span>
            <span>Điều khoản sử dụng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Specialty, Doctor, Hospital, Appointment } from '../types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'tim-mach',
    name: 'Cardiology',
    vietnameseName: 'Tim Mạch & Huyết Áp',
    icon: 'HeartPulse',
    description: 'Chẩn đoán và điều trị bệnh lý tăng huyết áp, rối loạn nhịp tim, mạch vành, suy tim.',
    doctorCount: 8,
    popularSymptoms: ['Tức ngực', 'Hồi hộp đánh trống ngực', 'Huyết áp cao', 'Khó thở khi gắng sức', 'Chóng mặt']
  },
  {
    id: 'nhi-khoa',
    name: 'Pediatrics',
    vietnameseName: 'Nhi Khoa & Sơ Sinh',
    icon: 'Baby',
    description: 'Chăm sóc sức khỏe toàn diện trẻ sơ sinh, trẻ nhỏ, tiêm chủng và dinh dưỡng phát triển.',
    doctorCount: 12,
    popularSymptoms: ['Sốt cao ở trẻ', 'Ho khò khè', 'Biếng ăn suy dinh dưỡng', 'Tiêu chảy cấp', 'Phát ban dị ứng']
  },
  {
    id: 'da-lieu',
    name: 'Dermatology',
    vietnameseName: 'Da Liễu & Thẩm Mỹ Da',
    icon: 'Sparkles',
    description: 'Khám chữa mụn trứng cá, viêm da cơ địa, dị ứng, vảy nến, nấm da và thẩm mỹ da liễu.',
    doctorCount: 9,
    popularSymptoms: ['Nổi mẩn ngứa', 'Mụn trứng cá nặng', 'Rụng tóc nhiều', 'Vảy nến', 'Dị ứng thời tiết']
  },
  {
    id: 'tai-mui-hong',
    name: 'Otorhinolaryngology',
    vietnameseName: 'Tai Mũi Họng',
    icon: 'Ear',
    description: 'Điều trị viêm xoang, viêm họng mãn tính, viêm amidan, ù tai, nghẹt mũi kéo dài.',
    doctorCount: 7,
    popularSymptoms: ['Đau rát họng', 'Nghẹt mũi chảy dịch', 'Ù tai giảm thính lực', 'Khản tiếng lâu ngày', 'Viêm xoang']
  },
  {
    id: 'co-xuong-khop',
    name: 'Orthopedics',
    vietnameseName: 'Cơ Xương Khớp',
    icon: 'Bone',
    description: 'Điều trị thoái hóa cột sống, thoát vị đĩa đệm, đau nhức khớp gối, viêm gân và gout.',
    doctorCount: 10,
    popularSymptoms: ['Đau mỏi thắt lưng', 'Khớp gối lục cục', 'Tê bì tay chân', 'Đau khớp ngón chân cái', 'Thoát vị']
  },
  {
    id: 'tieu-hoa-gan-mat',
    name: 'Gastroenterology',
    vietnameseName: 'Tiêu Hóa & Gan Mật',
    icon: 'Activity',
    description: 'Chữa trào ngược dạ dày, viêm loét HP, đại tràng co thắt, gan nhiễm mỡ, men gan cao.',
    doctorCount: 11,
    popularSymptoms: ['Ợ chua đau thượng vị', 'Đầy hơi khó tiêu', 'Đau quặn bụng dưới', 'Táo bón kéo dài', 'Men gan cao']
  },
  {
    id: 'than-kinh',
    name: 'Neurology',
    vietnameseName: 'Thần Kinh & Đột Quỵ',
    icon: 'Brain',
    description: 'Khám rối loạn tiền đình, mất ngủ kéo dài, đau nửa đầu Migraine, tầm soát đột quỵ.',
    doctorCount: 6,
    popularSymptoms: ['Đau đầu Migraine', 'Mất ngủ kinh niên', 'Chóng mặt hoa mắt', 'Run tay chân', 'Suy giảm trí nhớ']
  },
  {
    id: 'san-phu-khoa',
    name: 'Obstetrics & Gynecology',
    vietnameseName: 'Sản Phụ Khoa',
    icon: 'Flower2',
    description: 'Khám thai định kỳ, tầm soát ung thư cổ tử cung, điều trị viêm nhiễm và tư vấn hiếm muộn.',
    doctorCount: 8,
    popularSymptoms: ['Khám thai định kỳ', 'Rối loạn kinh nguyệt', 'Đau bụng dưới âm ỉ', 'Khí hư bất thường', 'Tư vấn mang thai']
  },
  {
    id: 'mat',
    name: 'Ophthalmology',
    vietnameseName: 'Mắt & Nhãn Khoa',
    icon: 'Eye',
    description: 'Đo khúc xạ cận/viễn/loạn, khám đục thủy tinh thể, viêm kết mạc, mỏi mắt kỹ thuật số.',
    doctorCount: 5,
    popularSymptoms: ['Mắt mờ nhìn đôi', 'Đỏ mắt cộm rát', 'Khô mắt mỏi mắt', 'Tật khúc xạ', 'Chảy nước mắt sống']
  },
  {
    id: 'kham-tong-quat',
    name: 'General Medicine',
    vietnameseName: 'Nội Tổng Quát & Tầm Soát',
    icon: 'Stethoscope',
    description: 'Khám sức khỏe định kỳ, tầm soát bệnh mạn tính (tiểu đường, mỡ máu, chức năng thận).',
    doctorCount: 14,
    popularSymptoms: ['Kiểm tra sức khỏe định kỳ', 'Mệt mỏi sút cân', 'Khám tổng quát tiền hôn nhân', 'Tầm soát tiểu đường']
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'bv-bach-mai',
    name: 'Bệnh viện Bạch Mai Hà Nội',
    address: '78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội',
    city: 'Hà Nội',
    phone: '024 3869 3731',
    emergencyPhone: '115 / 096 985 1616',
    rating: 4.8,
    reviewCount: 3420,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80',
    specialties: ['tim-mach', 'than-kinh', 'tieu-hoa-gan-mat', 'co-xuong-khop', 'kham-tong-quat'],
    type: 'Bệnh viện công'
  },
  {
    id: 'bv-dai-hoc-y-duoc',
    name: 'Bệnh viện Đại học Y Dược TP.HCM',
    address: '215 Hồng Bàng, Phường 11, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    phone: '028 3855 4269',
    emergencyPhone: '028 3952 5353',
    rating: 4.9,
    reviewCount: 4890,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
    specialties: ['tim-mach', 'tieu-hoa-gan-mat', 'da-lieu', 'san-phu-khoa', 'tai-mui-hong', 'kham-tong-quat'],
    type: 'Bệnh viện công'
  },
  {
    id: 'bv-cho-ray',
    name: 'Bệnh viện Chợ Rẫy',
    address: '201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    phone: '028 3855 4137',
    emergencyPhone: '028 3855 4138',
    rating: 4.8,
    reviewCount: 5120,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
    specialties: ['tim-mach', 'than-kinh', 'co-xuong-khop', 'tai-mui-hong', 'mat'],
    type: 'Bệnh viện công'
  },
  {
    id: 'bv-nhi-dong-1',
    name: 'Bệnh viện Nhi Đồng 1',
    address: '341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    phone: '028 3927 1119',
    emergencyPhone: '028 3927 1119',
    rating: 4.9,
    reviewCount: 2900,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80',
    specialties: ['nhi-khoa', 'tai-mui-hong', 'da-lieu'],
    type: 'Bệnh viện công'
  },
  {
    id: 'bv-vinmec-times-city',
    name: 'Bệnh viện Đa khoa Quốc tế Vinmec Times City',
    address: '458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội',
    city: 'Hà Nội',
    phone: '024 3974 3556',
    emergencyPhone: '024 3974 4333',
    rating: 4.9,
    reviewCount: 1840,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80',
    specialties: ['san-phu-khoa', 'tim-mach', 'nhi-khoa', 'kham-tong-quat', 'da-lieu'],
    type: 'Bệnh viện quốc tế'
  },
  {
    id: 'bv-da-khoa-da-nang',
    name: 'Bệnh viện Đà Nẵng',
    address: '124 Hải Phòng, Thạch Thang, Hải Châu, Đà Nẵng',
    city: 'Đà Nẵng',
    phone: '0236 3821 118',
    emergencyPhone: '115',
    rating: 4.7,
    reviewCount: 1650,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80',
    specialties: ['tim-mach', 'than-kinh', 'co-xuong-khop', 'kham-tong-quat', 'tieu-hoa-gan-mat'],
    type: 'Bệnh viện công'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Nguyễn Văn Thành',
    title: 'PGS.TS.BS',
    specialtyId: 'tim-mach',
    specialtyName: 'Tim Mạch & Huyết Áp',
    hospital: 'Bệnh viện Bạch Mai Hà Nội',
    hospitalAddress: '78 Đường Giải Phóng, Đống Đa, Hà Nội',
    city: 'Hà Nội',
    rating: 4.9,
    reviewCount: 428,
    experienceYears: 24,
    consultationFee: 450000,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    bio: 'Nguyên Phó Viện trưởng Viện Tim mạch Quốc gia, hơn 24 năm kinh nghiệm điều trị tăng huyết áp phức tạp, can thiệp tim mạch và bệnh cơ tim.',
    education: [
      'Tiến sĩ Y khoa Đại học Y Hà Nội',
      'Tu nghiệp chuyên sâu Tim mạch can thiệp tại CH Pháp (Bordeaux Hospital)',
      'Thành viên Hội Tim Mạch Học Việt Nam & Châu Âu (ESC)'
    ],
    workingDays: [1, 2, 3, 4, 5],
    timeSlots: ['07:30 - 08:30', '08:30 - 09:30', '09:30 - 10:30', '13:30 - 14:30', '14:30 - 15:30', '15:30 - 16:30'],
    languages: ['Tiếng Việt', 'Tiếng Pháp', 'Tiếng Anh'],
    gender: 'male'
  },
  {
    id: 'doc-2',
    name: 'Trần Thị Mai Lan',
    title: 'TS.BS.CKII',
    specialtyId: 'nhi-khoa',
    specialtyName: 'Nhi Khoa & Sơ Sinh',
    hospital: 'Bệnh viện Nhi Đồng 1',
    hospitalAddress: '341 Sư Vạn Hạnh, Quận 10, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    rating: 5.0,
    reviewCount: 612,
    experienceYears: 18,
    consultationFee: 350000,
    avatar: 'https://images.unsplash.com/photo-1594824813591-628d0bca2d8f?w=400&auto=format&fit=crop&q=80',
    bio: 'Chuyên gia Nhi khoa hàng đầu, tận tâm và thấu hiểu tâm lý trẻ nhỏ. Chuyên điều trị bệnh đường hô hấp, tiêu hóa và tư vấn phát triển dinh dưỡng.',
    education: [
      'Bác sĩ Chuyên khoa II Đại học Y Dược TP.HCM',
      'Chứng chỉ Nhi khoa nâng cao Đại học Quốc gia Singapore (NUS)',
      'Giảng viên lâm sàng Bộ môn Nhi ĐHYD TP.HCM'
    ],
    workingDays: [1, 2, 3, 4, 5, 6],
    timeSlots: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00', '16:30 - 17:30'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'female'
  },
  {
    id: 'doc-3',
    name: 'Lê Hoàng Phong',
    title: 'ThS.BS.CKII',
    specialtyId: 'co-xuong-khop',
    specialtyName: 'Cơ Xương Khớp',
    hospital: 'Bệnh viện Đại học Y Dược TP.HCM',
    hospitalAddress: '215 Hồng Bàng, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    rating: 4.8,
    reviewCount: 315,
    experienceYears: 16,
    consultationFee: 400000,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    bio: 'Chuyên gia chấn thương chỉnh hình và cơ xương khớp, điều trị hiệu quả thoái hóa cột sống cổ/thắt lưng, thoái hóa khớp gối và loãng xương.',
    education: [
      'Thạc sĩ Bác sĩ Chuyên khoa II Đại học Y Dược TP.HCM',
      'Tu nghiệp Nội soi khớp tại Seoul National University Hospital (Hàn Quốc)',
      'Hội viên Hội Chấn Thương Chỉnh Hình Việt Nam (VOA)'
    ],
    workingDays: [1, 3, 4, 5, 6],
    timeSlots: ['07:30 - 08:30', '08:30 - 09:30', '10:00 - 11:00', '13:30 - 14:30', '15:00 - 16:00'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'male'
  },
  {
    id: 'doc-4',
    name: 'Đặng Hương Giang',
    title: 'BS.CKII',
    specialtyId: 'da-lieu',
    specialtyName: 'Da Liễu & Thẩm Mỹ Da',
    hospital: 'Bệnh viện Đa khoa Quốc tế Vinmec Times City',
    hospitalAddress: '458 Minh Khai, Hai Bà Trưng, Hà Nội',
    city: 'Hà Nội',
    rating: 4.9,
    reviewCount: 520,
    experienceYears: 15,
    consultationFee: 500000,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    bio: 'Bác sĩ chuyên khoa Da liễu với kinh nghiệm phong phú trong điều trị mụn trứng cá kháng trị, viêm da tiếp xúc dị ứng, vảy nến và trẻ hóa làn da.',
    education: [
      'Bác sĩ Chuyên khoa II Đại học Y Hà Nội',
      'Chứng chỉ Laser & Công nghệ cao Bệnh viện Da liễu Trung ương',
      'Thành viên Hội Da liễu Việt Nam & Hội Da liễu Châu Á (ADC)'
    ],
    workingDays: [1, 2, 3, 5, 6],
    timeSlots: ['08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '14:00 - 15:00', '15:30 - 16:30', '17:00 - 18:00'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'female'
  },
  {
    id: 'doc-5',
    name: 'Vũ Đức Minh',
    title: 'ThS.BS',
    specialtyId: 'tieu-hoa-gan-mat',
    specialtyName: 'Tiêu Hóa & Gan Mật',
    hospital: 'Bệnh viện Chợ Rẫy',
    hospitalAddress: '201B Nguyễn Chí Thanh, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    rating: 4.8,
    reviewCount: 289,
    experienceYears: 12,
    consultationFee: 300000,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    bio: 'Bác sĩ chuyên sâu về nội soi tiêu hóa không đau, tầm soát ung thư đường tiêu hóa sớm, điều trị viêm loét dạ dày - tá tràng do vi khuẩn HP.',
    education: [
      'Thạc sĩ Nội khoa Tiêu hóa Đại học Y Dược TP.HCM',
      'Chứng chỉ Nội soi can thiệp nâng cao Bệnh viện Chợ Rẫy'
    ],
    workingDays: [2, 3, 4, 5, 6],
    timeSlots: ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '13:00 - 14:00', '14:00 - 15:00'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'male'
  },
  {
    id: 'doc-6',
    name: 'Phạm Quỳnh Nga',
    title: 'TS.BS',
    specialtyId: 'san-phu-khoa',
    specialtyName: 'Sản Phụ Khoa',
    hospital: 'Bệnh viện Đại học Y Dược TP.HCM',
    hospitalAddress: '215 Hồng Bàng, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    rating: 5.0,
    reviewCount: 470,
    experienceYears: 20,
    consultationFee: 450000,
    avatar: 'https://images.unsplash.com/photo-1591604021695-0c69b7c03381?w=400&auto=format&fit=crop&q=80',
    bio: 'Chuyên gia chăm sóc thai kỳ nguy cơ cao, sàng lọc dị tật trước sinh, siêu âm 4D/5D và phẫu thuật nội soi phụ khoa.',
    education: [
      'Tiến sĩ Sản Phụ khoa Đại học Y Dược TP.HCM',
      'Học bổng tu nghiệp Y học Bào thai tại Đại học Sydney (Úc)'
    ],
    workingDays: [1, 2, 4, 5, 6],
    timeSlots: ['08:00 - 09:00', '09:00 - 10:00', '10:30 - 11:30', '14:00 - 15:00', '15:30 - 16:30'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'female'
  },
  {
    id: 'doc-7',
    name: 'Hoàng Quốc Tuấn',
    title: 'BS.CKI',
    specialtyId: 'tai-mui-hong',
    specialtyName: 'Tai Mũi Họng',
    hospital: 'Bệnh viện Bạch Mai Hà Nội',
    hospitalAddress: '78 Đường Giải Phóng, Đống Đa, Hà Nội',
    city: 'Hà Nội',
    rating: 4.7,
    reviewCount: 215,
    experienceYears: 10,
    consultationFee: 300000,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80',
    bio: 'Khám và điều trị viêm xoang polyp mũi qua nội soi vi phẫu, cắt amidan bằng Coblator hạn chế đau và chảy máu, điều trị viêm tai giữa cấp/mãn tính.',
    education: [
      'Bác sĩ Chuyên khoa I Tai Mũi Họng Đại học Y Hà Nội',
      'Chứng chỉ Nội soi vi phẫu Tai Mũi Họng BV Tai Mũi Họng TW'
    ],
    workingDays: [1, 2, 3, 4, 5, 6],
    timeSlots: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'],
    languages: ['Tiếng Việt'],
    gender: 'male'
  },
  {
    id: 'doc-8',
    name: 'Bùi Thị Thanh Hằng',
    title: 'PGS.TS.BS',
    specialtyId: 'than-kinh',
    specialtyName: 'Thần Kinh & Đột Quỵ',
    hospital: 'Bệnh viện Đà Nẵng',
    hospitalAddress: '124 Hải Phòng, Hải Châu, Đà Nẵng',
    city: 'Đà Nẵng',
    rating: 4.9,
    reviewCount: 380,
    experienceYears: 22,
    consultationFee: 400000,
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&auto=format&fit=crop&q=80',
    bio: 'Chuyên gia hàng đầu miền Trung về chẩn đoán và dự phòng đột quỵ, điều trị động kinh, bệnh Parkinson, hội chứng tiền đình và mất ngủ mạn tính.',
    education: [
      'Phó Giáo sư, Tiến sĩ Thần kinh học Đại học Y Dược Huế',
      'Ủy viên Ban chấp hành Hội Đột Quỵ Việt Nam (VSA)'
    ],
    workingDays: [1, 2, 3, 4, 5],
    timeSlots: ['07:30 - 08:30', '08:30 - 09:30', '09:30 - 10:30', '13:30 - 14:30', '14:30 - 15:30'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'female'
  },
  {
    id: 'doc-9',
    name: 'Dương Văn Khiêm',
    title: 'ThS.BS',
    specialtyId: 'mat',
    specialtyName: 'Mắt & Nhãn Khoa',
    hospital: 'Bệnh viện Chợ Rẫy',
    hospitalAddress: '201B Nguyễn Chí Thanh, Quận 5, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    rating: 4.8,
    reviewCount: 195,
    experienceYears: 11,
    consultationFee: 280000,
    avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&auto=format&fit=crop&q=80',
    bio: 'Chuyên phẫu thuật Phaco điều trị đục thủy tinh thể, điều trị Glaucoma (cườm nước), tật khúc xạ học đường và các bệnh lý dịch kính võng mạc.',
    education: [
      'Thạc sĩ Nhãn khoa Đại học Y Dược TP.HCM',
      'Chứng chỉ Phẫu thuật Phaco Bệnh viện Mắt TP.HCM'
    ],
    workingDays: [2, 3, 4, 5, 6],
    timeSlots: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '13:30 - 14:30', '14:30 - 15:30'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'male'
  },
  {
    id: 'doc-10',
    name: 'Ngô Thu Trang',
    title: 'BS.CKII',
    specialtyId: 'kham-tong-quat',
    specialtyName: 'Nội Tổng Quát & Tầm Soát',
    hospital: 'Bệnh viện Đa khoa Quốc tế Vinmec Times City',
    hospitalAddress: '458 Minh Khai, Hai Bà Trưng, Hà Nội',
    city: 'Hà Nội',
    rating: 4.9,
    reviewCount: 360,
    experienceYears: 17,
    consultationFee: 450000,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    bio: 'Bác sĩ phụ trách phòng khám tầm soát sức khỏe tổng quát chất lượng cao, chuyên sâu chẩn đoán sớm đái tháo đường, rối loạn lipid máu và bệnh chuyển hóa.',
    education: [
      'Bác sĩ Chuyên khoa II Nội tổng quát Đại học Y Hà Nội',
      'Chứng chỉ Y học Gia đình và Quản lý bệnh mạn tính'
    ],
    workingDays: [1, 2, 3, 4, 5, 6],
    timeSlots: ['07:30 - 08:30', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '13:30 - 14:30', '14:30 - 15:30'],
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    gender: 'female'
  }
];

export const INITIAL_SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-demo-1',
    bookingCode: 'MED-2026-8831',
    doctorId: 'doc-1',
    doctor: DOCTORS[0],
    specialtyId: 'tim-mach',
    specialtyName: 'Tim Mạch & Huyết Áp',
    date: '2026-08-28',
    timeSlot: '08:30 - 09:30',
    patient: {
      fullName: 'Nguyễn Minh Thái',
      phone: '0912 345 678',
      email: 'thainm8249@ut.edu.vn',
      dateOfBirth: '1992-05-14',
      gender: 'Nam',
      identityCard: '001092008765',
      address: 'Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội',
      hasInsurance: true,
      insuranceNumber: 'DN4010123456789',
      symptoms: 'Thường xuyên tức ngực trái khi leo cầu thang, hồi hộp đánh trống ngực về đêm.',
      notes: 'Đã từng đo huyết áp 145/95 mmHg tại trạm y tế'
    },
    status: 'confirmed',
    consultationFee: 450000,
    insuranceDiscount: 90000,
    serviceFee: 10000,
    finalFee: 370000,
    paymentMethod: 'clinic',
    paymentStatus: 'pending',
    createdAt: '2026-08-25T08:30:00.000Z',
    qrData: 'MEDBOOK|MED-2026-8831|DOC1|20260828|0830|NGUYEN_MINH_THAI',
    roomNumber: 'Phòng 302 - Tầng 3 Nhà K'
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'Cấp cứu y tế toàn quốc', number: '115', desc: 'Hỗ trợ khẩn cấp 24/7' },
  { name: 'Đường dây nóng BV Bạch Mai', number: '096 985 1616', desc: 'Hà Nội' },
  { name: 'Đường dây nóng BV Chợ Rẫy', number: '028 3855 4138', desc: 'TP. Hồ Chí Minh' },
  { name: 'Đường dây nóng BV Đà Nẵng', number: '0236 3821 118', desc: 'Đà Nẵng' },
  { name: 'Tổng đài tư vấn MedBook', number: '1900 6868', desc: 'Hỗ trợ đặt lịch & giải đáp' }
];

export const PREPARATION_TIPS = [
  {
    title: 'Nhịn ăn sáng khi làm xét nghiệm',
    desc: 'Nếu cần xét nghiệm máu (đường huyết, mỡ máu, chức năng gan thận), nên nhịn ăn ít nhất 6-8 tiếng, chỉ uống nước lọc.',
    icon: 'Coffee'
  },
  {
    title: 'Mang theo giấy tờ tùy thân & BHYT',
    desc: 'Căn cước công dân gắn chip hoặc ứng dụng VNeID / VssID, thẻ BHYT còn hạn sử dụng để hưởng quyền lợi giảm phí.',
    icon: 'CreditCard'
  },
  {
    title: 'Hồ sơ bệnh án & đơn thuốc cũ',
    desc: 'Đem theo các kết quả chụp X-quang, MRI, siêu âm gần nhất và danh sách các loại thuốc đang uống hàng ngày.',
    icon: 'FileText'
  },
  {
    title: 'Đến trước giờ hẹn 15-20 phút',
    desc: 'Xuất trình mã QR phiếu khám điện tử tại quầy tiếp đón ưu tiên để lấy số thứ tự phòng khám nhanh chóng.',
    icon: 'Clock'
  }
];

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  HelpCircle, 
  HeartHandshake, 
  Stethoscope, 
  Clock, 
  MessageSquare,
  Bot,
  User,
  Loader2
} from 'lucide-react';
import { TriageResult, Doctor } from '../types';
import { DOCTORS, SPECIALTIES } from '../data/mockData';

interface AiSymptomAdvisorProps {
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onSelectSpecialtyToFilter: (specialtyId: string) => void;
}

export const AiSymptomAdvisor: React.FC<AiSymptomAdvisorProps> = ({
  onSelectDoctorToBook,
  onSelectSpecialtyToFilter,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'triage' | 'chat'>('triage');

  // Triage state
  const [symptoms, setSymptoms] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('Nam');
  const [duration, setDuration] = useState('2-3 ngày');
  const [history, setHistory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [triageError, setTriageError] = useState('');

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Chào bạn! Tôi là Bác sĩ Trợ lý AI MedBook. Bạn có thắc mắc gì về việc chuẩn bị trước khi đi khám (nhịn ăn, giấy tờ BHYT cần mang, quy trình tại bệnh viện) không?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const symptomPresets = [
    'Tức ngực khó thở khi gắng sức',
    'Trẻ sốt cao 39°C ho nhiều',
    'Đau bụng thượng vị, ợ hơi chua',
    'Đau mỏi thắt lưng lan xuống chân',
    'Mất ngủ kéo dài, đau nửa đầu',
    'Mẩn ngứa nổi mề đay toàn thân'
  ];

  const handleRunTriage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptoms.trim()) {
      setTriageError('Vui lòng nhập mô tả triệu chứng của bạn.');
      return;
    }

    setIsLoading(true);
    setTriageError('');

    try {
      const response = await fetch('/api/ai/symptom-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms,
          patientAge,
          gender,
          duration,
          history
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi máy chủ khi phân tích');
      }

      const data: TriageResult = await response.json();
      setTriageResult(data);
    } catch (err: any) {
      console.error(err);
      // Fallback result in case of network issue
      setTriageResult({
        recommendedSpecialtyId: 'kham-tong-quat',
        recommendedSpecialtyName: 'Nội Tổng Quát & Tầm Soát',
        urgencyLevel: 'medium',
        analysis: 'Triệu chứng của bạn cần được bác sĩ chuyên khoa thăm khám lâm sàng và thực hiện xét nghiệm cận lâm sàng cần thiết.',
        possibleCauses: ['Phản ứng cơ thể với thời tiết/căng thẳng', 'Viêm nhiễm thông thường', 'Cần kiểm tra sâu hơn'],
        selfCareAdvice: [
          'Nghỉ ngơi nơi thoáng mát và uống đủ 2 lít nước ấm/ngày',
          'Tránh vận động quá sức hoặc tự ý dùng thuốc liều cao',
          'Theo dõi thân nhiệt và huyết áp định kỳ'
        ],
        warningSignsToHospital: [
          'Đau nhói ngực dữ dội hoặc khó thở tăng dần',
          'Sốt cao liên tục không đáp ứng thuốc hạ sốt'
        ],
        questionsToDoctor: [
          'Tôi có cần làm xét nghiệm máu hay chụp phim không?',
          'Chế độ ăn uống cần lưu ý gì trong đợt điều trị này?'
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          chatHistory: chatMessages.map((m) => ({ role: m.role, content: m.text }))
        })
      });

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || 'Cảm ơn câu hỏi của bạn. Hãy liên hệ hotline 1900 6868 nếu cần hỗ trợ khẩn cấp.'
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Xin lỗi, không thể kết nối tới trợ lý AI lúc này. Bạn vui lòng thử lại sau ít phút.'
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Doctors matching triage specialty
  const matchingDoctors = triageResult
    ? DOCTORS.filter((d) => d.specialtyId === triageResult.recommendedSpecialtyId).slice(0, 3)
    : [];

  const getUrgencyBadge = (level: string) => {
    switch (level) {
      case 'emergency':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-bold animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            Mức độ: Cấp cứu y tế ngay (Gọi 115)
          </span>
        );
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            Mức độ: Nên khám ngay trong ngày
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-600 text-white rounded-full text-xs font-bold">
            <Activity className="w-4 h-4" />
            Mức độ: Nên khám trong 1 - 2 ngày tới
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            Mức độ: Theo dõi tại nhà / Khám định kỳ
          </span>
        );
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-[75vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Title & Description */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Công nghệ Trí tuệ Nhân tạo Y tế Gemini 3.7 Flash
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trợ Lý Y Tế & Phân Luồng Triệu Chứng AI
          </h1>
          <p className="text-sm text-slate-600">
            Mô tả cảm giác khó chịu của bạn, AI sẽ hỗ trợ định hướng chuyên khoa phù hợp và gợi ý các bước chuẩn bị trước khi đến viện.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveSubTab('triage')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'triage'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Phân tích triệu chứng & Gợi ý bác sĩ</span>
          </button>
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hỏi đáp chuẩn bị khám với AI</span>
          </button>
        </div>

        {/* SUBTAB 1: TRIAGE */}
        {activeSubTab === 'triage' && (
          <div className="space-y-6">
            {/* Input form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <form onSubmit={handleRunTriage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mô tả triệu chứng, cảm giác khó chịu của bạn <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="triage-symptoms-input"
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Ví dụ: Tôi bị đau tức ngực bên trái khi leo cầu thang 3 ngày nay, thỉnh thoảng thấy hồi hộp đánh trống ngực và vã mồ hôi..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  ></textarea>

                  {/* Preset symptom chips */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Chọn nhanh:</span>
                    {symptomPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSymptoms(preset)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient details (Optional) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Độ tuổi</label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="Ví dụ: 32"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Giới tính</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Thời gian bị</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Ví dụ: 3 ngày"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tiền sử bệnh</label>
                    <input
                      type="text"
                      value={history}
                      onChange={(e) => setHistory(e.target.value)}
                      placeholder="Huyết áp, tiểu đường..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {triageError && (
                  <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {triageError}
                  </p>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    id="btn-run-ai-triage"
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Bác sĩ AI đang phân tích...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Phân tích triệu chứng ngay</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Triage Results Card */}
            {triageResult && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-lg space-y-6">
                {/* Result Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Kết quả phân luồng đề xuất
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                      <span>Khám Chuyên Khoa:</span>
                      <span className="text-emerald-700 underline decoration-emerald-400 decoration-2">
                        {triageResult.recommendedSpecialtyName}
                      </span>
                    </h2>
                  </div>
                  {getUrgencyBadge(triageResult.urgencyLevel)}
                </div>

                {/* Medical Analysis */}
                <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 text-sm text-slate-800 leading-relaxed">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-1.5 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-emerald-700" />
                    Đánh giá sơ bộ từ Bác sĩ AI
                  </h3>
                  <p>{triageResult.analysis}</p>
                </div>

                {/* 2-Column Grid: Possible causes & Home self care */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Nguyên nhân phổ biến có thể nghĩ tới
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {triageResult.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
                      Lời khuyên chăm sóc tại nhà
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {triageResult.selfCareAdvice.map((advice, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{advice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Warning Red Flags */}
                <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 text-xs text-rose-900">
                  <h4 className="font-bold flex items-center gap-1.5 text-rose-800 mb-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Dấu hiệu cảnh báo nguy hiểm (Cần đến bệnh viện cấp cứu ngay):
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {triageResult.warningSignsToHospital.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>

                {/* Questions to ask doctor */}
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-900">
                  <h4 className="font-bold flex items-center gap-1.5 text-blue-800 mb-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Gợi ý câu hỏi bạn nên hỏi bác sĩ khi vào phòng khám:
                  </h4>
                  <ul className="list-decimal pl-5 space-y-1">
                    {triageResult.questionsToDoctor.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Doctors to Book immediately */}
                {matchingDoctors.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Bác sĩ chuyên khoa {triageResult.recommendedSpecialtyName} nổi bật:
                      </h4>
                      <button
                        onClick={() => onSelectSpecialtyToFilter(triageResult.recommendedSpecialtyId)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        Xem tất cả bác sĩ →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {matchingDoctors.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-3.5 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200 transition-all flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={doc.avatar}
                              alt={doc.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-bold text-xs text-slate-900 truncate">
                                {doc.title} {doc.name}
                              </h5>
                              <p className="text-[11px] text-slate-500 truncate">{doc.hospital}</p>
                              <span className="text-[11px] font-extrabold text-emerald-700">
                                {doc.consultationFee.toLocaleString('vi-VN')} đ
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => onSelectDoctorToBook(doc)}
                            className="mt-3 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-all shadow-xs flex items-center justify-center gap-1"
                          >
                            <span>Đặt khám bác sĩ</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medical Disclaimer */}
                <p className="text-[11px] text-slate-400 italic text-center pt-2">
                  * Tuyên bố miễn trừ trách nhiệm y tế: Kết quả phân luồng từ AI chỉ mang tính định hướng thông tin tham khảo, không thể thay thế cho chẩn đoán lâm sàng của bác sĩ chuyên khoa có chứng chỉ hành nghề.
                </p>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: CHAT ASSISTANT */}
        {activeSubTab === 'chat' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
            {/* Chat header */}
            <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Bác sĩ Trợ lý AI MedBook</h3>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Trực tuyến 24/7 • Sẵn sàng giải đáp
                </span>
              </div>
            </div>

            {/* Chat messages stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Bác sĩ AI đang soạn câu trả lời...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                id="ai-chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hỏi về chuẩn bị nhịn ăn, giấy tờ BHYT, quy trình khám..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

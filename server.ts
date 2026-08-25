import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy/safe initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Symptom Triage endpoint
app.post("/api/ai/symptom-triage", async (req, res) => {
  try {
    const { symptoms, patientAge, gender, duration, history } = req.body;

    if (!symptoms || typeof symptoms !== "string") {
      res.status(400).json({ error: "Vui lòng nhập mô tả triệu chứng." });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback rule-based triage if no API key is provided
      const lower = symptoms.toLowerCase();
      let specId = "kham-tong-quat";
      let specName = "Nội Tổng Quát & Tầm Soát";
      let urgency: "low" | "medium" | "urgent" | "emergency" = "low";

      if (lower.includes("ngực") || lower.includes("tim") || lower.includes("huyết áp") || lower.includes("hồi hộp")) {
        specId = "tim-mach";
        specName = "Tim Mạch & Huyết Áp";
        urgency = lower.includes("khó thở") || lower.includes("dữ dội") ? "urgent" : "medium";
      } else if (lower.includes("da") || lower.includes("ngứa") || lower.includes("mụn") || lower.includes("dị ứng") || lower.includes("phát ban")) {
        specId = "da-lieu";
        specName = "Da Liễu & Thẩm Mỹ Da";
      } else if (lower.includes("xương") || lower.includes("khớp") || lower.includes("lưng") || lower.includes("gối") || lower.includes("cột sống")) {
        specId = "co-xuong-khop";
        specName = "Cơ Xương Khớp";
        urgency = "medium";
      } else if (lower.includes("bụng") || lower.includes("dạ dày") || lower.includes("tiêu chảy") || lower.includes("ợ chua") || lower.includes("nôn")) {
        specId = "tieu-hoa-gan-mat";
        specName = "Tiêu Hóa & Gan Mật";
      } else if (lower.includes("họng") || lower.includes("tai") || lower.includes("mũi") || lower.includes("xoang") || lower.includes("ù tai")) {
        specId = "tai-mui-hong";
        specName = "Tai Mũi Họng";
      } else if (lower.includes("đầu") || lower.includes("chóng mặt") || lower.includes("mất ngủ") || lower.includes("tiền đình")) {
        specId = "than-kinh";
        specName = "Thần Kinh & Đột Quỵ";
      } else if (lower.includes("mắt") || lower.includes("nhìn mờ") || lower.includes("cộm")) {
        specId = "mat";
        specName = "Mắt & Nhãn Khoa";
      } else if (patientAge && Number(patientAge) < 16) {
        specId = "nhi-khoa";
        specName = "Nhi Khoa & Sơ Sinh";
      }

      res.json({
        recommendedSpecialtyId: specId,
        recommendedSpecialtyName: specName,
        urgencyLevel: urgency,
        analysis: `Dựa trên triệu chứng '${symptoms}', chuyên khoa phù hợp nhất để thăm khám là ${specName}.`,
        possibleCauses: ["Rối loạn chức năng thông thường", "Phản ứng cấp tính của cơ thể", "Cần làm xét nghiệm cận lâm sàng chuyên sâu"],
        selfCareAdvice: [
          "Uống đủ nước ấm và nghỉ ngơi hợp lý",
          "Theo dõi chỉ số sinh hiệu (nhiệt độ, huyết áp) tại nhà",
          "Không tự ý mua thuốc kháng sinh hoặc thuốc liều cao khi chưa có chỉ định"
        ],
        warningSignsToHospital: [
          "Đau dữ dội không thuyên giảm",
          "Sốt cao liên tục > 39°C không hạ",
          "Khó thở, tím tái hoặc ngất xỉu"
        ],
        questionsToDoctor: [
          "Triệu chứng này có nguy hiểm không bác sĩ?",
          "Tôi cần làm những xét nghiệm hoặc chẩn đoán hình ảnh nào?",
          "Cần kiêng khem gì trong chế độ ăn uống hàng ngày?"
        ]
      });
      return;
    }

    const prompt = `Bạn là Bác sĩ Trưởng bộ phận Phân luồng & Khám bệnh trực tuyến của hệ thống Y tế MedBook Việt Nam.
Hãy phân tích triệu chứng của bệnh nhân và trả về kết quả gợi ý chuyên khoa khám chính xác nhất bằng định dạng JSON.

Thông tin bệnh nhân:
- Triệu chứng mô tả: "${symptoms}"
- Độ tuổi: ${patientAge || "Chưa cung cấp"}
- Giới tính: ${gender || "Chưa cung cấp"}
- Thời gian xuất hiện: ${duration || "Vài ngày gần đây"}
- Tiền sử bệnh: ${history || "Không có tiền sử đặc biệt"}

Danh sách mã chuyên khoa có sẵn trong hệ thống:
1. 'tim-mach' (Tim Mạch & Huyết Áp)
2. 'nhi-khoa' (Nhi Khoa & Sơ Sinh - dành cho trẻ em < 16 tuổi)
3. 'da-lieu' (Da Liễu & Thẩm Mỹ Da)
4. 'tai-mui-hong' (Tai Mũi Họng)
5. 'co-xuong-khop' (Cơ Xương Khớp)
6. 'tieu-hoa-gan-mat' (Tiêu Hóa & Gan Mật)
7. 'than-kinh' (Thần Kinh & Đột Quỵ)
8. 'san-phu-khoa' (Sản Phụ Khoa)
9. 'mat' (Mắt & Nhãn Khoa)
10. 'kham-tong-quat' (Nội Tổng Quát & Tầm Soát)

Mức độ khẩn cấp (urgencyLevel): 'low' (khám định kỳ/theo dõi), 'medium' (nên khám trong 1-2 ngày), 'urgent' (cần khám trong ngày), 'emergency' (cấp cứu ngay lập tức đến cơ sở y tế gần nhất).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedSpecialtyId: {
              type: Type.STRING,
              description: "Mã chuyên khoa (một trong các mã: tim-mach, nhi-khoa, da-lieu, tai-mui-hong, co-xuong-khop, tieu-hoa-gan-mat, than-kinh, san-phu-khoa, mat, kham-tong-quat)"
            },
            recommendedSpecialtyName: {
              type: Type.STRING,
              description: "Tên tiếng Việt của chuyên khoa"
            },
            urgencyLevel: {
              type: Type.STRING,
              description: "low | medium | urgent | emergency"
            },
            analysis: {
              type: Type.STRING,
              description: "Lời giải thích y khoa súc tích, dễ hiểu và trấn an bệnh nhân"
            },
            possibleCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-4 nguyên nhân phổ biến có thể nghĩ tới (chỉ mang tính tham khảo)"
            },
            selfCareAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 lời khuyên chăm sóc tại nhà trong lúc chờ lịch khám"
            },
            warningSignsToHospital: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 dấu hiệu cảnh báo đỏ nguy hiểm cần đi cấp cứu ngay"
            },
            questionsToDoctor: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 câu hỏi quan trọng bệnh nhân nên hỏi bác sĩ khi vào phòng khám"
            }
          },
          required: [
            "recommendedSpecialtyId",
            "recommendedSpecialtyName",
            "urgencyLevel",
            "analysis",
            "possibleCauses",
            "selfCareAdvice",
            "warningSignsToHospital",
            "questionsToDoctor"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI model");
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("AI Triage Error:", error);
    res.status(500).json({
      error: "Không thể phân tích triệu chứng lúc này. Vui lòng chọn chuyên khoa trực tiếp hoặc thử lại sau.",
      details: error?.message
    });
  }
});

// AI Health Q&A Assistant endpoint
app.post("/api/ai/health-chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Nội dung tin nhắn không hợp lệ." });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        reply: "Chào bạn, trợ lý MedBook sẵn sàng hỗ trợ! Trước khi đi khám, bạn vui lòng mang theo Căn cước công dân gắn chip / VNeID và thẻ BHYT. Nếu bạn có chỉ định xét nghiệm máu hoặc siêu âm ổ bụng, hãy nhịn ăn sáng từ 6-8 tiếng và chỉ uống nước lọc nhé."
      });
      return;
    }

    const systemPrompt = `Bạn là Trợ lý Y tế Thông minh của ứng dụng Đặt Lịch Khám Bệnh MedBook Việt Nam.
Nhiệm vụ của bạn là:
1. Hướng dẫn bệnh nhân cách chuẩn bị trước khi đi khám (ví dụ: nhịn ăn khi xét nghiệm máu, siêu âm, giấy tờ BHYT cần mang theo, đến viện trước 15 phút).
2. Giải thích từ ngữ y khoa cơ bản bằng ngôn ngữ thân thiện, chuẩn mực, ân cần.
3. Hướng dẫn quy trình đặt khám, đổi lịch, hủy lịch trên hệ thống MedBook.
4. Luôn ghi rõ cảnh báo: "Lưu ý: Tư vấn của AI chỉ mang tính chất tham khảo, không thay thế chẩn đoán y khoa trực tiếp từ bác sĩ chuyên khoa."
5. Giữ câu trả lời súc tích, định dạng gạch đầu dòng rõ ràng, dùng tiếng Việt chuẩn mực.`;

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    // Send previous turns if provided
    if (Array.isArray(chatHistory)) {
      for (const turn of chatHistory.slice(-4)) {
        if (turn.role === "user" && turn.content) {
          await chat.sendMessage({ message: turn.content });
        }
      }
    }

    const response = await chat.sendMessage({ message: message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      reply: "Xin lỗi, trợ lý AI đang quá tải. Bạn hãy tham khảo phần Hướng dẫn chuẩn bị trước khi khám hoặc liên hệ tổng đài 1900 6868 nhé!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MedBook server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

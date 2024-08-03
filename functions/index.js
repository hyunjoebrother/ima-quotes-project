const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.generateSummaryAndQuote = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      const { who, where, what } = req.body;

      if (!who || !where || !what) {
        res
          .status(400)
          .send("Invalid request: 'who', 'where', and 'what' are required.");
        return;
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySetting: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `만약 내일 세상이 멸망한다면 ${who}랑 ${where}에서, ${what}을 하고 싶어요. 해당 내용을 한 줄로 '당신은 지금, 내일 세상이 멸망한다면,'를 시작으로 요약해주고, 어울리는 철학자나 유명인의 명언 하나를  '이름, 명언' 형식으로 알려주고 간단하게 설명해줘. 결과값은 json형식으로 . 각 변수를 summary, quote, info로 설정해줘`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const parsedResponse = JSON.parse(response);
      console.log("ai결과", parsedResponse);

      res.status(200).send(parsedResponse);
    } catch (error) {
      logger.error("Error generating content", error);
      res.status(500).send("Error generating content");
    }
  }
);

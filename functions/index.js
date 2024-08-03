const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.sayHello = onRequest({ cors: true }, async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "만약 내일 세상이 멸망한다면 누구랑, 어디에서, 무엇을 하고 말해주면 해당 내용을 한 줄로 요약해주고, 어울리는 철학자나 유명인의 명언 하나를 알려줘. 나는 '좋아하는 아이돌'이랑 '콘서트장'에서 '하루종일 노래를 듣고 싶어'";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log('ai결과', response)
  res.status(200).send(text);
});

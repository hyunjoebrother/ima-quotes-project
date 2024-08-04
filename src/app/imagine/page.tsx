"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://ima-quotes.pockethost.io");

const loadingMessages = [
  "로딩중입니다..",
  "명언을 찾는 중입니다.....",
  "잠시만 기다려주세요..",
  "금방 준비됩니다...",
  "곧 완료됩니다..",
];

const Main: React.FC = () => {
  const [who, setWho] = useState<string>("");
  const [where, setWhere] = useState<string>("");
  const [what, setWhat] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("로딩중입니다...");
  const router = useRouter();

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout;

    if (loading) {
      let messageIndex = 0;
      loadingInterval = setInterval(() => {
        setLoadingText(loadingMessages[messageIndex]);
        messageIndex = (messageIndex + 1) % loadingMessages.length;
      }, 2500);
    }

    return () => {
      clearInterval(loadingInterval);
    };
  }, [loading]);

  const handleWhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setWho(e.target.value);
    }
  };

  const handleWhereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setWhere(e.target.value);
    }
  };

  const handleWhatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setWhat(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (who.trim() === "" || where.trim() === "" || what.trim() === "") {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await pb.collection("answers").create({
        who,
        where,
        what,
      });

      const { id } = response;

      // API 호출
      const apiResponse = await axios.post(
        `https://api-mei.ima-quotes.com/generateSummaryAndQuote`,
        { who, where, what }
      );

      const { summary, quote, info } = apiResponse.data;

      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "dall-e-3",
          prompt: summary,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const imgUrl = openaiResponse.data.data[0].url;

      await pb.collection("answers").update(id, {
        quote,
        info,
        summary,
        imgUrl: imgUrl,
      });

      localStorage.setItem("quotes-quote", quote);
      localStorage.setItem("quotes-info", info);
      localStorage.setItem("quotes-summary", summary);
      localStorage.setItem("quotes-image-url", imgUrl);
      setLoading(false);
      router.push("/quotes");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setError("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full h-screen flex flex-col items-center bg-white">
        <div className="w-full min-h-[36vh] sm:min-h-[40vh] tb:min-h-[48vh] lg:min-h-[56vh] bg-imagineBg bg-no-repeat bg-cover lg:px-12 tb:px-10 px-8 2xs:px-6 mb-1 lg:pt-16 tb:pt-14 sm:pt-12 pt-8 text-white">
          <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
            당신에게 어울리는
          </h3>
          <p className="mt-2 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-base font-medium">
            명언 카드를 찾아볼게요
          </p>
        </div>
        <div className="w-full h-full pt-1">
          <div className="w-full 2xs:py-6 xs:py-6 2sm:py-6 py-10 px-8 bg-white">
            <h3 className="text-black font-bold lg:text-xl tb:text-lg sm:text-lg 2sm:text-lg text-base">
              만약에 지금, 내일 세상이 끝난다면
            </h3>

            <div className="w-full flex flex-col pt-8">
              <label htmlFor="who" className="text-black">
                당신은 누구랑 있나요?
              </label>
              <input
                type="text"
                id="who"
                value={who}
                placeholder="10자 이내로 작성해주세요"
                onChange={handleWhoChange}
                className="text-black tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
                required
              />
              <label htmlFor="where" className="text-black">
                당신은 어디에 있나요?
              </label>
              <input
                type="text"
                id="where"
                value={where}
                placeholder="10자 이내로 작성해주세요"
                onChange={handleWhereChange}
                className="text-black tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
                required
              />
              <label htmlFor="what" className="text-black">
                당신은 무엇을 하고 있나요? (30자 이내)
              </label>
              <input
                type="text"
                id="what"
                value={what}
                placeholder="30자 이내로 작성해주세요"
                onChange={handleWhatChange}
                className="text-black tb:w-[32rem] lg:w-[32rem] mt-2 p-2 border border-gray-300 rounded-xl"
                required
              />
              <button
                onClick={handleSubmit}
                className="mt-10 flex w-36 h-10 bg-[#968ad3] rounded-lg text-white text-base font-medium text-center items-center justify-center"
                disabled={loading}
              >
                완료
              </button>
              {loading && (
                <div className="fixed flex-col gap-3 inset-0 flex items-center justify-center bg-[#03040d] bg-opacity-70 z-50">
                  <img
                    src="../images/gif-shuffle.gif"
                    alt="Loading..."
                    className="w-64 h-64"
                  />
                  <h3 className="text-white text-xl font-bold">
                    {loadingText}
                  </h3>
                </div>
              )}
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
          </div>
          <div className="w-full flex flex-col px-9 py-4 bg-gray-300">
            <h3 className="text-sm font-bold text-gray-500">
              모두 함께 소소하게 상상을 공유해봐요!
            </h3>
            <ul className="flex flex-col list-disc list-inside text-xs text-gray-400 gap-1 my-2">
              <li>응답을 제출한 후에는 수정 및 삭제가 불가능합니다.</li>
              <li>
                적절하지 않은 내용이 입력된 경우, 해당 응답은 임의로 삭제
                처리됩니다.
              </li>
              <li>모두가 소소하게 상상을 공유하는 자리입니다.</li>
              <li>
                다른 사람들이 어떤 상상을 하는지 확인하며, 여러분의 명언 카드도
                보여주세요.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;

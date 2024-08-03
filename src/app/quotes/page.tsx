"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Quotes: React.FC = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedQuote = localStorage.getItem("quotes-quote");
    const storedInfo = localStorage.getItem("quotes-info");
    const storedSummary = localStorage.getItem("quotes-summary");
    const storedImageUrl = localStorage.getItem("quotes-image-url");

    if (storedQuote) {
      setQuote(storedQuote);
    }

    if (storedInfo) {
      setInfo(storedInfo);
    }

    if (storedSummary) {
      setSummary(storedSummary);
    }

    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  const handleBackToMain = () => {
    localStorage.removeItem("quotes-quote");
    localStorage.removeItem("quotes-info");
    localStorage.removeItem("quotes-summary");
    localStorage.removeItem("quotes-image-url");
    router.push("/");
  };

  return (
    <section className="w-full h-screen flex flex-col items-center">
      <div className="w-full min-h-[36vh] sm:min-h-[40vh] tb:min-h-[48vh] lg:min-h-[56vh] bg-quotesBg bg-no-repeat bg-cover lg:px-12 tb:px-10 px-8 2xs:px-6 mb-1 lg:pt-16 tb:pt-14 sm:pt-12 pt-8 text-black">
        <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
          당신에게 어울리는 명언과 장면
        </h3>

        <p className="mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-base font-medium">
          당신의 상상력을 담은 결과입니다
        </p>
      </div>
      <div className="w-full h-full pt-1 flex flex-col items-center">
        <div className="w-full 2xs:py-6 xs:py-6 2sm:py-6 py-10 px-8 mb-2 bg-white text-center">
          {summary ? (
            <>
              <h1>{quote}</h1>
              <h1>{info}</h1>
              <h3 className="font-bold lg:text-xl tb:text-lg sm:text-lg 2sm:text-lg text-base mb-4">
                {summary}
              </h3>
            </>
          ) : (
            <p>요약을 불러오는 중...</p>
          )}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated scene"
              className="max-w-full h-auto mt-4"
            />
          ) : (
            <p>이미지를 불러오는 중...</p>
          )}
        </div>
        <button
          onClick={handleBackToMain}
          className="flex w-28 h-10 bg-slate-700 rounded-lg text-white text-base font-medium text-center items-center justify-center"
        >
          메인으로 이동
        </button>
      </div>
    </section>
  );
};

export default Quotes;

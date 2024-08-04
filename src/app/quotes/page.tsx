"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import html2canvas from "html2canvas";

const Quotes: React.FC = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

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

  // const handleDownload = () => {
  //   const element = document.getElementById("quote-card");
  //   if (element) {
  //     html2canvas(element).then((canvas) => {
  //       const link = document.createElement("a");
  //       link.download = "quote-card.png";
  //       link.href = canvas.toDataURL();
  //       link.click();
  //     });
  //   }
  // };

  return (
    <section className="w-full h-min-screen pb-12 flex flex-col items-center bg-black">
      <div className="w-full min-h-[36vh] sm:min-h-[40vh] tb:min-h-[48vh] lg:min-h-[56vh] bg-quotesBg bg-no-repeat bg-center bg-cover lg:px-12 tb:px-10 px-8 2xs:px-6 mb-1 lg:pt-16 tb:pt-14 sm:pt-12 pt-8 text-black">
        <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
          당신에게 어울리는 명언과 장면
        </h3>
        <p className="mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-base font-medium">
          당신의 상상력을 담은 결과입니다
        </p>
      </div>
      <div className="w-full h-full 2xs:px-2 xs:px-4 2sm:px-4 sm:px-20 tb:px-28 lg:px-32 flex flex-col items-center">
        <div className="w-full 2xs:py-12 xs:py-10 2sm:py-10 py-10 px-4 mb-2 bg-black text-center">
          <div
            id="quote-card"
            className="gradient-border w-full flex flex-col items-center justify-center bg-white px-2 sm:px-12 tb:px-16 lg:px-20 py-12 rounded-xl shadow-lg"
          >
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl tb:text-3xl lg:text-3xl font-bold font-brush">
                "{quote}"
              </h1>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Generated scene"
                  className="2xs:w-[30vh] w-[32vh] sm:w-[36vh] tb:w-[40vh] lg:w-[40vh] h-auto py-4 sm:py-6 tb:my-6 lg:my-8 rounded-md"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
            <div className="2xs:px-4 xs:px-4 2sm:px-4">
              <h3 className="font-bold xs:text-base 2sm:text-base sm:text-base tb:text-lg lg:text-xl text-base my-4">
                {summary}
              </h3>
              <h1 className="xs:text-sm 2sm:text-sm sm:text-sm tb:text-lg lg:text-base font-medium leading-[150%]">
                {info}
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm sm:text-base tb:text-lg lg:text-xl  font-bold text-gray-200">
            *이미지를 꾹 눌러서 저장히세요!
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div>
            <div>
              <p className="mb-2 text-sm sm:text-base tb:text-lg lg:text-xl font-bold text-gray-200">
                화면을 캡처해서 "지금, 명언" 카드를 공유하세요!
              </p>
              <button>공유하기</button>
            </div>
            <button
              onClick={handleBackToMain}
              className="flex w-full h-12 bg-[#968ad3] rounded-lg text-white text-base font-medium text-center items-center justify-center mb-4"
            >
              메인으로 이동
            </button>
          </div>
        </div>
        {/* <button
          onClick={handleDownload}
          className="flex w-28 h-10 bg-green-600 rounded-lg text-white text-base font-medium text-center items-center justify-center"
          disabled={!imageLoaded}
        >
          다운로드
        </button> */}
      </div>
    </section>
  );
};

export default Quotes;

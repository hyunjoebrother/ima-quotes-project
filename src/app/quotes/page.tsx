"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Results: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      const who = localStorage.getItem("quotes-who");
      const where = localStorage.getItem("quotes-where");
      const what = localStorage.getItem("quotes-what");

      if (!who || !where || !what) {
        router.push("/");
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:5001/ima-quotes-project/us-central1/generateSummaryAndQuote",
          {
            who,
            where,
            what,
          }
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [router]);

  console.log("FE에서 받은 값", result);

  const handleBackToMain = () => {
    localStorage.removeItem("quotes-who");
    localStorage.removeItem("quotes-where");
    localStorage.removeItem("quotes-what");
    router.push("/");
  };

  return (
    <section className="w-full flex min-h-screen flex-col lg:px-28 xs:gap-10 gap-12 tb:gap-16 lg:gap-20 items-center 2xs:pt-20 xs:pt-24 2sm:pt-28 sm:pt-28 tb:pt-32 pt-40 ">
      <div className="w-full">
        <div className="w-full h-40 pl-8 mb-2 bg-orange-300">
          <h3 className="font-bold 2xs:text-sm xs:text-lg text-xl">
            당신에게 어울리는 결과
          </h3>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 px-10">
        {result ? (
          <>
            <h3 className="text-lg font-bold">결과</h3>
            <p>요약: {result.summary}</p>
            <p>명언: {result.quote}</p>
            <p>내용: {result.info}</p>
            <button
              onClick={handleBackToMain}
              className="flex w-28 h-10 bg-slate-700 rounded-lg text-white text-base font-medium text-center items-center justify-center"
            >
              메인으로 이동
            </button>
          </>
        ) : (
          <p>결과를 불러오는 중...</p>
        )}
      </div>
    </section>
  );
};

export default Results;

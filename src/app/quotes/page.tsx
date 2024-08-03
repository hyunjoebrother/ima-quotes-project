"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  let storedWho = localStorage.getItem("quotes-who");
  let storedWhere = localStorage.getItem("quotes-where");
  let storedWhat = localStorage.getItem("quotes-what");

  const handleSubmit = async () => {
    localStorage.setItem("quotes-who", "");
    localStorage.setItem("quotes-where", "");
    localStorage.setItem("quotes-what", "");
    router.push("/");
  };

  return (
    <>
      <section className="w-full flex min-h-screen flex-col lg:px-28 xs:gap-10 gap-12 tb:gap-16 lg:gap-20 items-center 2xs:pt-20 xs:pt-24 2sm:pt-28 sm:pt-28 tb:pt-32 pt-40 ">
        <div className="w-full">
          <div className="w-full h-40 pl-8 mb-2 bg-orange-300">
            <h3 className="font-bold 2xs:text-sm xs:text-lg text-xl">
              당신에게 어울리는
            </h3>
            명언과 장면을 알려드릴게요
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 px-10">
          <h3 className="text-lg font-bold">
            만약에 지금, 내일 세상이 끝난다면
          </h3>
          <div>
            당신은 누구 {storedWho}랑 어디 {storedWhere}에서 무엇{storedWhat}을
            하고 싶으시네요. (AI)로 변환?
          </div>
          <div>
            <h3>Gemini API 결과 값</h3>
            <p>어울리는 사진</p>
            <p>어울리는 명언</p>
          </div>
          <div>
            <p>sns 공유 버튼</p>
            <button onClick={handleSubmit}>
              <p>메인으로 이동 버튼</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;

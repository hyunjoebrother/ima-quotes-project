"use client";
import React, { useState } from "react";

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

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
          <label htmlFor="menu">당신은 누구랑 있을까요</label>
          <input type="text" />
          <label htmlFor="menu">당신은 어디에 있을까요</label>
          <input type="text" />
          <label htmlFor="reason">
            당신은 무엇을 하고 있을까요 (30자 이내)
          </label>
          <input type="text" />
          <a href="/">
            <div className="mt-8 flex w-28 h-10 bg-slate-700 rounded-lg text-white text-xl text-center items-center justify-center">
              완료
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Main;

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
              만약에 지금, 내일 세상이 끝난다면
            </h3>
            너와 어울리는 명언 추천
            <a href="/imagine">
              <div className="mt-8 flex w-48 h-12 bg-slate-700 rounded-lg text-white text-xl text-center items-center justify-center">
                나는 어떨까?
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;

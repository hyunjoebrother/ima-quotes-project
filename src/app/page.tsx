"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Main: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>("어서오세요");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLoadingText((prev) => (prev.length < 8 ? `${prev}.` : "어서오세요"));
    }, 500); // 0.5초마다 점 추가

    const timeout = setTimeout(() => {
      setIsFetching(false); // 3초 후 로딩 완료
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (isFetching) {
    return (
      <main className="w-full h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-black text-lg font-bold">{loadingText}</p>
      </main>
    );
  }

  return (
    <>
      {/* <HeadMeta /> */}

      <div className="w-full h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
              포토카드
            </h3>
            <p className=" mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-4xl font-medium">
              다
            </p>
            <p className="mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-2xl font-medium">
              삽니다
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Main;

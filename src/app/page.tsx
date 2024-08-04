"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Card from "./components/Card";

const pb = new PocketBase("https://ima-quotes.pockethost.io");

type Answer = {
  id: string;
  summary: string;
  quote: string;
  imgUrl: string;
  order: number;
  created: string;
};

const Main: React.FC = () => {
  const [answersData, setAnswersData] = useState<Answer[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answers = await pb
          .collection("answers")
          .getList(1, 100, { sort: "created" });
        const formattedAnswers = answers.items.map((item, index) => ({
          id: item.id,
          summary: item.summary,
          quote: item.quote,
          imgUrl: item.imgUrl,
          order: index + 1, // 순서 추가
          created: item.created,
        }));
        setAnswersData(formattedAnswers);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  if (isFetching) {
    return (
      <main className="w-full h-screen bg-white flex flex-col items-center justify-center">
        {/* <img src={movingBus.src} alt="" className="w-[40vw] h-[40vh]" /> */}
        <p className="text-black text-lg font-bold">로딩중...</p>
      </main>
    );
  }

  return (
    <>
      <section className="w-full h-full flex flex-col items-center">
        <div className="w-full min-h-[36vh] sm:min-h-[40vh] tb:min-h-[48vh] lg:min-h-[56vh] bg-mainBg bg-no-repeat bg-cover bg-center lg:px-12 tb:px-10 px-8 2xs:px-6 mb-1 lg:pt-16 tb:pt-14 sm:pt-12 pt-8 text-white">
          <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
            만약에 지금, 내일 세상이 끝난다면
          </h3>
          <p className="mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-base font-medium">
            당신한테 어울리는 명언 카드를 보여드려요
          </p>
          {answersData.length !== 0 ? (
            <>
              <a href="/imagine">
                <div className="lg:mt-40 tb:mt-32 sm:mt-30 2sm:mt-28 xs:mt-16 2xs:mt-28 flex lg:w-60 lg:h-10 tb:w-56 tb:h-12 sm:w-48 sm:h-10 2sm:w-full 2sm:h-10 2sm:rounded-full xs:w-full xs:h-10 xs:rounded-full 2xs:w-full 2xs:h-10 2xs:rounded-full rounded-xl bg-white text-center items-center justify-center">
                  <p className="text-[#968ad3] font-bold xs:text-sm sm:text-sm text-base 2xs:text-sm">
                    명언 카드 만들기
                  </p>
                </div>
              </a>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full min-h-screen 2xs:pt-6 xs:pt-6 2sm:pt-6 pt-10 px-8 mb-2 bg-white">
          <h3 className="font-bold lg:text-xl tb:text-lg sm:text-lg 2sm:text-lg text-base">
            이웃들의 명언 카드
          </h3>
          {answersData.length === 0 ? (
            <div className="w-full flex text-center text-lg text-gray-700">
              <h3>당신이 첫번째로 명언 카드를 보여주세요</h3>
              <a href="/imagine">
                <div className="lg:mt-40 tb:mt-32 sm:mt-30 2sm:mt-28 xs:mt-16 2xs:mt-28 flex lg:w-60 lg:h-10 tb:w-56 tb:h-12 sm:w-48 sm:h-10 2sm:w-full 2sm:h-10 2sm:rounded-full xs:w-full xs:h-10 xs:rounded-full 2xs:w-full 2xs:h-10 2xs:rounded-full rounded-xl bg-white text-center items-center justify-center">
                  <p className="text-[#968ad3] font-bold xs:text-sm sm:text-sm text-base 2xs:text-sm">
                    명언 카드 만들기
                  </p>
                </div>
              </a>
            </div>
          ) : (
            <div className="w-full 2xs:py-5 xs:py-5 2sm:py-6 sm:py-6 tb:py-8 lg:py-10 grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 lg:grid-cols-4 2xs:gap-6 xs:gap-6 2sm:gap-6 gap-4">
              {answersData.map((answer) => (
                <Card
                  key={answer.id}
                  id={answer.id}
                  summary={answer.summary}
                  quote={answer.quote}
                  imgUrl={answer.imgUrl}
                  order={answer.order}
                  created={answer.created}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Main;

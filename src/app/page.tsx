"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Card from "./components/Card";

const pb = new PocketBase("https://ima-quotes.pockethost.io");

type Answer = {
  id: string;
  who: string;
  where: string;
  what: string;
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
          .getList(1, 30, { sort: "created" });
        const formattedAnswers = answers.items.map((item, index) => ({
          id: item.id,
          who: item.who,
          where: item.where,
          what: item.what,
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
          <div className="w-full 2xs:py-5 xs:py-5 2sm:py-6 sm:py-6 tb:py-8 lg:py-10 grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 lg:grid-cols-4 2xs:gap-6 xs:gap-6 2sm:gap-6 gap-4">
            {answersData.map((answer) => (
              <Card
                key={answer.id}
                id={answer.id}
                who={answer.who}
                where={answer.where}
                what={answer.what}
                order={answer.order}
                created={answer.created}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;

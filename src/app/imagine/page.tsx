"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://ima-quotes.pockethost.io");

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [who, setWho] = useState<string>("");
  const [where, setWhere] = useState<string>("");
  const [what, setWhat] = useState<string>("");
  const router = useRouter();

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

    try {
      await pb.collection("answers").create({
        who,
        where,
        what,
      });
      alert("완료되었습니다!");
      setWho("");
      setWhere("");
      setWhat("");
      router.push("/");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          <label htmlFor="who">당신은 누구랑 있을까요</label>
          <input
            type="text"
            id="who"
            value={who}
            placeholder="10자 이내로 작성해주세요"
            onChange={handleWhoChange}
            className="mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
            required
          />
          <label htmlFor="where">당신은 어디에 있을까요</label>
          <input
            type="text"
            id="where"
            value={where}
            placeholder="10자 이내로 작성해주세요"
            onChange={handleWhereChange}
            className="mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
            required
          />
          <label htmlFor="what">당신은 무엇을 하고 있을까요 (30자 이내)</label>
          <input
            type="text"
            id="what"
            value={what}
            placeholder="30자 이내로 작성해주세요"
            onChange={handleWhatChange}
            className="mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
            required
          />
          <button
            onClick={handleSubmit}
            className="flex w-28 h-10 bg-slate-700 rounded-lg text-white text-base font-medium text-center items-center justify-center"
          >
            완료
          </button>
        </div>
      </section>
    </>
  );
};

export default Main;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://ima-quotes.pockethost.io");

const Main: React.FC = () => {
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

      localStorage.setItem("quotes-who", who);
      localStorage.setItem("quotes-where", where);
      localStorage.setItem("quotes-what", what);
      setWho("");
      setWhere("");
      setWhat("");

      router.push("/quotes");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <section className="w-full h-screen flex flex-col items-center">
        <div className="w-full min-h-[36vh] sm:min-h-[40vh] tb:min-h-[48vh] lg:min-h-[56vh] bg-imagineBg bg-no-repeat bg-cover lg:px-12 tb:px-10 px-8 2xs:px-6 mb-1 lg:pt-16 tb:pt-14 sm:pt-12 pt-8 text-black">
          <h3 className="font-bold 2xs:text-xl xs:text-xl 2sm:text-xl text-xl tb:text-2xl lg:text-3xl">
            당신에게 어울리는
          </h3>

          <p className="mt-4 2xs:text-xs xs:text-xs text-sm tb:text-base lg:text-base font-medium">
            명언과 장면을 알려드릴게요
          </p>
        </div>
        <div className="w-full h-full pt-1">
          <div className="w-full 2xs:py-6 xs:py-6 2sm:py-6 py-10 px-8 mb-2 bg-white">
            <h3 className="font-bold lg:text-xl tb:text-lg sm:text-lg 2sm:text-lg text-base">
              만약에 지금, 내일 세상이 끝난다면
            </h3>

            <div className="w-full flex flex-col pt-8">
              <label htmlFor="who">당신은 누구랑 있을까요</label>
              <input
                type="text"
                id="who"
                value={who}
                placeholder="10자 이내로 작성해주세요"
                onChange={handleWhoChange}
                className="tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
                required
              />
              <label htmlFor="where">당신은 어디에 있을까요</label>
              <input
                type="text"
                id="where"
                value={where}
                placeholder="10자 이내로 작성해주세요"
                onChange={handleWhereChange}
                className="tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 border border-gray-300 rounded-xl"
                required
              />
              <label htmlFor="what">
                당신은 무엇을 하고 있을까요 (30자 이내)
              </label>
              <input
                type="text"
                id="what"
                value={what}
                placeholder="30자 이내로 작성해주세요"
                onChange={handleWhatChange}
                className="tb:w-[32rem] lg:w-[32rem] mt-2 p-2 border border-gray-300 rounded-xl"
                required
              />
              <button
                onClick={handleSubmit}
                className="flex w-36 h-10 bg-slate-300 rounded-lg text-slate-700 text-base font-medium text-center items-center justify-center"
              >
                완료
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col px-9 py-4 bg-gray-300">
            <h3 className="text-sm font-bold text-gray-500">
              모두 함께 소소하게 상상을 공유해봐요!
            </h3>
            <ul className="flex flex-col list-disc list-inside text-xs text-gray-400 gap-1 my-2">
              <li>응답을 제출한 후에는 수정 및 삭제가 불가능합니다.</li>
              <li>
                적절하지 않은 내용이 입력된 경우, 해당 응답은 임의로 삭제
                처리됩니다.
              </li>
              <li>모두가 소소하게 상상을 공유하는 자리입니다.</li>
              <li>
                다른 사람들이 어떤 상상을 하는지 확인하며, 여러분의 명언 카드도
                보여주세요.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;

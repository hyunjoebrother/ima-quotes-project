"use client";
import React from "react";

type CardProps = {
  id: string;
  quote: string;
  summary: string;
  imgUrl: string;
  order: number;
  created: string;
};

function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear().toString().slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  // console.log(date, day, hours, '한국시간 오전오후 확인필요!')

  const period = hours < 12 ? "오전" : "오후";
  const hour12 = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${hour12}시쯤`;
}

const Card: React.FC<CardProps> = ({
  id,
  quote,
  summary,
  imgUrl,
  order,
  created,
}) => {
  return (
    <div
      key={id}
      className="flex flex-col w-full h-full justify-between tb:px-3 lg:px-3 px-4 py-3 bg-[#968ad3] border rounded-xl shadow-md"
    >
      <div>
        <h2 className="font-bold sm:text-base text-lg text-white">{quote}</h2>
        <h3>{quote}</h3>
        <img src={imgUrl} className="w-full h-[auto]" alt="" />
      </div>
      <div className="2xs:mt-6 xs:mt-6 2sm:mt-6 sm:mt-5 mt-3 lg:mt-4 flex-end flex-col items-end">
        <p className="text-xs font-light text-gray-300">
          {formatDateToKorean(created)}
        </p>
        <p className="text-sm font-bold text-gray-200">{order}번째 명언</p>
      </div>
    </div>
  );
};

export default Card;

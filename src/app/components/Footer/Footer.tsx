"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 sm:mb-0">
            <h5 className="text-lg font-semibold">사업자 정보</h5>
            <p className="text-sm">
              상호명: 예시회사 <br />
              대표자: 홍길동 <br />
              사업자등록번호: 123-45-67890 <br />
              주소: 서울특별시 예시구 예시로 123 <br />
              이메일: contact@example.com
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#privacy"
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              개인정보처리방침
            </a>
            <a
              href="#terms"
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              이용약관
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          © 2024 예시회사. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

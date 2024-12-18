"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="text-xl font-bold text-gray-900">로고</div>
        <nav className="hidden md:flex space-x-4">
          <a href="#home" className="text-gray-600 hover:text-gray-900">
            홈
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">
            소개
          </a>
          <a href="#contact" className="text-gray-600 hover:text-gray-900">
            연락처
          </a>
        </nav>
        <button
          type="button"
          className="md:hidden text-gray-600 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;

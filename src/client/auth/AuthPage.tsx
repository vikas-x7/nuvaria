"use client";

import React from "react";
import {  Mail } from "lucide-react";

export default function AuthPage() {
  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };

  const handleGithubSignIn = () => {
    console.log("GitHub Sign In");
  };

  return (
    <div className="min-h-screen flex font-[DM_Sans]">
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/55/fe/90/55fe90c39c86713dc3ed8f551f34613c.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-1/2 bg-black text-white flex items-center justify-center p-8"
        style={{
          backgroundImage: `url("./images/bgimage.png")`,
        }}
      >
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl text-center mb-2 text-gray-100 font-instrument">
              Welcome back!
            </h1>
          </div>

          {/* Social Login Buttons (TOP - same as before) */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-black" />
              <span className="text-gray-700 text-sm font-medium">
                Sign in with Google
              </span>
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubSignIn}
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              
              <span className="text-gray-700 text-sm font-medium">
                Sign in with GitHub
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* REPLACED SECTION (email हटाया → same style buttons) */}
          <div className="space-y-3 mb-6">
            {/* Google again (main CTA style) */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-orange-700 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubSignIn}
              className="w-full bg-gray-800 text-white font-medium py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
         
              Continue with GitHub
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <a href="#" className="text-black font-medium hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
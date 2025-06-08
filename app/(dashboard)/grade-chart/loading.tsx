"use client"
import { HashLoader } from "react-spinners"
export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <HashLoader color="#4F46E5" />
    </div>
  );
} 
"use client"
import { HashLoader } from "react-spinners"
export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <HashLoader color="#4F46E5" />
    </div>
  );
} 
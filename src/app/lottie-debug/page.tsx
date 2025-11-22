// src/app/lottie-debug/page.tsx
"use client"

import dynamic from "next/dynamic"
import animationData from "@/animations/Happy Spaceman.json"

// SSR 無効の動的 import（ブラウザだけで Lottie を動かす）
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function LottieDebugPage() {
  console.log("LottieDebug animationData:", animationData)

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
        <h1 className="text-base font-bold text-slate-900">
          Lottie デバッグページ
        </h1>
        <p className="text-xs text-slate-700">
          JSON が正しければ、下の枠の中でアニメーションが自動再生されます。
        </p>
        <div className="w-48 h-48 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
          <Lottie animationData={animationData} loop autoplay />
        </div>

        <p className="text-[11px] text-slate-500">
          ブラウザの DevTools コンソールに{" "}
          <code>LottieDebug animationData: {'{...}'}</code>
          のログが出ていれば、JSON 自体は読み込めています。
        </p>
      </div>
    </main>
  )
}

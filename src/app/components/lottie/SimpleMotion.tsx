"use client"

import Lottie from "lottie-react"
import animationData from "@/animations/Happy Spaceman.json"

export function SimpleMotion() {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          シンプル版 Lottie（ただループ再生）
        </h2>
        <p className="text-sm text-slate-700 mt-1">
          JSON 形式のアニメーションファイルを読み込んで、
          ひたすらループ再生するだけの最小構成です。
          「Lottie を入れるとこういう動きが簡単に載るんだな」というイメージ用です。
        </p>
      </div>

      <div className="mt-3 flex flex-col items-center gap-2">
        <div className="w-40 h-40 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden bg-slate-50">
          <Lottie animationData={animationData} loop autoplay />
        </div>
        <p className="text-[11px] text-emerald-700 font-medium">
          常にループ再生中
        </p>
      </div>

      <p className="text-[11px] text-slate-500">
        コード上は <code>animationData</code> を渡しているだけで、
        再生タイミングや速度の制御はしていません。
      </p>
    </div>
  )
}

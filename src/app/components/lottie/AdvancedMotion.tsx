"use client"

import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData from "@/animations/Happy Spaceman.json"
import { useRef, useState } from "react"

const TOTAL_FRAMES = 120 // JSON に合わせて調整推奨

export function AdvancedMotion() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [progress, setProgress] = useState(0) // 0〜100

  const play = () => {
    lottieRef.current?.setDirection(direction)
    lottieRef.current?.setSpeed(speed)
    lottieRef.current?.play()
    setIsPlaying(true)
  }

  const pause = () => {
    lottieRef.current?.pause()
    setIsPlaying(false)
  }

  const stop = () => {
    lottieRef.current?.stop()
    setIsPlaying(false)
    setProgress(0)
  }

  const setFaster = () => {
    const next = Math.min(speed + 0.5, 3)
    setSpeed(next)
    lottieRef.current?.setSpeed(next)
  }

  const setSlower = () => {
    const next = Math.max(speed - 0.5, 0.5)
    setSpeed(next)
    lottieRef.current?.setSpeed(next)
  }

  const toggleDirection = () => {
    const next: 1 | -1 = direction === 1 ? -1 : 1
    setDirection(next)
    lottieRef.current?.setDirection(next)
  }

  const handleProgressChange = (value: number) => {
    setProgress(value)
    const frame = (TOTAL_FRAMES * value) / 100
    lottieRef.current?.goToAndStop(frame, true)
    setIsPlaying(false)
  }

  const statusLabel = isPlaying
    ? "PLAYING"
    : progress === 0
    ? "STOPPED"
    : "PAUSED"

  return (
    <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          ゴリゴリ版 Lottie（インタラクティブ制御）
        </h2>
        <p className="text-sm text-slate-700 mt-1">
          ホバー・ボタン・スライダーから Lottie のタイムラインを直接制御します。
          「状態に応じてアニメーションの見せ方を変える」ケースを想定したデモです。
        </p>
      </div>

      {/* 状態が一目で分かるカード */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-800">
          1. 状態が分かる再生ビュー（Hover で再生 / 一時停止）
        </h3>
        <p className="text-[11px] text-slate-600">
          カードにマウスを乗せると再生、外すと一時停止します。
          再生中かどうかは、バッジと背景グラデーションではっきり表示しています。
        </p>

        <div
          className={[
            "mx-auto max-w-xs rounded-xl border transition-colors cursor-pointer flex flex-col items-center py-4 px-3",
            isPlaying
              ? "border-emerald-400 bg-linear-to-br from-emerald-50 to-sky-50"
              : "border-slate-200 bg-slate-50",
          ].join(" ")}
          onMouseEnter={play}
          onMouseLeave={pause}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[11px] font-medium text-slate-700">
              Hover で再生 / 離すと一時停止
            </span>
            <span
              className={
                "px-2 py-0.5 rounded-full text-[10px] font-semibold " +
                (isPlaying
                  ? "bg-emerald-500 text-white"
                  : progress === 0
                  ? "bg-slate-400 text-white"
                  : "bg-amber-500 text-white")
              }
            >
              {statusLabel}
            </span>
          </div>
          <div className="w-32 h-32 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop
              autoplay={false}
            />
          </div>
        </div>
      </section>

      {/* 再生コントロール群 */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-800">
          2. 再生コントロール（Play / Pause / Stop / 速度 / 方向）
        </h3>
        <p className="text-[11px] text-slate-600">
          下のボタンから、再生のスタート・一時停止・リセット、速度変更、逆再生を切り替えられます。
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={play}
            className="px-3 py-1 rounded bg-sky-600 text-white text-xs font-medium hover:bg-sky-700"
          >
            再生
          </button>
          <button
            onClick={pause}
            className="px-3 py-1 rounded bg-slate-200 text-xs text-slate-800 hover:bg-slate-300"
          >
            一時停止
          </button>
          <button
            onClick={stop}
            className="px-3 py-1 rounded bg-slate-200 text-xs text-slate-800 hover:bg-slate-300"
          >
            停止 / リセット
          </button>

          <button
            onClick={setFaster}
            className="px-3 py-1 rounded bg-emerald-500 text-xs text-white hover:bg-emerald-600"
          >
            速く（現在 {speed.toFixed(1)}x）
          </button>
          <button
            onClick={setSlower}
            className="px-3 py-1 rounded bg-amber-500 text-xs text-white hover:bg-amber-600"
          >
            遅く
          </button>
          <button
            onClick={toggleDirection}
            className="px-3 py-1 rounded bg-slate-800 text-xs text-white hover:bg-slate-900"
          >
            方向切替（現在 {direction === 1 ? "正方向" : "逆再生"}）
          </button>
        </div>
      </section>

      {/* シークバー（進行度コントロール） */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-800">
          3. シークバーで任意の位置にジャンプ
        </h3>
        <p className="text-[11px] text-slate-600">
          スライダーを動かすと、アニメーションの好きな位置に一気にジャンプします。
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span>進行度</span>
            <span className="font-mono text-xs text-slate-900">
              {progress}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
            className="w-full accent-sky-600"
          />
          <p className="text-[10px] text-slate-500">
            フレーム数は仮に {TOTAL_FRAMES} として計算しています。
            実際の JSON に合わせて調整してください。
          </p>
        </div>
      </section>
    </div>
  )
}

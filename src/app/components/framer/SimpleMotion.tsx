// src/components/framer/SimpleMotion.tsx
"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

export function SimpleMotion() {
  const [key, setKey] = useState(0)

  return (
    <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          基本のフェードイン + スライド
        </h2>
        <p className="text-sm text-slate-700 mt-1">
          ページ表示時に下からふわっと出てくる、最もよく使うパターンです。
          ボタンを押すと何度でもアニメーションを再生できます。
        </p>
      </div>

      <motion.div
        key={key}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-6"
      >
        <p className="text-center text-base font-semibold text-slate-900">
          初期状態：画面外（下） / 非表示
        </p>
        <p className="mt-2 text-center text-sm text-slate-700">
          → 表示時に、下から上へスライドしながら、透明度 0 → 1 へ変化
        </p>
      </motion.div>

      <div className="flex justify-center pt-2">
        <button
          onClick={() => setKey((prev) => prev + 1)}
          className="px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
        >
          もう一度アニメーションを見る
        </button>
      </div>
    </div>
  )
}

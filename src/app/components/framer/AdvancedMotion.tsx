// src/components/framer/AdvancedMotion.tsx
"use client"

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"
import { useState } from "react"

export function AdvancedMotion() {
  const [open, setOpen] = useState(true)

  // ページ全体のスクロール進行度（0〜1）
  const { scrollYProgress } = useScroll()

  // スクロール進捗に応じて変化させる値
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const circleX = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"])
  const circleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.4])

  // 表示用のパーセンテージ
  const [percent, setPercent] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercent(Math.round(latest * 100))
  })

  return (
    <div className="space-y-8 pb-[40vh]">
      {/* 1. Hover / Tap */}
      <section className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Hover / Tap アニメーション
          </h3>
          <p className="text-xs text-slate-700 mt-1">
            ホバーで拡大＆浮き上がり、クリックで押し込まれるように縮みます。
            ボタンやカードのインタラクションによく使うパターンです。
          </p>
        </div>
        <motion.div
          whileHover={{
            scale: 1.08,
            y: -4,
            boxShadow: "0 18px 45px rgba(15,23,42,0.2)",
          }}
          whileTap={{ scale: 0.96, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mt-3 rounded-lg bg-sky-600 px-6 py-5 text-center text-white cursor-pointer select-none"
        >
          <div className="text-sm font-semibold">
            カーソルを乗せたりクリックしてみてください
          </div>
          <div className="text-xs mt-1 text-sky-100">
            Hover: 少し大きく＆浮き上がり / Tap: 少し小さくなって押し込まれる
          </div>
        </motion.div>
      </section>

      {/* 2. Drag */}
      <section className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Drag（ドラッグ）アニメーション
          </h3>
          <p className="text-xs text-slate-700 mt-1">
            フローティングパネルやツールチップなど、
            マウスやタッチに追従する UI を作るときに使えます。
          </p>
        </div>

        <div className="mt-3 h-40 rounded-lg border border-dashed border-slate-300 bg-slate-50 relative overflow-hidden">
          <p className="absolute inset-x-0 top-2 text-center text-[11px] text-slate-500">
            点線枠の中でカードをドラッグできます
          </p>
          <motion.div
            drag
            dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
            dragElastic={0.3}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       rounded-md bg-emerald-500 px-4 py-2 text-xs font-medium text-white
                       cursor-grab active:cursor-grabbing"
          >
            このカードをドラッグ
          </motion.div>
        </div>
      </section>

      {/* 3. Layout アニメーション */}
      <section className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Layout アニメーション（開閉）
            </h3>
            <p className="text-xs text-slate-700 mt-1">
              コンテンツの開閉時に、ただの「パッ」と切り替えではなく、
              なめらかに伸び縮みします。
            </p>
          </div>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="ml-4 px-3 py-1 rounded-md border border-slate-300 text-xs text-slate-800 hover:bg-slate-50"
          >
            {open ? "閉じる" : "開く"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-md bg-violet-50 px-4 py-3 text-xs text-slate-800">
                レイアウトの変化（高さの変化など）を補間してくれるので、
                FAQ やアコーディオンで特に便利です。
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. スクロール連動アニメーション（ページ全体に連動） */}
      <section className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            スクロール連動アニメーション
          </h3>
          <p className="text-xs text-slate-700 mt-1">
            ページ全体のスクロール位置（0〜100%）に応じて、
            進行バーと丸が大きく動きます。上から下までスクロールしてみてください。
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-slate-100 px-4 py-5 space-y-4">
          {/* 数値で進捗を表示 */}
          <div className="flex items-baseline justify-between text-[11px] text-slate-600">
            <span>スクロール進行度（ページ全体）</span>
            <span className="font-mono text-xs font-semibold text-slate-900">
              {percent}%
            </span>
          </div>

          {/* 進行バー */}
          <div className="h-2 w-full rounded-full bg-slate-300 overflow-hidden">
            <motion.div
              style={{ scaleX: barScaleX }}
              className="h-full origin-left bg-sky-500"
            />
          </div>

          {/* 丸 + 説明テキスト */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="relative w-full h-24">
              <div className="absolute inset-y-1/2 left-0 right-0 border-t border-dashed border-slate-400" />
              <motion.div
                style={{ x: circleX, scale: circleScale }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                           w-16 h-16 rounded-full bg-white border-2 border-sky-500
                           flex items-center justify-center shadow-sm"
              >
                <span className="text-[11px] text-slate-900 font-semibold">
                  {percent}%
                </span>
              </motion.div>
            </div>
            <p className="text-[11px] text-slate-600 text-center leading-relaxed">
              ページの一番上にいると 0%、一番下までスクロールすると 100% になります。
              進行バーの伸び具合と丸の位置・大きさが連動しているのが分かります。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

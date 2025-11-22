// src/app/components/scroll/AdvancedMotion.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    id: 1,
    label: "Step 1",
    title: "タイムラインのスタート",
    body: "このセクション全体を、ひとつの「流れ」を説明するタイムラインとして扱います。まずは一番上のステップからスタートです。",
  },
  {
    id: 2,
    label: "Step 2",
    title: "バーがスクロール量に応じて伸びる",
    body: "ページを下にスクロールしていくと、左の縦バーが下から上へとどんどん伸びていきます。",
  },
  {
    id: 3,
    label: "Step 3",
    title: "今いるステップが強調される",
    body: "画面に入ってきたステップカードほど、カードが大きく・明るく・影付きで表示され、「いまここ！」が直感的に分かります。",
  },
  {
    id: 4,
    label: "Step 4",
    title: "読み進めている感の演出",
    body: "単なる縦長テキストではなく、「流れに沿って進んでいる」という感覚を、ビジュアルと動きでサポートします。",
  },
]

export function AdvancedMotion() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // このセクション内でのスクロール進捗（0〜1）
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // 左側の縦バーの伸び具合（下から上へ）
  const barScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-6"
    >
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          ゴリゴリ版スクロールアニメーション（タイムライン UI）
        </h2>
        <p className="text-sm text-slate-700 mt-1 leading-relaxed">
          この枠の中をゆっくり<strong>下までスクロール</strong>
          してみてください。左のバーがグイッと伸びていき、
          それに合わせて右側のステップカードが順番に
          <strong>「ふわっ＆ズーム＋影」</strong>で強調されます。
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          左のバーは Framer Motion の <code>useScroll</code>{" "}
          と <code>useTransform</code> でスクロール進行度と連動させ、
          ステップカードは <code>whileInView</code> で「画面に入った瞬間」に
          ガッツリ動かしています。
        </p>
      </div>

      <div className="relative mt-6 grid grid-cols-[auto,1fr] gap-6">
        {/* 左側：縦の進行バー + ステップ丸 */}
        <div className="relative flex flex-col items-center pt-1 pb-1">
          {/* グレーのベースライン */}
          <div className="h-full w-1 rounded-full bg-slate-200" />

          {/* スクロールに応じて伸びるカラーライン */}
          <motion.div
            style={{ scaleY: barScaleY }}
            className="absolute bottom-1 w-1 origin-bottom rounded-full bg-sky-500"
          />

          {/* ステップ位置の丸アイコン */}
          <div className="absolute inset-y-1 flex flex-col justify-between py-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-center mb-2 last:mb-0"
              >
                <div className="h-4 w-4 rounded-full border-2 border-slate-300 bg-white" />
              </div>
            ))}
          </div>
        </div>

        {/* 右側：ステップカード */}
        <div className="space-y-6">
          {steps.map((step) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, scale: 0.9, x: 0, boxShadow: "none" }}
              whileInView={{
                opacity: 1,
                scale: 1.03,
                x: 12,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)",
                backgroundColor: "#eef2ff", // bg-indigo-50 相当
              }}
              viewport={{
                amount: 0.5, // カードの 50% が見えたら発火
                margin: "-10% 0px -10% 0px",
                once: false,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-500">
                  画面に入った瞬間に強調
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-4">
        記事では、「シンプル版：whileInView でフェードイン」→
        「ゴリゴリ版：useScroll でバー連動 ＋ whileInView でカード強調」
        という形で、段階的な発展例として紹介できます。
      </p>
    </div>
  )
}

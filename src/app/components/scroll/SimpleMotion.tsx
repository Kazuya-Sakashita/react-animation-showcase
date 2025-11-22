"use client"

import { motion } from "framer-motion"

const features = [
  {
    id: 1,
    title: "スクロールでふわっと表示",
    body: "画面下から少しずつカードが立ち上がる、もっとも基本的なスクロールアニメーションです。",
  },
  {
    id: 2,
    title: "一つずつ順番に登場",
    body: "同じアニメーション設定でも、ディレイをずらすだけで“順番に出てくる感”を簡単に作れます。",
  },
  {
    id: 3,
    title: "複雑な設定はナシ",
    body: "Intersection Observer や AOS を使わず、Framer Motion の whileInView だけで完結させたシンプル版です。",
  },
]

export function SimpleScroll() {
  return (
    <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          シンプル版スクロールアニメーション
        </h2>
        <p className="text-sm text-slate-700 mt-1">
          スクロールして要素がビューポートに入ったタイミングで、
          ふわっとフェードインするだけの最小構成です。
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          Framer Motion の <code>whileInView</code> と{" "}
          <code>viewport</code> オプションだけを使っています。
        </p>
      </div>

      <div className="space-y-4">
        {features.map((item, index) => (
          <motion.section
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {String(item.id).padStart(2, "0")}. {item.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {item.body}
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

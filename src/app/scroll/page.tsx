// src/app/scroll/page.tsx
import Link from "next/link"
import { SimpleScroll } from "@/app/components/scroll/SimpleMotion"
import { AdvancedMotion } from "@/app/components/scroll/AdvancedMotion"

export default function ScrollPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <header className="space-y-3 text-slate-50">
          <Link href="/" className="text-xs underline text-slate-300">
            ← トップに戻る
          </Link>
          <div>
            <h1 className="text-3xl font-bold">スクロールアニメーション デモ</h1>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              スクロールに連動したアニメーションを、
              <span className="font-semibold">シンプルな「フェードイン」</span> と{" "}
              <span className="font-semibold">ゴリゴリな「タイムライン UI」</span>
              の 2 パターンで比較できるページです。
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            01. シンプル版（スクロールでふわっと表示）
          </h2>
          <SimpleScroll />
        </section>

        <section className="space-y-4 pb-10">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            02. ゴリゴリ版（タイムライン + 進行バー）
          </h2>
          <AdvancedMotion />
        </section>
      </div>
    </main>
  )
}

// src/app/framer/page.tsx
import Link from "next/link"
import { SimpleMotion } from "@/app/components/framer/SimpleMotion"
import { AdvancedMotion } from "@/app/components/framer/AdvancedMotion"

export default function FramerPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <header className="space-y-3 text-slate-50">
          <Link href="/" className="text-xs underline text-slate-300">
            ← トップに戻る
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Framer Motion デモ</h1>
            <p className="text-sm text-slate-200 mt-2">
              「最小のフェードイン」と「UI インタラクション・レイアウト・スクロールまで含めたゴリゴリな例」を並べて、
              Framer Motion の得意分野を分かりやすく体験できるページです。
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            01. シンプル版（基本アニメーション）
          </h2>
          <SimpleMotion />
        </section>

        <section className="space-y-4 pb-10">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            02. ゴリゴリ版（インタラクション / レイアウト / スクロール）
          </h2>
          <AdvancedMotion />
        </section>
      </div>
    </main>
  )
}

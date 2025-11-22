import Link from "next/link"
import { SimpleMotion } from "@/app/components/lottie/SimpleMotion"
import { AdvancedMotion } from "@/app/components/lottie/AdvancedMotion"

export default function LottiePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <header className="space-y-3 text-slate-50">
          <Link href="/" className="text-xs underline text-slate-300">
            ← トップに戻る
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Lottie デモ</h1>
            <p className="text-sm text-slate-200 mt-2">
              「ただ JSON を再生するだけのシンプル版」と、
              「ホバー・ボタン・スライダーでガッツリ制御するゴリゴリ版」を並べて、
              Lottie の得意分野を分かりやすく比較できるページです。
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            01. シンプル版（ただループ再生するだけ）
          </h2>
          <SimpleMotion />
        </section>

        <section className="space-y-4 pb-10">
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
            02. ゴリゴリ版（インタラクティブ制御）
          </h2>
          <AdvancedMotion />
        </section>
      </div>
    </main>
  )
}

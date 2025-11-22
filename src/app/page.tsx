// src/app/page.tsx
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* 中央のカード */}
        <div className="rounded-2xl bg-white shadow-xl px-8 py-10 space-y-8">
          {/* タイトル */}
          <header className="space-y-3 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
              React Animation Showcase
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              React アニメーション比較デモ
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold">Framer Motion / Lottie / スクロールアニメーション</span>
              のそれぞれについて、
              「シンプル版」と「ゴリゴリ版」を見比べられるデモプロジェクトです。
            </p>
          </header>

          {/* セクションリンク */}
          <section className="space-y-3">
            <SectionLink
              href="/framer"
              tag="Framer Motion"
              title="UI アニメーションの王道"
              description="Hover / Drag / Scroll / Layout など、UI パーツそのものの動きを中心に比較します。"
            />
            <SectionLink
              href="/lottie"
              tag="Lottie"
              title="After Effects ベースの JSON アニメーション"
              description="アイコンやイラストのアニメーションを、シンプル再生とインタラクティブ制御で比較します。"
            />
            <SectionLink
              href="/scroll"
              tag="Scroll Animation"
              title="スクロール連動アニメーション"
              description="AOS と Framer Motion の useScroll を使って、スクロールに応じた動きを比較します。"
            />
          </section>

          {/* 補足 */}
          <footer className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            各ページでは、「まずは最低限のサンプル」→「しっかり作り込んだサンプル」の順に並べています。
          </footer>
        </div>
      </div>
    </main>
  )
}

type SectionLinkProps = {
  href: string
  tag: string
  title: string
  description: string
}

function SectionLink({ href, tag, title, description }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 hover:border-sky-400 hover:bg-sky-50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-sky-100 text-[10px] font-semibold text-sky-700">
          Go
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
            {tag}
          </p>
          <h2 className="text-sm font-semibold text-slate-900">
            {title}
          </h2>
          <p className="text-xs leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

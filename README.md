# React Animation Showcase

React でよく使われるアニメーション系ライブラリをまとめて比較するデモプロジェクトです。

- Framer Motion
- Lottie（lottie-react）
- スクロール連動アニメーション（Framer Motion の `whileInView` / `useScroll`）

それぞれについて **「シンプル版」** と **「ゴリゴリ版」** の 2 パターンを用意し、
記事やブログで紹介しやすいように構成しています。

---

## 使用技術

- Framework: [Next.js](https://nextjs.org/)（App Router）
- Language: TypeScript
- UI: Tailwind CSS
- Animation:
  - [framer-motion](https://www.framer.com/motion/)
  - [lottie-react](https://github.com/Gamote/lottie-react)

---

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```
デフォルトでは以下でアクセスできます。
- http://localhost:3000

---
## デモページ一覧
| パス              | 内容                       |
| --------------- | ------------------------ |
| `/`             | トップページ（各デモへのナビゲーション）     |
| `/framer`       | Framer Motion デモ         |
| `/lottie`       | Lottie デモ（シンプル／インタラクティブ） |
| `/lottie-debug` | Lottie JSON デバッグ用ページ     |
| `/scroll`       | スクロール連動アニメーション デモ        |
---
## ディレクトリ構成（主要部分）
```tsx
src/
  animations/
    sample.json                 # Lottie 用アニメーション JSON

  app/
    page.tsx                    # トップページ
    framer/
      page.tsx                  # Framer Motion デモページ
    lottie/
      page.tsx                  # Lottie デモページ
    lottie-debug/
      page.tsx                  # Lottie デバッグページ
    scroll/
      page.tsx                  # スクロールアニメーション デモページ

  app/components/
    framer/
      SimpleMotion.tsx          # Framer Motion シンプル版
      AdvancedMotion.tsx        # Framer Motion ゴリゴリ版
    lottie/
      SimpleMotion.tsx          # Lottie シンプル版
      AdvancedMotion.tsx        # Lottie ゴリゴリ版（インタラクティブ）
    scroll/
      SimpleScroll.tsx          # スクロールアニメーション シンプル版
      AdvancedMotion.tsx        # スクロールアニメーション ゴリゴリ版
```
## トップページ（/）
src/app/page.tsx
- ダーク背景 + 白いカードで、コントラスト強めのレイアウト
- 以下 3 セクションへのリンクをカード形式で配置
  - ramer Motion
  - Lottie
  - スクロールアニメーション
- このプロジェクトが何を比較しているのか」が一目で分かる説明付き

記事からリンクする場合は、ここをスクリーンショットにすると全体像が伝わりやすいです。

## Framer Motion デモ（/framer）

src/app/framer/page.tsx.
src/app/components/framer/*

### シンプル版（SimpleMotion）
- 基本的な UI アニメーションを確認するための最小構成
  - Hover 時にふわっと浮く
  - クリック時に少し縮む
  - フェードイン／スライドインなど
- 主に使っている API
  - motion.div
  - whileHover
  - whileTap
  - transition.

「とりあえず Framer Motion を使うと、このくらいまではすぐ書ける」というライン。

### ゴリゴリ版（AdvancedMotion）
- 複数の要素が組み合わさった、実戦寄りのアニメーション
  - 複数カードのステップ表示
  - 遅延（stagger）を使った連続登場
  - 部分的なスクロール連動など
- 主なポイント
  - variants を使ったパターン化
  - コンポーネント分割してもアニメーションを保つ設計

「シンプルなサンプルから、どうやって複合的な UI に発展させるか」を示すための例として使えます。

---
## Lottie デモ（/lottie）
src/app/lottie/page.tsx.
src/app/components/lottie/*.
src/animations/sample.json

### Lottie 用 JSON について
- src/animations/sample.json に Lottie 用の JSON を配置しています。
- LottieFiles 等からダウンロードした JSON を、そのまま差し替えても動きます。
- 構造上は layers に中身が入っている JSON である必要があります（layers: [] だと何も表示されません）。

### シンプル版（SimpleMotion）
- 「Lottie をそのまま置いたらどう見えるか」を確認する最小構成
  - JSON を読み込んでループ再生するだけ
  - 余計な UI はつけず、アニメーションそのものを確認

主なコードイメージ：
```tsx
<Lottie animationData={animationData} loop autoplay />
```
「Lottie を導入すると、After Effects ベースのアニメーションがこんな感じで載る」という紹介用。

### ゴリゴリ版（AdvancedMotion）
- Lottie を UI と組み合わせて「インタラクティブに」制御する例
  - Hover で再生／一時停止
  - 再生／一時停止／停止ボタン
  - 速度変更（0.5x〜3x）
  - 方向切り替え（正方向／逆再生）
  - スライダーによるシーク（任意の位置にジャンプ）.

主なポイント：
- lottieRef を使ってインスタンスを制御
  - play, pause, stop
  - setSpeed
  - setDirection
  - goToAndStop

「Lottie はただの飾りではなく、状態に応じて細かく制御できる」という点を見せるためのデモになっています。

### デバッグページ（/lottie-debug）
- src/app/lottie-debug/page.tsx
- sample.json の読み込みや Lottie 自体の問題を切り分けるためのシンプルなページ
  - 枠の中でアニメーションが動くかどうかだけを確認
  - console.log で JSON の内容も確認可能

---
## スクロールアニメーション デモ（/scroll）
src/app/scroll/page.tsx.
src/app/components/scroll/*

### シンプル版（SimpleScroll）
 - 一番よく見る「スクロールしたらふわっと出てくるカード」の実装例
 - whileInView と viewport オプションだけで構成
   - 下から上にスライド
   - 不透明度を 0 → 1 に
   - 少しだけディレイをずらして、順番に登場する感じを表現
ポイント：
 - Intersection Observer を自前で書かずに済む
 - セクション単位の「お決まりのふわっと表示」を素早く実装可能

### ゴリゴリ版（AdvancedMotion）
 - 「タイムライン UI」をスクロール連動で見せるデモ
   - 左に縦の進行バー
   - 右に Step 1〜4 のカード
   - スクロールするとバーが下から上へ伸びる
   - 各ステップカードは、画面に入った瞬間に
     - フェードイン
     - 少し拡大
     - 右にスライド
     - 影を強く
     - 背景色を変える

使っている主な API：
 - useScroll + useTransform（左のバーのスケール）
 - whileInView（ステップカードの強調）

「シンプルな whileInView から、タイムライン UI への発展例」として紹介しやすい構成です。

---

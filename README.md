# Smart Kitchen Advisor: Deno + Fresh で作るAI料理アシスタント

## プロジェクト概要
このプロジェクトは、DenoとFreshフレームワークを使用して構築されたAI料理アシスタントです。OpenAI APIを活用し、入力された食材に基づいて料理の提案を行います。このプロジェクトの主な目的は、Node.jsとDenoの具体的な違いを理解し、DenoとFreshの強力な組み合わせを実証することです。

## 使用技術
- **Deno**: TypeScriptをネイティブにサポートするJavaScriptランタイム。セキュリティ、開発体験、パフォーマンスを重視。
- **Fresh Framework**: Islandsアーキテクチャを採用した次世代のWebフレームワーク。クライアントサイドJavaScriptを最小限に抑え、優れたパフォーマンスを提供。
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク。
- **OpenAI API**: GPT-3.5/4 を活用し、自然言語処理による料理分析とレシピ提案を実現。

## Node.js と Deno の具体的な違い

### 開発環境のセットアップ
#### Node.js + Next.js
```bash
npm init
npm install typescript @types/node
npm install dotenv
npm install express @types/express
npx tsc --init
```

#### Deno + Fresh
```bash
deno run -A -r https://fresh.deno.dev smart-kitchen
```

### 依存関係管理
#### Node.js
- `package.json` で依存関係を管理。
- `node_modules/` ディレクトリに依存関係をインストール。
- `npm` または `yarn` などのパッケージマネージャーを使用。

#### Deno
- URL ベースで依存関係をインポート。
- 依存関係は中央のキャッシュで管理。
- 依存関係がより明示的で、透明性が高い。

## 実装のポイント

### コンポーネント設計
- UI コンポーネント (`components/ui/`):
  - `Button.tsx`, `Input.tsx`, `Card.tsx` などの再利用可能な基本コンポーネント。
  - Preact をベースにした軽量な実装。
- 機能コンポーネント (`components/kitchen/`):
  - `IngredientInput.tsx`, `IngredientList.tsx`, `FlavorAnalysis.tsx` などのアプリケーション固有のコンポーネント。
  - UI コンポーネントを組み合わせて使用。
- Islands (`islands/`):
  - `SmartKitchenAdvisor.tsx` など、クライアントサイドでのインタラクションが必要なコンポーネント。
  - Fresh の Islands Architecture によるパフォーマンス最適化。

### API 統合
- Web 標準の Fetch API を利用して OpenAI API と通信。
- TypeScript の型定義により API レスポンスを安全に処理。
- カスタムエラークラスを実装し、エラーハンドリングを強化。

### 実行方法

1.  プロジェクトをクローンします:
   ```bash
   git clone <リポジトリURL>
   cd smart-kitchen
   ```
2.  依存関係をインストールします:
    ```bash
    deno task update
    ```
3.  `.env` ファイルに OpenAI API キーを設定します。
    ```bash
    OPENAI_API_KEY=your_openai_api_key
    ```
4.  開発サーバーを起動します:
    ```bash
    deno task start
    ```
5.  `http://localhost:8000` にブラウザでアクセスします。

## デモと実行結果
- 材料の入力フォームから材料を送信すると、AIが料理の分析結果とレシピ提案を提示します。

## 主な学び
- **Deno の開発体験**: TypeScript のネイティブサポート、Web 標準API の活用により、シンプルかつ効率的な開発を実現。
- **Fresh のアーキテクチャ**: Islands Architecture によるパフォーマンスの高さと、ゼロランタイムオーバーヘッドによるアプリケーションの高速化。
- **Web 標準の重要性**: Fetch API や TypeScript を標準でサポートする Deno の優位性を実感。

## 今後の課題
- API レスポンスのキャッシュ機能の実装。
- UI/UX のさらなる改善。
- テストの実装。
- エラーハンドリングの強化。
- より複雑なレシピ提案アルゴリズムの導入。

## ライセンス

[MIT License](https://opensource.org/licenses/MIT)

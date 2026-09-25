# 浮世絵×100均プロジェクト

初心者でもVS Code + Live Server（Go Live）で確認できる、静的Webサイトのサンプルです。

## フォルダ
- index.html：トップ
- project.html：プロジェクト
- gallery.html：作品
- making.html：制作動画
- story.html：制作裏話
- ukiyoe.html：浮世絵を知る
- map.html：浮世絵を巡る
- try.html：作ってみる
- about.html：プロフィール
- css/style.css：共通CSS
- js/script.js：共通JavaScript
- images/：仮画像
- video/：制作動画を置く場所

## Google Analytics 4
各HTMLに `G-XXXXXXXXXX` を仮置きしています。
Google Analyticsで自分の測定IDを取得したら、全HTMLの
`G-XXXXXXXXXX`
を自分のID（例：G-ABC123...）に置き換えてください。

※ file:// で開くだけではGA4の確認が難しいため、VS CodeのLive Server等でWebサーバー経由で確認してください。
公開後はGoogle Analyticsのリアルタイムレポートで計測を確認します。

## 画像・動画
現在はSVGの仮画像です。実作品の写真ができたら、同じ場所にjpg/png等を置き、HTMLの画像ファイル名を変更してください。
制作動画は `video/making01.mp4` に置くと制作動画ページで再生できます。

## 外国語
右上の「日本語 / English」でページ内の対応箇所を切り替えます。
翻訳を追加したい文章には `data-ja="日本語"` と `data-en="English"` を付けます。

## 公開前チェック
1. 画像のaltを実際の作品に合わせる
2. SNSの `#` リンクを実際のURLへ変更
3. MAPに実在する施設・場所を追加
4. 作者プロフィールを入力
5. GA4測定IDを変更
6. スマホ・タブレット・PCで確認
7. リンク切れチェック

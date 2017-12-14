# alexa-findmyphone

[![alexa-gohan](http://img.youtube.com/vi/ejXWG8fOyjA/0.jpg)](http://www.youtube.com/watch?v=ejXWG8fOyjA "alexa-findmyphone")

## これは何？

「アレクサ、スマホを探すを開いて」  
「誰のスマホを探しますか」  
「長男」  
「長男のスマホを鳴らしています」  

といった感じで、アレクサからスマホに電話をかけてもらい、スマホを探すやつ。

## つくった動機

家の中で iPhone を見失った場合、パソコンや妻の iPhone から「iPhoneを探す」にアクセスして音を鳴らしていたけど、パソコンを開いてブラウザからアクセスしたり、妻の iPhone を借りたり、といった手間がかかっていたので、声だけで実現できるようにしたかった。

ifttt でも同様のことができるけど、US Only だったり、既存のアレクサスキルだと、アプリを入れる必要があったり、複数の端末に対応してるのかわからなかったりしたので、自分でつくることにした。

基本的なつくりは [アレクサごはんだよで LINE 通知するやつ](https://github.com/mizzy/alexa-gohan) と同じで、LINE API 叩くところが Twilio API 叩くだけ、といった感じなので、さくっとつくれた。

## 使い方

スキル開発の基礎的な知識については、[Alexaスキル開発トレーニング](https://developer.amazon.com/ja/alexa-skills-kit/training/building-a-skill) の第1回と第2回を一通り読んで試してもらえればわかるはず。

ここではスキル作成に関する説明は、上記の「Alexaスキル開発トレーニング」に譲り、スキルとひもづける Lambda Function（このリポジトリにあるコード）を動かすのに最低限必要な設定のみ説明する。

### 環境変数の設定

Lambda Function の設定画面で、Twilio ACCOUNT SID と AUTH TOKEN、発信元電話番号を、それぞれ環境変数 `ACCOUNT_SID`、`AUTH_TOKEN`、`PHONE_NUMBER` にセットする。

### phone.js の作成

探す対象のスマホや携帯電話の、持ち主の名前と電話番号をマッピングしたテーブルを作成し、`phone.js` という名前で保存。

```javascript
exports.number = {
    '長男': '80XXXXXXXX',
    '次男': '80YYYYYYYY',
    '長女': '70ZZZZZZZZ',
}
```

### zip で固めてアップロード

`yarn install` してから、`phone.js` も含めて zip に固めてアップロード。


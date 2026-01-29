# chikyu-sdk-nodejs

## 概要
GENIEE SFA/CRM(旧ちきゅう)のWeb APIをJavaScript(NodeJS)から利用するためのライブラリです。
  
## APIの基本仕様について
こちらのレポジトリをご覧ください
  
https://github.com/chikyuinc/chikyu-api-specification

上記リポジトリの説明では、APIのレベルは、class2の箇所をご確認ください。
  
## 利用方法
(1)package.jsonの"dependencies"セクションの中に、以下のように追加してください。
```
"dependencies": {
  "chikyu-sdk": "https://github.com/chikyuinc/chikyu-sdk-nodejs.git"
},
↓
こちら、追加してありますので、npmが実行できるのを確認できたら、以下の(2)へ進んでください。
ここは、内容だけ、ご確認ください。
```

(2)npm install を実行してください

(3)利用するスクリプト内でrequireを行ってください
```
const chikyu = require('chikyu-sdk');
```

## RESTful応答モード（エラー時のHTTPステータスコード返却）
デフォルトでは、APIエラー（`has_error: true`）でもHTTPステータスは200を返します。
`setUseHttpStatus(true)`を設定すると、エラー種別に応じたHTTPステータスコードが返却されるようになります。

```javascript
// RESTful応答モードを有効化
chikyu.config.setUseHttpStatus(true);
```

| 設定 | エラー時のHTTPステータス |
|------|------------------------|
| `setUseHttpStatus(false)`（デフォルト） | 常に200 |
| `setUseHttpStatus(true)` | エラー種別に応じたステータス（400/401/403/500等） |

### エラーハンドリング

```javascript
chikyu.config.setUseHttpStatus(true);

try {
    const result = await chikyu.signless.invoke('/entity/companies/list', {
        items_per_page: 10,
        page_index: 0
    });
    // 成功時: result にデータが入る
} catch (err) {
    // エラー時: err.httpStatus でエラー種別を判別可能
    console.log(err.httpStatus);  // 400, 401, 403, 500 等
    console.log(err.message);     // エラーメッセージ
    console.log(err.data);        // レスポンスデータ

    if (err.httpStatus === 400) {
        // バリデーションエラー
    } else if (err.httpStatus === 401) {
        // 認証エラー
    } else if (err.httpStatus === 403) {
        // 権限エラー
    }
}
```


## 関数
```
chikyu.token.create
chikyu.session.login
chikyu.open.invoke
chikyu.public.invoke
chikyu.setApiKeys
chikyu.secure.invoke
```
